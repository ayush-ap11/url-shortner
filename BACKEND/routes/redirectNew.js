const express = require("express");
const router = express.Router();
const useragent = require("express-useragent");
const { handleRedirect } = require("../controllers/redirectController");

router.use(useragent.express());

// The actual redirect route:
router.get("/:slug", handleRedirect);

module.exports = router;
