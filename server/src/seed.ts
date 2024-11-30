import bcrypt from "bcrypt";

import { db } from "./Config/db";
import {
  assetItemsTable,
  assetPropertiesTable,
  assetPropertyValuesTable,
  assetsTable,
  assetTypesTable,
  locations,
  racksAndCupboards,
  rows,
  usersTable,
} from "./Models";

const allowedTables = ["users", "locations", "rows", "racks_and_cupboards", "asset_types", "assets"];

const hashPassword = async (password: string) => {
  const saltRounds = 10; // You can increase this for higher security (but slower performance)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

async function truncateTable(tableName: string) {
  if (!allowedTables.includes(tableName)) {
    throw new Error(`Table ${tableName} is not allowed to be truncated.`);
  }

  try {
    await db.execute(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`);
    console.log(`Table ${tableName} truncated successfully.`);
  } catch (error) {
    console.error(`Failed to truncate table ${tableName}:`, error);
    throw error;
  }
}

const seed = async () => {
  try {
    console.log("truncating tables...");
    // for await (const table of allowedTables) {
    //   await truncateTable(table);
    // }
    // console.log("truncated all tables");

    // console.log("Seeding database...");
    // // Example usage
    // const p1 = await hashPassword("mobileuser1@123");
    // const p2 = await hashPassword("mobileuser2@123");
    // const p3 = await hashPassword("admin1@123");
    // const p4 = await hashPassword("desktopuser2@123");
    // // Users
    // await db.insert(usersTable).values([
    //   { barcodeId: "U001", name: "John Doe", contactNumber: "9000000001", password: p1 },
    //   { barcodeId: "U002", name: "Jane Smith", password: p2, contactNumber: "9000000002" },
    //   { barcodeId: "U003", name: "Admin", password: p3, contactNumber: "9000000003", role: "admin" },
    //   { barcodeId: "U004", name: "Desktop User", password: p4, contactNumber: "9000000004", role: "desktop_user" },
    // ]);

    // // Rows
    // await db.insert(rows).values([
    //   { name: "Row A", description: "First row" },
    //   { name: "Row B", description: "Second row" },
    // ]);

    // // Locations
    // await db.insert(locations).values([
    //   { name: "Warehouse 1", description: "Main warehouse" },
    //   { name: "Warehouse 2", description: "Secondary warehouse" },
    // ]);

    // // Rack or Cupboards
    // await db.insert(racksAndCupboards).values([
    //   {
    //     barcodeId: "RC001",
    //     rowId: 1, // Assuming Row A has id=1
    //     type: "Rack",
    //     name: "Rack 1",
    //     description: "First rack",
    //   },
    //   {
    //     barcodeId: "RC002",
    //     rowId: 2, // Assuming Row B has id=2
    //     type: "Cupboard",
    //     name: "Cupboard 1",
    //     description: "First cupboard",
    //   },
    // ]);

    // // Asset Types
    // await db.insert(assetTypesTable).values([{ name: "Laptop" }, { name: "Monitor" }]);

    // // Assets Properties
    // await db.insert(assetPropertiesTable).values([
    //   {
    //     id: 1,
    //     typeId: 1,
    //     name: "partNo",
    //     dataType: "String",
    //   },
    //   {
    //     id: 2,
    //     typeId: 1,
    //     name: "Serial Number",
    //     dataType: "String",
    //   },
    // ]);

    // Assets
    // await db.insert(assetsTable).values([
    //   {
    //     id: 1,
    //     typeId: 1,
    //     name: "asset-1",
    //     usedQuantity: 2,
    //     totalQuantity: 10,
    //   },
    //   {
    //     id: 2,
    //     typeId: 1,
    //     name: "asset-2",
    //     usedQuantity: 2,
    //     totalQuantity: 10,
    //   },
    // ]);
    //Asset Item
    await db.insert(assetItemsTable).values([
      {
        assetId: 1,
        barcodeId: "rtyu-7888",
        rackAndCupboardBardCodeId: "RC001",
      },
      {
        assetId: 1,
        barcodeId: "rtyu-7887",
        rackAndCupboardBardCodeId: "RC001",
      },
    ]);

    // Assets Properties Values
    // await db.insert(assetPropertyValuesTable).values([
    //   {
    //     id: 1,
    //     assetId: 1,
    //     propertyId: 1,
    //     value: "aaaa4234",
    //   },
    //   {
    //     id: 2,
    //     assetId: 1,
    //     propertyId: 2,
    //     value: "352354234",
    //   },

    //   {
    //     id: 3,
    //     assetId: 2,
    //     propertyId: 1,
    //     value: "sadsad3423",
    //   },
    //   {
    //     id: 4,
    //     assetId: 2,
    //     propertyId: 2,
    //     value: "864765434",
    //   },
    // ]);

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Run the seed script
seed();
