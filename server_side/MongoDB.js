import {MongoClient} from 'mongodb';
import fs from 'fs';

export async function main() {
    const uri = 'mongodb+srv://eliyapl:6oR0jopO6kl9wt8W@cluster0.eyn3o.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);

    try {
        await client.connect();

        await deleteAll(client);

        await createMultipleListing(client, JSON.parse(fs.readFileSync('data_ex.json')));  
    }
    catch(e){
        console.error(e);
    } finally {
        await client.close();
    }  

}
main().catch(console.error);

async function createMultipleListing(client, newListing){
    const result = await client.db("sample_promotions").collection("promotionsList").insertMany(newListing);
    console.log(`${result.insertedCount} new listing(s) created `);
    //console.log(result.insertedIds);  
}

async function deleteAll(client){
    const result = await client.db("sample_promotions").collection("promotionsList").deleteMany();
    console.log(`${result.deletedCount} promotions were deleted`); 
}

export default main;