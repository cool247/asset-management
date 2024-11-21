import { integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { assets } from "./asset.model";
import { racksAndCupboards } from "./rack-cupboard.model";
import { locations } from "./location.model";

// Enum for movement status
export const movementStatusEnum = pgEnum("movement_status", ["Pending", "Completed"]);
export type PendingOrCompletedType = keyof typeof movementStatusEnum.enumValues

export const assetMovements = pgTable("asset_movements", {
  id: serial("id").primaryKey(),
  assetId: integer("asset_id").notNull().references(() => assets.id), 
  sourceLocationId: integer("source_location_id").references(() => locations.id), 
  destinationLocationId: integer("destination_location_id").references(() => locations.id), 
  rackId: integer("rack_id").references(() => racksAndCupboards.id), 
  userId: integer("user_id").notNull(), 
  status: movementStatusEnum().default("Pending"), 
  movedAt: timestamp("moved_at").defaultNow().notNull(), 
  comments: varchar("comments", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
