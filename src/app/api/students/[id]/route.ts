
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { StudentsTable } from '@/db/schema';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET individual student by ID
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }
    
    const student = await db
      .select()
      .from(StudentsTable)
      .where(eq(StudentsTable.id, id))
      .limit(1);
    
    if (student.length === 0) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: student[0]
    });
    
  } catch (error) {
    console.error("Error fetching student:", error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

// PUT - Update specific student
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const validatedData = UpdateStudentSchema.parse(body);
    
    const existingStudent = await db
      .select()
      .from(StudentsTable)
      .where(eq(StudentsTable.id, id))
      .limit(1);
    
    if (existingStudent.length === 0) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }
    
    // Calculate profile completion
    const mergedData = { ...existingStudent[0], ...validatedData };
    const isProfileComplete = calculateProfileCompletion(mergedData);
    
    const updatedStudent = await db
      .update(StudentsTable)
      .set({
        ...validatedData,
        isProfileComplete,
        updatedAt: new Date()
      })
      .where(eq(StudentsTable.id, id))
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
          details: error.errors 
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

// DELETE specific student
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params;
    
    const existingStudent = await db
      .select()
      .from(StudentsTable)
      .where(eq(StudentsTable.id, id))
      .limit(1);
    
    if (existingStudent.length === 0) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }
    
    await db
      .delete(StudentsTable)
      .where(eq(StudentsTable.id, id));
    
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

// ===== ADDITIONAL UTILITY ROUTES =====

// GET /api/students/profile-completion/[id]
export async function getProfileCompletion(studentId: string) {
  try {
    const student = await db
      .select()
      .from(StudentsTable)
      .where(eq(StudentsTable.id, studentId))
      .limit(1);
    
    if (student.length === 0) {
      throw new Error("Student not found");
    }
    
    const completionData = analyzeProfileCompletion(student[0]);
    
    return NextResponse.json({
      success: true,
      data: completionData
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to analyze profile completion" },
      { status: 500 }
    );
  }
}

function analyzeProfileCompletion(student: Student) {
  const sections = {
    personalInfo: {
      required: ['firstName', 'lastName', 'email', 'phone', 'city'],
      optional: ['address', 'state', 'pincode', 'dateOfBirth'],
      completed: 0,
      total: 0
    },
    professionalInfo: {
      required: ['professionalSummary'],
      optional: ['linkedinUrl', 'githubUrl', 'portfolioUrl', 'profilePicture'],
      completed: 0,
      total: 0
    },
    education: {
      required: true,
      completed: !!(student.education && Array.isArray(student.education) && student.education.length > 0)
    },
    skills: {
      required: true,
      completed: !!(student.skills && Object.keys(student.skills).some(key => 
        Array.isArray((student.skills as any)[key]) && (student.skills as any)[key].length > 0
      ))
    },
    experience: {
      required: false,
      completed: !!(student.experience && Array.isArray(student.experience) && student.experience.length > 0)
    },
    projects: {
      required: false,
      completed: !!(student.personalProjects && Array.isArray(student.personalProjects) && student.personalProjects.length > 0)
    }
  };
  
  // Calculate completion percentages
  Object.keys(sections).forEach(section => {
    if (sections[section].required && sections[section].optional) {
      const requiredFields = sections[section].required;
      const optionalFields = sections[section].optional;
      
      const requiredCompleted = requiredFields.filter(field => 
        student[field] && student[field].toString().trim() !== ''
      ).length;
      
      const optionalCompleted = optionalFields.filter(field => 
        student[field] && student[field].toString().trim() !== ''
      ).length;
      
      sections[section].completed = requiredCompleted + (optionalCompleted * 0.5);
      sections[section].total = requiredFields.length + (optionalFields.length * 0.5);
    }
  });
  
  return sections;
}