// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Import app
const app = require('./app');

// Import database connection function
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// cron for sending email after everymin for those whose entries are unlocked
const { setupUnlockNotifier } = require("./utils/cron/unlockNotifier");
setupUnlockNotifier();


// Define PORT
const PORT = process.env.PORT || 5000;

// Quick test for cloudinary
const cloudinary = require('./config/cloudinary');
console.log(`Cloudinary configured for cloud: ${process.env.CLOUDINARY_CLOUD_NAME}`);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
