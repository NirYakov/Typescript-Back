import { AppointmentService } from "./appointments.service";
import { IAppointmentService } from "./interfaces-services/appointments.interface";
import { IPatientsService } from "./interfaces-services/patients.interface";
import { AppointmentServiceMock } from "./MockServices/appointment.service.mock";
import { PatientsServiceMock } from "./MockServices/patients.service.mock";
import { PatientsService } from "./patients.service";

//const diPateintSevice: IPatientsService = new PatientsService();
// const diPateintSevice: IPatientsService = new PatientsServiceMock();
// const diAppointmentSevice: IAppointmentService = new AppointmentServiceMock();

export default class DiService {

    diPateintSevice: IPatientsService;
    diAppointmentSevice: IAppointmentService;

    static MockDatabase = false;
    static RealDatabase = true;
    /**
     *
     */
    constructor(readDataBase: boolean = false) {

        if (readDataBase) {
            this.diPateintSevice = new PatientsService();
            this.diAppointmentSevice = new AppointmentService();
        }
        else 
        {
            this.diPateintSevice = new PatientsServiceMock();
            this.diAppointmentSevice = new AppointmentServiceMock();
        }

        const answer = readDataBase == DiService.RealDatabase ? 'read db' : 'mock db';
        console.log(`Database is : ${answer}` );
    }

}
