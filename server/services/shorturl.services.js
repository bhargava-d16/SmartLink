import { saveShortUrl } from "../dao/short_url.js";
import generateNanoid from "../libs/generatenanoid.js";
import UrlModel from "../models/shortUrl.js";

export const createShortURLwithoutUser=async(url)=>{
     const shortUrl=await generateNanoid(7);
     saveShortUrl(shortUrl,url);
     return shortUrl
}

// export const createShortURLwithUser=async(url)=>{
//      const shortUrl=await generateNanoid(7);
//      saveShortUrl(shortUrl,url,userId);
//      return shortUrl
// }