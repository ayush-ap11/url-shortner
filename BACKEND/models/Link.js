const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  originalUrl: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  domain: { type: String, default: "" }, // optional custom domain

  clicks: { type: Number, default: 0 },
  lastClickedAt: { type: Date },

  // Expiry conditions
  expiresAt: { type: Date, default: null },
  maxClicks: { type: Number, default: null },

  // Status: auto-calculated on check
  isExpired: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

// Computed expiry check
linkSchema.methods.checkExpired = function () {
  if (this.isExpired) return true;

  const now = new Date();

  if (this.expiresAt && now > this.expiresAt) return true;
  if (this.maxClicks && this.clicks >= this.maxClicks) return true;

  return false;
};

module.exports = mongoose.model("Link", linkSchema);
