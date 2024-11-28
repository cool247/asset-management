// import {  integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
// import { assetsTable } from "./asset.model";
// import { racksAndCupboards } from "./rack-cupboard.model";
// import { usersTable } from "./user.model";
// import { assetRequestTable } from "./asset_request.model";
// import { assetItemsTable } from "./asset-Item.model";

// // Enum for movement status
// export const movementStatusEnum = pgEnum("movement_status", ["Pending", "Completed"]);
// export type MovementStatusType = keyof typeof movementStatusEnum.enumValues

// export const assetMovements = pgTable("asset_movements", {
//   id: serial("id").primaryKey(),
//   assetItemBarCodeId: varchar("asset_item_barcode_id").notNull().references(() => assetItemsTable.barcodeId), 
//   userBarCodeId: varchar("user_barcode_id").notNull().references(() => usersTable.barcodeId), 
//   status: movementStatusEnum().default("Pending"), 
//   fromLocationId: integer("from").notNull().references(() => racksAndCupboards.id),
//   toLocationId: integer("to").notNull().references(() => racksAndCupboards.id),
//   requestId: integer("request_id").references(() => assetRequestTable.id),
//   movedQuantity: integer("moved_quantity").notNull(),
//   movedBy: integer("moved_by").notNull().references(() => usersTable.id),
//   moverRemarks: text("mover_remarks"),
//   movedAt: timestamp("moved_at").defaultNow().notNull(), 
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });
