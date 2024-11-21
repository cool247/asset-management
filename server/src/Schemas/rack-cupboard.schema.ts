import { z } from "zod";

export const createRackOrCupboardSchema = z.object({
  body: z.object({
    barcodeId: z.string().max(100, "Barcode ID must be less than 100 characters"),
    rowId: z.number().int("Row ID must be an integer"),
    type: z.enum(["Rack", "Cupboard"]).optional().default("Cupboard"),
    name: z.string().max(50, "Name must be less than 50 characters"),
    description: z.string().max(255, "Description must be less than 255 characters").optional(),
  }),
});

export const updateRackOrCupboardSchema = z.object({
  body: z.object({
    barcodeId: z.string().max(100, "Barcode ID must be less than 100 characters").optional(),
    rowId: z.number().int("Row ID must be an integer").optional(),
    type: z.enum(["Rack", "Cupboard"]).optional(),
    name: z.string().max(50, "Name must be less than 50 characters").optional(),
    description: z.string().max(255, "Description must be less than 255 characters").optional(),
  }),
  params: z.object({
    id: z.number().int("ID must be an integer"),
  }),
});

export const rackOrCupboardIdSchema = z.object({
  params: z.object({
    id: z.number().int("ID must be an integer"),
  }),
});

// Export inferred types
export type CreateRackOrCupboardInput = z.infer<typeof createRackOrCupboardSchema>["body"];
export type UpdateRackOrCupboardInput = z.infer<typeof updateRackOrCupboardSchema>;