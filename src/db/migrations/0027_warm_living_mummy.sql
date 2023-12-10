ALTER TABLE `locationReviews` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `locationReviews` ADD `reviewId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `locationReviews` ADD PRIMARY KEY(`reviewId`);