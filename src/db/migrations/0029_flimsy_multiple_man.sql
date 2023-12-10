ALTER TABLE `locationReviews` ADD `relative_time_description` varchar(255);--> statement-breakpoint
ALTER TABLE `locationReviews` ADD `profile_photo_url` varchar(255);--> statement-breakpoint
ALTER TABLE `locationReviews` ADD `author_url` varchar(255);--> statement-breakpoint
ALTER TABLE `locationReviews` DROP COLUMN `created_at`;