import { Request, Response } from "express";
import config from "config";
import Appointment from "../models/appointment.model";
import axios from "axios";
import { addNewAppointment, deleteAppointmentById, getAllUnpaidAppointments, getAppointmentsForDay, getAppointmentsForPatient, getPatientBillById } from '../service/appointments.service'

const port = config.get<number>("port");

export async function getAppointments(req: Request, res: Response) {
    const id = req.params.id;

    const patAppointments = await getAppointmentsForPatient(id);

    if (patAppointments.length < 1) {
        return res.sendStatus(404);
    }

    return res.send(patAppointments);
}


export async function getAppointmentDay(req: Request, res: Response) {
    const date = new Date(req.params.date);

    const appointment = await getAppointmentsForDay(date);

    return res.send(appointment);
}


export async function addAppointment(req: Request, res: Response) {

    const appointment: Appointment =
    {
        petId: req.body.petId,

        startTime: new Date(req.body.startTime),

        endTime: new Date(req.body.endTime),

        description: req.body.description,

        feePaidBy: req.body.feePaidBy,

        amount: req.body.amount,

        amountInAmericanDollar: req.body.amount
    };

    const appointmentResult = await addNewAppointment(appointment);

    return res.status(201).send(
        {
            linkToCreatedById: `http://localhost:${port}/appointments/${appointment.petId}`,
            appointment: appointmentResult
        });
}

export async function getUnpaidAppointments(req: Request, res: Response) {

    const unpaidAppointments = await getAllUnpaidAppointments();

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
    const appointment = await deleteAppointmentById(id);

    return res.status(200).send(
        {
            deletedAppointment: appointment
        }
    );
}



export async function getPatientBill(req: Request, res: Response) {

    const id = req.params.id;
    const patientBill = await getPatientBillById(id);

    return res.status(200).send(
        {
            patientBill: `${patientBill}$`
        }
    );

}