import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { rows } from "./row.model";

const rackOrCupboardType = pgEnum("rack_or_cupboard_type", ["Rack", "Cupboard"]);
export type RackOrCupboardType = keyof typeof rackOrCupboardType.enumValues;

export const racksAndCupboards = pgTable("racks_and_cupboards", {
  id: serial("id").primaryKey(),
  barcodeId: varchar("barcode_id", { length: 100 }).notNull().unique(),
  rowId: integer("row_id")
    .notNull()
    .references(() => rows.id),
  type: rackOrCupboardType("type").notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  description: varchar("description", { length: 255 }),
});
