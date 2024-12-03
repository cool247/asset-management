import { z } from "zod";

export const movementStatusEnum = z.enum(["Pending", "Completed"]);
export const movementTypeEnum = z.enum(["cupboardToUser", "userToRack", "rackToUser", "userToCupboard"]);

export const createAssetMovementSchema = z.object({
  movementType: movementTypeEnum,
  assetItemBarcodeId: z.string().min(1, "Asset item barcodeId must be provided"),
  fromLocationBarcodeId: z.string().min(1, "barcodeId must be provided"),
  userBarcodeId: z.string().min(1, "User barcodeId must be provided"),
});


export type CreateAssetMovementInput = z.infer<typeof createAssetMovementSchema>;
