import { Request, Response } from "express";
import config from "config";
import { getPatients, getPatientById } from '../service/patients.service'



export async function getAllPatients(req: Request, res: Response) {
    // const userId = res.locals.user._id;

    const patients = await getPatients();

    return res.send(patients);
}

export async function getPatient(req: Request, res: Response) {
    // const userId = res.locals.user._id;
    const userId = req.params.id;

    const patient = await getPatientById(+userId);


    return res.send(patient);
}