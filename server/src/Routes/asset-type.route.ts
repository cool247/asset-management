import { FastifyInstance } from "fastify";
import { validate } from "../Middleware/validation.middleware";
import { createAssetTypeWithProperties,getAllAssetTypes,deleteAssetTypeById,getAssetTypeWithPropertiesById,updateAssetTypeWithPropertiesById } from "../Controllers/asset-type.controller";
import { CreateAssetTypeWithPropertiesSchema, UpdateAssetTypeWithPropertiesSchema } from "../Schemas/asset-type.schema";

export const assetTypeRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler: validate(CreateAssetTypeWithPropertiesSchema) }, createAssetTypeWithProperties);
  app.get("/", getAllAssetTypes);
  app.get("/:id", getAssetTypeWithPropertiesById);
  app.patch("/:id", { preHandler: validate(UpdateAssetTypeWithPropertiesSchema) }, getAssetTypeWithPropertiesById);
  app.delete("/:id", deleteAssetTypeById);
};
