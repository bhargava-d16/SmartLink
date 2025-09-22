import UrlModel from "../models/shortUrl.js";
import redis from "../libs/redis.js";

export const redirectService = async (id) => {
  try {
    const key = `short:${id}`;
    const cached = await redis.get(key);

    if (cached) {
      console.log("Cached data:", cached);
      console.log("Type of cached:", typeof cached);
      if (typeof cached === 'object' && cached !== null) {
        return cached;
      }
      if (typeof cached === 'string' && cached !== '[object Object]') {
        try {
          return JSON.parse(cached);
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          console.error("Cached data that failed to parse:", cached);
          await redis.del(key);
        }
      } else {
        console.error("Invalid cached data:", cached);
        await redis.del(key);
      }
    }

    const url = await UrlModel.findOneAndUpdate(
      { short_url: id },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) return null;

    const urlObj = {
      fullUrl: url.full_url,
      clicks: url.clicks,
      shortUrl: url.short_url,
    };

    console.log("URL object to cache:", urlObj);

    await redis.set(key, JSON.stringify(urlObj), { ex: 60 * 60 * 24 * 7 });

    await redis.incr("analytics:totalClicks");
    await redis.set("analytics:lastSeen", new Date().toISOString());

    const today = new Date().toISOString().slice(0, 10);
    let clicksOverTime = await redis.get("analytics:clicksOverTime");
    
    try {
      clicksOverTime = clicksOverTime ? JSON.parse(clicksOverTime) : [];
    } catch (parseError) {
      console.error("Error parsing clicksOverTime:", parseError);
      clicksOverTime = [];
    }

    const todayData = clicksOverTime.find((d) => d.date === today);
    if (todayData) {
      todayData.clicks += 1;
    } else {
      clicksOverTime.push({ date: today, clicks: 1 });
    }

    await redis.set("analytics:clicksOverTime", JSON.stringify(clicksOverTime));
    return urlObj;
  } catch (err) {
    console.error("Error in redirectService:", err);
    return null;
  }
};