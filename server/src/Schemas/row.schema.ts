import { z } from "zod";

// Schema for creating a row
export const createRowSchema = z.object({
  body: z.object({
    name: z.string().max(50, "Name must be less than 50 characters"),
    description: z.string().optional(),
  }),
});

// Schema for updating a row
export const updateRowSchema = z.object({
  body: z.object({
    name: z.string().max(50, "Name must be less than 50 characters").optional(),
    description: z.string().optional(),
  }),
  params: z.object({
    id: z.number().int("ID must be an integer"),
  }),
});

// Schema for getting or deleting a row by ID
export const rowIdSchema = z.object({
  params: z.object({
    id: z.number().int("ID must be an integer"),
  }),
});

// Export inferred types
export type CreateRowInput = z.infer<typeof createRowSchema>["body"];
export type UpdateRowInput = z.infer<typeof updateRowSchema>;
export type RowIdInput = z.infer<typeof rowIdSchema>["params"];
