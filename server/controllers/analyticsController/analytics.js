import redis from "../../libs/redis.js";

const analytics = async (req, res) => {
  const { linkId } = req.params; 

  const userId = req.user?._id?.toString();
  console.log(linkId)
  const actualLinkId = linkId || req.params.id || req.params.shortId || req.params.urlId;
  
  if (!actualLinkId) {
    return res.status(400).json({ message: "Link ID parameter is missing" });
  }
  
  const analyticsKey = `analytics:${userId}:${actualLinkId}`;

  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const totalClicks =
      (await redis.get(`${analyticsKey}:totalClicks`)) || 0;
    const lastSeen = (await redis.get(`${analyticsKey}:lastSeen`)) || null;

    const clicksOverTimeRaw = await redis.get(
      `${analyticsKey}:clicksOverTime`
    );
    let clicksOverTime = [];

    if (clicksOverTimeRaw) {
      if (typeof clicksOverTimeRaw === "string") {
        try {
          clicksOverTime = JSON.parse(clicksOverTimeRaw);
          if (!Array.isArray(clicksOverTime)) clicksOverTime = [];
        } catch (err) {
          console.error("Failed to parse clicksOverTime:", err);
          clicksOverTime = [];
          await redis.del(`${analyticsKey}:clicksOverTime`);
        }
      } else {
        clicksOverTime = [];
        await redis.del(`${analyticsKey}:clicksOverTime`);
      }
    }

    res.status(200).json({
      totalClicks: parseInt(totalClicks),
      lastSeen,
      clicksOverTime,
    });
  } catch (err) {
    console.error("Error in analytics controller:", err);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};

export default analytics;