/*
  Warnings:

  - You are about to drop the column `testCases` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "testCases";

-- CreateTable
CREATE TABLE "TestCase" (
    "id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "expectedOutput" TEXT NOT NULL,
    "problemId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TestCase_id_key" ON "TestCase"("id");

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
