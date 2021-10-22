import Appointment from "../models/appointment.model";
import mongoose from 'mongoose';
import axios from "axios";
import { TwoAfterThePointRound } from "../utills/randomInt";


export async function getAppointmentsForPatient(petId: string) {

    const patientAppointments = appointments.filter(n => n.petId == petId);

    if (checkifCandianDollar(patientAppointments[0].feePaidBy) || checkifEuro(patientAppointments[0].feePaidBy)) {
        let rateMoneyToDollar = 1.0;   // req from rate api
        let rateEuro: number;
        let rateCAN: number;

        rateMoneyToDollar = await getRateToDollar(patientAppointments[0].amount, patientAppointments[0].feePaidBy);

        patientAppointments[0].amountInAmericanDollar = rateMoneyToDollar;

        console.log("rateMoneyToDollar : ", rateMoneyToDollar);
        console.log(patientAppointments[0]);
    }

    return patientAppointments;
}

export async function deleteAppointmentById(id: string) {
    const index = appointments.findIndex(n => n._id == id);
    const appointment = appointments[index];

    appointments.splice(index, 1);

    return appointment;
}

export async function addNewAppointment(appointment: Appointment) {
    // const lastId = patients[patients.length - 1].id;
    // patient.id = lastId;

    // patient.id = getRandomInt(2_000_000_000);

    // patients.push(patient);


    if (checkifCandianDollar(appointment.feePaidBy) || checkifEuro(appointment.feePaidBy)) {
        let rateMoneyToDollar = 1.0;   // req from rate api
        let rateEuro: number;
        let rateCAN: number;

        rateMoneyToDollar = await getRateToDollar(appointment.amount, appointment.feePaidBy);

        appointment.amountInAmericanDollar = rateMoneyToDollar;
    }

    appointments.push(appointment);

    return appointment;
}

export async function getRateToDollar(moneyAmount: number, feePaidBy: string) {

    let rateMoneyToDollar = 1.0;
    let rateCAN: number = 1.0;
    let rateEuro: number = 1.0;

    await axios({
        method: 'get',
        url: `https://open.er-api.com/v6/latest/USD`,
    })
        .then(function (response: any) {
            rateCAN = response.data.rates.CAD;
            rateEuro = response.data.rates.EUR;

        }).catch(e => {
            console.log({
                message: "oops :(",
                error: e,
            })
        });


    if (checkifCandianDollar(feePaidBy)) {
        rateMoneyToDollar = moneyAmount / rateCAN;
    }
    else if (checkifEuro(feePaidBy)) {
        rateMoneyToDollar = moneyAmount / rateEuro;
    }

    rateMoneyToDollar = TwoAfterThePointRound(rateMoneyToDollar);
    return rateMoneyToDollar;
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

function checkifEuro(moneyRate: string): boolean {
    return moneyRate == '€' || moneyRate == 'EUR';
}

function checkifCandianDollar(moneyRate: string): boolean {
    return moneyRate == 'Canadian dollar' || moneyRate == 'C$' || moneyRate == 'Can$' || moneyRate == 'CAD$';
}


const appointments: Appointment[] =
    [
        {

            _id: "0",

            petId: "617304e3166a38931b9300c4",

            startTime: new Date(2000, 1, 1, 12, 0, 0),

            endTime: new Date(2000, 1, 1, 13, 0, 0),

            feePaidBy: "$", // dollar or euro or Canadian dollar /unpaid 

            amount: 20,

            amountInAmericanDollar: 0
        },
        {

            _id: "1",

            petId: "6173044f802ac134117fdf46",

            startTime: new Date(2000, 1, 2, 12, 0, 0),

            endTime: new Date(2000, 1, 2, 13, 0, 0),

            feePaidBy: "Canadian dollar", // dollar or euro or Canadian dollar /unpaid 

            amount: 29,

            amountInAmericanDollar: 0

        },
        {

            _id: "2",

            petId: "617304cc166a38931b9300c2",

            startTime: new Date(2000, 1, 4, 12, 0, 0),

            endTime: new Date(2000, 1, 4, 13, 0, 0),

            feePaidBy: "euro", // dollar or euro or Canadian dollar /unpaid 

            amount: 20,

            amountInAmericanDollar: 0

        },
        {

            _id: "3",

            petId: "617304fc166a38931b9300c6",

            startTime: new Date(2000, 1, 1, 14, 0, 0),

            endTime: new Date(2000, 1, 1, 15, 0, 0),

            feePaidBy: "unpaid", // dollar or euro or Canadian dollar /unpaid 

            amount: 34,

            amountInAmericanDollar: 0

        },
        {

            _id: "4",

            petId: "617304e3166a38931b9300c4",

            startTime: new Date(2000, 1, 10, 14, 0, 0),

            endTime: new Date(2000, 1, 10, 15, 0, 0),

            feePaidBy: "dollar", // dollar or euro or Canadian dollar /unpaid 

            amount: 34,

            amountInAmericanDollar: 0

        },
    ];
