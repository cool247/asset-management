import { FastifyInstance } from "fastify";
import {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAssetById,
  deleteAssetById,
} from "../Controllers/asset.controller";
import { createAssetSchema, updateAssetSchema } from "../Schemas/asset.schema";
import { validate } from "../Middleware/validation.middleware";

export const assetRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler: validate(createAssetSchema) }, createAsset);
  app.get("/", getAllAssets);
  app.get("/:id", getAssetById);
  app.patch("/:id", { preHandler: validate(updateAssetSchema) }, updateAssetById);
  app.delete("/:id", deleteAssetById);
};
