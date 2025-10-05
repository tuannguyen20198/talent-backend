-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "sso";

-- CreateEnum
CREATE TYPE "sso"."Role" AS ENUM ('admin', 'hr', 'candidate');

-- CreateTable
CREATE TABLE "sso"."user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" "sso"."Role" NOT NULL DEFAULT 'candidate',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "sso"."user"("email");

