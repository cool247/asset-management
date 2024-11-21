import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  description: varchar("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

