import { Request, Response } from "express";
import config from "config";
import Appointment from "../models/appointment.model";
import axios from "axios";
import { diService } from "../app";

const port = config.get<number>("port");



export async function getAppointments(req: Request, res: Response) {
    const id = req.params.id;

    const patAppointments = await diService.diAppointmentSevice.getAppointmentsForPatient(id);

    if (patAppointments.length < 1) {
        return res.sendStatus(404);
    }

    return res.send(patAppointments);
}


export async function getAppointmentDay(req: Request, res: Response) {
    const date = new Date(req.params.date);

    const appointment = await diService.diAppointmentSevice.getAppointmentsForDay(date);

    return res.send(appointment);
}


export async function addAppointment(req: Request, res: Response) {

    const { petId, startTime, endTime, description, feePaidBy, amount } = req.body;

    let startTimeDate: Date = new Date();
    let endTimeDate: Date = new Date();


    if (!petId || !description || !feePaidBy || !amount || !startTime || !endTime) {
        return res.sendStatus(404);
    }

    try {
        startTimeDate = new Date(startTime);
        endTimeDate = new Date(endTime);
    }
    catch (err) {
        console.log("Dates are not in the right format !!");
        return res.sendStatus(404);
    }

    const appointment: Appointment =
    {
        petId: petId,

        startTime: startTimeDate,

        endTime: endTimeDate,

        description: description,

        feePaidBy: feePaidBy,

        amount: amount,

        amountInAmericanDollar: amount
    };

    const appointmentResult = await diService.diAppointmentSevice.addNewAppointment(appointment);

    return res.status(201).send(
        {
            linkToCreatedById: `http://localhost:${port}/appointments/${appointment.petId}`,
            appointment: appointmentResult
        });
}

export async function getUnpaidAppointments(req: Request, res: Response) {

    const unpaidAppointments = await diService.diAppointmentSevice.getAllUnpaidAppointments();

    console.log("unpaidAppointments : ", unpaidAppointments);

    if (!unpaidAppointments || unpaidAppointments.length < 1) {
        return res.sendStatus(404);
    }

    return res.status(200).send(
        {
            unpaidAppointments: unpaidAppointments
        });
}

export async function deleteAppointment(req: Request, res: Response) {

    const id = req.params.id;
    const appointment = await diService.diAppointmentSevice.deleteAppointmentById(id);

    return res.status(200).send(
        {
            deletedAppointment: appointment
        }
    );
}



export async function getPatientBill(req: Request, res: Response) {

    const id = req.params.id;
    const patientBill = await diService.diAppointmentSevice.getPatientBillById(id);

    return res.status(200).send(
        {
            patientBill: `${patientBill}$`
        }
    );

}