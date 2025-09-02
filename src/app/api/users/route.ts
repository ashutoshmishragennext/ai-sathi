
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ===== API ROUTE: /api/users/route.ts =====
// Resume Builder API - For students to create and manage their resume data

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { UsersTable } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request : NextRequest){
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const student = await db.select().from(UsersTable).where(eq(UsersTable.role,"USER"))

    if(id){
      const student = (await db.select().from(UsersTable).where(eq(UsersTable.id,id)))
        return NextResponse.json(student)
    }
    return NextResponse.json(student)
  } catch (error) {
    console.log(error);
     return NextResponse.json(error)
    
  }
}