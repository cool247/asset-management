import { z } from "zod";

export const movementStatusEnum = z.enum(["Pending", "Completed"]);
export const movementTypeEnum = z.enum(["cupboardToUser", "userToRack", "rackToUser", "userToCupboard"]);

export const createAssetMovementSchema = z.object({
  movementType: z.string(),
  assetBarCodeId: z.string().min(1, "Asset barcodeId must be provided"),
  from: z.string().min(1, "From rack barcodeId must be provided"),
  to: z.string().min(1, "To rack barcodeId must be provided").nullable().optional(),
  userBarCodeId: z.string().min(1, "User barcodeId must be provided"),
  comments: z.string().max(255, "Comments must not exceed 255 characters").nullable().optional(),
});

export const getAllAssetMovementsSchema = z.object({
  query: z.object({
    status: movementStatusEnum.optional(),
    assetId: z.number().int().optional(),
  }),
});

export type CreateAssetMovementInput = z.infer<typeof createAssetMovementSchema>;
