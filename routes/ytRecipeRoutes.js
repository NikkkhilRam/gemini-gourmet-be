const express = require("express");
const { generateVideoList } = require("../services/youtubeService");
const router = express.Router();

router.post("/videos", async (req, res) => {
  const { recipe } = req.body;

  try {
    const videosList = await generateVideoList(recipe);
    return res.status(200).json({ videosList });
  } catch (error) {
    res.status(500).json({
      error: "Error generating video list",
    });
  }
});

module.exports = router;
