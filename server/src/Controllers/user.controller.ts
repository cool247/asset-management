import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../Config/db";

import { eq } from "drizzle-orm";

import { usersTable } from "../Models/user.model";
import { CreateUserInput, UpdateUserInput, UserIdInput } from "../Schemas/user.schema";

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, barcodeId, role, contactNumber, password } = request.body as CreateUserInput;

  try {
    const createUser = await db.insert(usersTable).values({ name, barcodeId, role, contactNumber, password }).returning();

    reply.status(201).send(createUser);
  } catch (error) {
    reply.status(500).send({ message: "An error occurred", error });
  }
};

export const getAllUsers = async (_, reply: FastifyReply) => {
  const allUsers = await db.select().from(usersTable);
  reply.send(allUsers);
};

export const getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const getUser = await db.select().from(usersTable).where(eq(usersTable.id, id));

  if (getUser.length === 0) {
    return reply.status(404).send({ message: "User not found" });
  }

  reply.send(getUser[0]);
};

export const updateUserById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as UserIdInput;
  const { newName, role, contactNumber } = request.body as UpdateUserInput;

  try {
    const updateUser = await db
      .update(usersTable)
      .set({ name: newName, role, contactNumber }) // Update all fields
      .where(eq(usersTable.id, id))
      .returning();

    if (updateUser.length === 0) {
      return reply.status(404).send({ message: "User not found" });
    }

    reply.send(updateUser);
  } catch (error) {
    reply.status(500).send({ message: "An error occurred", error });
  }
};

export const deleteUserById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as UserIdInput;

  try {
    const deleteUser = await db.delete(usersTable).where(eq(usersTable.id, id)).returning();

    if (deleteUser.length === 0) {
      return reply.status(404).send({ message: "User not found" });
    }

    reply.send(deleteUser);
  } catch (error) {
    reply.status(500).send({ message: "An error occurred", error });
  }
};
