import UrlModel from "../models/shortUrl.js";
import redis from "../libs/redis.js";
export const saveShortUrl = async (shortUrl, urls,userId=null) => {
    const newUrl = new UrlModel({
        full_url: urls,
        short_url: shortUrl,
        shortened_url:process.env.APP_URL + shortUrl,
        user: userId, 
    });

    const key = `urls:${urls.join("|")}:${userId}`;
    await redis.set(key, shortUrl, { ex: 60 * 60 * 24 * 7 });

    await newUrl.save();    
};