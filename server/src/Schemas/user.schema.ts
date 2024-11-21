import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().max(50, "Name must be less than 50 characters"),
  barcodeId: z.string().max(100, "Barcode ID must be less than 100 characters"),
  role: z.enum(["admin", "desktop_user", "mobile_user"]).optional(), // Default in DB
  contactNumber: z.string().max(10, "Contact number must be valid"),
  password: z.string().min(8, "minimum at least 8 char required").max(36, "Password must be less than 36 characters"),
});

export const updateUserSchema = z.object({
  newName: z.string().max(50, "Name must be less than 50 characters").optional(),
  role: z.enum(["admin", "desktop_user", "mobile_user"]).optional(),
  contactNumber: z.string().max(15, "Contact number must be valid").optional(),
});

export const userIdSchema = z.object({
  id: z.number().int("ID must be an integer"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>;
