import fastify from "fastify";
import cors from '@fastify/cors';
import { userRoutes } from "../Routes/user.route";

export const buildServer = async () => {
  const app = fastify({
    logger: false,
  });
  
  app.register(cors, {
    origin: true,
})
  app.register(userRoutes, { prefix: "/api/user" });
  return app;
};
