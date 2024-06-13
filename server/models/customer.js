// create the schema

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true }, 
 
});

module.exports = mongoose.model("customers", customerSchema);
