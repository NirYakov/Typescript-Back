
import config from "config";
import { FilterQuery, UpdateQuery } from "mongoose";
import Patient from "../models/patient.model";

import axios from 'axios';

import PatientModel from '../models/Schema/patient.schema';
import { getRandomInt } from "../utills/randomInt";

// import fetch from 'node-fetch';

let patients: Patient[];

export async function getPatients() {

    await PatientModel.find()
        .then(async documents => {
            // console.log(documents);

            patients = documents;
            return patients;
        })
        .catch(err => {
            console.log("Error : ", err);
        });

    return patients;
}

export async function deletePatientById(id: string) {
    const index = patients.findIndex(n => n._id == id);
    const patient = patients[index];


    patients.splice(index, 1);

    await PatientModel.findByIdAndDelete(id);

    return patient;
}

export async function addNewPatient(patient: Patient) {

    patient.petTypeFood = await getPetFood();

    const doc = new PatientModel(
        {
            petName: patient.petName,

            petType: patient.petType,

            ownerName: patient.ownerName,

            ownerAddress: patient.ownerAddress,

            ownerPhone: patient.ownerPhone,

            petTypeFood: patient.petTypeFood,
        });


    await doc.save();

    console.log(doc);

    patient._id = doc._id;

    patients.push(patient);

    return patient;
}


export async function getPatientById(id: string) {

    const patient = patients.find(n => n._id == id);
    return patient;
}

export async function getPatientByName(name: string) {

    const patient = patients.find(n => n.petType == name);
    return patient;
}

// const subs = await CompetitionModel.findOneAndUpdate(
// { id: req.params.id }, // <------ req.params.id is what you should pass.
// { subscriptions: req.body },
// )





export async function getPetFood(): Promise<string> {
    let petTypeFood = "";
    const rndFoodIndex = getRandomInt(12);


    await axios({
        method: 'get',
        url: `https://world.openpetfoodfacts.org/api/v0/product/${petFoodBarcodes[rndFoodIndex]}.json`,
    })
        .then(function (response: any) {
            // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            petTypeFood = response.data.product.product_name;
            console.log("RESPONSE: ", petTypeFood);
            // patient.petTypeFood = petTypeFood;
            return petTypeFood;

        }).catch(e => {
            console.log({
                message: "oops :(",
                error: e,
            })
        });

    return petTypeFood;
}





const petFoodBarcodes =
    [
        "20106836", "3760026300986", "0064992500115",
        "8480000520975", "3596710314454", "0730582000524",

        "4008239310002", "7613036724258", "4388860186727",
        "4053222560735", "3560070495429", "4099100129434",
    ];



const patientsDummy: Patient[] =
    [
        {
            _id: "0",

            petName: "ray",

            petType: "dog",

            ownerName: "ray ray",

            ownerAddress: "holon",

            ownerPhone: "050-1112230",

            petTypeFood: "Fusées"
        },
        {
            _id: "1",
            petName: "ben",

            petType: "cat",

            ownerName: "ben ben",

            ownerAddress: "ramat gan",

            ownerPhone: "050-1112239",

            petTypeFood: "Leckerlie Mix"
        },
        {
            _id: "2",
            petName: "yan",

            petType: "mouse",

            ownerName: "yan yan",

            ownerAddress: "tel aviv yafo",

            ownerPhone: "059-1112239",

            petTypeFood: "Salmon and Sweet Potato Recipe Dog Food"
        },
        {
            _id: "3",
            petName: "may",

            petType: "fox",

            ownerName: "may may",

            ownerAddress: "holon",

            ownerPhone: "050-1112232",

            petTypeFood: "Leckerlie Mix"
        },
        {
            _id: "4",
            petName: "ran",

            petType: "cat",

            ownerName: "ran ran",

            ownerAddress: "ramat gan",

            ownerPhone: "050-1112234",

            petTypeFood: "Salchicha con ternera y zanahoria"
        },
    ];
