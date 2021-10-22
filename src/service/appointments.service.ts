import Appointment from "../models/appointment.model";




export async function getAppointmentsForPatient(petId: number) {

    const patientAppointments = appointments.filter(n => n.petId == petId);

    return patientAppointments;
}

export async function deleteAppointmentById(id: number) {
    const appointment = appointments.find(n => n.id == id);

    appointments.splice(id, 1);

    return appointment;
}

export async function addNewAppointment(appointments: Appointment) {
    // const lastId = patients[patients.length - 1].id;
    // patient.id = lastId;

    // patient.id = getRandomInt(2_000_000_000);

    // patients.push(patient);

    return true;
}

export async function getAppointmentsForDay(date: Date) {

    const patientAppointments = appointments.filter(
        n => {
            if ((n.startTime.getDay() == date.getDay()) &&
                (n.startTime.getMonth() == date.getMonth()) &&
                (n.startTime.getFullYear() == date.getFullYear())) {
                return true;
            }
            return false;
        });

    return patientAppointments;
}



const appointments: Appointment[] =
    [
        {

            id: 0,

            petId: 3,

            startTime: new Date(2000, 1, 1, 12, 0, 0),

            endTime: new Date(2000, 1, 1, 13, 0, 0),

            feePaidBy: "$", // dollar or euro or Canadian dollar /unpaid 

            amount: 20,
        },
        {

            id: 1,

            petId: 4,

            startTime: new Date(2000, 1, 2, 12, 0, 0),

            endTime: new Date(2000, 1, 2, 13, 0, 0),

            feePaidBy: "Canadian dollar", // dollar or euro or Canadian dollar /unpaid 

            amount: 29,
        },
        {

            id: 2,

            petId: 1,

            startTime: new Date(2000, 1, 4, 12, 0, 0),

            endTime: new Date(2000, 1, 4, 13, 0, 0),

            feePaidBy: "euro", // dollar or euro or Canadian dollar /unpaid 

            amount: 20,
        },
        {

            id: 3,

            petId: 0,

            startTime: new Date(2000, 1, 1, 14, 0, 0),

            endTime: new Date(2000, 1, 1, 15, 0, 0),

            feePaidBy: "unpaid", // dollar or euro or Canadian dollar /unpaid 

            amount: 34,
        },
        {

            id: 4,

            petId: 3,

            startTime: new Date(2000, 1, 10, 14, 0, 0),

            endTime: new Date(2000, 1, 10, 15, 0, 0),

            feePaidBy: "dollar", // dollar or euro or Canadian dollar /unpaid 

            amount: 34,
        },
    ];