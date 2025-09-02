/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ===== 1. UPDATED SCHEMA (schema.ts) =====
import { InferModel } from "drizzle-orm";
import {
  boolean,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";


// ===== ENUMS =====
export const UserRole = pgEnum("user_role", ["ADMIN", "USER"]);
export const VerificationStatus = pgEnum("verification_status", ["PENDING", "APPROVED", "REJECTED"]);
export const ProjectStatus = pgEnum("project_status", ["DRAFT", "PUBLISHED", "ARCHIVED"]);

// ===== USERS =====
export const UsersTable = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    password: text("password"),
    phone: text("phone"),
    image: text("image"), // ADD: For OAuth profile pictures
    phoneVerified: timestamp("phone_verified", { mode: "date" }),
    role: UserRole("role").default("USER").notNull(),
    organizationId: uuid("organization_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("users_email_key").on(table.email),
    index("users_name_email_phone_idx").on(table.name, table.email, table.phone),
    index("users_organization_idx").on(table.organizationId),
  ]
);

export type User = InferModel<typeof UsersTable>;
export type NewUser = InferModel<typeof UsersTable, "insert">;

export const AccountsTable = pgTable(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    index("accounts_user_id_idx").on(account.userId),
  ]
);

export const SessionsTable = pgTable(
  "sessions",
  {
    sessionToken: text("session_token").notNull().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => [
    index("sessions_user_id_idx").on(session.userId),
  ]
);

export const VerificationTokensTable = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [
    primaryKey({ columns: [vt.identifier, vt.token] }),
  ]
);

// ===== TYPE EXPORTS FOR NEXTAUTH TABLES =====
export type Account = InferModel<typeof AccountsTable>;
export type Session = InferModel<typeof SessionsTable>;
export type VerificationToken = InferModel<typeof VerificationTokensTable>;

// ===== PROJECTS =====
export const ProjectsTable = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name").notNull(),
    description: text("description"),
    logo: text("logo"),
    status: ProjectStatus("status").default("DRAFT").notNull(),
    coverImage: text("cover_image"),
    websiteUrl:text("website_url"),
    bio:text("bio"),
    slug: text("slug"), // Added for URL-friendly project identification
    userId: uuid("user_id").notNull(),
    contentJson: jsonb("content_json"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("projects_slug_key").on(table.slug),
    index("projects_user_idx").on(table.userId),
    index("projects_name_idx").on(table.name),
    index("projects_status_idx").on(table.status),
    index("projects_created_at_idx").on(table.createdAt),
  ]
);

export type Project = InferModel<typeof ProjectsTable>;
export type NewProject = InferModel<typeof ProjectsTable, "insert">;

// Type definitions for JSON content
export interface ProjectContentItem {
  id: string;
  heading: string;
  description: string;
  order?: number;
}

export interface ProjectContent {
  sections: ProjectContentItem[];
  metadata?: {
    version?: string;
    lastModified?: string;
    [key: string]: any;
  };
}

// ===== AUTH TABLES (keeping existing) =====
export const EmailVerificationTokenTable = pgTable(
  "email_verification_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    email: text("email").notNull(),
    token: uuid("token").notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("email_verification_tokens_email_token_key").on(table.email, table.token),
    uniqueIndex("email_verification_tokens_token_key").on(table.token),
  ]
);

export const PhoneVerificationTable = pgTable(
  "phone_verification_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    phone: text("phone").notNull(),
    otp: text("otp").notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("phone_verification_tokens_phone_otp_key").on(table.phone, table.otp),
    uniqueIndex("phone_verification_tokens_otp_key").on(table.otp),
  ]
);

export const PasswordResetTokenTable = pgTable(
  "password_reset_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    email: text("email").notNull(),
    token: uuid("token").notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("password_reset_tokens_email_token_key").on(table.email, table.token),
    uniqueIndex("password_reset_tokens_token_key").on(table.token),
  ]
);
// Add this to your existing schema.ts file

