import { Request, Response } from "express";
import config from "config";
import Patient from "../models/patient.model";
import axios from "axios";
import { getRandomInt } from "../utills/randomInt";
import { diService } from "../app";

const port = config.get<number>("port");

export async function getAllPatients(req: Request, res: Response) {

    const patients =  await diService.diPateintSevice.getPatients();
   
    return res.send(patients);
}

export async function getPatient(req: Request, res: Response) {
    const id = req.params.id;

    const patient = await diService.diPateintSevice.getPatientById(id);

    if (!patient) {
        return res.sendStatus(404);
    }

    return res.send(patient);
}


export async function addPatient(req: Request, res: Response) {

    const {petName , petType , ownerName , ownerAddress , ownerPhone} = req.body;

    if(!petName || !petType || !ownerName || !ownerAddress  || !ownerPhone) 
    {
        return res.sendStatus(404);
    }

    const patient: Patient =
    {
        petName: petName,

        petType: petType,

        ownerName: ownerName,

        ownerAddress: ownerAddress,

        ownerPhone: ownerPhone,

        petTypeFood: ""
    };

    await diService.diPateintSevice.addNewPatient(patient);

    return res.status(201).send(
        {
            linkToCreatedById: `http://localhost:${port}/patients/${patient._id}`,
            patient: patient
        });
}

export async function deletePatient(req: Request, res: Response) {

    const id = req.params.id;
    const patient = await diService.diPateintSevice.deletePatientById(id);

    return res.status(200).send(
        {
            deletedPatient: patient
        }
    );
}





