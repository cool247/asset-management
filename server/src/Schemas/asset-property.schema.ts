import { z } from "zod";
import { dataTypeEnum } from "../Models/asset-property.model";

export const dataTypeEnumZod = z.enum(dataTypeEnum.enumValues);

export const CreatePropertySchema = z.object({
  typeId: z.number().int("Type ID must be an integer"),
  name: z.string().max(255, "Property name must be less than 255 characters"),
  dataType: dataTypeEnumZod,
  isRequired: z.boolean().default(true),
});

export const UpdatePropertySchema = z.object({
 typeId: z.number().int("Type ID must be an integer"),
  name: z.string().max(255, "Property name must be less than 255 characters").optional(),
  dataType: dataTypeEnumZod.optional(),
  isRequired: z.boolean().default(true).optional(),
});

export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;
export type UpdatePropertyInput = z.infer<typeof UpdatePropertySchema>;
