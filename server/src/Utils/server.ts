import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { userRoutes } from "../Routes/user.route";
import { locationRoutes } from "../Routes/location.route";
import { rowRoutes } from "../Routes/row.route";
import { rackAndCupboardRoutes } from "../Routes/rack-cupboard.route";
import { assetRoutes } from "../Routes/asset-route";
import { assetMovementRoutes } from "../Routes/asset-movement.route";
import { assetRequestRoutes } from "../Routes/asset_request_table";
import { authRoutes } from "../Routes/auth.route";
import { authenticate } from "../Middleware/authenticate.middleware";

export const buildServer = async () => {
  const app = fastify({ logger: true });

  app.register(cors, {
    origin: true,
  });

  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
  });

  app.addHook("onRequest", async (request, reply) => {
    if (request.raw.url?.startsWith("/api/auth")) {
      return; 
    }
    await authenticate(request, reply);
  });

  const registerRoutes = async (instance: FastifyInstance): Promise<void> => {
    instance.register(authRoutes, { prefix: "/auth" });
    instance.register(userRoutes, { prefix: "/user" });
    instance.register(locationRoutes, { prefix: "/location" });
    instance.register(rowRoutes, { prefix: "/row" });
    instance.register(rackAndCupboardRoutes, { prefix: "/rack-cupboard" });
    instance.register(assetRoutes, { prefix: "/asset" });
    instance.register(assetMovementRoutes, { prefix: "/asset-movement" });
    instance.register(assetRequestRoutes, { prefix: "/asset-request" });
  };

  app.register(registerRoutes, { prefix: "/api" });
  return app;
};
