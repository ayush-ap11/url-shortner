const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/linkController");

// must be logged in
router.use(auth);

// CRUD
router.post("/create", controller.createLink);
router.get("/all", controller.getLinks);
router.get("/:id", controller.getSingleLink);
router.put("/:id", controller.updateLink);
router.delete("/:id", controller.deleteLink);

module.exports = router;
