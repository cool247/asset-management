import { boolean, integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { assetTypesTable } from "./asset-type.model";


export const dataTypeEnum = pgEnum('data_type',['String', 'Number', 'Boolean']) 
export type DataType = keyof typeof dataTypeEnum.enumValues

export const assetPropertiesTable = pgTable("asset_properties", {
  id: serial("id").primaryKey(),
  typeId: integer("type_id").notNull().references(() => assetTypesTable.id),
  name: varchar("name", { length: 255 }).notNull(),
  dataType: dataTypeEnum().default('String'),
  isRequired: boolean("is_required").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});