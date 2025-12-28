import cron from "node-cron";
import axios from "axios";

const URL = process.env.SERVER_URL ;

export const keepServerAlive = () => {
  // Runs every 10 minutes
  cron.schedule("*/10 * * * *", async () => {
    console.log("⏳ Cron Ping Running - keeping server awake");

    try {
      await axios.get(URL);
      console.log("🟢 Server pinged successfully");
    } catch (err) {
      console.log("🔴 Ping failed:", err.message);
    }
  });
};
