const { MongoClient } = require("mongodb");

const database = 'Collection2';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function dbConnect35(Guestid) {
    try {
        await client.connect();
        const db = client.db(database);
        const collection = db.collection('ActivitiesOrders');

       
        console.log("Querying with HID:",Guestid );
        
        const data = await collection.find({Guestid }).toArray();
        
        console.log("Query Result:", data); 
        return data;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    } finally {
        await client.close();
    }
}

module.exports = dbConnect35;