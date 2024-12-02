import { FastifyInstance } from "fastify";
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } from "../Controllers/user.controller";
import { createUserSchema, updateUserSchema } from "../Schemas/user.schema";
import { validate } from "../Middleware/validation.middleware";

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler: [validate(createUserSchema)] }, createUser);
  app.get("/", getAllUsers);
  app.get("/:id", getUserById);
  app.patch("/:id", { preHandler: [validate(updateUserSchema)] }, updateUserById);
  app.delete("/:id", deleteUserById);
};
