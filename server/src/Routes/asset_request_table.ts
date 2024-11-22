import { FastifyInstance } from "fastify";
import { validate } from "../Middleware/validation.middleware";
import { createAssetRequestSchema, updateAssetRequestSchema } from "../Schemas/assetRequest.schema";
import {
  createAssetRequest,
  getAllAssetRequests,
  updateAssetRequestStatus,
  getAllMyPendingRequests,
  getAllMyRequests
} from "../Controllers/asset_request_table.controller";

export const assetRequestRoutes = async (app: FastifyInstance) => {
  // Route to create a new asset request
  app.post("/create-new", { preHandler: validate(createAssetRequestSchema) }, createAssetRequest);
  app.post("/my-all-requests",  getAllMyRequests);
  app.post("/my-pending-requests",  getAllMyPendingRequests);

  // (Admin)
  app.get("/", getAllAssetRequests);

  // (Admin)
  app.put("/:id", { preHandler: validate(updateAssetRequestSchema) }, updateAssetRequestStatus);
};
