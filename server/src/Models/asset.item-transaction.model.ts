import { pgTable, serial, integer, varchar, timestamp, unique, pgEnum } from "drizzle-orm/pg-core";
import {  assetItemsTable, assetRequestTable, racksAndCupboards,  } from "./";

export const movementTypeEnum = pgEnum("movement_type", ["cupboardToUser", "userToRack", "rackToUser", "userToCupboard"]);

export const assetItemTransactionTable = pgTable("asset_item_transaction", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").notNull().references(() => assetRequestTable.id),
  assetItemBarcodeId: varchar("asset_item_barcode_id").notNull().references(() => assetItemsTable.barcodeId), 
  fromLocationBarcodeId: varchar("from_location_barcode_id").notNull().references(() => racksAndCupboards.barcodeId),
  toLocationBarcodeId: varchar("to_location_barcode_id").references(() => racksAndCupboards.barcodeId),
  movementType: movementTypeEnum().notNull(),
  movedAt: timestamp("moved_at").defaultNow().notNull(), 
  
  // Define table-level constraints
}, (table) => ({
  // Composite unique constraint to ensure the same asset item cannot be moved multiple times under the same request
  uniqueRequestAssetItem: unique().on(table.requestId, table.assetItemBarcodeId),
}));
