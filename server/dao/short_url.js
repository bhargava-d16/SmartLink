import UrlModel from "../models/shortUrl.js";

export const saveShortUrl = async (shortUrl, urls, userId) => {
    const newUrl = new UrlModel({
        full_url: urls,
        short_url: shortUrl,
    });
    
    if (userId) {
        newUrl.user = userId;
    }
    
    await newUrl.save();    
};