import { FastifyInstance } from "fastify";
import {
  createRow,
  getAllRows,
  getRowById,
  updateRowById,
  deleteRowById,
} from "../Controllers/row.controller"; // Import your controller methods

export const rowRoutes = async (app: FastifyInstance) => {
  app.post("/", createRow);

  app.get("/", getAllRows);

  app.get("/:id", getRowById);

  app.patch("/:id", updateRowById);

  app.delete("/:id", deleteRowById);
};

