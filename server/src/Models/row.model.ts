import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const rows = pgTable("rows", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  description: varchar("description"),
});
