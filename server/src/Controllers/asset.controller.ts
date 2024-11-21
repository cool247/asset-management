import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../Config/db"; // Assuming you have a DB config
import { logger } from "../Utils/logger"; // Assuming you have a logger utility
import { assets } from "../Models/asset.model"; // Import your assets model
import { eq } from "drizzle-orm"; // For comparison in queries

export const createAsset = async (request: FastifyRequest, reply: FastifyReply) => {
  const {
    barcodeId,
    assetTypeId,
    length,
    quantityInUse,
    totalQty,
    locationId,
    dynamicFields,
  }: {
    barcodeId: string;
    assetTypeId: number;
    length: number | null;
    quantityInUse: number;
    totalQty: number;
    locationId: number;
    dynamicFields: Record<string, any> | null; // assuming dynamic fields are JSONB
  } = request.body as {
    barcodeId: string;
    assetTypeId: number;
    length: number | null;
    quantityInUse: number;
    totalQty: number;
    locationId: number;
    dynamicFields: Record<string, any> | null;
  };

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
  const { id }: { id: number } = request.params as { id: number };

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
  const { id }: { id: number } = request.params as { id: number };
  const {
    assetTypeId,
    length,
    quantityInUse,
    totalQty,
    locationId,
    dynamicFields,
  }: {
    assetTypeId?: number;
    length?: number | null;
    quantityInUse?: number;
    totalQty?: number;
    locationId?: number;
    dynamicFields?: Record<string, any> | null;
  } = request.body as {
    assetTypeId?: number;
    length?: number | null;
    quantityInUse?: number;
    totalQty?: number;
    locationId?: number;
    dynamicFields?: Record<string, any> | null;
  };

  try {
    const updatedAsset = await db
      .update(assets)
      .set({
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
  const { id }: { id: number } = request.params as { id: number };

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
