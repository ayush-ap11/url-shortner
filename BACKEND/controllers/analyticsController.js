const Link = require("../models/Link");
const Analytics = require("../models/Analytics");

exports.getAnalytics = async (req, res) => {
  try {
    const { slug } = req.params;

    console.log("Fetching analytics for slug:", slug, "User:", req.userId);

    const link = await Link.findOne({ slug, user: req.userId });
    if (!link) {
      console.log("❌ Link not found for slug:", slug);
      return res.status(404).json({ errors: ["Link not found"] });
    }

    console.log("Found link:", link._id);

    const analytics = await Analytics.find({ linkId: link._id }).sort({
      date: -1,
    });

    console.log(`Found ${analytics.length} analytics records`);

    return res.json({
      link: {
        _id: link._id,
        originalUrl: link.originalUrl,
        slug: link.slug,
        clicks: link.clicks || 0,
      },
      analytics,
    });
  } catch (err) {
    console.error("Analytics fetch error:", err);
    res.status(500).json({ errors: ["Server error"] });
  }
};
