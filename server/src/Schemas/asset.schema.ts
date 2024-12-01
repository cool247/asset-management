import { z } from "zod";
import { createAssetItemSchema, updateAssetItemSchema } from "./asset-item.schema";

const createPropertiesSchema = z.object({
  propertyId:z.number().positive("Property ID must be positive"),
  propertyValue:z.any().refine(
    (val) => typeof val === "string" || typeof val === "number" || typeof val === "boolean",
    { message: "Value must be a string, number, or boolean" }
  ),
})

export const createAssetSchema = z.object({
  name: z.string().max(100, "name must be less than 100 characters"),
  typeId: z.number().int("Asset Type ID must be an integer").positive("Asset Type ID must be positive"),
  propertiesAndValues: z.array(createPropertiesSchema),
});

export const updateAssetSchema = z.object({
  name: z.string().max(100, "name must be less than 100 characters").optional(),
  items: z.array(updateAssetItemSchema),
});


// Export inferred types
export type CreateAssetInput = z.infer<typeof createAssetSchema>;
export type UpdateAssetInput = z.infer<typeof updateAssetSchema>;
