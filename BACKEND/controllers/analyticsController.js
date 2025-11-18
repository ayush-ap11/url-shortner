const Link = require("../models/Link");
const Analytics = require("../models/Analytics");

exports.getAnalytics = async (req, res) => {
  try {
    const { slug } = req.params;

    const link = await Link.findOne({ slug, user: req.userId });
    if (!link) {
      return res.status(404).json({ errors: ["Link not found"] });
    }

    const analytics = await Analytics.find({ linkId: link._id }).sort({
      date: -1,
    });

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
