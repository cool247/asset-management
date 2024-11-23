import { FastifyReply, FastifyRequest } from "fastify";
import rateLimit from "@fastify/rate-limit";
// import { db } from "./Config/db";
// import { migrate } from "drizzle-orm/node-postgres/migrator";

import { buildServer } from "./Utils/server";
import { logger } from "./Utils/logger";
import { config } from "./Config/config";

const main = async () => {
  const app = await buildServer();

  await app.register(rateLimit, {
    max: 4, // Maximum 4 requests
    timeWindow: "1 second", // Per 1 second
    keyGenerator: (request) => request.ip, // Use the IP address for rate limiting
    errorResponseBuilder: (req, context) => {
      return {
        statusCode: 429,
        error: "Too Many Requests",
        message: `Rate limit exceeded. Try again in ${Math.ceil(context.ttl / 1000)} seconds.`,
      };
    },
  });


  app.listen(
    {
      port: Number(config.app.port),
      host: "localhost",
    },
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      logger.success(`🚀 Server ready at http://localhost:${config.app.port}`);
    },
  );

  app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send("SERVER WORKING...");
  });
  
  // await migrate(db, {
  //   migrationsFolder: "./drizzle",
  // });

  
};

main();
