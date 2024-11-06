const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'Collection2'; 
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function dbConnect4(_id) {
    try {
        await client.connect(); 

        const db = client.db(dbName);
        const collection = db.collection('Restaurants'); 

        // Use ObjectId to query by _id
        const data = await collection.find({ _id: new ObjectId(_id) }).toArray();
        
        return data;
    } catch (err) {
        console.error("Error fetching hotel data:", err);
        throw err;
    }
}

module.exports =  dbConnect4 ;