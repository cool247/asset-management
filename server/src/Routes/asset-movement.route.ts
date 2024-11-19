import { FastifyInstance } from "fastify";
import {
  createAssetMovement,
  getAllAssetMovements,
  
} from "../Controllers/asset-movement.controller";

export const assetMovementRoutes = async (app: FastifyInstance) => {
  app.post("/", createAssetMovement);

  app.get("/", getAllAssetMovements);

  // app.get("/:id", getAssetMovementById);

  // app.patch("/:id", updateAssetMovement);

  // app.delete("/:id", deleteAssetMovementById);
};
