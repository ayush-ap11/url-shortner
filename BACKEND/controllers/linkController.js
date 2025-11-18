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

    console.log("Received data:", {
      originalUrl,
      customSlug,
      expiresAt,
      maxClicks,
      domain,
    });

    if (!originalUrl) {
      console.log("❌ Validation failed: Original URL missing");
      return res.status(400).json({ errors: ["Original URL is required"] });
    }

    if (!validator.isURL(originalUrl, { require_protocol: true })) {
      console.log("❌ Validation failed: Invalid URL format");
      return res.status(400).json({
        errors: ["Invalid URL format. Must include http:// or https://"],
      });
    }

    let slug = customSlug?.toLowerCase().trim() || generateSlug();
    console.log("Generated/Custom slug:", slug);

    // check slug exists
    const exists = await Link.findOne({ slug });
    if (exists) {
      console.log("❌ Validation failed: Slug already taken:", slug);
      return res.status(400).json({ errors: ["Slug already taken"] });
    }

    // Parse and validate expiresAt if provided
    let parsedExpiresAt = null;
    if (expiresAt) {
      parsedExpiresAt = new Date(expiresAt);
      console.log("Parsed expiresAt:", parsedExpiresAt);
      if (isNaN(parsedExpiresAt.getTime())) {
        console.log("❌ Validation failed: Invalid expiration date format");
        return res.status(400).json({ errors: ["Invalid expiration date"] });
      }
      // Check if date is in the past
      if (parsedExpiresAt < new Date()) {
        console.log("❌ Validation failed: Expiration date is in the past");
        return res
          .status(400)
          .json({ errors: ["Expiration date must be in the future"] });
      }
    }

    // Validate maxClicks if provided
    let parsedMaxClicks = null;
    if (maxClicks) {
      parsedMaxClicks = parseInt(maxClicks);
      console.log("Parsed maxClicks:", parsedMaxClicks);
      if (isNaN(parsedMaxClicks) || parsedMaxClicks <= 0) {
        console.log("❌ Validation failed: Invalid maxClicks value");
        return res
          .status(400)
          .json({ errors: ["Max clicks must be a positive number"] });
      }
    }

    console.log("✅ All validations passed, creating link...");

    const newLink = await Link.create({
      user: req.userId,
      originalUrl,
      slug,
      domain: domain || "",
      expiresAt: parsedExpiresAt,
      maxClicks: parsedMaxClicks,
    });

    console.log("✅ Link created successfully:", newLink._id);
    res.status(201).json({ link: newLink });
  } catch (err) {
    console.error("Link creation error:", err);
    console.error("Error details:", err.message);
    res.status(500).json({ errors: [err.message || "Server error"] });
  }
};

// Fetch all links for user (with search filter)
exports.getLinks = async (req, res) => {
  try {
    const { search } = req.query;

    console.log("Fetching links for user:", req.userId, "Search:", search);

    let filter = { user: req.userId };

    if (search) {
      const s = new RegExp(search, "i");
      filter.$or = [{ slug: s }, { originalUrl: s }];
    }

    const links = await Link.find(filter).sort({ createdAt: -1 });

    console.log(`Found ${links.length} links for user`);

    // auto check expiry flag
    links.forEach((l) => {
      if (l.checkExpired()) l.isExpired = true;
    });

    res.json({ links });
  } catch (err) {
    console.error("Get links error:", err);
    res.status(500).json({ errors: ["Server error"] });
  }
};

// Edit link
exports.updateLink = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(
      "Update request - ID:",
      id,
      "Body:",
      req.body,
      "User:",
      req.userId
    );

    const link = await Link.findOne({ _id: id, user: req.userId });
    if (!link) {
      console.log("❌ Link not found");
      return res.status(404).json({ errors: ["Link not found"] });
    }
    console.log("Found link:", link.slug);

    const { originalUrl, expiresAt, maxClicks } = req.body;

    if (
      originalUrl &&
      !validator.isURL(originalUrl, { require_protocol: true })
    ) {
      return res
        .status(400)
        .json({ errors: ["Valid URL with protocol required"] });
    }

    // Parse and validate expiresAt if provided
    if (expiresAt !== undefined) {
      if (expiresAt === null || expiresAt === "") {
        link.expiresAt = null;
      } else {
        const parsedDate = new Date(expiresAt);
        if (isNaN(parsedDate.getTime())) {
          return res.status(400).json({ errors: ["Invalid expiration date"] });
        }
        if (parsedDate < new Date()) {
          return res
            .status(400)
            .json({ errors: ["Expiration date must be in the future"] });
        }
        link.expiresAt = parsedDate;
      }
    }

    // Validate maxClicks if provided
    if (maxClicks !== undefined) {
      if (maxClicks === null || maxClicks === "") {
        link.maxClicks = null;
      } else {
        const parsedMaxClicks = parseInt(maxClicks);
        if (isNaN(parsedMaxClicks) || parsedMaxClicks <= 0) {
          return res
            .status(400)
            .json({ errors: ["Max clicks must be a positive number"] });
        }
        link.maxClicks = parsedMaxClicks;
      }
    }

    if (originalUrl) link.originalUrl = originalUrl;

    // Reset isExpired flag and recalculate expiration status
    link.isExpired = false;
    if (link.checkExpired()) {
      link.isExpired = true;
    }

    await link.save();
    console.log("✅ Link updated successfully:", link._id);
    res.json({ link });
  } catch (err) {
    console.error("❌ Update link error:", err);
    console.error("Error details:", err.message);
    res.status(500).json({ errors: [err.message || "Server error"] });
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
