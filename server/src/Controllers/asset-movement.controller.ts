import { FastifyReply, FastifyRequest } from "fastify";
import { and, eq } from "drizzle-orm";
import { db } from "../Config/db";
import { logger } from "../Utils/logger";
import { CreateAssetMovementInput, movementStatusEnum } from "../Schemas/assetMovement.schema";
import { assetMovements } from "../Models/asset-movement.model";
import { assets } from "../Models/asset.model";

export const createAssetMovement = async (request: FastifyRequest, reply: FastifyReply) => {
  const { assetId, from, to, userId, comments, movementType } = request.body as CreateAssetMovementInput;
  console.info(`Cupboard to user asset movement for assetId: ${assetId}, from: ${from} to ${to}`);

  try {
    if (movementType === "cupboardToUser") {
      // validation if asset is present in cupboard

      const movingAsset = await db.select().from(assets).where(eq(assets.barcodeId, assetId));

      if (movingAsset.length === 0) {
        return reply.status(400).send({ message: "Asset is not in the cupboard" });
      }

      if (movingAsset[0].totalQty <= (movingAsset[0].quantityInUse || 0)) {
        return reply.status(400).send({ message: "No Asset left to use " });
      }

      if (movingAsset[0].rackAndCupboardBardCodeId === from) {
        return reply.status(400).send({ message: "Cupboard id is not matching with the asset cupboard id" });
      }

      db.update(assets).set({
        userBardCodeId: userId,
        rackAndCupboardBardCodeId: null,
        quantityInUse: (movingAsset[0]?.quantityInUse || 0) - 1,
      });

      const createAssetMovement = await db
        .insert(assetMovements)
        .values({
          assetId,
          from,
          to:undefined,
          userId,
          status: movementStatusEnum.Values.Pending,
          comments,
        })
        .returning();

      logger.info(
        `Cupboard to user asset movement for assetId: ${assetId}, from: ${from} to ${to} status: ${movementStatusEnum.Values.Pending}`,
      );
      return reply.status(201).send(createAssetMovement);
    }

    if (movementType === "userToRack") {
      // validation if asset is present to user

      const movingAsset = await db
        .select()
        .from(assets)
        .where(and(eq(assets.barcodeId, assetId), eq(assets.userBardCodeId, userId)));

      if (movingAsset.length === 0) {
        return reply.status(400).send({ message: "Asset not found" });
      }

      db.update(assets).set({
        userBardCodeId: null,
        rackAndCupboardBardCodeId: to,
      });

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

      const updateAssetMovement = await db
        .update(assetMovements)
        .set({
          to,
          status: movementStatusEnum.Values.Completed,
          comments,
        })
        .where(eq(assetMovements.id, getAssetMovement[0].id))
        .returning();

      return reply.status(201).send(updateAssetMovement);
    }

    //RETUNING ASSET BACK
    if (movementType === "rackToUser") {
      // validation if asset is present in rack

      const movingAsset = await db.select().from(assets).where(eq(assets.barcodeId, assetId));

      if (movingAsset.length === 0) {
        return reply.status(400).send({ message: "Asset is not in the rack" });
      }

      if (movingAsset[0].rackAndCupboardBardCodeId === from) {
        return reply.status(400).send({ message: "rack id is not matching with the asset rack id" });
      }

      db.update(assets).set({
        userBardCodeId: userId,
        rackAndCupboardBardCodeId: null,
      });

      logger.info(
        `Rack to user asset movement for assetId: ${assetId}, from: ${from} to ${to} status: ${movementStatusEnum.Values.Pending}`,
      );
      const createAssetMovement = await db
        .insert(assetMovements)
        .values({
          assetId,
          from,
          to:undefined,
          userId,
          status: movementStatusEnum.Values.Pending,
          comments,
        })
        .returning();

      return reply.status(201).send(createAssetMovement);
    }

    if (movementType === "userToCupboard") {
      const movingAsset = await db
        .select()
        .from(assets)
        .where(and(eq(assets.barcodeId, assetId), eq(assets.userBardCodeId, userId)));

      if (movingAsset.length === 0) {
        return reply.status(400).send({ message: "Asset not found" });
      }

      db.update(assets).set({
        userBardCodeId: null,
        rackAndCupboardBardCodeId: to,
        quantityInUse: (movingAsset[0]?.quantityInUse || 0) + 1,
      });

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

      const updateAssetMovement = await db
        .update(assetMovements)
        .set({
          to,
          status: movementStatusEnum.Values.Completed,
          comments,
        })
        .where(eq(assetMovements.id, getAssetMovement[0].id))
        .returning();

      return reply.status(201).send(updateAssetMovement);
    }

    logger.info(`movement Type not found, ${movementType}`);
    return reply.status(400).send({ message: "Bad Request" });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error creating asset movement: ${error.message}`);
      reply.status(500).send({ message: "Failed to create asset movement" });
    } else {
      logger.error("An unknown error occurred during asset movement creation");
      reply.status(500).send({ message: "Unknown error occurred" });
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
      reply.status(500).send({ message: "Failed to fetch asset movements" });
    } else {
      logger.error("An unknown error occurred during asset movement creation");
      reply.status(500).send({ message: "Unknown error occurred" });
    }
  }
};

export const getUserAssetMovements = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userBarCodeId = request.jwtPayload.bardCodeId;
    const allAssetMovements = await db.select().from(assetMovements).where(eq(assetMovements.userId, userBarCodeId));
    reply.send(allAssetMovements);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error fetching asset movements: ${error.message}`);
      reply.status(500).send({ message: "Failed to fetch asset movements" });
    } else {
      logger.error("An unknown error occurred during asset movement creation");
      reply.status(500).send({ message: "Unknown error occurred" });
    }
  }
};
