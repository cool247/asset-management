import { z } from "zod";

// Schema for creating a row
export const createRowSchema = z.object({
  name: z.string().max(50, "Name must be less than 50 characters"),
  description: z.string().optional(),
});

// Schema for updating a row
export const updateRowSchema = z.object({
  name: z.string().max(50, "Name must be less than 50 characters").optional(),
  description: z.string().optional(),
});


// Export inferred types
export type CreateRowInput = z.infer<typeof createRowSchema>;
export type UpdateRowInput = z.infer<typeof updateRowSchema>;
