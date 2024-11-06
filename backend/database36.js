const { MongoClient } = require("mongodb");

const database = 'Collection2';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function dbConnect36(newData) {
    try {

        if (typeof newData !== 'object' || Array.isArray(newData)) {
            throw new Error("Input must be a single object");
        }

        
        await client.connect();
      
    
        const db = client.db(database);
        const collection = db.collection('Activities');


        const result = await collection.insertOne(newData);
        return result;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err; 
    } finally {

        await client.close();
    }
}

module.exports = dbConnect36;