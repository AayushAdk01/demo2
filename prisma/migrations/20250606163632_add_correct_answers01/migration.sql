/*
  Warnings:

  - Added the required column `correctAnswers` to the `PlayerLevel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `playerlevel` ADD COLUMN `correctAnswers` INTEGER NOT NULL;
