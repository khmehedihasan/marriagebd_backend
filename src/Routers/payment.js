const express = require("express");
const router = express.Router();
const payment = require("../Controllers/payment");

router.post("/:id", payment.addPayment);
router.get("/", payment.getAllPayment);
router.get("/search", payment.searchPayment);
router.get("/:id", payment.getAllPaymentById);
router.delete("/:id", payment.deletePayment);

module.exports = router;
