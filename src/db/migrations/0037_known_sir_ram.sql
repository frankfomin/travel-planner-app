ALTER TABLE `trip` RENAME COLUMN `tripId` TO `id`;--> statement-breakpoint
ALTER TABLE `trip` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `locationReviews` ADD `locationId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `locationReviews` DROP COLUMN `tripId`;--> statement-breakpoint
ALTER TABLE `trip` ADD PRIMARY KEY(`id`);