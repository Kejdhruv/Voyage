const { MongoClient } = require("mongodb");

const database = 'Collection2';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function dbConnect9(Franchiseid) {
    try {
        await client.connect();
        const db = client.db(database);
        const collection = db.collection('HotelOrders');

       
        console.log("Querying with HID:", Franchiseid);
        
        const data = await collection.find({ Franchiseid }).toArray();
        
        console.log("Query Result:", data); 
        return data;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    } finally {
        await client.close();
    }
}

module.exports = dbConnect9;