import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_use_cases_status" AS ENUM('draft', 'published');
  CREATE TABLE "blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar,
  	"content" jsonb,
  	"cover_image_id" integer,
  	"author_id" integer,
  	"published_date" timestamp(3) with time zone,
  	"status" "enum_blog_posts_status" DEFAULT 'draft',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "use_cases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"client" varchar,
  	"challenge" jsonb,
  	"solution" jsonb,
  	"results" jsonb,
  	"cover_image_id" integer,
  	"category_id" integer,
  	"published_date" timestamp(3) with time zone,
  	"status" "enum_use_cases_status" DEFAULT 'draft',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_sales_booster_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "homepage_ai_booster_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "homepage_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_headline" varchar,
  	"hero_subheadline" varchar,
  	"hero_cta_label" varchar,
  	"hero_cta_url" varchar,
  	"hero_background_image_id" integer,
  	"hero_badge_text" varchar,
  	"hero_badge_subtext" varchar,
  	"hero_illustration_id" integer,
  	"sales_booster_section_title" varchar,
  	"sales_booster_section_subtitle" jsonb,
  	"ai_booster_section_title" varchar,
  	"ai_booster_section_subtitle" jsonb,
  	"process_steps_section_title" varchar,
  	"collaboration_banner_title" varchar NOT NULL,
  	"collaboration_banner_cta_label" varchar,
  	"collaboration_banner_cta_url" varchar,
  	"use_cases_section_section_title" varchar DEFAULT 'Poznaj nasze wdrożenia' NOT NULL,
  	"cta_headline" varchar,
  	"cta_cta_label" varchar,
  	"cta_cta_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"use_cases_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "use_cases_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases" ADD CONSTRAINT "use_cases_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "use_cases" ADD CONSTRAINT "use_cases_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_sales_booster_services" ADD CONSTRAINT "homepage_sales_booster_services_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_sales_booster_services" ADD CONSTRAINT "homepage_sales_booster_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_ai_booster_services" ADD CONSTRAINT "homepage_ai_booster_services_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_ai_booster_services" ADD CONSTRAINT "homepage_ai_booster_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_process_steps_steps" ADD CONSTRAINT "homepage_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_illustration_id_media_id_fk" FOREIGN KEY ("hero_illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_use_cases_fk" FOREIGN KEY ("use_cases_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");
  CREATE INDEX "blog_posts_cover_image_idx" ON "blog_posts" USING btree ("cover_image_id");
  CREATE INDEX "blog_posts_author_idx" ON "blog_posts" USING btree ("author_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX "blog_posts_rels_order_idx" ON "blog_posts_rels" USING btree ("order");
  CREATE INDEX "blog_posts_rels_parent_idx" ON "blog_posts_rels" USING btree ("parent_id");
  CREATE INDEX "blog_posts_rels_path_idx" ON "blog_posts_rels" USING btree ("path");
  CREATE INDEX "blog_posts_rels_categories_id_idx" ON "blog_posts_rels" USING btree ("categories_id");
  CREATE UNIQUE INDEX "use_cases_slug_idx" ON "use_cases" USING btree ("slug");
  CREATE INDEX "use_cases_cover_image_idx" ON "use_cases" USING btree ("cover_image_id");
  CREATE INDEX "use_cases_category_idx" ON "use_cases" USING btree ("category_id");
  CREATE INDEX "use_cases_updated_at_idx" ON "use_cases" USING btree ("updated_at");
  CREATE INDEX "use_cases_created_at_idx" ON "use_cases" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "homepage_sales_booster_services_order_idx" ON "homepage_sales_booster_services" USING btree ("_order");
  CREATE INDEX "homepage_sales_booster_services_parent_id_idx" ON "homepage_sales_booster_services" USING btree ("_parent_id");
  CREATE INDEX "homepage_sales_booster_services_icon_idx" ON "homepage_sales_booster_services" USING btree ("icon_id");
  CREATE INDEX "homepage_ai_booster_services_order_idx" ON "homepage_ai_booster_services" USING btree ("_order");
  CREATE INDEX "homepage_ai_booster_services_parent_id_idx" ON "homepage_ai_booster_services" USING btree ("_parent_id");
  CREATE INDEX "homepage_ai_booster_services_icon_idx" ON "homepage_ai_booster_services" USING btree ("icon_id");
  CREATE INDEX "homepage_process_steps_steps_order_idx" ON "homepage_process_steps_steps" USING btree ("_order");
  CREATE INDEX "homepage_process_steps_steps_parent_id_idx" ON "homepage_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_hero_background_image_idx" ON "homepage" USING btree ("hero_background_image_id");
  CREATE INDEX "homepage_hero_hero_illustration_idx" ON "homepage" USING btree ("hero_illustration_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_use_cases_id_idx" ON "homepage_rels" USING btree ("use_cases_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_use_cases_fk" FOREIGN KEY ("use_cases_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX "payload_locked_documents_rels_use_cases_id_idx" ON "payload_locked_documents_rels" USING btree ("use_cases_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "use_cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_sales_booster_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_ai_booster_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_process_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "blog_posts_rels" CASCADE;
  DROP TABLE "use_cases" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "homepage_sales_booster_services" CASCADE;
  DROP TABLE "homepage_ai_booster_services" CASCADE;
  DROP TABLE "homepage_process_steps_steps" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blog_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_use_cases_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
  
  DROP INDEX "payload_locked_documents_rels_blog_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_use_cases_id_idx";
  DROP INDEX "payload_locked_documents_rels_categories_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blog_posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "use_cases_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "categories_id";
  DROP TYPE "public"."enum_blog_posts_status";
  DROP TYPE "public"."enum_use_cases_status";`)
}
