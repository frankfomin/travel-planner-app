CREATE TABLE `locationReviews` (
	`locationId` varchar(255) NOT NULL,
	`tripId` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`author_name` varchar(255) NOT NULL,
	`rating` decimal(3,1) NOT NULL,
	`review_text` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `locationReviews_locationId_userId` PRIMARY KEY(`locationId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `trip` (
	`tripId` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `trip_tripId` PRIMARY KEY(`tripId`)
);
