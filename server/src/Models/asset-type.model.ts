import { boolean, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const assetTypesTable = pgTable("asset_types", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
