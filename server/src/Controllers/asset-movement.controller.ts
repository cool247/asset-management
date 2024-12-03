import { FastifyReply, FastifyRequest } from "fastify";
import { and, eq } from "drizzle-orm";
import { db } from "../Config/db";
import { logger } from "../Utils/logger";
import { CreateAssetMovementInput, movementStatusEnum, movementTypeEnum } from "../Schemas/assetMovement.schema";
import {
  assetItemsTable,
  assetItemTransactionTable,
  assetMovementTable,
  assetRequestTable,
  assetsTable,
} from "../Models";
// import CustomError from "../Error";
import { assetRequestStatusEnum } from "../Schemas";
import CustomError from "../Error";

export const createAssetMovement = async (request: FastifyRequest, reply: FastifyReply) => {
  const { assetItemBarcodeId, fromLocationBarcodeId, userBarcodeId, movementType } =
    request.body as CreateAssetMovementInput;
  console.info(
    `Cupboard to user asset movement for assetBarCodeId: ${assetItemBarcodeId}, from: ${fromLocationBarcodeId}`
  );

  const { id: userId } = request.jwtPayload;

  try {
    const result = await db.transaction(async (trx) => {
      if (movementType === movementTypeEnum.Values.cupboardToUser) {
        // Fetch asset, request, and check
        const assetData = await trx
          .select({
            requestId: assetRequestTable.id,
            approvedQuantity: assetRequestTable.approvedQuantity,
            assetId: assetsTable.id,
            movedQuantity: assetMovementTable.movedQuantity,
            assetItemBarcodeId:assetItemsTable.barcodeId
          })
          .from(assetsTable)
          .innerJoin(assetItemsTable, eq(assetsTable.id, assetItemsTable.assetId))
          .innerJoin(assetRequestTable, eq(assetRequestTable.assetId, assetItemsTable.assetId))
          .leftJoin(assetMovementTable, eq(assetMovementTable.requestId, assetRequestTable.id))
          .where(
            and(
              eq(assetRequestTable.requestedBy, userId),
              eq(assetRequestTable.status, assetRequestStatusEnum.Values.Approved),
            )
          );

          
          const assetObj = assetData.find(ad=> ad.assetItemBarcodeId === assetItemBarcodeId);
          if (!assetObj) {
            throw new CustomError("Invalid user, not approved, or asset barcodeId mismatch");
          }

        // Validate moved quantity
        const currentMovedQuantity = assetObj.movedQuantity || 0;
        if (currentMovedQuantity >= (assetObj.approvedQuantity || 0)) {
          throw new CustomError("Allowed quantity exceeded");
        }

        // Insert transaction for asset movement
        await trx.insert(assetItemTransactionTable).values({
          movedAt: new Date(),
          fromLocationBarcodeId: fromLocationBarcodeId,
          requestId: assetObj.requestId,
          assetItemBarcodeId: assetItemBarcodeId,
          movementType: movementTypeEnum.Values.cupboardToUser,
        });

        if (currentMovedQuantity === 0) {
          // Create initial asset movement record
          await trx.insert(assetMovementTable).values({
            assetId: assetObj.assetId,
            requestId: assetObj.requestId,
            userBarCodeId: userBarcodeId,
            startedAt: new Date(),
            movedQuantity: 1,
            status: "Pending",
          });
        } else {
          // Update existing movement record
          await trx
            .update(assetMovementTable)
            .set({
              movedQuantity: currentMovedQuantity + 1,
              startedAt: new Date(),
              status: "Pending",
            })
            .where(eq(assetMovementTable.requestId, assetObj.requestId));
        }

        return { message: "Moved successfully" };
      } else {
        throw new CustomError("Unsupported movement type");
      }
    });

    reply.send(result);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error creating asset movement: ${error.message}`);
      reply.status(500).send({ message: "Failed to create asset movement", details: error.message });
    } else {
      logger.error("An unknown error occurred during asset movement creation");
      reply.status(500).send({ message: "Unknown error occurred" });
    }
  }
};


// can u improve my query because it has too many round trip but i also neeed validation







 // if (movementType === "userToRack") {
      //   // validation if asset is present to user

      //   const movingAsset = await db
      //     .select()
      //     .from(assetsTable)
      //     .where(and(eq(assetsTable.barcodeId, assetBarCodeId), eq(assetsTable.userBarCodeId, userBarCodeId)));

      //   if (movingAsset.length === 0) {
      //     return reply.status(400).send({ message: "Asset not found" });
      //   }

      //   db.update(assetsTable).set({
      //     userBarCodeId: null,
      //     rackAndCupboardBardCodeId: to,
      //   });

      //   logger.info(
      //     `User to Rack asset movement for assetBarCodeId: ${assetBarCodeId}, from: ${from} to ${to} status: ${movementStatusEnum.Values.Completed}`,
      //   );
      //   const getAssetMovement = await db
      //     .select()
      //     .from(assetMovements)
      //     .where(
      //       and(
      //         eq(assetMovements.assetBarCodeId, assetBarCodeId),
      //         eq(assetMovements.from, from),
      //         eq(assetMovements.userBarCodeId, userBarCodeId),
      //       ),
      //     );

      //   if (getAssetMovement.length === 0) {
      //     return reply.status(404).send({ message: "Not Found" });
      //   }

      //   const updateAssetMovement = await db
      //     .update(assetMovements)
      //     .set({
      //       to,
      //       status: movementStatusEnum.Values.Completed,
      //       comments,
      //     })
      //     .where(eq(assetMovements.id, getAssetMovement[0].id))
      //     .returning();

      //   return reply.status(201).send(updateAssetMovement);
      // }

      // //RETUNING ASSET BACK
      // if (movementType === "rackToUser") {
      //   // validation if asset is present in rack

      //   const movingAsset = await db.select().from(assetsTable).where(eq(assetsTable.barcodeId, assetBarCodeId));

      //   if (movingAsset.length === 0) {
      //     return reply.status(400).send({ message: "Asset is not in the rack" });
      //   }

      //   if (movingAsset[0].rackAndCupboardBardCodeId === from) {
      //     return reply.status(400).send({ message: "rack id is not matching with the asset rack id" });
      //   }

      //   const assetRequest = await db
      //     .select()
      //     .from(assetRequestTable)
      //     .where(and(eq(assetRequestTable.userId, userId), eq(assetRequestTable.status, "Pending")));

      //   if (assetRequest.length <= 0) {
      //     return reply
      //       .status(400)
      //       .send({ message: "Asset is not requested or it is in pending status, please consult to the admin" });
      //   }

      //   db.update(assetsTable).set({
      //     userBarCodeId,
      //     rackAndCupboardBardCodeId: null,
      //   });

      //   logger.info(
      //     `Rack to user asset movement for assetBarCodeId: ${assetBarCodeId}, from: ${from} to ${to} status: ${movementStatusEnum.Values.Pending}`,
      //   );
      //   const createAssetMovement = await db
      //     .insert(assetMovements)
      //     .values({
      //       assetBarCodeId,
      //       from,
      //       to: null,
      //       userBarCodeId,
      //       status: movementStatusEnum.Values.Pending,
      //       comments,
      //     })
      //     .returning();

      //   return reply.status(201).send(createAssetMovement);
      // }

      // if (movementType === "userToCupboard") {
      //   const movingAsset = await db
      //     .select()
      //     .from(assetsTable)
      //     .where(and(eq(assetsTable.barcodeId, assetBarCodeId), eq(assetsTable.userBarCodeId, userBarCodeId)));

      //   if (movingAsset.length === 0) {
      //     return reply.status(400).send({ message: "Asset not found" });
      //   }

      //   db.update(assetsTable).set({
      //     userBarCodeId: null,
      //     rackAndCupboardBardCodeId: to,
      //     quantityInUse: (movingAsset[0]?.quantityInUse || 0) + 1,
      //   });

      //   logger.info(
      //     `Rack to user asset movement for assetBarCodeId: ${assetBarCodeId}, from: ${from} to ${to} status: ${movementStatusEnum.Values.Completed}`,
      //   );
      //   const getAssetMovement = await db
      //     .select()
      //     .from(assetMovements)
      //     .where(
      //       and(
      //         eq(assetMovements.assetBarCodeId, assetBarCodeId),
      //         eq(assetMovements.from, from),
      //         eq(assetMovements.userBarCodeId, userBarCodeId),
      //       ),
      //     );

      //   if (getAssetMovement.length === 0) {
      //     return reply.status(404).send({ message: "Not Found" });
      //   }

      //   const updateAssetMovement = await db
      //     .update(assetMovements)
      //     .set({
      //       to,
      //       status: movementStatusEnum.Values.Completed,
      //       comments,
      //     })
      //     .where(eq(assetMovements.id, getAssetMovement[0].id))
      //     .returning();

      //   return reply.status(201).send(updateAssetMovement);
      // }

      // logger.info(`movement Type not found, ${movementType}`);



// export const getAllAssetMovements = async (request: FastifyRequest, reply: FastifyReply) => {
//   try {
//     const allAssetMovements = await db.select().from(assetMovements);
//     reply.send(allAssetMovements);
//   } catch (error) {
//     if (error instanceof Error) {
//       logger.error(`Error fetching asset movements: ${error.message}`);
//       reply.status(500).send({ message: "Failed to fetch asset movements" });
//     } else {
//       logger.error("An unknown error occurred during asset movement creation");
//       reply.status(500).send({ message: "Unknown error occurred" });
//     }
//   }
// };

// export const getUserAssetMovements = async (request: FastifyRequest, reply: FastifyReply) => {
//   try {
//     const userBarCodeId = request.jwtPayload.bardCodeId;
//     const allAssetMovements = await db
//       .select()
//       .from(assetMovements)
//       .where(eq(assetMovements.userBarCodeId, userBarCodeId));
//     reply.send(allAssetMovements);
//   } catch (error) {
//     if (error instanceof Error) {
//       logger.error(`Error fetching asset movements: ${error.message}`);
//       reply.status(500).send({ message: "Failed to fetch asset movements" });
//     } else {
//       logger.error("An unknown error occurred during asset movement creation");
//       reply.status(500).send({ message: "Unknown error occurred" });
//     }
//   }
// };
