import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../Config/db";
import { assetsTable } from "../Models";
import { sql } from "drizzle-orm";

export const getTransactionStats = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const totalQuantityResult = await db.select({sumQty: sql<number>`SUM(${assetsTable.totalQuantity})`}).from(assetsTable);
    const totalQuantity = totalQuantityResult[0]?.sumQty || 0;
    reply.send({totalQuantity});
  } catch (error) {
    reply.status(500).send({ message: "Failed to get transaction stats" });
  }
};

export const getAllTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allTransaction = await db.select();
    reply.send(allTransaction);
  } catch (error) {
    reply.status(500).send({ message: "Failed to get all transaction" });
  }
};

export const getAllPendingTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allTransaction = await db.select();
    reply.send(allTransaction);
  } catch (error) {
    reply.status(500).send({ message: "Failed to get all transaction" });
  }
};

export const getAllTransitTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allTransaction = await db.select();
    reply.send(allTransaction);
  } catch (error) {
    reply.status(500).send({ message: "Failed to get all transaction" });
  }
};

export const getAllCompletedTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allTransaction = await db.select();
    reply.send(allTransaction);
  } catch (error) {
    reply.status(500).send({ message: "Failed to get all transaction" });
  }
};



export const getAllRecentTransactionByUserId = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allTransaction = await db.select();
    reply.send(allTransaction);
  } catch (error) {
    reply.status(500).send({ message: "Failed to get all transaction" });
  }
};

export const getAllRecentTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allTransaction = await db.select();
    reply.send(allTransaction);
  } catch (error) {
    reply.status(500).send({ message: "Failed to get all transaction" });
  }
};

export const getAllTransactionByUserId = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allTransaction = await db.select();
    reply.send(allTransaction);
  } catch (error) {
    reply.status(500).send({ message: "Failed to get all transaction" });
  }
};

export const getAllAssetLocationWise = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allTransaction = await db.select();
    reply.send(allTransaction);
  } catch (error) {
    reply.status(500).send({ message: "Failed to get all transaction" });
  }
};

export const getAllAssetRowWise = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allTransaction = await db.select();
    reply.send(allTransaction);
  } catch (error) {
    reply.status(500).send({ message: "Failed to get all transaction" });
  }
};

export const getAllAssetRackWise = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allTransaction = await db.select();
    reply.send(allTransaction);
  } catch (error) {
    reply.status(500).send({ message: "Failed to get all transaction" });
  }
};

export const getAllAssetUerWise = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const allTransaction = await db.select();
    reply.send(allTransaction);
  } catch (error) {
    reply.status(500).send({ message: "Failed to get all transaction" });
  }
};
