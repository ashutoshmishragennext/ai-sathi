CREATE TABLE "generated_resumes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"template_id" uuid,
	"resume_data" jsonb NOT NULL,
	"pdf_url" text,
	"customizations" jsonb,
	"generated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resume_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"template_data" jsonb NOT NULL,
	"preview_image" text,
	"category" text DEFAULT 'professional',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"date_of_birth" timestamp,
	"address" text,
	"city" text,
	"state" text,
	"country" text DEFAULT 'India',
	"pincode" text,
	"profile_picture" text,
	"professional_summary" text,
	"linkedin_url" text,
	"github_url" text,
	"portfolio_url" text,
	"education" jsonb,
	"experience" jsonb,
	"skills" jsonb,
	"personal_projects" jsonb,
	"certifications" jsonb,
	"achievements" jsonb,
	"languages" jsonb,
	"interests" jsonb,
	"references" jsonb,
	"resume_template" text DEFAULT 'modern',
	"resume_color" text DEFAULT '#000000',
	"is_profile_complete" boolean DEFAULT false,
	"last_resume_generated" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "generated_resumes_student_idx" ON "generated_resumes" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "generated_resumes_template_idx" ON "generated_resumes" USING btree ("template_id");--> statement-breakpoint
CREATE INDEX "generated_resumes_date_idx" ON "generated_resumes" USING btree ("generated_at");--> statement-breakpoint
CREATE UNIQUE INDEX "resume_templates_name_key" ON "resume_templates" USING btree ("name");--> statement-breakpoint
CREATE INDEX "resume_templates_category_idx" ON "resume_templates" USING btree ("category");--> statement-breakpoint
CREATE INDEX "resume_templates_active_idx" ON "resume_templates" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "students_email_key" ON "students" USING btree ("email");--> statement-breakpoint
CREATE INDEX "students_user_idx" ON "students" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "students_name_idx" ON "students" USING btree ("first_name","last_name");--> statement-breakpoint
CREATE INDEX "students_location_idx" ON "students" USING btree ("city","state");--> statement-breakpoint
CREATE INDEX "students_profile_complete_idx" ON "students" USING btree ("is_profile_complete");