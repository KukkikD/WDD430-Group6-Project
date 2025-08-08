
-- Alter column role to use the Role enum
ALTER TABLE "User"
ALTER COLUMN "role"
TYPE "Role" USING "role"::"Role";
