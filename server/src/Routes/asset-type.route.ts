import { FastifyInstance } from "fastify";
import { validate } from "../Middleware/validation.middleware";
import { createAssetTypeWithProperties,getAllAssetTypes,deleteAssetTypeById,getAssetTypeWithPropertiesById,updateAssetTypeWithPropertiesById, getAllAssetTypesWithProperty } from "../Controllers/asset-type.controller";
import { createAssetTypeWithPropertiesSchema, updateAssetTypeWithPropertiesSchema } from "../Schemas/asset-type.schema";

export const assetTypeRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler: validate(createAssetTypeWithPropertiesSchema) }, createAssetTypeWithProperties);
  app.get("/", getAllAssetTypes);
  app.get("/getAllWithProperties", getAllAssetTypesWithProperty);
  app.get("/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "integer" },
        },
        required: ["id"],
      },
    },
  },getAssetTypeWithPropertiesById);
  app.patch("/:id", { preHandler: validate(updateAssetTypeWithPropertiesSchema) }, getAssetTypeWithPropertiesById);
  app.delete("/:id", deleteAssetTypeById);
};
