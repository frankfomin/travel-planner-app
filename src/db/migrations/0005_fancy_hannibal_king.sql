ALTER TABLE `locationReviews` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `locationReviews` ADD PRIMARY KEY(`locationId`);