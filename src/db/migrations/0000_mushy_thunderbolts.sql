CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`price` decimal(10,2) NOT NULL DEFAULT '0',
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
