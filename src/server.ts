// server.js
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS to allow communication between frontend and backend

const uri = "mongodb+srv://yuanyaolin13:alexcadenfrankyuanyao@cluster0.yolp8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/api/ping', async (res: any) => {
  try {
    await client.connect();
    res.status(200).json({ message: "Ping successful!" });
    return await client.db("tourpedia_data").collection("attractions");
  } catch (err: any) {
    console.error('Ping failed:', err);
    res.status(500).json({ error: 'Ping failed', details: err.message });
  } finally {
    await client.close();
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
