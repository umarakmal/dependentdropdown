const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const statSchema = new Schema(
  {
    regionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },

    state: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Stat", statSchema);
