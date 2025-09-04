import { redirectService } from "../../services/redirect.service.js";

const getUrl = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log(id);
    const urlobj = await redirectService(id);

    if (!urlobj) {
      return res.status(404).json({ message: "URL not found" });
    }
    console.log(urlobj)
    res.json(urlobj);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default getUrl;
