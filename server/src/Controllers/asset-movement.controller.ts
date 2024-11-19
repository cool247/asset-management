import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../Config/db";
import { logger } from "../Utils/logger";
import { assetMovements } from "../Models/asset-movement.model";

export const createAssetMovement = async (request: FastifyRequest, reply: FastifyReply) => {
  const {
    assetId,
    sourceLocationId,
    destinationLocationId,
    rackId,
    userId,
    status,
    comments,
  }: {
    assetId: number;
    sourceLocationId: number;
    destinationLocationId: number;
    rackId: number;
    userId: number;
    status: "Pending" | "Completed";
    comments: string | null;
  } = request.body as {
    assetId: number;
    sourceLocationId: number;
    destinationLocationId: number;
    rackId: number;
    userId: number;
    status: "Pending" | "Completed";
    comments: string | null;
  };

  logger.info(`Creating asset movement for assetId: ${assetId}, status: ${status}`);

  try {
    const createAssetMovement = await db
      .insert(assetMovements)
      .values({
        assetId,
        sourceLocationId,
        destinationLocationId,
        rackId,
        userId,
        status,
        comments,
      })
      .returning();

    reply.status(201).send(createAssetMovement);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error creating asset movement: ${error.message}`);
      reply.status(500).send({ error: "Failed to create asset movement" });
    } else {
      logger.error("An unknown error occurred during asset movement creation");
      reply.status(500).send({ error: "Unknown error occurred" });
    }
  }
};

export const getAllAssetMovements = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allAssetMovements = await db.select().from(assetMovements);
    reply.send(allAssetMovements);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error fetching asset movements: ${error.message}`);
      reply.status(500).send({ error: "Failed to fetch asset movements" });
    } else {
      logger.error("An unknown error occurred during asset movement creation");
      reply.status(500).send({ error: "Unknown error occurred" });
    }
  }
};
