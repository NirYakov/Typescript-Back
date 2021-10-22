import { Request, Response } from "express";
import config from "config";
import Appointment from "../models/appointment.model";
import axios from "axios";
import {deleteAppointmentById, getAppointmentsForDay, getAppointmentsForPatient } from '../service/appointments.service'

export async function getAppointment(req: Request, res: Response) {
    const id = req.params.id;

    const appointment = await getAppointmentsForPatient(+id);

    return res.send(appointment);
}


export async function deleteAppointment(req: Request, res: Response) {

    const id = req.params.id;
    const appointment = await deleteAppointmentById(+id);

    return res.status(200).send(
        {
            deletedAppointment: appointment
        }
    );
}


export async function getAppointmentDay(req: Request, res: Response) {
    const date = new Date(req.params.date);
   
    const appointment = await getAppointmentsForDay(date);

    return res.send(appointment);
}



