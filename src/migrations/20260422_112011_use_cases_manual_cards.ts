import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_use_cases_section_manual_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"date" varchar,
  	"excerpt" varchar,
  	"image_id" integer
  );
  
  ALTER TABLE "homepage" ALTER COLUMN "hero_headline" SET DEFAULT 'AI & Automation Agency';
  ALTER TABLE "homepage" ALTER COLUMN "hero_subheadline" SET DEFAULT 'Wdrażamy Automatyzację i AI w procesach sprzedaży.';
  ALTER TABLE "homepage" ALTER COLUMN "hero_cta_label" SET DEFAULT 'Kontakt';
  ALTER TABLE "homepage" ALTER COLUMN "hero_cta_url" SET DEFAULT '/kontakt';
  ALTER TABLE "homepage" ALTER COLUMN "hero_badge_text" SET DEFAULT 'Najpopularniejsze LLMy dla Twojej firmy';
  ALTER TABLE "homepage" ALTER COLUMN "hero_badge_subtext" SET DEFAULT 'Ponad 300 gotowych automatyzacji';
  ALTER TABLE "homepage" ALTER COLUMN "sales_booster_section_title" SET DEFAULT 'Sales Booster';
  ALTER TABLE "homepage" ALTER COLUMN "ai_booster_section_title" SET DEFAULT 'AI Booster';
  ALTER TABLE "homepage" ALTER COLUMN "process_steps_section_title" SET DEFAULT 'Trzy kroki
  do udanej współpracy';
  ALTER TABLE "homepage" ALTER COLUMN "collaboration_banner_title" DROP NOT NULL;
  ALTER TABLE "homepage" ALTER COLUMN "use_cases_section_section_title" SET DEFAULT 'Booster Use Cases';
  ALTER TABLE "use_cases" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "homepage" ADD COLUMN "process_steps_eyebrow_text" varchar DEFAULT 'Współpraca';
  ALTER TABLE "homepage" ADD COLUMN "use_cases_section_eyebrow_text" varchar DEFAULT 'Poznaj nasze wdrożenia';
  ALTER TABLE "homepage_use_cases_section_manual_cards" ADD CONSTRAINT "homepage_use_cases_section_manual_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_use_cases_section_manual_cards" ADD CONSTRAINT "homepage_use_cases_section_manual_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_use_cases_section_manual_cards_order_idx" ON "homepage_use_cases_section_manual_cards" USING btree ("_order");
  CREATE INDEX "homepage_use_cases_section_manual_cards_parent_id_idx" ON "homepage_use_cases_section_manual_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_use_cases_section_manual_cards_image_idx" ON "homepage_use_cases_section_manual_cards" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_use_cases_section_manual_cards" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "homepage_use_cases_section_manual_cards" CASCADE;
  ALTER TABLE "homepage" ALTER COLUMN "hero_headline" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_subheadline" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_cta_label" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_cta_url" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_badge_text" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_badge_subtext" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "sales_booster_section_title" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "ai_booster_section_title" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "process_steps_section_title" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "collaboration_banner_title" SET NOT NULL;
  ALTER TABLE "homepage" ALTER COLUMN "use_cases_section_section_title" SET DEFAULT 'Poznaj nasze wdrożenia';
  ALTER TABLE "use_cases" DROP COLUMN "excerpt";
  ALTER TABLE "homepage" DROP COLUMN "process_steps_eyebrow_text";
  ALTER TABLE "homepage" DROP COLUMN "use_cases_section_eyebrow_text";`)
}
