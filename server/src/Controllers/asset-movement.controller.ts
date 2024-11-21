import { FastifyReply, FastifyRequest } from "fastify";
import { and, eq } from "drizzle-orm";
import { db } from "../Config/db";
import { logger } from "../Utils/logger";
import { assetMovements } from "../Models/asset-movement.model";
import { CreateAssetMovementInput, movementStatusEnum } from "../Schemas/assetMovement.schema";

export const createAssetMovement = async (request: FastifyRequest, reply: FastifyReply) => {
  const { assetId, from, to, userId, comments, movementType } = request.body as CreateAssetMovementInput["body"];
  try {
    if (movementType === "cupboardToUser") {
      logger.info(
        `Cupboard to user asset movement for assetId: ${assetId}, from: ${from} to ${to} status: ${movementStatusEnum.Values.Completed}`,
      );

      const createAssetMovement = await db
        .insert(assetMovements)
        .values({
          assetId,
          from,
          to,
          userId,
          status: movementStatusEnum.Values.Pending,
          comments,
        })
        .returning();

      reply.status(201).send(createAssetMovement);
    }

    if (movementType === "userToRack") {
      logger.info(
        `User to Rack asset movement for assetId: ${assetId}, from: ${from} to ${to} status: ${movementStatusEnum.Values.Completed}`,
      );
      const getAssetMovement = await db
        .select()
        .from(assetMovements)
        .where(
          and(eq(assetMovements.assetId, assetId), eq(assetMovements.from, from), eq(assetMovements.userId, userId)),
        );

      if (getAssetMovement.length === 0) {
        reply.status(404).send({ message: "Not Found" });
      }

      const createAssetMovement = await db
        .update(assetMovements)
        .set({
          assetId,
          from,
          to,
          userId,
          status: movementStatusEnum.Values.Completed,
          comments,
        })
        .where(eq(assetMovements.id, getAssetMovement[0].id))
        .returning();

      reply.status(201).send(createAssetMovement);
    }

    //RETUNING ASSET BACK
    if (movementType === "rackToUser") {
      logger.info(
        `Rack to user asset movement for assetId: ${assetId}, from: ${from} to ${to} status: ${movementStatusEnum.Values.Pending}`,
      );
      const createAssetMovement = await db
        .insert(assetMovements)
        .values({
          assetId,
          from,
          to,
          userId,
          status: movementStatusEnum.Values.Pending,
          comments,
        })
        .returning();

      reply.status(201).send(createAssetMovement);
    }

    if (movementType === "userToCupboard") {
      logger.info(
        `Rack to user asset movement for assetId: ${assetId}, from: ${from} to ${to} status: ${movementStatusEnum.Values.Completed}`,
      );
      const getAssetMovement = await db
        .select()
        .from(assetMovements)
        .where(
          and(eq(assetMovements.assetId, assetId), eq(assetMovements.from, from), eq(assetMovements.userId, userId)),
        );

      if (getAssetMovement.length === 0) {
        reply.status(404).send({ message: "Not Found" });
      }

      const createAssetMovement = await db
        .update(assetMovements)
        .set({
          assetId,
          from,
          to,
          userId,
          status: movementStatusEnum.Values.Pending,
          comments,
        })
        .where(eq(assetMovements.id, getAssetMovement[0].id))
        .returning();

      reply.status(201).send(createAssetMovement);
    }

    logger.info(`movement Type no found, ${movementType}`);
    reply.status(404).send({ message: "Bad Request" });
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
