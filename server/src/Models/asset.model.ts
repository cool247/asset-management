import { integer, jsonb, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { locations } from "./location.model";


export const assetTypes = pgTable("asset_types", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
});

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  barcodeId: varchar("barcode_id", { length: 100 }).notNull().unique(),
  assetTypeId: integer("asset_type_id")
    .notNull()
    .references(() => assetTypes.id),
  // vendor: varchar("vendor", { length: 100 }).notNull(),
  // capacity: numeric("capacity").notNull(),
  length: integer("length"),
  quantityInUse: integer("quantity_in_use").default(0),
  // qtyRemaining: integer("qty_remaining").default(0),
  totalQty: integer("total_qty").notNull(),
  locationId: integer("location_id")
    .notNull()
    .references(() => locations.id),
  dynamicFields: jsonb("dynamic_fields"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
