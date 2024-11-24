import { users } from "./Models/user.model";
import { rows } from "./Models/row.model";
import bcrypt from "bcrypt";
import { locations } from "./Models/location.model";
import { racksAndCupboards } from "./Models/rack-cupboard.model";
import { assets, assetTypes } from "./Models/asset.model";
import { assetMovements } from "./Models/asset-movement.model";
import { db } from "./Config/db";

const allowedTables = ["users", "locations", "rows", "racks_and_cupboards", "asset_types", "assets", "asset_movements"];

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
    for await (const table of allowedTables) {
      await truncateTable(table);
    }
    console.log("truncated all tables");

    console.log("Seeding database...");
    // Example usage
    const p1 = await hashPassword("mobileuser1@123");
    const p2 = await hashPassword("mobileuser2@123");
    const p3 = await hashPassword("admin1@123");
    const p4 = await hashPassword("desktopuser2@123");
    // Users
    await db.insert(users).values([
      { barcodeId: "U001", name: "John Doe", contactNumber: "9000000001", password: p1 },
      { barcodeId: "U002", name: "Jane Smith", password: p2, contactNumber: "9000000002" },
      { barcodeId: "U003", name: "Admin", password: p3, contactNumber: "9000000003", role: "admin" },
      { barcodeId: "U004", name: "Desktop User", password: p4, contactNumber: "9000000004", role: "desktop_user" },
    ]);

    // Rows
    await db.insert(rows).values([
      { name: "Row A", description: "First row" },
      { name: "Row B", description: "Second row" },
    ]);

    // Locations
    await db.insert(locations).values([
      { name: "Warehouse 1", description: "Main warehouse" },
      { name: "Warehouse 2", description: "Secondary warehouse" },
    ]);

    // Rack or Cupboards
    await db.insert(racksAndCupboards).values([
      {
        barcodeId: "RC001",
        rowId: 1, // Assuming Row A has id=1
        type: "Rack",
        name: "Rack 1",
        description: "First rack",
      },
      {
        barcodeId: "RC002",
        rowId: 2, // Assuming Row B has id=2
        type: "Cupboard",
        name: "Cupboard 1",
        description: "First cupboard",
      },
    ]);

    // Asset Types
    await db.insert(assetTypes).values([{ name: "Laptop" }, { name: "Monitor" }]);

    // Assets
    await db.insert(assets).values([
      {
        barcodeId: "A001",
        assetTypeId: 1,
        name: "asset-1",
        length: 15,
        quantityInUse: 2,
        totalQty: 10,
        userBarCodeId: "U001",
        dynamicFields: { color: "Black", model: "Dell XPS" },
      },
      {
        barcodeId: "A002",
        assetTypeId: 2,
        length: 24,
        name: "asset-2",
        quantityInUse: 1,
        totalQty: 5,
        rackAndCupboardBardCodeId: "RC001",
        dynamicFields: { resolution: "4K", brand: "LG" },
      },
    ]);

    // Asset Movements
    await db.insert(assetMovements).values([
      {
        assetBarCodeId: "A001",
        from: "RC001",
        to: null,
        userBarCodeId: "U001",
        status: "Pending",
        comments: "Move for maintenance",
      },
      {
        assetBarCodeId: "A002",
        from: "RC002",
        to: "RC001",
        userBarCodeId: "U002",
        status: "Completed",
        comments: "Relocation to main warehouse",
      },
    ]);

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Run the seed script
seed();
