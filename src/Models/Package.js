const mongoose = require("mongoose");

const PackageSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  days: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
});

const Package = mongoose.model("Package", PackageSchema);

module.exports = Package;
