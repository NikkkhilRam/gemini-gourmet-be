const fetch = require("node-fetch"); // Make sure to install node-fetch

const dotenv = require("dotenv");
dotenv.config();

const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search?";

const generateVideoList = async (q) => {
  try {
    const response = await fetch(
      `${YOUTUBE_URL}key=${process.env.YOUTUBE_API_KEY}&q=${q}&type=video&part=snippet`
    );

    if (!response.ok) {
      throw new Error(`YouTube API returned status ${response.status}`);
    }

    const data = await response.json();
    const videosList = data.items.map((item) => ({
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
      channelTitle:item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    return videosList;
  } catch (error) {
    console.error("Error fetching videos from YouTube API:", error);
    throw error;
  }
};

module.exports = { generateVideoList };
