import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { assetPropertiesTable } from "./asset_property.model";
import { assetsTable } from "./asset.model";

export const assetPropertyValuesTable = pgTable("asset_property_values", {
  id: serial("id").primaryKey(),
  assetId: integer("asset_id").notNull().references(() => assetsTable.id),
  propertyId: integer("property_id")
    .notNull()
    .references(() => assetPropertiesTable.id),
  value: text("value"), // Dynamic property value
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});