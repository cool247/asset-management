import { FastifyInstance } from "fastify";
import {
  createAssetItem,
  getAssetItemsByAssetId,
  updateAssetItemById,
  deleteAssetItemById,
} from "../Controllers/asset-item.controller";
// import { validate } from "../Middleware/validation.middleware";
// import { CreateLocationSchema, UpdateLocationSchema } from "../Schemas/location.schema";

export const assetItemsRoutes = async (app: FastifyInstance) => {
  app.post("/create-new",  createAssetItem);
  app.get("/:id", getAssetItemsByAssetId);
  app.patch("/:id",  updateAssetItemById);
  app.delete("/:id", deleteAssetItemById);
};
