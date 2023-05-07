const express = require("express");
const { RecordingModel } = require("../models/RecordingModel");
const router = express.Router();

router.get("/", async(req, res) => {
    try{
        const data = await RecordingModel.find({});
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
  }
    
});

module.exports = router;