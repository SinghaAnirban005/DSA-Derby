/*
  Warnings:

  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserCategory" AS ENUM ('Admin', 'nonAdmin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserCategory" NOT NULL;
