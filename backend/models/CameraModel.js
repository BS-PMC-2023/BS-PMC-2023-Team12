const mongoose = require("mongoose");


const cameraSchema = new mongoose.Schema({
    id: { type: String, required: true},
    name: { type: String, required: true},
    available: { type: Boolean, default: true},
    studentID: { type: Number, default: 0}
},
{ versionKey: false }
);


const CameraModel = mongoose.model("cameras", cameraSchema);

exports.CameraModel = CameraModel;



