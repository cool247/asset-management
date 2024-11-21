import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../Config/db";
import { logger } from "../Utils/logger";
import { rows } from "../Models/row.model";
import { eq } from "drizzle-orm";
import { CreateRowInput, RowIdInput, UpdateRowInput } from "../Schemas/row.schema";

export const createRow = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, description } = request.body as CreateRowInput;

  try {
    const createRow = await db
      .insert(rows)
      .values({
        name,
        description,
      })
      .returning();

    reply.status(201).send(createRow);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error creating row: ${error.message}`);
      reply.status(500).send({ error: "Failed to create row" });
    } else {
      logger.error("An unknown error occurred during row creation");
      reply.status(500).send({ error: "Unknown error occurred" });
    }
  }
};

export const getAllRows = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allRows = await db.select().from(rows);

    reply.send(allRows);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error fetching rows: ${error.message}`);
      reply.status(500).send({ error: "Failed to fetch rows" });
    } else {
      logger.error("An unknown error occurred during row fetching");
      reply.status(500).send({ error: "Unknown error occurred" });
    }
  }
};

export const getRowById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as RowIdInput;

  try {
    const row = await db.select().from(rows).where(eq(rows.id, id));

    if (row.length === 0) {
      return reply.status(404).send({ error: "Row not found" });
    }

    reply.send(row[0]);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error fetching row with ID ${id}: ${error.message}`);
      reply.status(500).send({ error: "Failed to fetch row" });
    } else {
      logger.error("An unknown error occurred during row fetching by ID");
      reply.status(500).send({ error: "Unknown error occurred" });
    }
  }
};

export const updateRowById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as UpdateRowInput["params"];
  const { name, description } = request.body as UpdateRowInput["body"];

  try {
    const updatedRow = await db
      .update(rows)
      .set({
        name,
        description,
      })
      .where(eq(rows.id, id))
      .returning();

    if (updatedRow.length === 0) {
      return reply.status(404).send({ error: "Row not found" });
    }

    reply.send(updatedRow[0]);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error updating row with ID ${id}: ${error.message}`);
      reply.status(500).send({ error: "Failed to update row" });
    } else {
      logger.error("An unknown error occurred during row update");
      reply.status(500).send({ error: "Unknown error occurred" });
    }
  }
};

export const deleteRowById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as RowIdInput;

  try {
    const deletedRow = await db.delete(rows).where(eq(rows.id, id)).returning();

    if (deletedRow.length === 0) {
      return reply.status(404).send({ error: "Row not found" });
    }

    reply.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error deleting row with ID ${id}: ${error.message}`);
      reply.status(500).send({ error: "Failed to delete row" });
    } else {
      logger.error("An unknown error occurred during row deletion");
      reply.status(500).send({ error: "Unknown error occurred" });
    }
  }
};
