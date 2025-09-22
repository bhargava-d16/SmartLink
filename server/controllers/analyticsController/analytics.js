import redis from "../../libs/redis.js";

const analytics = async (req, res) => {
  try {
    const totalClicks = (await redis.get("analytics:totalClicks")) || 0;
    const lastSeen = (await redis.get("analytics:lastSeen")) || null;

    const clicksOverTimeRaw = await redis.get("analytics:clicksOverTime");
    console.log("Raw clicksOverTime data:", clicksOverTimeRaw);
    console.log("Type of clicksOverTimeRaw:", typeof clicksOverTimeRaw);
    
    let clicksOverTime = [];
    
    if (clicksOverTimeRaw) {
      
      if (typeof clicksOverTimeRaw === 'object' && clicksOverTimeRaw !== null) {
        clicksOverTime = Array.isArray(clicksOverTimeRaw) ? clicksOverTimeRaw : [];
      } 
      
      else if (typeof clicksOverTimeRaw === 'string' && clicksOverTimeRaw !== '[object Object]') {
        try {
          clicksOverTime = JSON.parse(clicksOverTimeRaw);
          
          if (!Array.isArray(clicksOverTime)) {
            clicksOverTime = [];
          }
        } catch (parseError) {
          console.error("JSON parse error in analytics:", parseError);
          console.error("Invalid clicksOverTime data:", clicksOverTimeRaw);
       
          await redis.del("analytics:clicksOverTime");
          clicksOverTime = [];
        }
      } else {
        console.error("Invalid clicksOverTime data format:", clicksOverTimeRaw);
        
        await redis.del("analytics:clicksOverTime");
        clicksOverTime = [];
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