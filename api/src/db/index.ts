import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/env";
import { schema } from "./schema";

export const db = drizzle(env.DATABASE_URL, {
	casing: "snake_case",
	schema: schema,
});
