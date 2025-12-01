CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`item` text NOT NULL,
	`amount` integer NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (strftime('%s', 'now'))
);
