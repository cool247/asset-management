import { z } from "zod";
import { createPropertySchema, updatePropertySchema } from "./asset-property.schema";

export const createAssetTypeWithPropertiesSchema = z.object({
  name: z.string().max(100, "Name must be less than 100 characters"),
  properties: z.array(createPropertySchema),
});

export const updateAssetTypeWithPropertiesSchema = z.object({
  name: z.string().max(100, "Name must be less than 100 characters").optional(),
  properties: z.array(updatePropertySchema),
});

// Export inferred types
export type CreateAssetTypeWithPropertiesInput = z.infer<typeof createAssetTypeWithPropertiesSchema>;
export type UpdateAssetTypeWithPropertiesInput = z.infer<typeof updateAssetTypeWithPropertiesSchema>;
