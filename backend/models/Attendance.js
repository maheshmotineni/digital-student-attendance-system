const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student:{ type: mongoose.Schema.Types.ObjectId, ref:"User",required:true },
  subject:{ type: mongoose.Schema.Types.ObjectId, ref:"Subject" , required:true},
  status:{ type:String, enum:["Present","Absent"],required:true },
  method:{ type:String, enum:["manual","qr","face"],default:"manual" },
  location:{ latitude:Number, longitude:Number },
  date:{ type:Date, default:Date.now }
},{timestamps:true}
);

module.exports = mongoose.model("Attendance", attendanceSchema);