import { FastifyInstance } from "fastify";
import {
  createAssetItem,
  getAssetItemsByAssetId,
  updateAssetItemById,
  deleteAssetItemById,
} from "../Controllers/asset-item.controller";
import { validate } from "../Middleware/validation.middleware";
import { createAssetItemSchema, updateAssetItemSchema } from "../Schemas";

export const assetItemsRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", {preHandler: validate(createAssetItemSchema)}, createAssetItem);
  app.get("/:id", getAssetItemsByAssetId);
  app.patch("/:id",{preHandler: validate(updateAssetItemSchema)},  updateAssetItemById);
  app.delete("/:id", deleteAssetItemById);
};
