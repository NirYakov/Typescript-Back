import express from 'express';
import config from 'config';
import connect from './utills/connect';
import logger from './utills/logger';
import routes from './routes';


const port  = config.get<number>("port");
const app = express();

app.use(express.json());

app.listen(port , async () => {

    logger.info(`App is running at http://localhost:${port}`);
   
    
    
    await connect();
    
    console.log(`App is running at http://localhost:${port}`);
    
   routes(app);

});


