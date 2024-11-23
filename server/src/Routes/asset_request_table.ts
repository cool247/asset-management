import { FastifyInstance } from "fastify";
import { validate } from "../Middleware/validation.middleware";
import { createAssetRequestSchema, updateAssetRequestSchema } from "../Schemas/assetRequest.schema";
import {
  createAssetRequest,
  getAllAssetRequests,
  updateAssetRequestStatus,
  getAllMyPendingRequests,
  getAllMyRequests,
} from "../Controllers/asset_request_table.controller";
import { authorize } from "../Middleware/authorize.middleware";

export const assetRequestRoutes = async (app: FastifyInstance) => {
  // Route to create a new asset request
  app.post("/create-new", { preHandler: validate(createAssetRequestSchema) }, createAssetRequest);
  app.get("/my-all-requests", getAllMyRequests);
  app.get("/my-pending-requests", getAllMyPendingRequests);

  // (Admin)
  app.get("/", { preHandler: [authorize(["admin"])] }, getAllAssetRequests);

  // (Admin)
  app.put("/:id", { preHandler: [authorize(["admin"]), validate(updateAssetRequestSchema)] }, updateAssetRequestStatus);
};
