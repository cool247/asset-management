import { FastifyInstance } from "fastify";
import {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAssetById,
  deleteAssetById
} from "../Controllers/asset.controller";

export const assetRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", createAsset); 
  app.get("/", getAllAssets); 
  app.get("/:id", getAssetById); 
  app.patch("/:id", updateAssetById); 
  app.delete("/:id", deleteAssetById); 
};
