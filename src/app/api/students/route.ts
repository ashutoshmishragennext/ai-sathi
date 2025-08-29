// ===== API ROUTE: /api/students/route.ts =====
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db'; // Adjust path to your database connection
import { StudentsTable, type Student, type NewStudent } from '@/db/schema'; // Adjust path
import { eq, and, ilike, desc, ne, sql, count } from 'drizzle-orm';
import { z } from 'zod';

// ===== VALIDATION SCHEMAS =====
const EducationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field of study is required"),
  startDate: z.string(),
  endDate: z.string().optional(),
  cgpa: z.string().optional(),
  percentage: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  achievements: z.array(z.string()).optional(),
  order: z.number().int().min(0)
});

const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string(),
  endDate: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
  technologies: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  order: z.number().int().min(0)
});

const SkillsSchema = z.object({
  technical: z.array(z.string()).optional(),
  programming: z.array(z.string()).optional(),
  frameworks: z.array(z.string()).optional(),
  databases: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  soft: z.array(z.string()).optional(),
  other: z.array(z.string()).optional()
});

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  order: z.number().int().min(0)
});

const CertificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  url: z.string().url().optional().or(z.literal("")),
  order: z.number().int().min(0)
});

const AchievementSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Achievement title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string(),
  organization: z.string().optional(),
  order: z.number().int().min(0)
});

const LanguageSchema = z.object({
  id: z.string(),
  language: z.string().min(1, "Language is required"),
  proficiency: z.enum(["Beginner", "Intermediate", "Advanced", "Native"]),
  order: z.number().int().min(0)
});

const ReferenceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  relationship: z.string().min(1, "Relationship is required"),
  order: z.number().int().min(0)
});

const CreateStudentSchema = z.object({
  userId: z.string().uuid("Valid user ID is required"),
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().default("India"),
  pincode: z.string().optional(),
  profilePicture: z.string().url().optional().or(z.literal("")),
  professionalSummary: z.string().max(500).optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  education: z.array(EducationSchema).optional(),
  experience: z.array(ExperienceSchema).optional(),
  skills: SkillsSchema.optional(),
  personalProjects: z.array(ProjectSchema).optional(),
  certifications: z.array(CertificationSchema).optional(),
  achievements: z.array(AchievementSchema).optional(),
  languages: z.array(LanguageSchema).optional(),
  interests: z.array(z.string()).optional(),
  references: z.array(ReferenceSchema).optional(),
  resumeTemplate: z.string().default("modern"),
  resumeColor: z.string().default("#000000")
});

const UpdateStudentSchema = CreateStudentSchema.partial().omit({ userId: true });

// ===== POST - Create Student Profile =====
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = CreateStudentSchema.parse(body);
    
    // Check if student already exists for this user
    const existingStudent = await db
      .select()
      .from(StudentsTable)
      .where(eq(StudentsTable.userId, validatedData.userId))
      .limit(1);
    
    if (existingStudent.length > 0) {
      return NextResponse.json(
        { error: "Student profile already exists for this user" },
        { status: 409 }
      );
    }
    
    // Check if email is already used by another student
    const existingEmail = await db
      .select()
      .from(StudentsTable)
      .where(eq(StudentsTable.email, validatedData.email))
      .limit(1);
    
    if (existingEmail.length > 0) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 409 }
      );
    }
    
    // Calculate profile completion
    const isProfileComplete = calculateProfileCompletion(validatedData);
    
    // Create new student
    const newStudent = await db
      .insert(StudentsTable)
      .values({
        ...validatedData,
        isProfileComplete,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    return NextResponse.json({
      success: true,
      data: newStudent[0],
      message: "Student profile created successfully"
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error creating student:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create student profile" },
      { status: 500 }
    );
  }
}

// ===== GET - Fetch Students =====
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const userId = searchParams.get('userId');
    const studentId = searchParams.get('id');
    const email = searchParams.get('email');
    const search = searchParams.get('search');
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    const profileComplete = searchParams.get('profileComplete');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50); // Max 50 per page
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    const offset = (page - 1) * limit;
    
    // Build query conditions
    const conditions = [];
    
    if (userId) {
      conditions.push(eq(StudentsTable.userId, userId));
    }
    
    if (studentId) {
      conditions.push(eq(StudentsTable.id, studentId));
    }
    
    if (email) {
      conditions.push(eq(StudentsTable.email, email));
    }
    
    if (search) {
      conditions.push(
        ilike(StudentsTable.firstName, `%${search}%`)
        // Note: You might want to use OR condition with lastName, email etc.
        // This would require more complex query building
      );
    }
    
    if (city) {
      conditions.push(eq(StudentsTable.city, city));
    }
    
    if (state) {
      conditions.push(eq(StudentsTable.state, state));
    }
    
    if (profileComplete !== null) {
      const isComplete = profileComplete === 'true';
      conditions.push(eq(StudentsTable.isProfileComplete, isComplete));
    }
    
    // Execute query
    let query = db.select().from(StudentsTable);
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    // Add sorting
    if (sortBy === 'createdAt') {
      query = sortOrder === 'desc' 
        ? query.orderBy(desc(StudentsTable.createdAt))
        : query.orderBy(StudentsTable.createdAt);
    } else if (sortBy === 'name') {
      query = query.orderBy(StudentsTable.firstName, StudentsTable.lastName);
    }
    
    // Add pagination
    const students = await query.limit(limit).offset(offset);
    
    // Get total count for pagination
    let countQuery = db.select({ count: sql`count(*)` }).from(StudentsTable);
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions));
    }
    const totalCount = await countQuery;
    
    // If specific student requested, return single object
    if (studentId && students.length > 0) {
      return NextResponse.json({
        success: true,
        data: students[0]
      });
    }
    
    // Return paginated results
    return NextResponse.json({
      success: true,
      data: students,
      pagination: {
        page,
        limit,
        total: totalCount[0].count,
        totalPages: Math.ceil(Number(totalCount[0].count) / limit),
        hasNext: page * limit < Number(totalCount[0].count),
        hasPrev: page > 1
      }
    });
    
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

