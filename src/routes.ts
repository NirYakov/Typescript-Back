import { Express, Request, Response } from "express";
import { getAllPatients, getPatient } from './controller/patients.controller';


function routes(app: Express) {
    app.get('/', (req, res) => {
        return res.send({ "hello": 'Hey' });
    });

    app.get('/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.get('/patients', getAllPatients);

    app.get('/patients/:id', getPatient);
}




export default routes;