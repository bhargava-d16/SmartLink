import UrlModel from "../../models/shortUrl.js";
import { createShortURLwithoutUser } from "../../services/shorturl.services.js";

const urlcreate = async (req, res) => {
  try {
    const { url } = req.body;
    const existing = await UrlModel.findOne({ full_url: url });
    if (existing) {
      return res.status(200).json({
        shortUrl: process.env.APP_URL + existing.short_url,
      });
    }

    const shortUrl = await createShortURLwithoutUser(url);
    res.send({ shortUrl: process.env.APP_URL + shortUrl });
  } catch (err) {
    console.log(err);
    res.status(404).json(err.message);
  }
};
export default urlcreate;
