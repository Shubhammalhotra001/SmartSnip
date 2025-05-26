
// const express = require('express');
// const router = express.Router();
// const axios = require('axios');
// const Bookmark = require('../models/bookmark');
// const jwt = require('jsonwebtoken');

// // Middleware to verify token and get user ID
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// // Helper to extract metadata (very basic)
// const getMetadata = async (url) => {
//   try {
//     const response = await axios.get(url);
//     const html = response.data;

//     const titleMatch = html.match(/<title>(.*?)<\/title>/i);
//     const title = titleMatch ? titleMatch[1] : url;

//     const domain = new URL(url).origin;
//     const favicon = `${domain}/favicon.ico`;

//     return { title, favicon };
//   } catch (error) {
//     console.error('Metadata error:', error.message);
//     return { title: url, favicon: '' };
//   }
// };
// const cleanSummary = (raw) => {
//   const cleaned = raw
//     .split('\n')
//     .filter(line =>
//       line.trim() &&
//       !line.startsWith('[') &&
//       !line.startsWith('![') &&
//       !line.toLowerCase().includes('sign in') &&
//       !line.toLowerCase().includes('sign up') &&
//       !line.toLowerCase().includes('open in app') &&
//       !line.toLowerCase().includes('sitemap') &&
//       !line.toLowerCase().includes('redirect=') &&
//       !line.toLowerCase().includes('favicon')
//     )
//     .join(' ');

//   // Split into sentences using regex
//   const sentences = cleaned.match(/[^.!?]+[.!?]/g) || [];

//   // Take first 10 sentences for ~10 lines
//   return sentences.slice(0, 10).join(' ').trim();
// };



// // POST /api/bookmarks
// router.post('/', authMiddleware, async (req, res) => {
//   const { url } = req.body;

//   if (!url) return res.status(400).json({ message: 'URL is required' });

//   try {
//     const { title, favicon } = await getMetadata(url);

//     // Call Jina AI summarizer
//     const jinaUrl = `https://r.jina.ai/${encodeURIComponent(url)}`;
//     const jinaResponse = await axios.get(jinaUrl);
//     const rawSummary = jinaResponse.data.slice(0, 5000); // limit summary length
//     const summary = cleanSummary(rawSummary);

//     const bookmark = new Bookmark({
//       userId: req.userId,
//       url,
//       title,
//       favicon,
//       summary,
//     });

//     await bookmark.save();
//     res.status(201).json({ message: 'Bookmark saved', bookmark });
//   } catch (error) {
//     console.error('Error saving bookmark:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // DELETE /api/bookmarks/:id
// router.delete('/:id', authMiddleware, async (req, res) => {
//   const bookmarkId = req.params.id;
//   const userId = req.userId;

//   try {
//     const deleted = await Bookmark.findOneAndDelete({
//       _id: bookmarkId,
//       userId: userId,
//     });

//     if (!deleted) {
//       return res.status(404).json({ message: 'Bookmark not found or unauthorized' });
//     }

//     res.json({ message: 'Bookmark deleted successfully' });
//   } catch (error) {
//     console.error('Delete error:', error.message);
//     res.status(500).json({ message: 'Server error while deleting bookmark' });
//   }
// });

// // GET /api/bookmarks - Get all bookmarks for the logged-in user
// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const bookmarks = await Bookmark.find({ userId: req.userId }).sort({ createdAt: -1 });
//     res.json({ bookmarks });
//   } catch (error) {
//     console.error('Fetch error:', error.message);
//     res.status(500).json({ message: 'Server error while fetching bookmarks' });
//   }
// });




// module.exports = router;
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Bookmark = require('../models/bookmark');
const jwt = require('jsonwebtoken');
const cheerio = require('cheerio');

// Middleware to verify token and get user ID
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Helper to extract metadata using cheerio
const getMetadata = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('title').text() || url;
    let favicon = $('link[rel="icon"]').attr('href') ||
                  $('link[rel="shortcut icon"]').attr('href');

    if (favicon && !favicon.startsWith('http')) {
      const domain = new URL(url).origin;
      favicon = domain + favicon;
    }

    if (!favicon) {
      const domain = new URL(url).origin;
      favicon = `${domain}/favicon.ico`;
    }

    return { title, favicon };
  } catch (error) {
    console.error('Metadata error:', error.message);
    return { title: url, favicon: '' };
  }
};

// Summary cleaner
const cleanSummary = (raw) => {
  const cleaned = raw
    .split('\n')
    .filter(line =>
      line.trim() &&
      !line.startsWith('[') &&
      !line.startsWith('![') &&
      !line.toLowerCase().includes('sign in') &&
      !line.toLowerCase().includes('sign up') &&
      !line.toLowerCase().includes('open in app') &&
      !line.toLowerCase().includes('sitemap') &&
      !line.toLowerCase().includes('redirect=') &&
      !line.toLowerCase().includes('favicon')
    )
    .join(' ');

  const sentences = cleaned.match(/[^.!?]+[.!?]/g) || [];
  return sentences.slice(0, 10).join(' ').trim();
};

// POST /api/bookmarks
router.post('/', authMiddleware, async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ message: 'URL is required' });

  try {
    const { title, favicon } = await getMetadata(url);

    // Try fetching summary from Jina AI
    let summary = '';
    try {
      const jinaUrl = `https://r.jina.ai/${encodeURIComponent(url)}`;
      const jinaResponse = await axios.get(jinaUrl);
      const rawSummary = jinaResponse.data.slice(0, 5000);
      summary = cleanSummary(rawSummary);
    } catch (err) {
      console.warn(`Jina summary failed for ${url}:`, err.message);
      summary = 'Summary could not be generated for this link.';
    }

    if (!summary) {
      summary = 'No summary available.';
    }

    const bookmark = new Bookmark({
      userId: req.userId,
      url,
      title,
      favicon,
      summary,
    });

    await bookmark.save();
    res.status(201).json({ message: 'Bookmark saved', bookmark });
  } catch (error) {
    console.error('Error saving bookmark:', error.message);
    res.status(500).json({ message: 'Server error while saving bookmark' });
  }
});

// DELETE /api/bookmarks/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  const bookmarkId = req.params.id;
  const userId = req.userId;

  try {
    const deleted = await Bookmark.findOneAndDelete({
      _id: bookmarkId,
      userId: userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Bookmark not found or unauthorized' });
    }

    res.json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error.message);
    res.status(500).json({ message: 'Server error while deleting bookmark' });
  }
});

// GET /api/bookmarks
router.get('/', authMiddleware, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ bookmarks });
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ message: 'Server error while fetching bookmarks' });
  }
});

module.exports = router;
