const cron = require("node-cron");
const Entry = require("../../models/Entry");
const { sendUnlockNotification } = require("../emailService");
const User = require("../../models/User");

const setupUnlockNotifier = () => {
  cron.schedule('* * * * *', async () => { 
    console.log("🔄 Checking for unlocked entries...");

    const now = new Date();
    try {
      const entries = await Entry.find({
        unlockAt: { $lte: now },
        isNotified: false,
      }).populate('user'); 

      for (const entry of entries) {
        if (entry.user?.email) {
          await sendUnlockNotification(entry.user.email, entry.title);
          entry.isNotified = true;
          await entry.save();
        }
      }

      console.log(`✅ Unlock Notifier: ${entries.length} entries notified.`);
    } catch (error) {
      console.error("❌ Unlock Notifier Error:", error);
    }
  });
};

module.exports = { setupUnlockNotifier };
