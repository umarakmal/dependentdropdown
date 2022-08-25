const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const citySchema = new Schema(
  {
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stat",
    },
    city: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("City", citySchema);
