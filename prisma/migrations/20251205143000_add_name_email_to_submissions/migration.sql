-- AlterTable
ALTER TABLE "form_submissions" ADD COLUMN IF NOT EXISTS "name" TEXT DEFAULT 'Anonymous';
ALTER TABLE "form_submissions" ADD COLUMN IF NOT EXISTS "email" TEXT DEFAULT 'anonymous@example.com';

-- Update existing rows with default values (if any)
UPDATE "form_submissions" SET "name" = 'Anonymous', "email" = 'anonymous@example.com' WHERE "name" IS NULL OR "email" IS NULL;

-- Make columns required (remove default after data migration)
ALTER TABLE "form_submissions" ALTER COLUMN "name" SET NOT NULL;
ALTER TABLE "form_submissions" ALTER COLUMN "email" SET NOT NULL;
ALTER TABLE "form_submissions" ALTER COLUMN "name" DROP DEFAULT;
ALTER TABLE "form_submissions" ALTER COLUMN "email" DROP DEFAULT;

