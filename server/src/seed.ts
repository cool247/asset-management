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
    // console.log("truncating tables...");
    // for await (const table of allowedTables) {
    //   await truncateTable(table);
    // }
    // console.log("truncated all tables");

    console.log("Seeding database...");
    // Example usage
    const p1 = await hashPassword("Admin@123");
  
    // Users
    await db.insert(usersTable).values([
      { barcodeId: "U001", name: "John Doe", contactNumber: "9000000001", password: p1,role:'desktop_user' },
      { barcodeId: "U003", name: "Admin", password: p1, contactNumber: "9000000002", role: "admin" },
    ]);

    // Locations
    await db.insert(locations).values([
      { name: "Warehouse 1", description: "Main warehouse" },
      { name: "Warehouse 2", description: "Secondary warehouse" },
    ]);

    // Rows
    await db.insert(rows).values([
      { name: "Row A", description: "First row",locationId:1 },
      { name: "Row B", description: "Second row",locationId:1 },
      { name: "Row C", description: "Second row",locationId:1 },
    ]);

    // Rack or Cupboards
    await db.insert(racksAndCupboards).values([
      {
        barcodeId: "Rack-001",
        rowId: 1, // Assuming Row A has id=1
        type: "Rack",
        name: "Rack 1",
        description: "First rack",
      },
      {
        barcodeId: "Rack-002",
        rowId: 1,
        type: "Rack",
        name: "Rack 2",
        description: "Second rack",
      },
      {
        barcodeId: "Rack-003",
        rowId: 2,
        type: "Rack",
        name: "Rack 3",
        description: "Third rack",
      },
      {
        barcodeId: "Rack-004",
        rowId: 2,
        type: "Rack",
        name: "Rack 4",
        description: "Fourth rack",
      },
      {
        barcodeId: "Rack-005",
        rowId: 3,
        type: "Rack",
        name: "Rack 5",
        description: "Fifth rack",
      },
      {
        barcodeId: "Cupboard-001",
        rowId: 3,
        type: "Cupboard",
        name: "Cupboard 1",
        description: "First cupboard",
      },
      {
        barcodeId: "Cupboard-002",
        rowId: 1,
        type: "Cupboard",
        name: "Cupboard 2",
        description: "Second cupboard",
      },
      {
        barcodeId: "Cupboard-003",
        rowId: 1,
        type: "Cupboard",
        name: "Cupboard 3",
        description: "Third cupboard",
      },
      {
        barcodeId: "Cupboard-004",
        rowId: 2,
        type: "Cupboard",
        name: "Cupboard 4",
        description: "Fourth cupboard",
      },
      {
        barcodeId: "Cupboard-005",
        rowId: 2,
        type: "Cupboard",
        name: "Cupboard 5",
        description: "Fifth cupboard",
      },
    ]);
    
    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Run the seed script
seed();
