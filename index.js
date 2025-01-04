import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const uri = process.env.URI_KEY;
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
        console.log('Connected to MongoDB');
        db = client.db(dbName);

        // Start the server only after MongoDB connection is established
        const port = parseInt(process.env.PORT) || 8080;
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
})();


app.use(express.static(__dirname + "/dist", {setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      // Prevent caching of HTML files
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
}
  }));

app.get('/api/mmr_data', async (req, res) => {
    try {
        const itemsCollection = db.collection('mmr_data');
        const items = await itemsCollection.find().toArray();
        console.log("hey!")
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

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
        const items = await itemsCollection.find().toArray();

        let recent_matches = []
        for (const match of items) {
            let match_data = { 
                _id: match._id,
                map_name: match.metadata.map.name,
                match_id: match.metadata.match_id,
            }
            recent_matches.push(match_data)
        }

        console.log("hey!")
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
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});





const port = parseInt(process.env.PORT) || 8080;

