const Link = require("../models/Link");
const crypto = require("crypto");
const validator = require("validator");

// helper to generate random slug
function generateSlug() {
  return crypto.randomBytes(4).toString("hex").slice(0, 6);
}

// Create new short link
exports.createLink = async (req, res) => {
  try {
    const { originalUrl, customSlug, expiresAt, maxClicks, domain } = req.body;

    if (!originalUrl || !validator.isURL(originalUrl)) {
      return res.status(400).json({ errors: ["Valid original URL required"] });
    }

    let slug = customSlug?.toLowerCase().trim() || generateSlug();

    // check slug exists
    const exists = await Link.findOne({ slug });
    if (exists) return res.status(400).json({ errors: ["Slug already taken"] });

    const newLink = await Link.create({
      user: req.userId,
      originalUrl,
      slug,
      domain: domain || "",
      expiresAt: expiresAt || null,
      maxClicks: maxClicks || null,
    });

    res.status(201).json({ link: newLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Server error"] });
  }
};

// Fetch all links for user (with search filter)
exports.getLinks = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = { user: req.userId };

    if (search) {
      const s = new RegExp(search, "i");
      filter.$or = [{ slug: s }, { originalUrl: s }];
    }

    const links = await Link.find(filter).sort({ createdAt: -1 });

    // auto check expiry flag
    links.forEach((l) => {
      if (l.checkExpired()) l.isExpired = true;
    });

    res.json({ links });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Server error"] });
  }
};

// Edit link
exports.updateLink = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await Link.findOne({ _id: id, user: req.userId });
    if (!link) return res.status(404).json({ errors: ["Link not found"] });

    const { originalUrl, expiresAt, maxClicks } = req.body;

    if (originalUrl && !validator.isURL(originalUrl)) {
      return res.status(400).json({ errors: ["Valid URL required"] });
    }

    if (originalUrl) link.originalUrl = originalUrl;
    if (expiresAt !== undefined) link.expiresAt = expiresAt;
    if (maxClicks !== undefined) link.maxClicks = maxClicks;

    await link.save();
    res.json({ link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Server error"] });
  }
};

// Delete link
exports.deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await Link.findOneAndDelete({ _id: id, user: req.userId });
    if (!link) return res.status(404).json({ errors: ["Link not found"] });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Server error"] });
  }
};

// Single link details (for analytics)
exports.getSingleLink = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await Link.findOne({ _id: id, user: req.userId });
    if (!link) return res.status(404).json({ errors: ["Link not found"] });

    res.json({ link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Server error"] });
  }
};
