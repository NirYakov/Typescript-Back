import { Request, Response } from "express";
import config from "config";
import { getPatients, getPatientById, addNewPatient, deletePatientById } from '../service/patients.service'
import Patient from "../models/patient.model";
import axios from "axios";
import { getRandomInt } from "../utills/randomInt";

const port = config.get<number>("port");


export async function getAllPatients(req: Request, res: Response) {

    const patients = await getPatients();

    // console.log("Controller : ", patients);

    return res.send(patients);
}

// app.post('/test', (req, res) => {
//     res.json({requestBody: req.body})  // <==== req.body will be a parsed JSON object
//   })


export async function getPatient(req: Request, res: Response) {
    const id = req.params.id;

    const patient = await getPatientById(id);

    if(!patient) 
    {
        return res.sendStatus(404);
    }

    return res.send(patient);
}


export async function addPatient(req: Request, res: Response) {

    // console.log(req.body);

    const patient: Patient =
    {
        petName: req.body.petName,

        petType: req.body.petType,

        ownerName: req.body.ownerName,

        ownerAddress: req.body.ownerAddress,

        ownerPhone: req.body.ownerPhone,

        petTypeFood: ""
    };

    await addNewPatient(patient);

    return res.status(201).send(
        {
            linkToCreatedById: `http://localhost:${port}/patients/${patient._id}`,
            linkToCreatedName: `http://localhost:${port}/patients/${patient.petName}`,
            patient: patient
        });
}

export async function deletePatient(req: Request, res: Response) {

    const id = req.params.id;
    const patient = await deletePatientById(id);

    return res.status(200).send(
        {
            deletedPatient: patient
        }
    );
}



