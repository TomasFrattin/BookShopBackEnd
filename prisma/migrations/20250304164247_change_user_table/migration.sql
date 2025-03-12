/*
  Warnings:

  - You are about to alter the column `fechaRegistro` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `phoneNumber` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `sale` MODIFY `fechaRegistro` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `phoneNumber`;
