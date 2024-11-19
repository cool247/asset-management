import { FastifyInstance } from "fastify";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocationById,
  deleteLocationById,
} from "../Controllers/location.controller";

export const locationRoutes = async (app: FastifyInstance) => {
  app.post("/", createLocation);
  app.get("/", getAllLocations); 
  app.get("/:id", getLocationById); 
  app.patch("/:id", updateLocationById); 
  app.delete("/:id", deleteLocationById); 
};
