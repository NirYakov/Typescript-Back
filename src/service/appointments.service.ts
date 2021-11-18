import Appointment from "../models/appointment.model";
import mongoose from 'mongoose';
import axios from "axios";
import { TwoAfterThePointRound } from "../utills/randomInt";
import AppointmentModel from "../models/Schema/appointment.schema";
import { IAppointmentService } from "./interfaces-services/appointments.interface";




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