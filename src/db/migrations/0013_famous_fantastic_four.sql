ALTER TABLE `locationReviews` MODIFY COLUMN `created_at` timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `trip` MODIFY COLUMN `created_at` timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `trip` ADD `city` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `trip` ADD `description` text NOT NULL;