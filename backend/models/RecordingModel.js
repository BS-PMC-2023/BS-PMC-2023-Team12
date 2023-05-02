const mongoose = require("mongoose");

const recordingSchema = new mongoose.Schema({
    id:String,
    name:String,
    available:Boolean,
    studentID:Number
});


const RecordingModel = mongoose.model("recording", recordingSchema);

exports.RecordingModel = RecordingModel;

