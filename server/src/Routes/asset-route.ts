import { FastifyInstance } from "fastify";
import {
  createAsset,
  getAllAssets,
  getAssetByBarcodeId,
  updateAssetByBarcodeId,
  deleteAssetByBarcodeId
} from "../Controllers/asset.controller";

export const assetRoutes = async (app: FastifyInstance) => {
  app.post("/", createAsset); 
  app.get("/", getAllAssets); 
  app.get("/:barcodeId", getAssetByBarcodeId); 
  app.patch("/:barcodeId", updateAssetByBarcodeId); 
  app.delete("/:barcodeId", deleteAssetByBarcodeId); 
};
