import UrlModel from "../../models/shortUrl.js"

const getUrl=async(req,res)=>{
     const {id}=req.params()
     const url=await UrlModel.findOne({short_url:id})
     if(url){
        res.redirect(url.full_url)
     }else{
        res.status(404).json("Not found");
     }


}

export default getUrl