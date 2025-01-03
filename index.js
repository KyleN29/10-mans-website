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


app.use(express.static(__dirname + "/dist"));

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

const port = parseInt(process.env.PORT) || 8080;

