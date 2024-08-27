const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "name harus diisi"],
    },
    role: {
      type: String,
      default: "-",
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
      required: [true, `image harus diisi`],
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Talent", talentSchema);
