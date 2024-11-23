import { FastifyInstance } from "fastify";
import { createAssetMovement, getAllAssetMovements, getUserAssetMovements } from "../Controllers/asset-movement.controller";
import { createAssetMovementSchema } from "../Schemas/assetMovement.schema";
import { validate } from "../Middleware/validation.middleware";
import { authorize } from "../Middleware/authorize.middleware";

export const assetMovementRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler: [authorize(["mobile_user"]),validate(createAssetMovementSchema)] }, createAssetMovement);
  app.get("/asset-movement", { preHandler: [authorize(["admin"])] }, getAllAssetMovements);
  app.get("/my-asset-movement", { preHandler: [authorize(["admin"])] }, getUserAssetMovements);
};
