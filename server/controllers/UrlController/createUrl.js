import {nanoid} from "nanoid"
import UrlModel from "../../models/shortUrl.js";
const urlcreate=(req,res)=>{
    const {url}=req.body;
    const shortUrl=nanoid(7);
    const newUrl=new UrlModel({
        full_url:url,
        short_url:shortUrl,
    })
    newUrl.save();
    res.send(nanoid(7));
}
export default urlcreate;