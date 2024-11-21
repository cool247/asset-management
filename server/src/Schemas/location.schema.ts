import { z } from "zod";

export const CreateLocationSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name cannot exceed 50 characters"),
  description: z.string().max(255, "Description cannot exceed 255 characters").optional(),
});

export const UpdateLocationSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character").optional(),
  description: z.string().max(255, "Description cannot exceed 255 characters").optional(),
});

export const GetLocationParamsSchema = z.object({
  id: z.number().positive("ID must be a positive number"),
});

// Export inferred types
export type CreateLocationInput = z.infer<typeof CreateLocationSchema>;
export type UpdateLocationInput = z.infer<typeof UpdateLocationSchema>;
export type LocationIdInput = z.infer<typeof GetLocationParamsSchema>;
