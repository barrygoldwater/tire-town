// src/lib/inventory.js
// Auto-generated from Affordable Tires June 2026 catalog.
// Inventory data is split across submodules to keep each file manageable.
// To edit a product, find it in the appropriate submodule.

import wheels from "./inventoryWheels";
import tiresGolf from "./inventoryTiresGolf";
import tiresTurf from "./inventoryTiresTurf";
import tiresIndustrial from "./inventoryTiresIndustrial";
import accessories from "./inventoryAccessories";

const inventory = {
  site: "Affordable Tires",
  tagline: "Wholesale Golf Cart, Turf, Specialty, Industrial, and Trailer Tires & Wheels",
  wheels,
  tires: [...tiresGolf, ...tiresTurf, ...tiresIndustrial],
  accessories,
};

export default inventory;