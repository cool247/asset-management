import { FastifyInstance } from "fastify";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocationById,
  deleteLocationById,
} from "../Controllers/location.controller";
import { validate } from "../Middleware/validation.middleware";
import { createLocationSchema, updateLocationSchema } from "../Schemas/location.schema";

export const locationRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler: validate(createLocationSchema) }, createLocation);
  app.get("/", getAllLocations);
  app.get("/:id", getLocationById);
  app.patch("/:id", { preHandler: validate(updateLocationSchema) }, updateLocationById);
  app.delete("/:id", deleteLocationById);
};
