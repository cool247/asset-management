import { users } from "./Models/user.model";
import { rows } from "./Models/row.model";
import { locations } from "./Models/location.model";
import { racksAndCupboards } from "./Models/rack-cupboard.model";
import { assets, assetTypes } from "./Models/asset.model";
import { assetMovements } from "./Models/asset-movement.model";
import { db } from "./Config/db";

const seed = async () => {
  try {
    console.log("Seeding database...");

    // Users
    await db.insert(users).values([
      { barcodeId: "U001", name: "John Doe" },
      { barcodeId: "U002", name: "Jane Smith" },
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
    await db.insert(assetTypes).values([
      { name: "Laptop" },
      { name: "Monitor" },
    ]);

    // Assets
    await db.insert(assets).values([
      {
        barcodeId: "A001",
        assetTypeId: 1, // Assuming Laptop has id=1
        length: 15,
        quantityInUse: 2,
        totalQty: 10,
        locationId: 1, // Assuming Warehouse 1 has id=1
        dynamicFields: { color: "Black", model: "Dell XPS" },
      },
      {
        barcodeId: "A002",
        assetTypeId: 2, // Assuming Monitor has id=2
        length: 24,
        quantityInUse: 1,
        totalQty: 5,
        locationId: 2, // Assuming Warehouse 2 has id=2
        dynamicFields: { resolution: "4K", brand: "LG" },
      },
    ]);

    // Asset Movements
    await db.insert(assetMovements).values([
      {
        assetId: 1, // Assuming A001 has id=1
        sourceLocationId: 1,
        destinationLocationId: 2,
        rackId: 1, // Assuming RC001 has id=1
        userId: 1, // Assuming John Doe has id=1
        status: "Pending",
        comments: "Move for maintenance",
      },
      {
        assetId: 2, // Assuming A002 has id=2
        sourceLocationId: 2,
        destinationLocationId: 1,
        rackId: 2, // Assuming RC002 has id=2
        userId: 2, // Assuming Jane Smith has id=2
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
