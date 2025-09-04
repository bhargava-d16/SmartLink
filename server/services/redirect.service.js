import UrlModel from "../models/shortUrl.js";

export const redirectService = async (id) => {
  try {
    const url = await UrlModel.findOneAndUpdate(
      { short_url: id },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (url) {
      return {
        fullUrl: url.full_url,
        clicks: url.clicks,
        shortUrl: url.short_url,
      };
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
