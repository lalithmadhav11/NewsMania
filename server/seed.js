const mongoose = require('mongoose');
const News = require('./model/News');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect("mongodb+srv://anudeepmuppalla:CHDO7PTR1GASyj57@macdb.h0a5i.mongodb.net/?retryWrites=true&w=majority&appName=nm")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Expanded Dummy News Data (30+ articles across various categories)
const newsData = [
  // Entertainment News
  { title: "Marvel Announces New Superhero Franchise", content: "Marvel Studios reveals plans for a groundbreaking new superhero series.", category: "Entertainment", author: "Sarah Johnson", readTime: 4, likes: 450, views: 5500, timestamp: new Date('2025-01-15') },
  { title: "Taylor Swift's New Album Breaks Records", content: "Pop star's latest release becomes fastest-selling album of 2025.", category: "Entertainment", author: "Mike Chen", readTime: 3, likes: 380, views: 4800, timestamp: new Date('2025-01-20') },
  { title: "Hollywood's Biggest Night: Oscar Winners 2025", content: "Complete coverage of the Academy Awards ceremony.", category: "Entertainment", author: "Rachel Adams", readTime: 6, likes: 290, views: 3900, timestamp: new Date('2025-02-01') },

  // Health News
  { title: "Breakthrough in Cancer Treatment Research", content: "Scientists develop new immunotherapy approach.", category: "Health", author: "Dr. James Wilson", readTime: 7, likes: 320, views: 4200, timestamp: new Date('2025-01-10') },
  { title: "Global Mental Health Summit 2025", content: "World leaders address rising mental health concerns.", category: "Health", author: "Emma Thompson", readTime: 5, likes: 280, views: 3600, timestamp: new Date('2025-01-25') },
  { title: "New Study Links Diet to Longevity", content: "Research reveals impact of Mediterranean diet on lifespan.", category: "Health", author: "Dr. Maria Garcia", readTime: 4, likes: 260, views: 3400, timestamp: new Date('2025-02-05') },

  // Science News
  { title: "NASA's Mars Mission Makes Historic Discovery", content: "Evidence of ancient microbial life found on Mars.", category: "Science", author: "Dr. Robert Lee", readTime: 8, likes: 400, views: 5200, timestamp: new Date('2025-01-12') },
  { title: "Quantum Computing Breakthrough", content: "Scientists achieve quantum supremacy milestone.", category: "Science", author: "Dr. Lisa Chen", readTime: 6, likes: 350, views: 4600, timestamp: new Date('2025-01-28') },
  { title: "Climate Change: New Global Temperature Record", content: "Scientists report unprecedented global warming trends.", category: "Science", author: "John Martinez", readTime: 5, likes: 310, views: 4100, timestamp: new Date('2025-02-08') },

  // Politics News
  { title: "Historic UN Climate Agreement Reached", content: "World leaders commit to aggressive climate action.", category: "Politics", author: "David Brown", readTime: 7, likes: 280, views: 3800, timestamp: new Date('2025-01-14') },
  { title: "Major Political Reform Bill Passes", content: "Congress approves sweeping political reforms.", category: "Politics", author: "Jennifer White", readTime: 6, likes: 260, views: 3500, timestamp: new Date('2025-01-30') },
  { title: "Global Democracy Summit 2025", content: "Leaders gather to address democratic challenges.", category: "Politics", author: "Michael Ross", readTime: 5, likes: 240, views: 3200, timestamp: new Date('2025-02-10') },

  // Education News
  { title: "Revolutionary AI Teaching Assistant Launched", content: "EdTech startup transforms classroom learning.", category: "Education", author: "Prof. Sarah Miller", readTime: 4, likes: 220, views: 3000, timestamp: new Date('2025-01-16') },
  { title: "Global Education Reform Initiative", content: "UNESCO announces major education transformation project.", category: "Education", author: "Dr. Tom Anderson", readTime: 6, likes: 200, views: 2800, timestamp: new Date('2025-02-01') },
  { title: "Digital Learning Revolution in Schools", content: "Schools adopt advanced virtual reality learning tools.", category: "Education", author: "Emily Clark", readTime: 5, likes: 180, views: 2600, timestamp: new Date('2025-02-12') },

  // Environment News
  { title: "Breakthrough in Renewable Energy Storage", content: "New battery technology revolutionizes green energy.", category: "Environment", author: "Dr. Alex Green", readTime: 6, likes: 340, views: 4400, timestamp: new Date('2025-01-18') },
  { title: "Ocean Cleanup Project Shows Promise", content: "Innovative system removes 50% more plastic than expected.", category: "Environment", author: "Laura Martinez", readTime: 5, likes: 300, views: 4000, timestamp: new Date('2025-02-03') },
  { title: "Amazon Rainforest Recovery Plan", content: "International effort to restore rainforest launched.", category: "Environment", author: "Carlos Silva", readTime: 7, likes: 280, views: 3800, timestamp: new Date('2025-02-15') },

  // Travel News
  { title: "Space Tourism Takes Off in 2025", content: "First commercial space hotel welcomes guests.", category: "Travel", author: "Mark Turner", readTime: 5, likes: 380, views: 4900, timestamp: new Date('2025-01-20') },
  { title: "World's First Underwater City Opens", content: "Revolutionary underwater tourism destination launches.", category: "Travel", author: "Sophie Wang", readTime: 4, likes: 340, views: 4500, timestamp: new Date('2025-02-05') },
  { title: "Sustainable Tourism Initiative Launched", content: "Global effort to promote eco-friendly travel.", category: "Travel", author: "James Wilson", readTime: 6, likes: 300, views: 4100, timestamp: new Date('2025-02-18') },

  // Food News
  { title: "Lab-Grown Meat Revolution", content: "Sustainable meat alternatives hit mainstream markets.", category: "Food", author: "Chef Maria Rodriguez", readTime: 4, likes: 260, views: 3500, timestamp: new Date('2025-01-22') },
  { title: "Global Food Security Summit 2025", content: "Nations address worldwide food distribution challenges.", category: "Food", author: "Dr. Peter Kim", readTime: 7, likes: 240, views: 3300, timestamp: new Date('2025-02-07') },
  { title: "AI-Powered Cooking Revolution", content: "Smart kitchens transform home cooking experience.", category: "Food", author: "Chef John Smith", readTime: 5, likes: 220, views: 3100, timestamp: new Date('2025-02-20') },

  // Lifestyle News
  { title: "Digital Wellness Trends 2025", content: "New technologies reshape personal well-being.", category: "Lifestyle", author: "Emma Davis", readTime: 4, likes: 280, views: 3700, timestamp: new Date('2025-01-24') },
  { title: "Sustainable Fashion Revolution", content: "Eco-friendly fashion becomes mainstream.", category: "Lifestyle", author: "Isabella Chen", readTime: 5, likes: 260, views: 3500, timestamp: new Date('2025-02-09') },
  { title: "Remote Work Culture Evolution", content: "Companies embrace new work-life balance models.", category: "Lifestyle", author: "Ryan Thompson", readTime: 6, likes: 240, views: 3300, timestamp: new Date('2025-02-22') },

  // Gaming News
  { title: "Revolutionary Gaming Console Launch", content: "Next-gen gaming platform sets new standards.", category: "Gaming", author: "Alex Turner", readTime: 5, likes: 420, views: 5500, timestamp: new Date('2025-01-26') },
  { title: "Esports Olympics Announcement", content: "Gaming officially recognized as Olympic sport.", category: "Gaming", author: "Sarah Lee", readTime: 4, likes: 380, views: 5000, timestamp: new Date('2025-02-11') },
  { title: "AI Gaming Revolution", content: "AI-powered NPCs transform gaming experience.", category: "Gaming", author: "Mike Johnson", readTime: 6, likes: 340, views: 4500, timestamp: new Date('2025-02-24') },

  // Business News
  { title: "Federal Reserve Announces Interest Rate Cut for Q1 2025", content: "The FRB announced a 0.25% rate cut to support economic growth.", category: "Business", author: "Victoria Chang", readTime: 5, likes: 120, views: 1500, timestamp: new Date('2025-01-15') },
  { title: "Stock Market Surges After FRB's Interest Rate Decision", content: "The S&P 500 and Nasdaq saw significant gains.", category: "Business", author: "Marcus Blackwood", readTime: 4, likes: 180, views: 2100, timestamp: new Date('2025-01-16') },
  { title: "Global Business Leaders Gather for Davos 2025", content: "World leaders discuss economic policies and trade relations.", category: "Business", author: "Raj Patel", readTime: 6, likes: 250, views: 3200, timestamp: new Date('2025-01-20') },
  { title: "US Unemployment Rate Drops to Record Low in 2025", content: "Job market reaches highest employment rate since 2000.", category: "Business", author: "Diana Foster", readTime: 5, likes: 190, views: 2800, timestamp: new Date('2025-01-25') },
  { title: "Elon Musk Announces New Tesla Gigafactory in India", content: "Tesla plans to expand its EV production in Asia.", category: "Business", author: "Nathan Brooks", readTime: 5, likes: 220, views: 3100, timestamp: new Date('2025-01-30') },

  // Economy News
  { title: "Federal Reserve Signals Possible Rate Hike in Mid-2025", content: "FRB Chairman hints at an interest rate increase.", category: "Economy", author: "Elena Rodriguez", readTime: 4, likes: 95, views: 1100, timestamp: new Date('2025-02-01') },
  { title: "US GDP Growth Exceeds Expectations in Q1 2025", content: "Economic growth reaches 3.2% amid strong consumer spending.", category: "Economy", author: "Oliver Wright", readTime: 6, likes: 175, views: 2600, timestamp: new Date('2025-02-05') },
  { title: "China's Economy Slows Amidst Global Tensions", content: "China's growth rate dips to its lowest in a decade.", category: "Economy", author: "Wei Zhang", readTime: 5, likes: 150, views: 2300, timestamp: new Date('2025-02-10') },
  { title: "Europe Faces Inflation Challenges in 2025", content: "Eurozone inflation rises to 4.1% due to energy costs.", category: "Economy", author: "Luca Rossi", readTime: 5, likes: 140, views: 2100, timestamp: new Date('2025-02-15') },
  { title: "Cryptocurrency Adoption Grows Among Central Banks", content: "Several countries launch pilot programs for digital currencies.", category: "Economy", author: "Aisha Khan", readTime: 6, likes: 300, views: 3700, timestamp: new Date('2025-02-20') },

  // Tech News
  { title: "Tech Giants React to FRB's 2025 Monetary Policy", content: "Apple, Google, and Microsoft analysts discuss market impact.", category: "Tech", author: "Samantha Wu", readTime: 5, likes: 200, views: 2500, timestamp: new Date('2025-01-15') },
  { title: "AI in Finance: How FRB Uses Machine Learning in 2025", content: "The FRB integrates AI to analyze economic trends.", category: "Tech", author: "Ethan Carter", readTime: 6, likes: 275, views: 3300, timestamp: new Date('2025-01-20') },
  { title: "Apple Unveils AI-Powered iPhone 17", content: "Apple introduces its most advanced AI-driven smartphone.", category: "Tech", author: "Zara Ahmed", readTime: 4, likes: 340, views: 4200, timestamp: new Date('2025-01-25') },
  { title: "Google Launches Quantum Computing Initiative", content: "Google aims to revolutionize computing with quantum AI.", category: "Tech", author: "Felix Morgan", readTime: 5, likes: 260, views: 3100, timestamp: new Date('2025-01-30') },
  { title: "Meta Introduces Next-Gen VR Headset for 2025", content: "Meta launches a more immersive VR experience.", category: "Tech", author: "Nina Patel", readTime: 4, likes: 280, views: 3400, timestamp: new Date('2025-02-05') },
  { title: "SpaceX Successfully Tests Starship for Mars Mission", content: "Elon Musk's SpaceX moves closer to Mars colonization.", category: "Tech", author: "Lucas Schmidt", readTime: 6, likes: 350, views: 4500, timestamp: new Date('2025-02-10') },

  // Sports News
  { title: "Super Bowl 2025: Kansas City Chiefs vs. San Francisco 49ers", content: "NFL's biggest game of the year sees record viewership.", category: "Sports", author: "Jack Thompson", readTime: 5, likes: 500, views: 6000, timestamp: new Date('2025-01-15') },
  { title: "LeBron James Breaks NBA All-Time Scoring Record", content: "LeBron sets a new milestone in basketball history.", category: "Sports", author: "Marcus Jordan", readTime: 4, likes: 400, views: 5500, timestamp: new Date('2025-01-20') },
  { title: "FIFA Announces Expanded 48-Team World Cup 2026", content: "More teams, more matches, and global excitement.", category: "Sports", author: "Diego Santos", readTime: 6, likes: 350, views: 4800, timestamp: new Date('2025-01-25') },
  { title: "Roger Federer Returns to Tennis in 2025 Exhibition Match", content: "The tennis legend makes a surprise comeback.", category: "Sports", author: "Anna Kowalski", readTime: 5, likes: 320, views: 4400, timestamp: new Date('2025-01-30') },
  { title: "Olympics 2025: Paris Prepares for Summer Games", content: "France gears up to host one of the biggest events.", category: "Sports", author: "Pierre Dubois", readTime: 5, likes: 290, views: 4100, timestamp: new Date('2025-02-05') },

  // Finance News
  { title: "FRB Discusses Digital Dollar Pilot Program for 2025", content: "The Federal Reserve explores a Central Bank Digital Currency (CBDC).", category: "Finance", author: "Thomas Anderson", readTime: 6, likes: 300, views: 3500, timestamp: new Date('2025-01-15') },
  { title: "Bitcoin Hits $100K for the First Time", content: "Cryptocurrency reaches an all-time high in 2025.", category: "Finance", author: "Maya Gupta", readTime: 4, likes: 450, views: 5800, timestamp: new Date('2025-01-20') },
  { title: "US Treasury to Launch Blockchain-Based Bond System", content: "Government explores blockchain for secure transactions.", category: "Finance", author: "Benjamin Cohen", readTime: 5, likes: 280, views: 3300, timestamp: new Date('2025-01-25') },
  { title: "Warren Buffett Invests $10 Billion in Green Energy", content: "Berkshire Hathaway doubles down on clean energy projects.", category: "Finance", author: "Sophia Chen", readTime: 5, likes: 310, views: 3700, timestamp: new Date('2025-01-30') },
  { title: "Hedge Funds See Record Returns in Volatile 2025 Market", content: "Top hedge funds outperform the stock market.", category: "Finance", author: "Adrian Park", readTime: 4, likes: 270, views: 3200, timestamp: new Date('2025-02-05') }
];

// Insert Dummy Data
const seedDatabase = async () => {
  try {
    await News.deleteMany(); // Clear existing data
    await News.insertMany(newsData);
    console.log("✅ 30+ Dummy News Data Inserted Successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  }
};

// Run Seeder
seedDatabase();
