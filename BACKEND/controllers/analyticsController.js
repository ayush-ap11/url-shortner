const Link = require("../models/Link");
const Analytics = require("../models/Analytics");

exports.getAnalytics = async (req, res) => {
  try {
    const { slug } = req.params;

    const link = await Link.findOne({ slug });
    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }

    const analytics = await Analytics.find({ linkId: link._id }).sort({
      date: 1,
    });

    return res.json({
      link: {
        originalUrl: link.originalUrl,
        slug: link.slug,
        clickCount: link.clickCount,
      },
      analytics,
    });
  } catch (err) {
    console.error("Analytics fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
