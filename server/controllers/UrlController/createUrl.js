import UrlModel from "../../models/shortUrl.js";
import { createShortURLwithUser } from "../../services/shorturl.services.js";
import redis from "../../libs/redis.js";

const urlcreate = async (req, res) => {
  try {
    const { urls } = req.body;
    if (!Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "Give valid Urls" });
    }
    
    const userId = req.user?._id || null;
    const isGuest = !userId;
    console.log("User ID:", userId, "Is Guest:", isGuest);
    
    
    const normalizedUrls = [...urls].sort();
  
    if (!isGuest) {
      const redisKey = `urls:${normalizedUrls.join("|")}:${userId}`;
      const cached = await redis.get(redisKey);
      if (cached) {
        console.log("Returning from Redis (authenticated user)");
        return res.status(200).json({
          shortUrl: process.env.APP_URL + cached,
          source: "redis",
        });
      }
    }
    const mongoQuery = {
      full_url: { 
        $all: normalizedUrls,
        $size: normalizedUrls.length 
      }
    };

    if (userId) {
      mongoQuery.user = userId;
    } else {
      mongoQuery.user = { $in: [null, undefined] }; 
    }
    
    const existing = await UrlModel.findOne(mongoQuery);
    
    if (existing) {
      console.log("Returning from MongoDB");
      
      if (!isGuest) {
        const redisKey = `urls:${normalizedUrls.join("|")}:${userId}`;
        await redis.set(redisKey, existing.short_url, { ex: 60 * 60 * 24 * 7 });
      }
      return res.status(200).json({
        shortUrl: process.env.APP_URL + existing.short_url,
        source: "mongodb"
      });
    }
    
    const shortUrl = await createShortURLwithUser(normalizedUrls, userId);
    res.status(201).json({ 
      shortUrl: process.env.APP_URL + shortUrl,
      source: "new"
    });
    
  } catch (err) {
    console.error("Error in urlcreate:", err);
    res.status(500).json({ error: err.message });
  }
};

export default urlcreate;