import express from 'express';
import config from 'config';
import routes from './routes';
import DiService from './service/DiServices';
import connect from './utills/connect';


const port  = config.get<number>("port");
const app = express();

export const diService = new DiService(DiService.RealDatabase); // (DiService.MockDatabase);
// export const diService = new DiService(DiService.MockDatabase);

app.use(express.json());

app.listen(port , async () => {

    await connect();
    
    console.log(`App is running at http://localhost:${port}`);
    
   routes(app);

});


export default app;