var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  comment_text: { type: String },
  rate: { type: Number },
  date: { type: Date },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: "tickets",
    required: true,
  },
});

module.exports = mongoose.model("reviews", reviewSchema);
