const express = require("express");
const {CameraModel} = require("../models/CameraModel");
const router = express.Router();

router.get("/", async(req, res) => {
    try{
        const data = await CameraModel.find({});
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
  }
    
});

module.exports = router;