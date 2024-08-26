const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const categorySchema = Schema(
  {
    name: {
      type: String,
      minLength: [3, "panjang minimal 3 karakter"],
      maxLength: [20, "panjang maximal 20 karakter"],
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
