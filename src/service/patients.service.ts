
import config from "config";
import { FilterQuery, UpdateQuery } from "mongoose";
import Patient from "../models/patient.model";

import axios from 'axios';
import getRandomInt from "../utills/randomInt";

// import fetch from 'node-fetch';

export async function getPatients() {
    return patients;
}

export async function deletePatientById(id: number) 
{
    const patient = patients.find( n => n.id == id);
    
    patients.splice(id, 1);

    return patient;
}

export async function addNewPatient( patient: Patient) 
{
    const lastId = patients[patients.length-1].id;
    patient.id = lastId;

    patient.id = getRandomInt(2_000_000_000);

    patients.push(patient);

    return true;
}


export async function getPatientById(id: number) {
   
    const patient = patients.find( n => n.id == id);
    return patient;
}

export async function getPatientByName(name: string) {
   
    const patient = patients.find( n => n.petType == name);
    return patient;
}

const patients: Patient[] =
    [
        {
            id: 0,

            petName: "ray",

            petType: "dog",

            ownerName: "ray ray",

            ownerAddress: "holon",

            ownerPhone: "050-1112230",

            petTypeFood: "Fusées"
        },
        {
            id: 1,
            petName: "ben",

            petType: "cat",

            ownerName: "ben ben",

            ownerAddress: "ramat gan",

            ownerPhone: "050-1112239",

            petTypeFood: "Leckerlie Mix"
        },
        {
            id: 2,
            petName: "yan",

            petType: "mouse",

            ownerName: "yan yan",

            ownerAddress: "tel aviv yafo",

            ownerPhone: "059-1112239",

            petTypeFood: "Salmon and Sweet Potato Recipe Dog Food"
        },
        {
            id: 3,
            petName: "may",

            petType: "fox",

            ownerName: "may may",

            ownerAddress: "holon",

            ownerPhone: "050-1112232",

            petTypeFood: "Leckerlie Mix"
        },
        {
            id: 4,
            petName: "ran",

            petType: "cat",

            ownerName: "ran ran",

            ownerAddress: "ramat gan",

            ownerPhone: "050-1112234",

            petTypeFood: "Salchicha con ternera y zanahoria"
        },
    ];