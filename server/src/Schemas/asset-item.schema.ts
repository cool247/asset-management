import { z } from "zod";

export const createAssetItem = z.object({
  assetId: z.number().int("Asset Type ID must be an integer"),
  barcodeId: z.string().max(100, "Barcode ID must be less than 100 characters"),
  rackAndCupboardBardCodeId: z.string().max(100, "Barcode ID must be less than 100 characters"),
});

export const createAssetItemSchema = z.array(createAssetItem);

export const updateAssetItemSchema = z.object({
  assetId: z.number().int("Asset Type ID must be an integer"),
  barcodeId: z.string().max(100, "Barcode ID must be less than 100 characters").optional(),
  rackAndCupboardBardCodeId: z.string().max(100, "Barcode ID must be less than 100 characters").optional(),
  currentUserId: z.string().max(100, "Barcode ID must be less than 100 characters").optional(),
});

// Export inferred types
export type CreateAssetItemInput = z.infer<typeof createAssetItemSchema>;
export type UpdateAssetItemInput = z.infer<typeof updateAssetItemSchema>;
