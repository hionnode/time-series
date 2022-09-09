const express = require("express");

const router = express.Router();
const consumeController = require("../../controllers/consume");
const getData = require("../../controllers/getData");
router.get("/status", (req, res) =>
  res.json({
    success: true,
    data: {
      message: "Hospital API up & running.",
    },
  })
);
router.post("/data", consumeController).get("/data/:patientId", getData);
module.exports = router;
