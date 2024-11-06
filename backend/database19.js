const { MongoClient } = require("mongodb");

const database = 'Collection2';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function dbConnect19(GuideId) {
    try {
        await client.connect();
        const db = client.db(database);
        const collection = db.collection('GuideOrders');

       
        console.log("Querying with HID:",GuideId );
        
        const data = await collection.find({GuideId }).toArray();
        
        console.log("Query Result:", data); 
        return data;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    } finally {
        await client.close();
    }
}

module.exports = dbConnect19;