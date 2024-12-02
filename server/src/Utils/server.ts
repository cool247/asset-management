import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { authenticate } from "../Middleware/authenticate.middleware";
import {
  assetItemsRoutes,
  // assetMovementRoutes,
  assetRequestRoutes,
  assetRoutes,
  assetTypeRoutes,
  authRoutes,
  locationRoutes,
  rackAndCupboardRoutes,
  rowRoutes,
  userRoutes,
} from "../Routes";
//================================= Routes ====================================

export const buildServer = async () => {
  const app = fastify({
    logger: {
      level: "info",
    },
    // bodyLimit: 1_000_000,
    // connectionTimeout: 30_000,
    // requestTimeout: 30_000,
    // ignoreTrailingSlash: true,
    // maxParamLength: 10_000,
    // caseSensitive: false,
    // trustProxy: true,
    // pluginTimeout: 30_000,
    // ajv: {
    //   customOptions: {
    //     allErrors: true,
    //   },
    // },
    // disableRequestLogging: false,
  });

  app.register(cors, {
    origin: true,
    // methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  });

  // app.register(require("@fastify/compress"), {
  //   global: true,
  // });

  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
    sign: {
      expiresIn: "1h",
    },
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
    instance.register(assetTypeRoutes, { prefix: "/asset-type" });
    instance.register(assetItemsRoutes, { prefix: "/asset-item" });
    instance.register(assetRoutes, { prefix: "/asset" });
    instance.register(assetRequestRoutes, { prefix: "/asset-request" });
    // instance.register(assetMovementRoutes, { prefix: "/asset-movement" });
  };

  app.register(registerRoutes, { prefix: "/api" });
  return app;
};
