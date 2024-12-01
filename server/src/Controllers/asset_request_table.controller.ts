import { FastifyReply, FastifyRequest } from "fastify";
import { and, eq, or, sql } from "drizzle-orm";
//
import { db } from "../Config/db";
import { assetRequestTable } from "../Models/asset-request.model";
import { assetsTable } from "../Models/asset.model";
import {
  assetRequestStatusEnum,
  CreateAssetRequestInput,
  UpdateAssetRequestSchema,
} from "../Schemas/assetRequest.schema";
import { usersTable } from "../Models/user.model";
import { alias } from "drizzle-orm/pg-core";

export const createAssetRequest = async (req: FastifyRequest, reply: FastifyReply) => {
  const { assetId, requestedQuantity, requestedRemarks = "" } = req.body as CreateAssetRequestInput;
  const requestedBy = req.jwtPayload.id;
  try {
    const newRequest = await db
      .insert(assetRequestTable)
      .values({
        assetId,
        requestedBy,
        requestedQuantity,
        requestedRemarks,
        status: assetRequestStatusEnum.Values.Pending,
      })
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
    const pendingRequests = await db
      .select({
        requestId: assetRequestTable.id,
        assetId: assetRequestTable.assetId,
        assetName: assetsTable.name,
        requestedBy: assetRequestTable.requestedBy,
        requesterName: usersTable.name,
        approvedBy: assetRequestTable.approvedBy,
        approverName: usersTable.name,
        status: assetRequestTable.status,
        requestedRemarks: assetRequestTable.requestedRemarks,
        approvalRemarks: assetRequestTable.approvalRemarks,
        createdAt: assetRequestTable.createdAt,
      })
      .from(assetRequestTable)
      .leftJoin(assetsTable, eq(assetRequestTable.assetId, assetsTable.id))
      .leftJoin(usersTable, eq(assetRequestTable.requestedBy, usersTable.id))
      .leftJoin(usersTable, eq(assetRequestTable.approvedBy, usersTable.id))
      .where(
        and(
          eq(assetRequestTable.status, assetRequestStatusEnum.Values.Pending),
          eq(assetRequestTable.requestedBy, userId),
        ),
      );

    reply.send(pendingRequests);
  } catch (error) {
    reply.status(500).send({ message: "Failed to fetch requests" });
  }
};

export const getAllMyRequests = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = req.jwtPayload.id;

    const requests = await db.execute(sql`
  SELECT 
    ar.id AS "requestId",
    ar.asset_id AS "assetId",
    a.name AS "assetName",
    ar.requested_quantity AS "requestedQuantity",
    ar.approved_quantity AS "approvedQuantity",
    ar.requested_by AS "requestedBy",
    requester.name AS "requesterName",
    ar.approved_by AS "approvedBy",
    approver.name AS "approverName",
    ar.status AS "status",
    ar.requested_remarks AS "requestedRemarks",
    ar.approval_remarks AS "approvalRemarks",
    ar.created_at AS "createdAt"
  FROM ${assetRequestTable} ar
  LEFT JOIN ${assetsTable} a ON ar.asset_id = a.id
  LEFT JOIN ${usersTable} requester ON ar.requested_by = requester.id
  LEFT JOIN ${usersTable} approver ON ar.approved_by = approver.id
  WHERE ar.requested_by = ${userId}
`);

    reply.send(requests.rows);
  } catch (error) {
    console.log(error);
    reply.status(500).send({ message: "Failed to fetch requests" });
  }
};

export const getAllAssetRequests = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const requests = await db.execute(sql`
      SELECT 
        ar.id AS "requestId",
        ar.asset_id AS "assetId",
        a.name AS "assetName",
        ar.requested_quantity AS "requestedQuantity",
        ar.approved_quantity AS "approvedQuantity",
        ar.requested_by AS "requestedBy",
        requester.name AS "requesterName",
        ar.approved_by AS "approvedBy",
        approver.name AS "approverName",
        ar.status AS "status",
        ar.requested_remarks AS "requestedRemarks",
        ar.approval_remarks AS "approvalRemarks",
        ar.created_at AS "createdAt"
      FROM ${assetRequestTable} ar
      LEFT JOIN ${assetsTable} a ON ar.asset_id = a.id
      LEFT JOIN ${usersTable} requester ON ar.requested_by = requester.id
      LEFT JOIN ${usersTable} approver ON ar.approved_by = approver.id
    `);

    reply.send(requests.rows);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Failed to fetch requests" });
  }
};

export const updateAssetRequestStatus = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: number };
  const { status, approvedQuantity, approvalRemarks } = req.body as UpdateAssetRequestSchema;
  const requestedBy = req.jwtPayload.id;

  try {
    const updatedRequest = await db
      .update(assetRequestTable)
      .set({ requestedBy, status, approvedQuantity, approvalRemarks })
      .where(eq(assetRequestTable.id, id))
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
