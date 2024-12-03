import { FastifyInstance } from "fastify";
import {
  getAllTransitTransaction,
  getAllPendingTransaction,
  getAllRecentTransaction,
  getAllRecentTransactionByUserId,
  getAllCompletedTransaction,
  getAllTransaction,
  getTransactionStats,
  getAllTransactionByUserId,
  getAllAssetLocationWise,
  getAllAssetRowWise,
  getAllAssetRackWise,
  getAllAssetUerWise
} from "../Controllers/reports.controller";

export const reportRoutes = async (app: FastifyInstance) => {
  app.get("/transaction-stats", getTransactionStats);

  app.get("/transaction/get-all", getAllTransaction);
  app.get("/transaction/get-all-recent", getAllRecentTransaction);

  app.get("/transaction/get-all-recent/:id", getAllRecentTransactionByUserId);
  app.get("/transaction/get-all-by-userid/:id",getAllTransactionByUserId)


  app.get("/transaction/pending", getAllPendingTransaction);
  app.get("/transaction/transit", getAllTransitTransaction);
  app.get("/transaction/completed", getAllCompletedTransaction);
  
  
  app.get("/assets/location-wise", getAllAssetLocationWise);
  app.get("/assets/row-wise", getAllAssetRowWise);
  app.get("/assets/rack-wise", getAllAssetRackWise);
  app.get("/assets/user-wise", getAllAssetUerWise );
  app.get("/assets/InOrOut", getAllAssetUerWise );

};
