import UrlModel from "../models/shortUrl.js";
import redis from "../libs/redis.js";

export const redirectService = async (id) => {
 
  try {
    const key = `short:${id}`;
    console.log(id);
    const cached = await redis.get(key);

    if (cached) {
      try {
        const parsedCache = JSON.parse(cached);
        
        const userId = parsedCache.userId;
        if (userId) {
          const analyticsKey = `analytics:${userId}:${id}`;

          await redis.incr(`${analyticsKey}:totalClicks`);
          await redis.set(
            `${analyticsKey}:lastSeen`,
            new Date().toISOString()
          );

          const today = new Date().toISOString().slice(0, 10);
          let clicksOverTime = await redis.get(`${analyticsKey}:clicksOverTime`);

          try {
            clicksOverTime = clicksOverTime ? JSON.parse(clicksOverTime) : [];
          } catch {
            clicksOverTime = [];
          }

          const todayData = clicksOverTime.find((d) => d.date === today);
          if (todayData) {
            todayData.clicks += 1;
          } else {
            clicksOverTime.push({ date: today, clicks: 1 });
          }

          await redis.set(
            `${analyticsKey}:clicksOverTime`,
            JSON.stringify(clicksOverTime)
          );

        } else {
        }
        return parsedCache;
      } catch (error) {

        await redis.del(key);
      }
    }
    const url = await UrlModel.findOneAndUpdate(
      { short_url: id },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) {
      return null;
    }

    const userId = url.user.toString();
    
    const urlObj = {
      fullUrl: url.full_url,
      clicks: url.clicks,
      shortUrl: url.short_url,
      shortened_url: url.shortened_url,
      userId: userId,
    };

    await redis.set(key, JSON.stringify(urlObj), { ex: 60 * 60 * 24 * 7 });

    const analyticsKey = `analytics:${userId}:${id}`;
    
    await redis.incr(`${analyticsKey}:totalClicks`);
    await redis.set(
      `${analyticsKey}:lastSeen`,
      new Date().toISOString()
    );

    const today = new Date().toISOString().slice(0, 10);
    let clicksOverTime = await redis.get(`${analyticsKey}:clicksOverTime`);

    try {
      clicksOverTime = clicksOverTime ? JSON.parse(clicksOverTime) : [];
    } catch {
      clicksOverTime = [];
    }

    const todayData = clicksOverTime.find((d) => d.date === today);
    if (todayData) {
      todayData.clicks += 1;
    } else {
      clicksOverTime.push({ date: today, clicks: 1 });
    }

    await redis.set(
      `${analyticsKey}:clicksOverTime`,
      JSON.stringify(clicksOverTime)
    );

    const totalClicksCheck = await redis.get(`${analyticsKey}:totalClicks`);

    return urlObj;
  } catch (err) {
    return null;
  }
};