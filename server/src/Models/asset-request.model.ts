import { integer, pgEnum, pgTable, serial, text, timestamp,  } from "drizzle-orm/pg-core";
import { assetsTable } from "./asset.model";
import { usersTable } from "./user.model";

export const requestStatusEnum = pgEnum("request_status", ["Pending", "Approved", "Rejected"]);

export const assetRequestTable = pgTable("asset_request_table", {
  id: serial("id").primaryKey(),
  assetId: integer("asset_id").notNull().references(() => assetsTable.id),
  requestedQuantity: integer("requested_quantity").notNull(),
  approvedQuantity: integer("approved_quantity"),
  requestedBy: integer("requested_by").notNull().references(() => usersTable.id),
  approvedBy: integer("approved_by").references(() => usersTable.id),
  requestedRemarks: text("requested_remarks"),
  approvalRemarks: text("approval_remarks"),
  status: requestStatusEnum().default("Pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
