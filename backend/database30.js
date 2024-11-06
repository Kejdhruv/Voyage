const { MongoClient } = require("mongodb");

const database = 'Collection2';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function dbConnect30() {
    try {
        // Connect to MongoDB
        await client.connect();
       

    
        const db = client.db(database);
        const collection = db.collection('Activities');

    
        const data = await collection.find({}).toArray();

        return data;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err; 
    }
}

module.exports = dbConnect30;