import mongoose from "mongoose";
import config from 'config';
import logger from './logger';

async function connect() {
    const dbUri = config.get<string>("dbUri");

    try {
        await mongoose.connect(dbUri);
        logger.info("DB connected");
    }
    catch (error) {
        logger.info("Could not connet to db");
        console.error("");
        process.exit(1);
    }

}

export default connect;