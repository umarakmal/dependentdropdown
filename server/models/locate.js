const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const locateSchema = new Schema(
  {
    region: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Locate", locateSchema);
