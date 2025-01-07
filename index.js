import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { MongoClient, ServerApiVersion } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function timeAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    }
  
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
  
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
  
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays}d ago`;
    }
  
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths}mo ago`;
    }
  
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}y ago`;
}

function getAttackerScore(matchTeams) {
    for (const team of matchTeams) {
        if (team.team_id == "Red") {
            return team.rounds.won
        }
    }
}

function getDefenderScore(matchTeams) {
    for (const team of matchTeams) {
        if (team.team_id == "Blue") {
            return team.rounds.won
        }
    }
}

const app = express();
const uri = ;
const dbName = "valorant";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


let db;
// Connect to MongoDB and start the server only after a successful connection
(async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);

    // Start the server only after MongoDB connection is established
    const port = parseInt(process.env.PORT) || 8080;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
})();

app.use(
  express.static(__dirname + "/dist", {
    setHeaders: (res, path) => {
      if (path.endsWith(".html")) {
        // Prevent caching of HTML files
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      }
    },
  })
);

app.get("/api/mmr_data", async (req, res) => {
  try {
    const itemsCollection = db.collection("mmr_data");
    const items = await itemsCollection.find().toArray();
    console.log("hey!");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/tdm_mmr_data", async (req, res) => {
  try {
    const itemsCollection = db.collection("tdm_mmr_data");
    const items = await itemsCollection.find().toArray();
    console.log("hey!");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/match/:match_id", async (req, res) => {
    try {
        console.log("yup");
        const { match_id } = req.params; // Extract match_id from URL
        const itemsCollection = db.collection("matches");
    
        // Find the match by its match_id
        const match = await itemsCollection.findOne({
          "metadata.match_id": match_id,
        });
    
        if (!match) {
          return res.status(404).json({ message: "Match not found" });
        }
    
        res.json(match);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

app.get('/api/tdm_mmr_data', async (req, res) => {
    try {
        const itemsCollection = db.collection('tdm_mmr_data');
        const items = await itemsCollection.find().toArray();
        console.log("hey!")
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get('/api/recent_matches', async (req, res) => {
    try {
        const itemsCollection = db.collection('matches');
        const items = await itemsCollection.find().sort({"metadata.started_at": -1}).toArray();
        console.log(items)
        let recent_matches = []
        for (const match of items) {
            let match_data = { 
                _id: match._id,
                map_name: match.metadata.map.name,
                match_id: match.metadata.match_id,
                time_since_played: timeAgo(match.metadata.started_at),
                attacker_score: getAttackerScore(match.teams),
                defender_score: getDefenderScore(match.teams),
            }
            console.log(match_data)
            recent_matches.push(match_data)
        }
        res.json(recent_matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get('/api/match/:match_id', async (req, res) => {
    try {
        console.log("yup")
        const { match_id } = req.params; // Extract match_id from URL
        const itemsCollection = db.collection('matches');
        
        // Find the match by its match_id
        const match = await itemsCollection.findOne({ "metadata.match_id": match_id });

        if (!match) {
            return res.status(404).json({ message: "Match not found" });
        }

        res.json(match);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Catch-all route for dynamic React routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = parseInt(process.env.PORT) || 8080;
