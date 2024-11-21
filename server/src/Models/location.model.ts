import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  description: varchar("description"),
});

