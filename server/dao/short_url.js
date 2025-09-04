import UrlModel from "../models/shortUrl.js";

export const saveShortUrl=(shortUrl,url,userId)=>{
    const newUrl=new UrlModel({
        full_url:url,
        short_url:shortUrl,
    })
    if(userId){
        newUrl.user_id=userId
    }
   newUrl.save();    
}


