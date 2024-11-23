import { FastifyReply, FastifyRequest } from "fastify";
import { eq } from "drizzle-orm";
import { db } from "../Config/db";
import { logger } from "../Utils/logger";
import { locations } from "../Models/location.model";
import { CreateLocationInput, LocationIdInput, UpdateLocationInput } from "../Schemas/location.schema";

export const createLocation = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, description } = request.body as CreateLocationInput;
  logger.info(`Creating location with name: ${name}`);

  try {
    const createLocation = await db.insert(locations).values({ name, description }).returning();

    reply.status(201).send(createLocation);
  } catch (error) {
    logger.error(`Error creating location: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to create location" });
  }
};

export const getAllLocations = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allLocations = await db.select().from(locations);
    console.log(allLocations);
    reply.send(allLocations);
  } catch (error) {
    console.log(error);
    logger.error(`Error fetching locations: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to fetch locations" });
  }
};

export const getLocationById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as LocationIdInput;
  try {
    const location = await db.select().from(locations).where(eq(locations.id, id));

    if (location.length === 0) {
      reply.status(404).send({ message: "Location not found" });
    } else {
      reply.send(location);
    }
  } catch (error) {
    logger.error(`Error fetching location by id: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to fetch location" });
  }
};

export const updateLocationById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as LocationIdInput;
  const { name, description } = request.body as UpdateLocationInput;

  try {
    const updatedLocation = await db
      .update(locations)
      .set({ name, description })
      .where(eq(locations.id, id))
      .returning();

    if (updatedLocation.length === 0) {
      reply.status(404).send({ message: "Location not found" });
    } else {
      reply.send(updatedLocation);
    }
  } catch (error) {
    logger.error(`Error updating location by id: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to update location" });
  }
};

export const deleteLocationById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as LocationIdInput;

  try {
    const deletedLocation = await db.delete(locations).where(eq(locations.id, id)).returning();

    if (deletedLocation.length === 0) {
      reply.status(404).send({ message: "Location not found" });
    } else {
      reply.status(200).send({ message: "Location deleted successfully" });
    }
  } catch (error) {
    logger.error(`Error deleting location by id: ${error instanceof Error ? error.message : "Unknown error"}`);
    reply.status(500).send({ message: "Failed to delete location" });
  }
};
