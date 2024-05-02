const express = require('express');
const router = express.Router();
router.get("/imagenes")
router.post("/imagenes/:id")
router.delete("/imagenes:id")

module.exports = router