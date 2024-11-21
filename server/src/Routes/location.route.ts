import { FastifyInstance } from "fastify";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocationById,
  deleteLocationById,
} from "../Controllers/location.controller";
import { validate } from "../Middleware/validation.middleware";
import { CreateLocationSchema, UpdateLocationSchema, GetLocationParamsSchema } from "../Schemas/location.schema";

export const locationRoutes = async (app: FastifyInstance) => {
  app.post("/", { preHandler: validate(CreateLocationSchema) }, createLocation);

  app.get("/", getAllLocations);

  app.get("/:id", { preHandler: validate(GetLocationParamsSchema) }, getLocationById);

  app.patch("/:id", { preHandler: validate(UpdateLocationSchema) }, updateLocationById);

  app.delete("/:id", deleteLocationById);
};