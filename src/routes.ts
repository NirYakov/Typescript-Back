import axios from "axios";
import { Express, Request, Response } from "express";
import { addAppointment, deleteAppointment, getAppointments, getAppointmentDay, getUnpaidAppointments, getPatientBill } from "./controller/appointment.controller";
import { addPatient, deletePatient, getAllPatients, getPatient } from './controller/patients.controller';


const ratesJsonFunc = async () => {

    console.log('server rates and more ');

    return await axios({
        method: 'get',
        url: `https://open.er-api.com/v6/latest/USD`,
    });
};


async function routes(app: Express) {


    app.get('/', (req, res) => {
        return res.send({ "hello": 'Hey' });
    });


    let ratesJson: any;
    await ratesJsonFunc().then(n => { ratesJson = n; })
    const rates: any = ratesJson.data.rates;

    app.get('/rates/:currencyParam', async (req, res) => {

        //const rates: any = ratesJson.data.rates;

        // console.log(ratesJson);
        //  req.body.rate;

        // rateCAN = response.data.rates.CAD;
        const { currencyParam } = req.params;

        const { currencyBody } = req.body;

        // const rates: any = ratesJson.data.rates;

        const rate = rates[currencyParam];
        console.log(rates);

        console.log(` currencyBody : ${currencyBody}  , ${rates[currencyBody]}`);
        console.log(rate);

        return res.send({ rate } || { none: "none" });
    });

    app.get('/healthcheck', (req: Request, res: Response) => { res.sendStatus(200); });

    app.get('/patients/:id', getPatient); // Extra do later or something


    ///// part 1

    app.get('/patients', getAllPatients); // Getting a list of all patients in the hospital 

    app.post('/patients', addPatient); // Adding a new patient 

    app.put('/patients/:id',); // Update patient details 

    app.delete('/patients/:id', deletePatient); // Delete patient details 

    ///// part 2

    app.options('/appointments',);


    app.get('/appointments/unpaid', getUnpaidAppointments); // [B.2] Get a list of unpaid appointments 


    app.get('/appointments/:id', getAppointments); // Get a list of all appointments for a specific patient 

    app.post('/appointments', addAppointment);

    app.put('/appointments/:id',); // Update appointment details 

    app.delete('/appointments/:id', deleteAppointment); // Delete appointment details 


    // part B

    app.get('/appointments/day/:date', getAppointmentDay); // [B.1] Get a list of appointments for a specific day 

    app.get('/patientbill/:id', getPatientBill); // [B.3] Get a list of unpaid appointments 

    // Get a remaining bill for a specific patient  
}




export default routes;