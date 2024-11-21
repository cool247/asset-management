import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../Config/db";
import { logger } from "../Utils/logger";
import { eq } from "drizzle-orm";
import { racksAndCupboards } from "../Models/rack-cupboard.model";
import { CreateRackOrCupboardInput,  UpdateRackOrCupboardInput } from "../Schemas/rack-cupboard.schema";

export const createRackOrCupboard = async (request: FastifyRequest, reply: FastifyReply) => {
  const { barcodeId, rowId, type, name, description } = request.body as CreateRackOrCupboardInput;

  logger.info(`Creating rack or cupboard: ${name}`);

  try {
    const createRackOrCupboard = await db
      .insert(racksAndCupboards)
      .values({
        barcodeId,
        rowId,
        type,
        name,
        description,
      })
      .returning();

    reply.status(201).send(createRackOrCupboard);
  } catch (error) {
    logger.error(`Error creating rack or cupboard: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ error: "Failed to create rack or cupboard" });
  }
};

export const getAllRacksAndCupboards = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allRacksAndCupboards = await db.select().from(racksAndCupboards);
    reply.send(allRacksAndCupboards);
  } catch (error) {
    logger.error(`Error fetching racks and cupboards: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ error: "Failed to fetch racks and cupboards" });
  }
};

export const getRackOrCupboardById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as  UpdateRackOrCupboardInput["params"];

  try {
    const rackOrCupboard = await db.select().from(racksAndCupboards).where(eq(racksAndCupboards.id, id));

    if (rackOrCupboard.length === 0) {
      return reply.status(404).send({ error: "Rack or cupboard not found" });
    }

    reply.send(rackOrCupboard[0]);
  } catch (error) {
    logger.error(`Error fetching rack or cupboard by ID: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ error: "Failed to fetch rack or cupboard by ID" });
  }
};

export const updateRackOrCupboardById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as  UpdateRackOrCupboardInput["params"];
  const { barcodeId, rowId, type, name, description } = request.body as UpdateRackOrCupboardInput["body"];

  try {
    const updatedRackOrCupboard = await db
      .update(racksAndCupboards)
      .set({
        barcodeId,
        rowId,
        type,
        name,
        description,
      })
      .where(eq(racksAndCupboards.id, id))
      .returning();

    if (updatedRackOrCupboard.length === 0) {
      return reply.status(404).send({ error: "Rack or cupboard not found" });
    }

    reply.send(updatedRackOrCupboard[0]);
  } catch (error) {
    logger.error(`Error updating rack or cupboard: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ error: "Failed to update rack or cupboard" });
  }
};

export const deleteRackOrCupboardById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as  UpdateRackOrCupboardInput["params"];

  try {
    const deletedRackOrCupboard = await db.delete(racksAndCupboards).where(eq(racksAndCupboards.id, id)).returning();

    if (deletedRackOrCupboard.length === 0) {
      return reply.status(404).send({ error: "Rack or cupboard not found" });
    }

    reply.send({ message: "Rack or cupboard deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting rack or cupboard: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ error: "Failed to delete rack or cupboard" });
  }
};
