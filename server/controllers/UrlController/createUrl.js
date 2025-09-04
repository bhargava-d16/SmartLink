import UrlModel from "../../models/shortUrl.js";
import { createShortURLwithoutUser } from "../../services/shorturl.services.js";

const urlcreate = async (req, res) => {
  try {
    const { urls } = req.body;
    if (!Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "Give valid Urls" });
    }

    const existing = await UrlModel.findOne({
      full_url: { $all: urls }
    });
    
    if (existing) {
      return res.status(200).json({
        shortUrl: process.env.APP_URL + existing.short_url,
      });
    }

    const shortUrl = await createShortURLwithoutUser(urls);
    res.send({ shortUrl: process.env.APP_URL + shortUrl });
  } catch (err) {
    console.log(err);
    res.status(404).json(err.message);
  }
};

export default urlcreate;