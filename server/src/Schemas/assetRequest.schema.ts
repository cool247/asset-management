import { z } from "zod";

export const assetRequestStatusEnum = z.enum(["Approved", "Rejected"]);
export const movementTypeEnum = z.enum(["cupboardToUser", "userToRack", "rackToUser", "userToCupboard"]);

export const createAssetRequestSchema = z.object({
  assetId: z.number().positive("Asset ID must be positive").int(),
  userRemarks: z.string().max(255, "Comments must not exceed 255 characters").optional(),
});

export const updateAssetRequestSchema = z.object({
  status: assetRequestStatusEnum,
  adminRemarks:z.string().max(255, "Comments must not exceed 255 characters").nullable(),
});

export type CreateAssetRequestInput = z.infer<typeof createAssetRequestSchema>;
export type UpdateAssetRequestSchema = z.infer<typeof updateAssetRequestSchema>;
