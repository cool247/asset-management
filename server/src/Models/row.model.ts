import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { locations } from "./location.model";

export const rows = pgTable("rows", {
  id: serial("id").primaryKey(),
  locationId: serial("location_id").references(()=> locations.id),
  name: varchar("name", { length: 50 }).notNull(),
  description: varchar("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
