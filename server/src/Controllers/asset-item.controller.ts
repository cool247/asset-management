import { FastifyReply, FastifyRequest } from "fastify";
import { eq } from "drizzle-orm";
import { db } from "../Config/db";
import { logger } from "../Utils/logger";
import { CreateAssetItemInput, UpdateAssetItemInput } from "../Schemas/asset-item.schema";
import { assetItemsTable } from "../Models/asset-Item.model";

export const createAssetItem = async (request: FastifyRequest, reply: FastifyReply) => {
  const { assetId, barcodeId, rackAndCupboardBardCodeId } = request.body as CreateAssetItemInput;
  logger.info(`Creating asset Item  with ${assetId} ${barcodeId} ${rackAndCupboardBardCodeId}`);

  try {
    const createAssetItem = await db
      .insert(assetItemsTable)
      .values({ assetId, barcodeId,  rackAndCupboardBardCodeId })
      .returning();

    reply.status(201).send(createAssetItem);
  } catch (error) {
    logger.error(`Error creating Asset-Item: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to create Asset Item" });
  }
};

export const getAssetItemsByAssetId = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  try {
    const allAssets = await db.select().from(assetItemsTable).where(eq(assetItemsTable.assetId, id));
    reply.send(allAssets);
  } catch (error) {
    console.log(error);
    logger.error(`Error fetching Asset-items by assetId: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to fetch Asset-items by assetId" });
  }
};

export const updateAssetItemById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { barcodeId, currentUserId, rackAndCupboardBardCodeId } = request.body as UpdateAssetItemInput;

  try {
    const updatedAssetItem = await db
      .update(assetItemsTable)
      .set({ barcodeId, currentUserId, rackAndCupboardBardCodeId })
      .where(eq(assetItemsTable.id, id))
      .returning();

    if (updatedAssetItem.length === 0) {
      reply.status(404).send({ message: "asset Items not found" });
    } else {
      reply.send(updatedAssetItem);
    }
  } catch (error) {
    logger.error(`Error updating asset item by id: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to update asset item" });
  }
};

export const deleteAssetItemById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };

  try {
    const deletedAssetItem = await db.delete(assetItemsTable).where(eq(assetItemsTable.id, id)).returning();

    if (deletedAssetItem.length === 0) {
      reply.status(404).send({ message: "asset item not found" });
    } else {
      reply.status(200).send({ message: "asset item deleted successfully" });
    }
  } catch (error) {
    logger.error(`Error deleting asset item by id: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to delete location" });
  }
};
