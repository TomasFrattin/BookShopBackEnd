/*
  Warnings:

  - You are about to alter the column `fechaRegistro` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `phoneNumber` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sale` MODIFY `fechaRegistro` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `rol` VARCHAR(191) NOT NULL DEFAULT 'user';
