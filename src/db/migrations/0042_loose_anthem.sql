ALTER TABLE `account` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `verificationToken` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `verificationToken` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `verificationToken` ADD `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `verificationToken` ADD `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `verificationToken` DROP COLUMN `identifier`;