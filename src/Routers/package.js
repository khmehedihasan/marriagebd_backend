const express = require("express");
const router = express.Router();
const package = require("../Controllers/package");

// router.post("/", package.addPackage);
router.get("/", package.getAllPackage);
router.get("/:id", package.getSingle);
router.put("/:id", package.updatePackage);
router.get("/search", package.getAllPackage);
// router.get("/:id", package.getAllPaymentById);
// router.delete("/:id", package.deletePayment);

module.exports = router;
