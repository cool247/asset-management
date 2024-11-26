import { FastifyReply, FastifyRequest } from "fastify";
import { and, eq } from "drizzle-orm";
//
import { db } from "../Config/db";
import { assetRequestTable } from "../Models/asset_request_table";
import { assets } from "../Models/asset.model";
import { CreateAssetRequestInput, UpdateAssetRequestSchema } from "../Schemas/assetRequest.schema";
import { users } from "../Models/user.model";

export const createAssetRequest = async (req: FastifyRequest, reply: FastifyReply) => {
  const { assetId, userRemarks='' } = req.body as CreateAssetRequestInput;
  const userId = req.jwtPayload.id;
  try {
    const newRequest = await db
      .insert(assetRequestTable)
      .values({ assetId, userId, userRemarks, status: "Pending" })
      .returning();

    reply.status(201).send(newRequest);
  } catch (error) {
    console.log(error);
    reply.status(500).send({ message: "Failed to create request" });
  }
};

export const getAllMyPendingRequests = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = req.jwtPayload.id;
    const requests = await db
      .select({
        requestId: assetRequestTable.id,
        assetId: assetRequestTable.assetId,
        assetName: assets.name,
        userId: assetRequestTable.userId,
        userName: users.name,
        adminId: assetRequestTable.adminId,
        adminName: users.name,
        status: assetRequestTable.status,
        userRemarks: assetRequestTable.userRemarks,
        adminRemarks: assetRequestTable.adminRemarks,
        createdAt:assetRequestTable.createdAt,
      })
      .from(assetRequestTable)
      .innerJoin(assets, eq(assetRequestTable.assetId, assets.id))
      .innerJoin(users, eq(assetRequestTable.userId, users.id))
      .where(and(eq(assetRequestTable.status, "Pending"), eq(assetRequestTable.userId, userId)));
    reply.send(requests);
  } catch (error) {
    reply.status(500).send({ message: "Failed to fetch requests" });
  }
};

export const getAllMyRequests = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = req.jwtPayload.id;
    const requests = await db
      .select({
        requestId: assetRequestTable.id,
        assetId: assetRequestTable.assetId,
        assetName: assets.name,
        userId: assetRequestTable.userId,
        userName: users.name,
        adminId: assetRequestTable.adminId,
        adminName: users.name,
        status: assetRequestTable.status,
        userRemarks: assetRequestTable.userRemarks,
        adminRemarks: assetRequestTable.adminRemarks,
        createdAt:assetRequestTable.createdAt,
      })
      .from(assetRequestTable)
      .innerJoin(assets, eq(assetRequestTable.assetId, assets.id))
      .innerJoin(users, eq(assetRequestTable.userId, users.id))
      .where(eq(assetRequestTable.userId, userId));
    reply.send(requests);
  } catch (error) {
    console.log(error);
    reply.status(500).send({ message: "Failed to fetch requests" });
  }
};

export const getAllAssetRequests = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const requests = await db
      .select({
        requestId: assetRequestTable.id,
        assetId: assetRequestTable.assetId,
        assetName: assets.name,
        userId: assetRequestTable.userId,
        userName: users.name,
        adminId: assetRequestTable.adminId,
        adminName: users.name,
        status: assetRequestTable.status,
        createdAt:assetRequestTable.createdAt,
        userRemarks: assetRequestTable.userRemarks,
        adminRemarks: assetRequestTable.adminRemarks,
      })
      .from(assetRequestTable)
      .innerJoin(assets, eq(assetRequestTable.assetId, assets.id))
      .innerJoin(users, eq(assetRequestTable.userId, users.id));
    reply.send(requests);
  } catch (error) {
    reply.status(500).send({ message: "Failed to fetch requests" });
  }
};

export const updateAssetRequestStatus = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  const { status, adminRemarks } = req.body as UpdateAssetRequestSchema;
  const adminId = req.jwtPayload.id;
  try {
    const updatedRequest = await db
      .update(assetRequestTable)
      .set({ adminId, status, adminRemarks, updatedAt: new Date() })
      .where(eq(assetRequestTable.id, parseInt(id)))
      .returning();

    if (!updatedRequest.length) {
      return reply.status(404).send({ message: "Request not found" });
    }

    reply.status(200).send(updatedRequest);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Failed to update request status" });
  }
};
