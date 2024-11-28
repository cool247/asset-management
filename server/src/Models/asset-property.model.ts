import { boolean, integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { assetTypesTable } from "./asset-type.model";


export const dataTypeEnum = pgEnum('data_type',['String', 'Number', 'Boolean']) 

export const assetPropertiesTable = pgTable("asset_properties", {
  id: serial("id").primaryKey(),
  typeId: integer("type_id").notNull().references(() => assetTypesTable.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  dataType: dataTypeEnum().default('String'),
  isRequired: boolean("is_required").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});