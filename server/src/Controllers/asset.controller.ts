import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../Config/db";
import { logger } from "../Utils/logger";
import { eq } from "drizzle-orm";
import { CreateAssetInput, UpdateAssetInput } from "../Schemas";
import { assetItemsTable, assetPropertiesTable, assetPropertyValuesTable, assetsTable } from "../Models";

export const createAssetTypeWithProperties = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, typeId, propertiesAndValues } = request.body as CreateAssetInput;
  logger.info(`Creating Asset with name and items: ${name}  ${JSON.stringify(propertiesAndValues)}`);

  try {
    const result = await db.transaction(async (trx) => {
      const createAsset = await trx.insert(assetsTable).values({ name, typeId, }).returning();

      if (!createAsset.length) {
        throw new Error("Failed to create asset");
      }

      const assetId = createAsset[0].id;
      

      const propertiesAndValuesWithAssetId = propertiesAndValues.map((p) => ({
        propertyId:p.propertyId,
        value:String(p.propertyValue),
        assetId,
      }));

      await trx.insert(assetPropertyValuesTable).values(propertiesAndValuesWithAssetId);

      return createAsset[0];
    });
    reply.status(201).send(result);
  } catch (error) {
    logger.error(`Error creating Asset: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to create Asset" });
  }
};

export const getAllAssets = async (_, reply: FastifyReply) => {
  try {
    // Query the database
    const allAssets = await db
      .select({
        assetId: assetsTable.id,
        assetName: assetsTable.name,
        totalQuantity: assetsTable.totalQuantity,
        usedQuantity: assetsTable.usedQuantity,
        propertyValue: assetPropertyValuesTable.value,
        propertyName: assetPropertiesTable.name,
      })
      .from(assetsTable)
      .innerJoin(assetPropertyValuesTable, eq(assetPropertyValuesTable.assetId, assetsTable.id))
      .innerJoin(assetPropertiesTable, eq(assetPropertiesTable.id, assetPropertyValuesTable.propertyId)); // Fix this join condition

    // Transform the result
    const groupedAssets = Object.values(
      allAssets.reduce((acc, asset) => {
        if (!acc[asset.assetId]) {
          acc[asset.assetId] = {
            assetId: asset.assetId,
            assetName: asset.assetName,
            totalQuantity: asset.totalQuantity,
            usedQuantity: asset.usedQuantity,
            properties: {}, // Initialize properties object
          };
        }

        acc[asset.assetId].properties[asset.propertyName] = asset.propertyValue;

        return acc;
      }, {})
    );

    // Send the transformed result
    reply.send(groupedAssets);
  } catch (error) {
    logger.error(
      `Error fetching assets: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    reply.status(500).send({ message: "Failed to fetch assets" });
  }
};


export const getAssetWithItemsById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };

  try {
    // Fetch the asset type and its properties
    const results = await db
      .select({
        assetId: assetsTable.id,
        assetName: assetsTable.name,
        totalQuantity: assetsTable.totalQuantity,
        usedQuantity: assetsTable.usedQuantity,
        itemsId: assetItemsTable.id,
        barcodeId: assetItemsTable.barcodeId,
        propertyValue:assetPropertyValuesTable.value,
        propertyName:assetPropertiesTable.name,
      })
      .from(assetsTable)
      .innerJoin(assetItemsTable, eq(assetItemsTable.assetId, assetsTable.id))
      .innerJoin(assetPropertyValuesTable, eq(assetPropertyValuesTable.assetId, assetsTable.id))
      .innerJoin(assetPropertiesTable, eq(assetPropertiesTable.typeId, assetsTable.typeId))
      .where(eq(assetsTable.id, id));
      

    if (!results.length) {
      return reply.status(404).send({ message: "Asset not found" });
    }

    const asset = {
      id: results[0].assetId,
      name: results[0].assetName,
      properties: results.map((row) => ({
        id: row.itemsId,
        barcodeId: row.barcodeId,
      })),
    };

    reply.send(asset);
  } catch (error) {
    logger.error(`Error fetching asset by id: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to fetch Asset with item1aGFD name" });
  }
};

export const updateAssetTypeWithItemsById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { name, items } = request.body as UpdateAssetInput;
  try {
    const result = await db.transaction(async (tx) => {
      const updatedAsset = await tx.update(assetsTable).set({ name }).where(eq(assetsTable.id, id)).returning();

      if (updatedAsset.length) {
        return reply.status(404).send({ message: "AssetType not found" });
      }

      const updatedItems = await Promise.all(
        items.map((item) =>
          tx.update(assetItemsTable).set(item).where(eq(assetItemsTable.assetId, item.assetId)).returning(),
        ),
      );

      return { ...updatedAsset[0], items: updatedItems };
    });

    reply.send(result);
  } catch (error) {
    logger.error(`Error updating Asset by id: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to update Asset" });
  }
};

export const deleteAssetById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };

  try {
    const deletedAsset = await db.delete(assetsTable).where(eq(assetsTable.id, id)).returning();

    if (deletedAsset.length === 0) {
      reply.status(404).send({ message: "Asset not found" });
    } else {
      reply.status(200).send({ message: "Asset deleted successfully" });
    }
  } catch (error) {
    logger.error(`Error deleting asset by barcodeId: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to delete asset" });
  }
};