// ===== PUT - Update Student Profile =====
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('id');
    
    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const validatedData = UpdateStudentSchema.parse(body);
    
    // Check if student exists
    const existingStudent = await db
      .select()
      .from(StudentsTable)
      .where(eq(StudentsTable.id, studentId))
      .limit(1);
    
    if (existingStudent.length === 0) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }
    
    // If email is being updated, check for duplicates
    if (validatedData.email) {
      const emailExists = await db
        .select()
        .from(StudentsTable)
        .where(
          and(
            eq(StudentsTable.email, validatedData.email),
            ne(StudentsTable.id, studentId)
          )
        )
        .limit(1);
      
      if (emailExists.length > 0) {
        return NextResponse.json(
          { error: "Email is already registered" },
          { status: 409 }
        );
      }
    }
    
    // Calculate updated profile completion
    const mergedData = { ...existingStudent[0], ...validatedData };
    const isProfileComplete = calculateProfileCompletion(mergedData);
    
    // Update student
    const updatedStudent = await db
      .update(StudentsTable)
      .set({
        ...validatedData,
        isProfileComplete,
        updatedAt: new Date()
      })
      .where(eq(StudentsTable.id, studentId))
      .returning();
    
    return NextResponse.json({
      success: true,
      data: updatedStudent[0],
      message: "Student profile updated successfully"
    });
    
  } catch (error) {
    console.error("Error updating student:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update student profile" },
      { status: 500 }
    );
  }
}

// ===== DELETE - Delete Student Profile =====
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('id');
    
    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }
    
    // Check if student exists
    const existingStudent = await db
      .select()
      .from(StudentsTable)
      .where(eq(StudentsTable.id, studentId))
      .limit(1);
    
    if (existingStudent.length === 0) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }
    
    // Delete student
    await db
      .delete(StudentsTable)
      .where(eq(StudentsTable.id, studentId));
    
    return NextResponse.json({
      success: true,
      message: "Student profile deleted successfully"
    });
    
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Failed to delete student profile" },
      { status: 500 }
    );
  }
}

// ===== UTILITY FUNCTIONS =====
function calculateProfileCompletion(data: any): boolean {
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'city',
    'state',
    'professionalSummary'
  ];
  
  const requiredFieldsComplete = requiredFields.every(field => 
    data[field] && data[field].toString().trim() !== ''
  );
  
  const hasEducation = data.education && Array.isArray(data.education) && data.education.length > 0;
  const hasSkills = data.skills && Object.keys(data.skills).some(key => 
    Array.isArray(data.skills[key]) && data.skills[key].length > 0
  );
  
  return requiredFieldsComplete && hasEducation && hasSkills;
}

// ===== SEPARATE ROUTE: /api/students/[id]/route.ts =====
// This handles individual student operations by ID
