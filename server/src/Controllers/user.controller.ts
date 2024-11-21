import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../Config/db";

import { eq } from "drizzle-orm";

import { users } from "../Models/user.model";
import { logger } from "../Utils/logger";

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, barcodeId }: { name: string; barcodeId: string } = request.body as { name: string; barcodeId: string };
  logger.info(name);
  const createUser = await db.insert(users).values({ name, barcodeId }).returning();
  reply.send(createUser);
};

export const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const allUsers = await db.select().from(users);
  reply.send(allUsers);
};

export const getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: { id: number } = request.params as { id: number }; // Ensure id is a number

  try {
    const getUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    if (getUser.length === 0) {
      return reply.status(404).send({ message: 'User not found' });
    }

    reply.send(getUser[0]); // Send the single user retrieved
  } catch (error) {
    reply.status(500).send({ message: 'An error occurred while fetching the user', error });
  }
}

export const updateUserById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: { id: number } = request.params as { id: number }; // Ensure id is a number
  const { newName }: { newName: string } = request.body as { newName: string };

  try {
    const updateUser = await db
      .update(users)
      .set({ name: newName })
      .where(eq(users.id, id)) // Pass id as a number
      .returning();

    if (updateUser.length === 0) {
      return reply.status(404).send({ message: 'User not found' });
    }

    reply.send(updateUser);
  } catch (error) {
    reply.status(500).send({ message: 'An error occurred', error });
  }
};

export const deleteUserById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: { id: number } = request.params as { id: number }; // Ensure id is a number

  try {
    const deleteUser = await db
      .delete(users)
      .where(eq(users.id, id)) // Use id for the where condition
      .returning();

    if (deleteUser.length === 0) {
      return reply.status(404).send({ message: 'User not found' });
    }

    reply.send(deleteUser);
  } catch (error) {
    reply.status(500).send({ message: 'An error occurred', error });
  }
};
