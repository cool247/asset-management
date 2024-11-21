import { FastifyReply, FastifyRequest } from "fastify";

// import { db } from "./Config/db";
// import { migrate } from "drizzle-orm/node-postgres/migrator";

import { buildServer } from "./Utils/server";
import { logger } from "./Utils/logger";
import { config } from "./Config/config";

const main = async () => {
  const app = await buildServer();

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
