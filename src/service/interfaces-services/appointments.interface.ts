import Appointment from "../../models/appointment.model";

export interface IAppointmentService {
    // doAlgorithm(data: string[]): string[];

    getAppointments(): Promise<any>;

    getAppointmentsForPatient(petId: string): Promise<any>;

    deleteAppointmentById(id: string): Promise<any>;

    getAppointmentsByIdFromDb(id: string): Promise<any>;

    addNewAppointment(appointment: Appointment): Promise<any>;

    getRateToDollar(moneyAmount: number, feePaidBy: string): Promise<any>;

    getAppointmentsForDay(date: Date): Promise<any>;

    getAllUnpaidAppointments(): Promise<any>;

    getAppointmentsByUnpaidFromDb(): Promise<any>;

    getPatientBillById(id: string): Promise<any>;


}