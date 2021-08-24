-- CreateTable
CREATE TABLE `album` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `uuid` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(255),
    `title_es` VARCHAR(255),
    `title_pt` VARCHAR(255),
    `description_en` VARCHAR(255),
    `description_es` VARCHAR(255),
    `description_pt` VARCHAR(255),

    INDEX `FK_82d3c1c72e45cece1b77dfb49bc`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `album_media_media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `album_id` VARCHAR(191) NOT NULL,
    `media_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `block` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `entity_id` INTEGER NOT NULL,
    `entity_type` INTEGER NOT NULL,
    `block_id` INTEGER NOT NULL,
    `locale` VARCHAR(255) NOT NULL,
    `block_type` VARCHAR(255) NOT NULL,
    `position` VARCHAR(255),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `block_medium` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `uuid` VARCHAR(255) NOT NULL,
    `title_en` VARCHAR(255),
    `title_pt` VARCHAR(255),
    `title_es` VARCHAR(255),
    `description_en` VARCHAR(255),
    `description_pt` VARCHAR(255),
    `description_es` VARCHAR(255),
    `media_id` VARCHAR(191),
    `style` VARCHAR(255) NOT NULL,

    INDEX `FK_82d3c1c72e45cece9b77dfb49bc`(`media_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `block_text` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `uuid` VARCHAR(255) NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    `extended_value` VARCHAR(255),
    `style` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media_medium_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media` (
    `uuid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `active` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(255) NOT NULL,
    `mimetype` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `title_en` VARCHAR(255),
    `title_es` VARCHAR(255),
    `title_pt` VARCHAR(255),
    `description_en` VARCHAR(255),
    `description_es` VARCHAR(255),
    `description_pt` VARCHAR(255),
    `media_medium_type_id` INTEGER NOT NULL,

    UNIQUE INDEX `media_media_medium_type_id_unique`(`media_medium_type_id`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `uuid` VARCHAR(255) NOT NULL,
    `title_en` VARCHAR(255),
    `title_es` VARCHAR(255),
    `title_pt` VARCHAR(255),
    `path_en` VARCHAR(255),
    `path_es` VARCHAR(255),
    `path_pt` VARCHAR(255),
    `url_en` VARCHAR(255),
    `url_es` VARCHAR(255),
    `url_pt` VARCHAR(255),
    `parent` VARCHAR(255),
    `active` BOOLEAN NOT NULL DEFAULT false,
    `editable` INTEGER DEFAULT 1,
    `position` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `migrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timestamp` BIGINT NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `uuid` VARCHAR(255) NOT NULL,
    `slug_en` VARCHAR(255),
    `slug_es` VARCHAR(255),
    `slug_pt` VARCHAR(255),
    `title_en` VARCHAR(255),
    `title_pt` VARCHAR(255),
    `title_es` VARCHAR(255),
    `introduction_en` VARCHAR(255),
    `introduction_pt` VARCHAR(255),
    `introduction_es` VARCHAR(255),
    `active` BOOLEAN NOT NULL DEFAULT false,
    `media_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `news_media_id_unique`(`media_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `uuid` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `uuid` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255),
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `accessToken` VARCHAR(255),
    `active` BOOLEAN NOT NULL DEFAULT false,
    `avatarUrl` VARCHAR(255),

    UNIQUE INDEX `user.uuid_unique`(`uuid`),
    UNIQUE INDEX `user.email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `key` VARCHAR(255) NOT NULL,
    `parent` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `name_en` VARCHAR(255),
    `name_es` VARCHAR(255),
    `name_pt` VARCHAR(255),
    `slug_en` VARCHAR(255),
    `slug_es` VARCHAR(255),
    `slug_pt` VARCHAR(255),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_categoriesTonews` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_categoriesTonews_AB_unique`(`A`, `B`),
    INDEX `_categoriesTonews_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_newsTotags` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_newsTotags_AB_unique`(`A`, `B`),
    INDEX `_newsTotags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_rolesTouser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_rolesTouser_AB_unique`(`A`, `B`),
    INDEX `_rolesTouser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_permissionsTouser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_permissionsTouser_AB_unique`(`A`, `B`),
    INDEX `_permissionsTouser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `album_media_media` ADD FOREIGN KEY (`album_id`) REFERENCES `album`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `album_media_media` ADD FOREIGN KEY (`media_id`) REFERENCES `media`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `block_medium` ADD FOREIGN KEY (`media_id`) REFERENCES `media`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD FOREIGN KEY (`media_medium_type_id`) REFERENCES `media_medium_type`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news` ADD FOREIGN KEY (`media_id`) REFERENCES `media`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_categoriesTonews` ADD FOREIGN KEY (`A`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_categoriesTonews` ADD FOREIGN KEY (`B`) REFERENCES `news`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_newsTotags` ADD FOREIGN KEY (`A`) REFERENCES `news`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_newsTotags` ADD FOREIGN KEY (`B`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_rolesTouser` ADD FOREIGN KEY (`A`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_rolesTouser` ADD FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_permissionsTouser` ADD FOREIGN KEY (`A`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_permissionsTouser` ADD FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
