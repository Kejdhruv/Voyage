const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'Collection2'; 
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function dbConnect21(contact, newData) {
    try {
        await client.connect(); 

        const db = client.db(dbName);
        const collection = db.collection('Guides'); 

        
        const { _id, ...updateData } = newData;

        
        const result = await collection.updateMany(
            { contact }, 
            { $set: updateData }
        );

        return {
            matchedCount: result.matchedCount, 
            modifiedCount: result.modifiedCount 
        };
    } catch (err) {
        console.error("Error updating guide profile:", err);
        throw err;
    } finally {
        await client.close(); 
    }
}
module.exports = dbConnect21 