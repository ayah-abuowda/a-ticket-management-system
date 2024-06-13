var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
  ticket_id: { type: String, unique: true },
  price: { type: Number },
  time: { type: Date },
  destination: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "destinations",
      rquired: true,
    },
  },
  review: { type: Schema.Types.ObjectId, ref: "reviews" },
});

module.exports = mongoose.model("tickets", ticketSchema);