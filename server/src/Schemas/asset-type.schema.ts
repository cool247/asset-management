import { z } from "zod";
import { CreatePropertySchema, UpdatePropertySchema } from "./asset-property.schema";

export const CreateAssetTypeWithPropertiesSchema = z.object({
  name: z.string().max(100, "Name must be less than 100 characters"),
  properties: z.array(CreatePropertySchema),
});

export const UpdateAssetTypeWithPropertiesSchema = z.object({
  name: z.string().max(100, "Name must be less than 100 characters").optional(),
  properties: z.array(UpdatePropertySchema),
});

// Export inferred types
export type CreateAssetTypeWithPropertiesInput = z.infer<typeof CreateAssetTypeWithPropertiesSchema>;
export type UpdateAssetTypeWithPropertiesInput = z.infer<typeof UpdateAssetTypeWithPropertiesSchema>;
