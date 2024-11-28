import { z } from "zod";
import { createAssetItemSchema, updateAssetItemSchema } from "./asset-item.schema";

export const createAssetSchema = z.object({
  name: z.string().max(100, "name must be less than 100 characters"),
  typeId: z.number().int("Asset Type ID must be an integer").nonnegative("Asset Type ID must be positive"),
  items: z.array(createAssetItemSchema),
});

export const updateAssetSchema = z.object({
  name: z.string().max(100, "name must be less than 100 characters").optional(),
  items: z.array(updateAssetItemSchema),
});


// Export inferred types
export type CreateAssetInput = z.infer<typeof createAssetSchema>;
export type UpdateAssetInput = z.infer<typeof updateAssetSchema>;
