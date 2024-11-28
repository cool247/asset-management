import { boolean, integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { assetsTable } from "./asset.model";
import { usersTable } from "./user.model";
import { racksAndCupboards } from "./rack-cupboard.model";

export const assetItemsTable = pgTable("asset_items", {
  id: serial("id").primaryKey(),
  assetId: integer("asset_id").notNull().references(() => assetsTable.id, { onDelete: "cascade" }),
  barcodeId: varchar("barcode_id", { length: 255 }).notNull().unique(),
  rackAndCupboardBardCodeId: varchar("rack_and_cupboard_barcode_id").references(() => racksAndCupboards.barcodeId),
  currentUserId: varchar("current_user_id").references(() => usersTable.barcodeId),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


