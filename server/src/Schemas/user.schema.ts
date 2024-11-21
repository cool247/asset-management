import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().max(50, "Name must be less than 50 characters"),
    barcodeId: z.string().max(100, "Barcode ID must be less than 100 characters"),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    newName: z.string().max(50, "Name must be less than 50 characters"),
  }),
  params: z.object({
    id: z.number().int("ID must be an integer"),
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.number().int("ID must be an integer"),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>["params"];
