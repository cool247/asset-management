import { z } from "zod";
import { requestStatusEnum } from "../Models";

export const assetRequestStatusEnum = z.enum(requestStatusEnum.enumValues);

export const createAssetRequestSchema = z.object({
  assetId: z.number().positive("Asset ID must be positive").int(),
  requestedQuantity: z.number().positive("Requested Quantity must be positive").min(1).int(),
  requestedRemarks: z.string().min(1,"Comments must not less than 1 characters").max(255, "Comments must not exceed 255 characters").optional(),
});

export const updateAssetRequestSchema = z.object({
  status: assetRequestStatusEnum,
  approvedQuantity: z.number().positive("Requested Quantity must be positive").min(1).int(),
  requestedRemarks:z.string().min(1,"Comments must not less than 1 characters").max(255, "Comments must not exceed 255 characters").optional(),
});

export type CreateAssetRequestInput = z.infer<typeof createAssetRequestSchema>;
export type UpdateAssetRequestSchema = z.infer<typeof updateAssetRequestSchema>;
