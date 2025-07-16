-- CreateTable
CREATE TABLE `PlayerLevel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `levelId` INTEGER NOT NULL,
    `stars` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PlayerLevel_playerId_levelId_key`(`playerId`, `levelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlayerLevel` ADD CONSTRAINT `PlayerLevel_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `player`(`Player_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerLevel` ADD CONSTRAINT `PlayerLevel_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `level`(`Level_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
