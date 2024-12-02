import { boolean, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "desktop_user",]);
export type UserRoleType = keyof typeof userRoleEnum.enumValues;

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  barcodeId: varchar("barcode_id", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 50 }).notNull(),
  password: varchar("password", { length: 100 }).notNull(),
  role: userRoleEnum().default("desktop_user"),
  isActive: boolean("is_active").default(true),
  contactNumber: varchar("contact_number", { length: 10 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
