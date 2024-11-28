import { FastifyReply, FastifyRequest } from "fastify";
import { eq } from "drizzle-orm";
import { db } from "../Config/db";
import { logger } from "../Utils/logger";
import { assetTypesTable } from "../Models/asset-type.model";
import { CreateAssetTypeWithPropertiesInput,UpdateAssetTypeWithPropertiesInput  } from "../Schemas/asset-type.schema";
import { assetPropertiesTable } from "../Models/asset-property.model";

export const createAssetTypeWithProperties = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, properties } = request.body as CreateAssetTypeWithPropertiesInput;
  logger.info(`Creating AssetType with name and properties: ${name} ${JSON.stringify(properties)}`);

  try {
    const result = await db.transaction(async (trx) => {
      // Step 1: Insert the asset type
      const createAssetType = await trx
        .insert(assetTypesTable)
        .values({ name })
        .returning();

      if (!createAssetType.length) {
        throw new Error("Failed to create asset type");
      }

      const assetTypeId = createAssetType[0].id;

      // Step 2: Insert the properties, associating them with the new asset type
      const propertiesWithTypeId = properties.map((property) => ({
        ...property,
        typeId: assetTypeId, // Associate each property with the created asset type
      }));

      const createProperties = await trx
        .insert(assetPropertiesTable)
        .values(propertiesWithTypeId)
        .returning();

      // Return both results
      return { assetType: createAssetType[0], properties: createProperties };
    });

    // Send success response
    reply.status(201).send(result);
  } catch (error) {
    logger.error(`Error creating AssetType: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to create AssetType" });
  }
};

export const getAllAssetTypes = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allAssetTypes = await db.select().from(assetTypesTable);
    reply.send(allAssetTypes);
  } catch (error) {
    console.log(error);
    logger.error(`Error fetching AssetTypes: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to fetch AssetTypes" });
  }
};

export const getAssetTypeWithPropertiesById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };


  try {
    // Fetch the asset type and its properties
    const results = await db
      .select({
        assetTypeId: assetTypesTable.id,
        assetTypeName: assetTypesTable.name,
        propertyId: assetPropertiesTable.id,
        propertyName: assetPropertiesTable.name,
        propertyDataType: assetPropertiesTable.dataType,
        propertyIsRequired: assetPropertiesTable.isRequired,
      })
      .from(assetTypesTable)
      .innerJoin(assetPropertiesTable, eq(assetTypesTable.id, assetPropertiesTable.typeId))
      .where(eq(assetTypesTable.id, id));

    // Handle no results
    if (results.length) {
      return reply.status(404).send({ message: "AssetType not found" });
    }

    // Group properties under the asset type
    const assetType = {
      id: results[0].assetTypeId,
      name: results[0].assetTypeName,
      properties: results.map((row) => ({
        id: row.propertyId,
        name: row.propertyName,
        dataType: row.propertyDataType,
        isRequired: row.propertyIsRequired,
      })),
    };

    reply.send(assetType);
  } catch (error) {
    logger.error(`Error fetching AssetType by id: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to fetch AssetType with Property name" });
  }
};

export const updateAssetTypeWithPropertiesById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { name, properties } = request.body as UpdateAssetTypeWithPropertiesInput;
  try {
    const result = await db.transaction(async (tx) => {
      // Update asset type
      const updatedAssetType = await tx
        .update(assetTypesTable)
        .set({ name })
        .where(eq(assetTypesTable.id, id))
        .returning();

      if (updatedAssetType.length === 0) {
        return reply.status(404).send({ message: "AssetType not found" });
      }

      // Update asset properties
      const updatedProperties = await Promise.all(
        properties.map((property) =>
          tx
            .update(assetPropertiesTable)
            .set({
              name: property.name,
              dataType: property.dataType,
              isRequired: property.isRequired,
            })
            .where(eq(assetPropertiesTable.typeId, property.typeId))
            .returning(),
        ),
      );

      return { ...updatedAssetType[0], properties:updatedProperties };
    });

    reply.send(result);
  } catch (error) {
    logger.error(`Error updating AssetType by id: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to update AssetType" });
  }
};

export const deleteAssetTypeById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };

  try {
    const deletedAssetType = await db
      .delete(assetTypesTable)
      .where(eq(assetTypesTable.id, id))
      .returning();

    if (deletedAssetType.length === 0) {
      reply.status(404).send({ message: "AssetType not found" });
    } else {
      reply.status(200).send({ message: "AssetType and its related properties deleted successfully" });
    }
  } catch (error) {
    logger.error(
      `Error deleting AssetType by id: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    reply.status(500).send({ message: "Failed to delete AssetType" });
  }
};
