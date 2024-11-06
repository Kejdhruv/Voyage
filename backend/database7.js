const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'Collection2'; 
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function dbConnect7() {
    try {
        await client.connect(); 

        const db = client.db(dbName);
        const collection = db.collection('Admins');

        // Use ObjectId to query by _id by fileting out 
        const data = await collection.find({}).toArray();
        
        return data;
    } catch (err) {
        console.error("Error fetching hotel data:", err);
        throw err;
    }
}

module.exports =  dbConnect7 ;