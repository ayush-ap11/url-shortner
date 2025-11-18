const validator = require("validator");
const crypto = require("crypto");

/**
 * Generate random 6-character slug
 */
exports.generateSlug = () => {
  return crypto.randomBytes(4).toString("hex").slice(0, 6);
};

/**
 * Validate URL with protocol requirement
 */
exports.validateUrl = (url) => {
  if (!url) {
    return { valid: false, error: "Original URL is required" };
  }
  if (!validator.isURL(url, { require_protocol: true })) {
    return {
      valid: false,
      error: "Invalid URL format. Must include http:// or https://",
    };
  }
  return { valid: true };
};

/**
 * Parse and validate expiration date
 */
exports.parseExpiresAt = (expiresAt) => {
  if (!expiresAt) return { valid: true, value: null };

  const parsedDate = new Date(expiresAt);
  if (isNaN(parsedDate.getTime())) {
    return { valid: false, error: "Invalid expiration date" };
  }
  if (parsedDate < new Date()) {
    return { valid: false, error: "Expiration date must be in the future" };
  }
  return { valid: true, value: parsedDate };
};

/**
 * Parse and validate max clicks
 */
exports.parseMaxClicks = (maxClicks) => {
  if (!maxClicks) return { valid: true, value: null };

  const parsed = parseInt(maxClicks);
  if (isNaN(parsed) || parsed <= 0) {
    return { valid: false, error: "Max clicks must be a positive number" };
  }
  return { valid: true, value: parsed };
};

/**
 * Check if slug is available
 */
exports.checkSlugAvailability = async (Link, slug) => {
  const exists = await Link.findOne({ slug });
  return !exists;
};

/**
 * Update link expiration status
 */
exports.refreshExpirationStatus = (link) => {
  link.isExpired = false;
  if (link.checkExpired()) {
    link.isExpired = true;
  }
};
