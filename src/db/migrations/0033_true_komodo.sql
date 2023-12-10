ALTER TABLE `location` RENAME COLUMN `locationId` TO `id`;--> statement-breakpoint
ALTER TABLE `locationReviews` RENAME COLUMN `reviewId` TO `id`;--> statement-breakpoint
ALTER TABLE `location` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `locationReviews` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `location` ADD CONSTRAINT `location_tripId_trip_tripId_fk` FOREIGN KEY (`tripId`) REFERENCES `trip`(`tripId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `location` ADD CONSTRAINT `location_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `locationReviews` ADD CONSTRAINT `locationReviews_tripId_trip_tripId_fk` FOREIGN KEY (`tripId`) REFERENCES `trip`(`tripId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `locationReviews` ADD CONSTRAINT `locationReviews_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `trip` ADD CONSTRAINT `trip_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `locationReviews` DROP COLUMN `locationId`;--> statement-breakpoint
ALTER TABLE `location` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `locationReviews` ADD PRIMARY KEY(`id`);