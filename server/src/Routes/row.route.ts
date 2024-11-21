import { FastifyInstance } from "fastify";
import {
  createRow,
  getAllRows,
  getRowById,
  updateRowById,
  deleteRowById,
} from "../Controllers/row.controller";
import {
  createRowSchema,
  updateRowSchema,
  rowIdSchema,
} from "../Schemas/row.schema";
import { validate } from "../Middleware/validation.middleware";

export const rowRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler: validate(createRowSchema) }, createRow);
  app.get("/", getAllRows);
  app.get("/:id", { preHandler: validate(rowIdSchema) }, getRowById);
  app.patch("/:id", { preHandler: validate(updateRowSchema) }, updateRowById);
  app.delete("/:id", { preHandler: validate(rowIdSchema) }, deleteRowById);
};


