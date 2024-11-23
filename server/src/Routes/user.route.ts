import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } from "../Controllers/user.controller";
import { createUserSchema, updateUserSchema } from "../Schemas/user.schema";
import { validate } from "../Middleware/validation.middleware";
import { JwtPayload } from "../Utils/types";

const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const decoded = await request.jwtVerify<JwtPayload>();
    request.jwtPayload = decoded;
  } catch (error) {
    reply.status(401).send({ message: "Unauthorized" });
  }
};

const authorize = (roles: string[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = await request.jwtVerify<JwtPayload>();

      if (!roles.includes(user.role)) {
        return reply.status(403).send({ message: "Forbidden" });
      }
    } catch (error) {
      reply.status(401).send({ message: "Unauthorized" });
    }
  };
};

// { preHandler: [authorize(["admin"])] }
// { preHandler: [authenticate] }

// export const userRoutes = async (app: FastifyInstance) => {
//   app.post("/create-new", { preHandler: [authenticate, validate(createUserSchema)] }, createUser);
//   app.get("/",{ preHandler: [authenticate] }, getAllUsers);
//   app.get("/:id", { preHandler: [authenticate, validate(userIdSchema)] }, getUserById);
//   app.patch("/:id", { preHandler: [authenticate, validate(updateUserSchema)] }, updateUserById);
//   app.delete("/:id", { preHandler: [authenticate, validate(userIdSchema)] }, deleteUserById);
// };

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler: [validate(createUserSchema)] }, createUser);
  app.get("/", getAllUsers);
  app.get("/:id", getUserById);
  app.patch("/:id", { preHandler: [validate(updateUserSchema)] }, updateUserById);
  app.delete("/:id", deleteUserById);
};
