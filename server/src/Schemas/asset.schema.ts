import { z } from "zod";

// Schema for creating an asset
export const createAssetSchema = z.object({
  barcodeId: z.string().max(100, "Barcode ID must be less than 100 characters"),
  assetTypeId: z.number().int("Asset Type ID must be an integer").nonnegative("Asset Type ID must be positive"),
  length: z.number().int("Length must be an integer").optional(),
  quantityInUse: z.number().int("Quantity in use must be an integer").optional().default(0),
  totalQty: z.number().int("Total quantity must be an integer").nonnegative("Total quantity must be positive"),
  locationId: z.number().int("Location ID must be an integer").nonnegative("Location ID must be positive"),
  dynamicFields: z.record(z.string(), z.any()).optional(), // For dynamic key-value pairs
});

// Schema for updating an asset
export const updateAssetSchema = z.object({
  barcodeId: z.string().max(100, "Barcode ID must be less than 100 characters").optional(),
  assetTypeId: z.number().int("Asset Type ID must be an integer").optional(),
  length: z.number().int("Length must be an integer").optional(),
  quantityInUse: z.number().int("Quantity in use must be an integer").optional(),
  totalQty: z.number().int("Total quantity must be an integer").optional(),
  locationId: z.number().int("Location ID must be an integer").optional(),
  dynamicFields: z.record(z.string(), z.any()).optional(),
});

// Schema for getting/deleting an asset by ID
export const assetIdSchema = z.object({
  id: z.number().int("ID must be an integer"),
});

// Export inferred types
export type CreateAssetInput = z.infer<typeof createAssetSchema>;
export type UpdateAssetInput = z.infer<typeof updateAssetSchema>;
export type AssetIdInput = z.infer<typeof assetIdSchema>;
