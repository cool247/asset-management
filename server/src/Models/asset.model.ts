import { boolean, integer,  pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { assetTypesTable } from "./asset-type.model";

export const assetsTable = pgTable("assets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  typeId: integer("type_id").notNull().references(() => assetTypesTable.id,{onDelete:'cascade'}),
  totalQuantity: integer("total_quantity").default(0).notNull(),
  usedQuantity: integer("used_quantity").default(0).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

