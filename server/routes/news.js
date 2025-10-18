const express = require("express");
const News = require("../model/News");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the news article.
 *         title:
 *           type: string
 *           description: The title of the news article.
 *         content:
 *           type: string
 *           description: The content of the news article.
 *         category:
 *           type: string
 *           enum: [Tech, Business, Sports, Economy, Finance]
 *           description: The category of the news.
 *         likes:
 *           type: integer
 *           description: Number of likes (default 0).
 *         views:
 *           type: integer
 *           description: Number of views (default 0).
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The creation date of the news.
 */

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Create a new news article
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       201:
 *         description: The news article was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
  try {
    const { title, content, category, likes = 0, views = 0 } = req.body;
    const news = new News({ title, content, category, likes, views, timestamp: new Date() });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

/**
 * @swagger
 * /api/news/trending:
 *   get:
 *     summary: Get trending news (sorted by likes and views)
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Returns the top 5 trending news articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/news/search:
 *   get:
 *     summary: Search news articles by keyword
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query string
 *     responses:
 *       200:
 *         description: Returns matching news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       500:
 *         description: Server error
 */
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(200).json([]);
    }

    const searchResults = await News.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    if (searchResults.length === 0) {
      return res.status(200).json({ message: "No articles found", articles: [] });
    }

    res.json(searchResults);
  } catch (error) {
    console.error("Error searching news:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/trending", async (req, res) => {
  try {
    const trendingNews = await News.aggregate([
      { $addFields: { score: { $add: ["$likes", { $divide: ["$views", 10] }] } } },
      { $sort: { score: -1, timestamp: -1 } },
      { $limit: 5 }
    ]);
    res.json(trendingNews);
  } catch (err) {
    console.error("Error fetching trending news:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

/**
 * @swagger
 * /api/news/{category}:
 *   get:
 *     summary: Get news articles by category
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Tech, Business, Sports, Economy, Finance]
 *         required: true
 *         description: The category of the news
 *     responses:
 *       200:
 *         description: A list of news articles in the given category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       500:
 *         description: Server error
 */
router.get("/:category", async (req, res) => {
  try {
    const news = await News.find({ category: req.params.category }).sort({ timestamp: -1 });
    res.json(news);
  } catch (error) {
    console.error("Error fetching news by category:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
