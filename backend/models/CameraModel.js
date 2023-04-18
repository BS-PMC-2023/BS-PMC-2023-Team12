const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema({
    id:String,
    name:String,
    available:Boolean,
    studentID:Number
});


const CameraModel = mongoose.model("cameras", cameraSchema);

exports.CameraModel = CameraModel;

