import { integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { assets } from "./asset.model";
import { users } from "./user.model";

export const requestStatusEnum = pgEnum("request_status", ["Pending", "Approved", "Rejected"]);

export const assetRequestTable = pgTable("asset_request_table", {
  id: serial("id").primaryKey(),
  assetId: integer("asset_id").notNull().references(() => assets.id),
  userId: integer("user_id").notNull().references(() => users.id),
  adminId: integer("admin_id").references(() => users.id),
  status: requestStatusEnum().default("Pending"),
  comments: varchar("comments", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
