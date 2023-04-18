const express = require("express");
const {CameraModel} = require("../models/CameraModel");
const router = express.Router();

router.get("/", async(req, res) => {
    let data = await CameraModel.find({});
    res.json(data);
    
});

module.exports = router;