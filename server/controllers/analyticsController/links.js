import UrlModel from "../../models/shortUrl.js";

const sendlinks = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const links = await UrlModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .select('full_url short_url shortened_url clicks createdAt');
   res.status(200).json(links);
    
  } catch (err) {
    console.error("Error in sendlinks:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export default sendlinks;