
import config from "config";
import { FilterQuery, UpdateQuery } from "mongoose";
import Patient from "../models/patient.model";

import axios from 'axios';

// import fetch from 'node-fetch';

export async function getPatients() {
    return patients;
}


const petFoodBarcodes =
    [
        "20106836", "3760026300986", "0064992500115",
        "8480000520975", "3596710314454", "0730582000524",

        "4008239310002", "7613036724258", "4388860186727",
        "4053222560735", "3560070495429", "4099100129434",
    ];
    

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export async function getPatientById(id: number) {
    let petTypeFood = "";
    const patient = patients[id];
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

        }).catch(e => {
            console.log({
                message: "oops :(",
                error: e,
            })
        });

    patient.petTypeFood = petTypeFood;

    return patient;
}


const patients: Patient[] =
    [
        {
            id: 0,

            patName: "ray",

            patType: "dog",

            ownerName: "ray ray",

            ownerAddress: "holon",

            ownerPhone: "050-1112230",

            petTypeFood: ""
        },
        {
            id: 1,
            patName: "ben",

            patType: "cat",

            ownerName: "ben ben",

            ownerAddress: "ramat gan",

            ownerPhone: "050-1112239",

            petTypeFood: ""
        },
        {
            id: 2,
            patName: "yan",

            patType: "mouse",

            ownerName: "yan yan",

            ownerAddress: "tel aviv yafo",

            ownerPhone: "059-1112239",

            petTypeFood: ""
        },
        {
            id: 3,
            patName: "may",

            patType: "fox",

            ownerName: "may may",

            ownerAddress: "holon",

            ownerPhone: "050-1112232",

            petTypeFood: ""
        },
        {
            id: 4,
            patName: "ran",

            patType: "cat",

            ownerName: "ran ran",

            ownerAddress: "ramat gan",

            ownerPhone: "050-1112234",

            petTypeFood: ""
        },
    ];