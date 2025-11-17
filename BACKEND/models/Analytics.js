const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Link",
    required: true,
  },

  date: { type: String, required: true }, // “2025-01-30”
  clicks: { type: Number, default: 0 },

  referrers: [
    {
      name: String,
      count: { type: Number, default: 0 },
    },
  ],

  devices: [
    {
      device: String, // mobile / desktop / tablet
      count: { type: Number, default: 0 },
    },
  ],

  browsers: [
    {
      browser: String,
      count: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Analytics", analyticsSchema);
