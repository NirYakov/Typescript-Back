import { Request, Response } from "express";
import config from "config";
import Appointment from "../models/appointment.model";
import axios from "axios";
import { addNewAppointment, deleteAppointmentById, getAppointmentsForDay, getAppointmentsForPatient } from '../service/appointments.service'

const port = config.get<number>("port");

export async function getAppointment(req: Request, res: Response) {
    const id = req.params.id;

    const appointment = await getAppointmentsForPatient(id);

    console.log("Controller appointment : ", appointment);

    return res.send(appointment);
}



export async function getAppointmentDay(req: Request, res: Response) {
    const date = new Date(req.params.date);

    const appointment = await getAppointmentsForDay(date);

    return res.send(appointment);
}


export async function addAppointment(req: Request, res: Response) {
    const date = new Date(req.params.date);

    const appointment: Appointment =
    {
        petId: req.body.petId,

        startTime: new Date(req.body.startTime),

        endTime: new Date(req.body.endTime),

        feePaidBy: req.body.feePaidBy,

        amount: req.body.amount,

        amountInAmericanDollar: req.body.amount
    };

    const appointmentResult = await addNewAppointment(appointment);

    return res.status(201).send(
        {
            linkToCreatedById: `http://localhost:${port}/patients/${appointment._id}`,
            appointment: appointmentResult
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



