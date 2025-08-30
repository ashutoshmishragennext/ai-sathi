// ===== API ROUTE: /api/students/route.ts =====
// Resume Builder API - For students to create and manage their resume data

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { StudentsTable } from '@/db/schema';
import { eq} from 'drizzle-orm';

// ===== POST - Create/Save Student Resume Data =====
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation - only check essential fields
    if (!body.userId || !body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { error: "User ID, first name, last name, and email are required" },
        { status: 400 }
      );
    }
    
    // Check if student already has resume data
    const existingStudent = await db
      .select()
      .from(StudentsTable)
      .where(eq(StudentsTable.userId, body.userId))
      .limit(1);
    
    if (existingStudent.length > 0) {
      return NextResponse.json(
        { error: "Resume data already exists. Use PUT to update." },
        { status: 409 }
      );
    }
    
    // Create student resume data
    const studentData = {
      userId: body.userId,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || null,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
      address: body.address || null,
      city: body.city || null,
      state: body.state || null,
      country: body.country || "India",
      pincode: body.pincode || null,
      profilePicture: body.profilePicture || null,
      professionalSummary: body.professionalSummary || null,
      linkedinUrl: body.linkedinUrl || null,
      githubUrl: body.githubUrl || null,
      portfolioUrl: body.portfolioUrl || null,
      education: body.education || [],
      experience: body.experience || [],
      skills: body.skills || {},
      personalProjects: body.personalProjects || [],
      certifications: body.certifications || [],
      achievements: body.achievements || [],
      languages: body.languages || [],
      interests: body.interests || [],
      references: body.references || [],
      resumeTemplate: body.resumeTemplate || "modern",
      resumeColor: body.resumeColor || "#000000",
      isProfileComplete: false,
      lastResumeGenerated: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const newStudent = await db
      .insert(StudentsTable)
      .values(studentData)
      .returning();
    
    return NextResponse.json({
      success: true,
      data: newStudent[0],
      message: "Resume data saved successfully"
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error creating student resume:", error);
    return NextResponse.json(
      { error: "Failed to save resume data" },
      { status: 500 }
    );
  }
}

// ===== GET - Fetch Student Resume Data =====
// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get('userId');
//     const studentId = searchParams.get('id');
    
//     // if (!userId && !studentId) {
//     //   return NextResponse.json(
//     //     { error: "Either userId or studentId is required" },
//     //     { status: 400 }
//     //   );
//     // }
    
//     let student;
    
//     if (studentId) {
//       // Get by student ID
//       const result = await db
//         .select()
//         .from(StudentsTable)
//         .where(eq(StudentsTable.id, studentId))
//         .limit(1);
      
//       student = result[0];
//     } else if (userId) {
//       // Get by user ID (most common for logged-in users)
//       const result = await db
//         .select()
//         .from(StudentsTable)
//         .where(eq(StudentsTable.userId, userId))
//         .limit(1);
      
//       student = result[0];
//     }
//     else{
//       const result= await db.select().from(StudentsTable)
//       student =result[0];
//     }
    
//     if (!student) {
//       return NextResponse.json(
//         { error: "Resume data not found" },
//         { status: 404 }
//       );
//     }
    
//     return NextResponse.json({
//       success: true,
//       data: student,
//       message: "Resume data retrieved successfully"
//     });
    
//   } catch (error) {
//     console.error("Error fetching student resume:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch resume data" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request : NextRequest){
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const student = await db.select().from(StudentsTable)

    if(id){
      const student = (await db.select().from(StudentsTable).where(eq(StudentsTable.id,id)))
        return NextResponse.json(student)

    }
    return NextResponse.json(student)
  } catch (error) {
    console.log(error);
     return NextResponse.json(error)
    
  }
}

// ===== PUT - Update Student Resume Data =====
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const studentId = searchParams.get('id');
    const body = await request.json();
    
    if (!userId && !studentId) {
      return NextResponse.json(
        { error: "Either userId or studentId is required" },
        { status: 400 }
      );
    }
    
    // Find existing student
    let whereCondition;
    if (studentId) {
      whereCondition = eq(StudentsTable.id, studentId);
    } 
    
    const existingStudent = await db
      .select()
      .from(StudentsTable)
      .where(whereCondition)
      .limit(1);
    
    if (existingStudent.length === 0) {
      return NextResponse.json(
        { error: "Resume data not found" },
        { status: 404 }
      );
    }
    
    // Prepare update data
    const updateData = {
      ...body,
      updatedAt: new Date()
    };
    
    // Remove undefined fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    
    // Update student resume data
    const updatedStudent = await db
      .update(StudentsTable)
      .set(updateData)
      .where(whereCondition)
      .returning();
    
    return NextResponse.json({
      success: true,
      data: updatedStudent[0],
      message: "Resume data updated successfully"
    });
    
  } catch (error) {
    console.error("Error updating student resume:", error);
    return NextResponse.json(
      { error: "Failed to update resume data" },
      { status: 500 }
    );
  }
}