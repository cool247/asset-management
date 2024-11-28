import { z } from "zod";

export const createLocationSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name cannot exceed 50 characters"),
  description: z.string().max(255, "Description cannot exceed 255 characters").optional(),
});

export const updateLocationSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character").optional(),
  description: z.string().max(255, "Description cannot exceed 255 characters").optional(),
});



// Export inferred types
export type CreateLocationInput = z.infer<typeof createLocationSchema>;
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>;
