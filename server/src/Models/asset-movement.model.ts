import {  integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import {  assetRequestTable, assetsTable,  usersTable } from "./";


export const movementStatusEnum = pgEnum("movement_status", ["Pending", "Completed"]);
export type MovementStatusType = keyof typeof movementStatusEnum.enumValues

export const assetMovementTable = pgTable("asset_movements", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").notNull().references(() => assetRequestTable.id),
  assetId: integer("asset_id").notNull().references(() => assetsTable.id),

  userBarCodeId: varchar("user_barcode_id").notNull().references(() => usersTable.barcodeId), 
  
  movedQuantity: integer("moved_quantity").notNull().default(0),
  quantityWithUser: integer("quantity_with_user").notNull().default(0),

  status: movementStatusEnum().default("Pending"), 
  startedAt: timestamp("moved_at").defaultNow().notNull(), 
  completedAt: timestamp("completed_at").defaultNow(),
});
