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
import CustomError from "../Error";

export const createAssetRequest = async (req: FastifyRequest, reply: FastifyReply) => {
  const { assetId, requestedQuantity, requestedRemarks = "" } = req.body as CreateAssetRequestInput;
  const requestedBy = req.jwtPayload.id;
  try {
    const result = await db.transaction(async (trx) => {
      const assetObj = await trx.select().from(assetsTable).where(eq(assetsTable.id, assetId)).limit(1);

      if (!assetObj.length) {
        throw new CustomError("No asset found to create request for");
      }

      const availableQuantity = assetObj[0].totalQuantity - assetObj[0].usedQuantity;

      if (requestedQuantity > availableQuantity) {
        throw new CustomError("Requested qty should be less than " + availableQuantity);
      }

      const newRequest = await trx
        .insert(assetRequestTable)
        .values({
          assetId,
          requestedBy,
          requestedQuantity,
          requestedRemarks,
          status: assetRequestStatusEnum.Values.Pending,
        })
        .returning();

      return newRequest;
    });

    reply.status(201).send(result);
  } catch (error) {
    console.log(error);
    if (error instanceof CustomError) {
      reply.status(error.code).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Failed to create request" });
    }
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
  const { status, approvedQuantity = 0, approvalRemarks } = req.body as UpdateAssetRequestSchema;
  const approvedBy = req.jwtPayload.id;
  let qty = approvedQuantity;

  if (status === "Rejected") {
    qty = 0;
  }

  try {
    const result = await db.transaction(async (trx) => {
      const assetRequestObj = await trx.select().from(assetRequestTable).where(eq(assetRequestTable.id, id));
      if (!assetRequestObj.length) {
        throw new CustomError("No Request found for this Id");
      }

      if (approvedQuantity > assetRequestObj[0].requestedQuantity) {
        throw new CustomError("Approval qty should be less than " + assetRequestObj[0].requestedQuantity);
      }

      const updatedRequest = await db
        .update(assetRequestTable)
        .set({ approvedBy, status, approvedQuantity: qty, approvalRemarks })
        .where(eq(assetRequestTable.id, id))
        .returning();

      if (!updatedRequest.length) {
        return reply.status(404).send({ message: "No Request found for this Id" });
      }
    });

    reply.status(200).send(result);
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      reply.status(error.code).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Failed to Approve/Reject request" });
    }
  }
};
