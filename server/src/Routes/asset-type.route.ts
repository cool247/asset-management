import { FastifyInstance } from "fastify";
import { validate } from "../Middleware/validation.middleware";
import { createAssetTypeWithProperties,getAllAssetTypes,deleteAssetTypeById,getAssetTypeWithPropertiesById,updateAssetTypeWithPropertiesById } from "../Controllers/asset-type.controller";
import { createAssetTypeWithPropertiesSchema, updateAssetTypeWithPropertiesSchema } from "../Schemas/asset-type.schema";

export const assetTypeRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler: validate(createAssetTypeWithPropertiesSchema) }, createAssetTypeWithProperties);
  app.get("/", getAllAssetTypes);
  app.get("/:id", getAssetTypeWithPropertiesById);
  app.patch("/:id", { preHandler: validate(updateAssetTypeWithPropertiesSchema) }, getAssetTypeWithPropertiesById);
  app.delete("/:id", deleteAssetTypeById);
};