// ===== STUDENTS TABLE FOR RESUME BUILDER =====
export const StudentsTable = pgTable(
  "students",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull(), // Foreign key to UsersTable
    
    // Personal Information
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    dateOfBirth: timestamp("date_of_birth", { mode: "date" }),
    address: text("address"),
    city: text("city"),
    state: text("state"),
    country: text("country").default("India"),
    pincode: text("pincode"),
    
    // Professional Details
    profilePicture: text("profile_picture"), // URL to uploaded image
    professionalSummary: text("professional_summary"),
    linkedinUrl: text("linkedin_url"),
    githubUrl: text("github_url"),
    portfolioUrl: text("portfolio_url"),
    
    // Education (JSON array for multiple entries)
    education: jsonb("education"), // Array of education objects
    
    // Experience (JSON array for multiple entries)
    experience: jsonb("experience"), // Array of experience objects
    
    // Skills (JSON array)
    skills: jsonb("skills"), // Categorized skills object
    
    // Projects (JSON array)
    personalProjects: jsonb("personal_projects"), // Array of project objects
    
    // Certifications & Achievements
    certifications: jsonb("certifications"), // Array of certification objects
    achievements: jsonb("achievements"), // Array of achievement objects
    
    // Additional Information
    languages: jsonb("languages"), // Array of language proficiency objects
    interests: jsonb("interests"), // Array of interests/hobbies
    references: jsonb("references"), // Array of reference objects
    
    // Resume Preferences
    resumeTemplate: text("resume_template").default("modern"), // Template preference
    resumeColor: text("resume_color").default("#000000"), // Color scheme preference
    
    // Metadata
    isProfileComplete: boolean("is_profile_complete").default(false),
    lastResumeGenerated: timestamp("last_resume_generated", { mode: "date" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("students_email_key").on(table.email),
    index("students_user_idx").on(table.userId),
    index("students_name_idx").on(table.firstName, table.lastName),
    index("students_location_idx").on(table.city, table.state),
    index("students_profile_complete_idx").on(table.isProfileComplete),
  ]
);

export type Student = InferModel<typeof StudentsTable>;
export type NewStudent = InferModel<typeof StudentsTable, "insert">;

// ===== TYPE DEFINITIONS FOR JSON FIELDS =====

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string; // Optional for current education
  cgpa?: string;
  percentage?: string;
  location: string;
  achievements?: string[];
  order: number;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string; // Optional for current job
  location: string;
  description: string;
  responsibilities: string[];
  technologies?: string[];
  achievements?: string[];
  order: number;
}

export interface SkillsData {
  technical: string[];
  programming: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
  soft: string[];
  other: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate?: string;
  endDate?: string;
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  order: number;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  order: number;
}

export interface AchievementEntry {
  id: string;
  title: string;
  description: string;
  date: string;
  organization?: string;
  order: number;
}

export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Native";
  order: number;
}

export interface ReferenceEntry {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone?: string;
  relationship: string;
  order: number;
}

// ===== RESUME TEMPLATES TABLE (Optional - for storing custom templates) =====
export const ResumeTemplatesTable = pgTable(
  "resume_templates",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name").notNull(),
    description: text("description"),
    templateData: jsonb("template_data").notNull(), // Template structure/layout data
    previewImage: text("preview_image"), // URL to template preview
    category: text("category").default("professional"), // professional, creative, academic, etc.
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("resume_templates_name_key").on(table.name),
    index("resume_templates_category_idx").on(table.category),
    index("resume_templates_active_idx").on(table.isActive),
  ]
);

export type ResumeTemplate = InferModel<typeof ResumeTemplatesTable>;
export type NewResumeTemplate = InferModel<typeof ResumeTemplatesTable, "insert">;

// ===== GENERATED RESUMES TABLE (Optional - for tracking resume generations) =====
export const GeneratedResumesTable = pgTable(
  "generated_resumes",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    studentId: uuid("student_id").notNull(),
    templateId: uuid("template_id"),
    resumeData: jsonb("resume_data").notNull(), // Complete resume data at time of generation
    pdfUrl: text("pdf_url"), // URL to generated PDF
    customizations: jsonb("customizations"), // Any custom modifications made
    generatedAt: timestamp("generated_at").defaultNow().notNull(),
  },
  (table) => [
    index("generated_resumes_student_idx").on(table.studentId),
    index("generated_resumes_template_idx").on(table.templateId),
    index("generated_resumes_date_idx").on(table.generatedAt),
  ]
);

export type GeneratedResume = InferModel<typeof GeneratedResumesTable>;
export type NewGeneratedResume = InferModel<typeof GeneratedResumesTable, "insert">;



