ALTER TABLE `location` DROP FOREIGN KEY `location_tripId_trip_tripId_fk`;
--> statement-breakpoint
ALTER TABLE `location` DROP FOREIGN KEY `location_userId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `locationReviews` DROP FOREIGN KEY `locationReviews_tripId_trip_tripId_fk`;
--> statement-breakpoint
ALTER TABLE `locationReviews` DROP FOREIGN KEY `locationReviews_userId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `trip` DROP FOREIGN KEY `trip_userId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `location` DROP COLUMN `userId`;--> statement-breakpoint
ALTER TABLE `locationReviews` DROP COLUMN `userId`;