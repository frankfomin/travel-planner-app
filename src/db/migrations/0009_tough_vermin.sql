CREATE TABLE `securityLog` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(255) NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	`type` varchar(255),
	`provider` varchar(255),
	`ipAdress` varchar(255),
	`country` varchar(255),
	CONSTRAINT `securityLog_id` PRIMARY KEY(`id`)
);
