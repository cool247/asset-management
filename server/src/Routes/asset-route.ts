import { FastifyInstance } from "fastify";
import {
  createAssetTypeWithProperties,
  getAllAssets,
  deleteAssetById,
  getAssetWithItemsById,
} from "../Controllers/asset.controller";
import { createAssetSchema, updateAssetSchema } from "../Schemas/asset.schema";
import { validate } from "../Middleware/validation.middleware";
import { updateAssetTypeWithPropertiesById } from "../Controllers/asset-type.controller";

export const assetRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler: validate(createAssetSchema) }, createAssetTypeWithProperties);
  app.get("/", getAllAssets);
  app.get("/:id", getAssetWithItemsById);
  app.patch("/:id", { preHandler: validate(updateAssetSchema) }, updateAssetTypeWithPropertiesById);
  app.delete("/:id", deleteAssetById);
};
