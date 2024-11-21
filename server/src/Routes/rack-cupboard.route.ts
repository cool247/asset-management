import { FastifyInstance } from "fastify";
import {
  createRackOrCupboard,
  getAllRacksAndCupboards,
  getRackOrCupboardById,
  updateRackOrCupboardById,
  deleteRackOrCupboardById,
} from "../Controllers/rack-cupboard.controller";

export const rackAndCupboardRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", createRackOrCupboard);
  app.get("/", getAllRacksAndCupboards);
  app.get("/:id", getRackOrCupboardById);
  app.patch("/:id", updateRackOrCupboardById);
  app.delete("/:id", deleteRackOrCupboardById);
};
