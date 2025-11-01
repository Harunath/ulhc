/*
  Warnings:

  - Added the required column `dob` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL;
