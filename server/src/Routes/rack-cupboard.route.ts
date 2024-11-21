import { FastifyInstance } from "fastify";
import {
  createRackOrCupboard,
  getAllRacksAndCupboards,
  getRackOrCupboardById,
  updateRackOrCupboardById,
  deleteRackOrCupboardById,
} from "../Controllers/rack-cupboard.controller";
import {
  createRackOrCupboardSchema,
  updateRackOrCupboardSchema,
  rackOrCupboardIdSchema,
} from "../Schemas/rack-cupboard.schema";
import { validate } from "../Middleware/validation.middleware";

export const rackAndCupboardRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler: validate(createRackOrCupboardSchema) }, createRackOrCupboard);
  app.get("/", getAllRacksAndCupboards);
  app.get("/:id", { preHandler: validate(rackOrCupboardIdSchema) }, getRackOrCupboardById);
  app.patch("/:id", { preHandler: validate(updateRackOrCupboardSchema) }, updateRackOrCupboardById);
  app.delete("/:id", { preHandler: validate(rackOrCupboardIdSchema) }, deleteRackOrCupboardById);
};
