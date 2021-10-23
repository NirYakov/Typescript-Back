import Appointment from "../models/appointment.model";
import mongoose from 'mongoose';
import axios from "axios";
import { TwoAfterThePointRound } from "../utills/randomInt";
import AppointmentModel from "../models/Schema/appointment.schema";



export async function getAppointments() {
    let appointments: Appointment[] = [];

    await AppointmentModel.find()
        .then(async documents => {
            appointments = documents ? documents : appointments;
            return appointments;
        })
        .catch(err => {
            console.log("Error : ", err);
        });

    return appointments;
}

export async function getAppointmentsForPatient(petId: string) {

    const patientAppointments = await getAppointmentsByIdFromDb(petId);

    return patientAppointments;
}

export async function deleteAppointmentById(id: string) {

    const appointment = await AppointmentModel.findByIdAndDelete(id);

    return appointment;
}


export async function getAppointmentsByIdFromDb(id: string) {
    let appointments: Appointment[] = [];

    await AppointmentModel.find({ petId: id })
        .then(async document => {
            appointments = document !== null ? document : appointments;
            return appointments;
        })
        .catch(err => {
            console.log("Error : ", err);
        });

    return appointments;
}

export async function addNewAppointment(appointment: Appointment) {

    const rateMoneyToDollar = await getRateToDollar(appointment.amount, appointment.feePaidBy);

    appointment.amountInAmericanDollar = rateMoneyToDollar;

    const doc = new AppointmentModel(
        {
            petId: appointment.petId,

            startTime: appointment.startTime,

            endTime: appointment.endTime,

            description: appointment.description,

            feePaidBy: appointment.feePaidBy,

            amount: appointment.amount,

            amountInAmericanDollar: appointment.amountInAmericanDollar,
        });


    await doc.save();

    appointment._id = doc._id;

    return appointment;
}

export async function getRateToDollar(moneyAmount: number, feePaidBy: string) {

    let rateMoneyToDollar = moneyAmount;

    if (checkifCandianDollar(feePaidBy) || checkifEuro(feePaidBy)) {

        let rateCAN: number = 1.0;
        let rateEuro: number = 1.0;

        // req from rate api
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
    }

    rateMoneyToDollar = TwoAfterThePointRound(rateMoneyToDollar);
    return rateMoneyToDollar;
}

export async function getAppointmentsForDay(date: Date) {

    const appointments = await getAppointments();
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


export async function getAllUnpaidAppointments() {

    let getUnpaidAppointment: Appointment[];
    getUnpaidAppointment = await getAppointmentsByUnpaidFromDb();
    return getUnpaidAppointment;
}

export async function getAppointmentsByUnpaidFromDb() {
    let appointmentsUnpaid: Appointment[] = [];

    await AppointmentModel.find({ feePaidBy: 'unpaid' })
        .then(async document => {
            appointmentsUnpaid = document !== null ? document : appointmentsUnpaid;
            return appointmentsUnpaid;
        })
        .catch(err => {
            console.log("Error : ", err);
        });

    return appointmentsUnpaid;
}

function checkifEuro(moneyRate: string): boolean {
    return moneyRate == '€' || moneyRate == 'EUR' || moneyRate == 'euro';
}

function checkifCandianDollar(moneyRate: string): boolean {
    return moneyRate == 'Canadian dollar' || moneyRate == 'C$' || moneyRate == 'Can$' || moneyRate == 'CAD$' || moneyRate == 'CAD';
}

export async function getPatientBillById(id: string) {

    let appointmentsUnpaid: Appointment[] = [];

    await AppointmentModel.find({ petId: id, feePaidBy: 'unpaid' })
        .then(async document => {
            appointmentsUnpaid = document !== null ? document : appointmentsUnpaid;
            return appointmentsUnpaid;
        })
        .catch(err => {
            console.log("Error : ", err);
        });

    let totalUnpaid = 0.0;
    appointmentsUnpaid.forEach(n => totalUnpaid += n.amount);


    return totalUnpaid;
}

const appointmentsDummy: Appointment[] =
    [
        {

            _id: "0",

            petId: "617304e3166a38931b9300c4",

            startTime: new Date(2000, 1, 1, 10, 0, 0),

            endTime: new Date(2000, 1, 1, 11, 0, 0),

            description: "description 617304e3166a38931b9300c4",

            feePaidBy: "$",

            amount: 20,

            amountInAmericanDollar: 0
        },
        {

            _id: "1",

            petId: "6173044f802ac134117fdf46",

            startTime: new Date(2000, 1, 2, 12, 0, 0),

            endTime: new Date(2000, 1, 2, 13, 0, 0),

            description: "description ~~",

            feePaidBy: "Canadian dollar", // dollar or euro or Canadian dollar /unpaid 

            amount: 29,

            amountInAmericanDollar: 0

        },
        {

            _id: "2",

            petId: "617304cc166a38931b9300c2",

            startTime: new Date(2000, 1, 4, 12, 0, 0),

            endTime: new Date(2000, 1, 4, 13, 0, 0),

            description: " ++== description ",

            feePaidBy: "euro", // dollar or euro or Canadian dollar /unpaid 

            amount: 20,

            amountInAmericanDollar: 0

        },
        {

            _id: "3",

            petId: "617304fc166a38931b9300c6",

            startTime: new Date(2000, 1, 1, 14, 0, 0),

            endTime: new Date(2000, 1, 1, 15, 0, 0),

            description: " 00  : description",

            feePaidBy: "unpaid", // dollar or euro or Canadian dollar /unpaid 

            amount: 34,

            amountInAmericanDollar: 0

        },
        {

            _id: "4",

            petId: "617304e3166a38931b9300c4",

            startTime: new Date(2000, 1, 10, 14, 0, 0),

            endTime: new Date(2000, 1, 10, 15, 0, 0),

            description: " >> description ",

            feePaidBy: "dollar", // dollar or euro or Canadian dollar /unpaid 

            amount: 34,

            amountInAmericanDollar: 0

        },
    ];
