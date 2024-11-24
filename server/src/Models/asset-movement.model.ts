import {  pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { assets } from "./asset.model";
import { racksAndCupboards } from "./rack-cupboard.model";
import { users } from "./user.model";

// Enum for movement status
export const movementStatusEnum = pgEnum("movement_status", ["Pending", "Completed"]);
export type PendingOrCompletedType = keyof typeof movementStatusEnum.enumValues

export const assetMovements = pgTable("asset_movements", {
  id: serial("id").primaryKey(),
  assetBarCodeId: varchar("asset_barcode_id").notNull().references(() => assets.barcodeId), 
  from: varchar("racks_and_cupboards_from").notNull().references(() => racksAndCupboards.barcodeId), 
  to: varchar("racks_and_cupboards_to").references(() => racksAndCupboards.barcodeId), 
  userBarCodeId: varchar("user_barcode_id").notNull().references(() => users.barcodeId), 
  status: movementStatusEnum().default("Pending"), 
  comments: varchar("comments", { length: 255 }),
  movedAt: timestamp("moved_at").defaultNow().notNull(), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
