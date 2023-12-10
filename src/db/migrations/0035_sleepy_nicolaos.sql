CREATE TABLE `locationReviews` (
	`id` varchar(255) NOT NULL,
	`tripId` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`author_name` varchar(255) NOT NULL,
	`rating` decimal(3,1) NOT NULL,
	`relative_time_description` varchar(255),
	`text` text NOT NULL,
	`profile_photo_url` varchar(255),
	`author_url` varchar(255),
	CONSTRAINT `locationReviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `locationReviews` ADD CONSTRAINT `locationReviews_tripId_trip_tripId_fk` FOREIGN KEY (`tripId`) REFERENCES `trip`(`tripId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `locationReviews` ADD CONSTRAINT `locationReviews_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;