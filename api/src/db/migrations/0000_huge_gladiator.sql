CREATE TABLE "webhooks" (
	"id" text PRIMARY KEY DEFAULT '019a282d-9128-7181-a2e3-022edf2aa739' NOT NULL,
	"method" text NOT NULL,
	"pathname" text NOT NULL,
	"ip" text NOT NULL,
	"status_code" integer DEFAULT 200 NOT NULL,
	"content_type" text,
	"content_length" integer,
	"query_params" jsonb,
	"headers" jsonb NOT NULL,
	"body" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
