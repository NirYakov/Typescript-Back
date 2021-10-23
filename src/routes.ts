import { Express, Request, Response } from "express";
import { addAppointment, deleteAppointment, getAppointments, getAppointmentDay, getUnpaidAppointments } from "./controller/appointment.controller";
import { addPatient, deletePatient, getAllPatients, getPatient } from './controller/patients.controller';


function routes(app: Express) {
    app.get('/', (req, res) => {
        return res.send({ "hello": 'Hey' });
    });

    app.get('/healthcheck', (req: Request, res: Response) => { res.sendStatus(200); });

    app.get('/patients/:id', getPatient); // Extra do later or something

    ///// part 1

    app.get('/patients', getAllPatients); // Getting a list of all patients in the hospital 

    app.post('/patients', addPatient); // Adding a new patient 

    app.put('/patients/:id',); // Update patient details 

    app.delete('/patients/:id', deletePatient); // Delete patient details 

    ///// part 2
    app.get('/appointments/unpaid', getUnpaidAppointments); // Get a list of unpaid appointments 

    app.get('/appointments/:id', getAppointments); // Get a list of all appointments for a specific patient 

    app.post('/appointments', addAppointment);

    app.put('/appointments/:id',); // Update appointment details 

    app.delete('/appointments/:id', deleteAppointment); // Delete appointment details 


    // part B

    app.get('/appointments/day/:date', getAppointmentDay); // Get a list of appointments for a specific day 


    // Get a remaining bill for a specific patient  
}




export default routes;