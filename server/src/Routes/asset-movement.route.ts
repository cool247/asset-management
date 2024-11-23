import { FastifyInstance } from "fastify";
import { createAssetMovement, getAllAssetMovements } from "../Controllers/asset-movement.controller";
import { createAssetMovementSchema } from "../Schemas/assetMovement.schema";
import { validate } from "../Middleware/validation.middleware";

export const assetMovementRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler :validate(createAssetMovementSchema)}, createAssetMovement);
  app.get("/", getAllAssetMovements);
};
