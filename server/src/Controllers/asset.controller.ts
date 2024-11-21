import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../Config/db";
import { logger } from "../Utils/logger";
import { assets } from "../Models/asset.model";
import { eq } from "drizzle-orm";
import { AssetIdInput, CreateAssetInput, UpdateAssetInput } from "../Schemas/asset.schema";

export const createAsset = async (request: FastifyRequest, reply: FastifyReply) => {
  const { barcodeId, assetTypeId, length, quantityInUse, totalQty, locationId, dynamicFields } =
    request.body as CreateAssetInput;

  logger.info(`Creating asset with barcodeId: ${barcodeId}`);

  try {
    const createAsset = await db
      .insert(assets)
      .values({
        barcodeId,
        assetTypeId,
        length,
        quantityInUse,
        totalQty,
        locationId,
        dynamicFields,
      })
      .returning();

    reply.status(201).send(createAsset);
  } catch (error) {
    logger.error(`Error creating asset: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ error: "Failed to create asset" });
  }
};

export const getAllAssets = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allAssets = await db.select().from(assets);
    reply.send(allAssets);
  } catch (error) {
    logger.error(`Error fetching assets: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ error: "Failed to fetch assets" });
  }
};

export const getAssetById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as AssetIdInput;

  try {
    const asset = await db.select().from(assets).where(eq(assets.id, id));

    if (asset.length === 0) {
      reply.status(404).send({ error: "Asset not found" });
    } else {
      reply.send(asset);
    }
  } catch (error) {
    logger.error(`Error fetching asset by id: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ error: "Failed to fetch asset" });
  }
};

export const updateAssetById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as AssetIdInput;
  const { barcodeId, assetTypeId, length, quantityInUse, totalQty, locationId, dynamicFields } =
    request.body as UpdateAssetInput;

  try {
    const updatedAsset = await db
      .update(assets)
      .set({
        barcodeId,
        assetTypeId,
        length,
        quantityInUse,
        totalQty,
        locationId,
        dynamicFields,
      })
      .where(eq(assets.id, id))
      .returning();

    if (updatedAsset.length === 0) {
      reply.status(404).send({ error: "Asset not found" });
    } else {
      reply.send(updatedAsset);
    }
  } catch (error) {
    logger.error(`Error updating asset by id: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ error: "Failed to update asset" });
  }
};

export const deleteAssetById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as AssetIdInput;

  try {
    const deletedAsset = await db.delete(assets).where(eq(assets.id, id)).returning();

    if (deletedAsset.length === 0) {
      reply.status(404).send({ error: "Asset not found" });
    } else {
      reply.status(200).send({ message: "Asset deleted successfully" });
    }
  } catch (error) {
    logger.error(`Error deleting asset by barcodeId: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ error: "Failed to delete asset" });
  }
};
