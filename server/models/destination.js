var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//destination Schema
var destinationSchema = new Schema({
  From: { type: String },
  To: { type: String },
  city: { type: String }
  // ticket: {
  //   type: Schema.Types.ObjectId,
  //   ref: "tickets",
  // },
});

module.exports = mongoose.model("destinations", destinationSchema);
