import Appointment from "../models/appointment.model";
import mongoose from 'mongoose';
import axios from "axios";
import { TwoAfterThePointRound } from "../utills/randomInt";
import AppointmentModel from "../models/Schema/appointment.schema";
import { IAppointmentService } from "./interfaces-services/appointments.interface";



export class AppointmentServiceMock implements IAppointmentService {

    getAppointments(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAppointmentsForPatient(petId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteAppointmentById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAppointmentsByIdFromDb(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async addNewAppointment(appointment: Appointment): Promise<any> {

    }

    getRateToDollar(moneyAmount: number, feePaidBy: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAppointmentsForDay(date: Date): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAllUnpaidAppointments(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAppointmentsByUnpaidFromDb(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getPatientBillById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export class AppointmentService implements IAppointmentService {
    async getAppointments(): Promise<any> {
        return await AppointmentModel.find();
    }
    async getAppointmentsForPatient(petId: string): Promise<any> {

        return await this.getAppointmentsByIdFromDb(petId);

    }
    async deleteAppointmentById(id: string): Promise<any> {
        return await AppointmentModel.findByIdAndDelete(id);

    }
    async getAppointmentsByIdFromDb(id: string): Promise<any> {
        return await AppointmentModel.find({ petId: id });
    }
    async addNewAppointment(appointment: Appointment): Promise<any> {

        const rateMoneyToDollar = await this.getRateToDollar(appointment.amount, appointment.feePaidBy);

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
    async getRateToDollar(moneyAmount: number, feePaidBy: string): Promise<any> {
        let rateMoneyToDollar = moneyAmount;

        if (this.checkifCandianDollar(feePaidBy) || this.checkifEuro(feePaidBy)) {

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


            if (this.checkifCandianDollar(feePaidBy)) {
                rateMoneyToDollar = moneyAmount / rateCAN;
            }
            else if (this.checkifEuro(feePaidBy)) {
                rateMoneyToDollar = moneyAmount / rateEuro;
            }
        }

        rateMoneyToDollar = TwoAfterThePointRound(rateMoneyToDollar);
        return rateMoneyToDollar;
    }
    async getAppointmentsForDay(date: Date): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getAllUnpaidAppointments(): Promise<any> {
        return await this.getAppointmentsByUnpaidFromDb();
    }
    async getAppointmentsByUnpaidFromDb(): Promise<any> {

        return await AppointmentModel.find({ feePaidBy: 'unpaid' });

    }
    async getPatientBillById(id: string): Promise<any> {
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


    checkifEuro(moneyRate: string): boolean {
        return moneyRate == '€' || moneyRate == 'EUR' || moneyRate == 'euro';
    }

    checkifCandianDollar(moneyRate: string): boolean {
        return moneyRate == 'Canadian dollar' || moneyRate == 'C$' || moneyRate == 'Can$' || moneyRate == 'CAD$' || moneyRate == 'CAD';
    }


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
