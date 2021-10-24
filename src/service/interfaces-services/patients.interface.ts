import Patient from "../../models/patient.model";

export interface IPatientsService {
    // doAlgorithm(data: string[]): string[];

    getPatients(): Promise<any>;

    deletePatientById(id: string) : Promise<any>;

    addNewPatient(patient: Patient) : Promise<any>;

    getPatientById(id: string) : Promise<any>;

    getPatientByIdFromDb(id: string) : Promise<any>;

   
}