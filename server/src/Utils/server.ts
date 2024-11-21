import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { userRoutes } from "../Routes/user.route";
import { locationRoutes } from "../Routes/location.route";
import { rowRoutes } from "../Routes/row.route";
import { rackAndCupboardRoutes } from "../Routes/rack-cupboard.route";
import { assetRoutes } from "../Routes/asset-route";
import { assetMovementRoutes } from "../Routes/asset-movement.route";

export const buildServer = async () => {
  const app = fastify();

  app.register(cors, {
    origin: true,
  });

  const registerRoutes = async (instance: FastifyInstance): Promise<void> => {
    instance.register(userRoutes, { prefix: "/user" });
    instance.register(locationRoutes, { prefix: "/location" });
    instance.register(rowRoutes, { prefix: "/row" });
    instance.register(rackAndCupboardRoutes, { prefix: "/rack-cupboard" });
    instance.register(assetRoutes, { prefix: "/asset" });
    instance.register(assetMovementRoutes, { prefix: "/asset-movement" });
  };

  app.register(registerRoutes, { prefix: "/api" });
  return app;
};
