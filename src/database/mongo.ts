import { MongoClient } from 'mongodb';
import populateUniversities from './populateUniversities'; 

require('dotenv').config();


class Mongo {

    async connection() {
        const conn = new MongoClient(process.env.MONGO_URL);

        try {
            await conn.connect();

            const db = conn.db(process.env.MONGO_DB);

            const checkCollectionHasResult = await db.collection("universities").find({}).toArray();

            if(checkCollectionHasResult.length === 0) {
                
                const universities = await populateUniversities();

                await db.collection("universities").insertMany(universities);
            }

            return db;
        } catch (err) {
            console.error(err);
        }

    }
}

export default new Mongo();


