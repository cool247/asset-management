import { integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { rows } from "./row.model";

export const rackOrCupboardEnum = pgEnum("rack_or_cupboard_type", ["Rack", "Cupboard"]);
export type RackOrCupboardType = keyof typeof rackOrCupboardEnum.enumValues;

export const racksAndCupboards = pgTable("racks_and_cupboards", {
  id: serial("id").primaryKey(),
  barcodeId: varchar("barcode_id", { length: 100 }).notNull().unique(),
  rowId: integer("row_id").notNull().references(() => rows.id),
  type: rackOrCupboardEnum().default("Cupboard"),
  name: varchar("name", { length: 50 }).notNull(),
  description: varchar("description", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
