
import config from "config";
import { FilterQuery, UpdateQuery } from "mongoose";
import Patient from "../models/patient.model";

import axios from 'axios';

import PatientModel from '../models/Schema/patient.schema';
import { getRandomInt } from "../utills/randomInt";

import { IPatientsService } from './interfaces-services/patients.interface';

export class PatientsService implements IPatientsService {

    async getPatients(): Promise<any> {
        const res = await PatientModel.find();
        // console.log(res);
        return res;
    }

    async deletePatientById(id: string): Promise<any> {
        return await PatientModel.findByIdAndDelete(id);
    }

    async addNewPatient(patient: Patient): Promise<any> {
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

        //  console.log(doc);

        patient._id = doc._id;

        return patient;
    }

    async getPatientById(id: string): Promise<any> {
        const patient = await this.getPatientByIdFromDb(id);
        return patient;
    }

    async getPatientByIdFromDb(id: string): Promise<any> {
        return await PatientModel.findById(id);
    }

}

export class PatientsServiceMock implements IPatientsService {

    getPatients(): Promise<any> {

        console.log("Hey Threre :) !!")
        return new Promise<any>((res, rej) => {
            res({ What: "Whattttt !!" });
        });
    }

    deletePatientById(id: string): Promise<any> {
        return new Promise<any>((res, rej) => {
            res({ deleted: `some user deleted id ${id}` });
        });
    }

    addNewPatient(patient: Patient): Promise<any> {
        return new Promise<any>((res, rej) => {
            res({ newPatient: patient });
        });
    }

    getPatientById(id: string): Promise<any> {
        return this.getPatientByIdFromDb(id);
    }

    getPatientByIdFromDb(id: string): Promise<any> {
        return new Promise<any>((res, rej) => {
            res({
                _id: "617304e3166a38931b9300c4",
                petName: 'may',
                petType: 'fox',
                ownerName: 'may may',
                ownerAddress: 'MOCK DATA',
                ownerPhone: '050-1112232',
                petTypeFood: "Ultra Premium Direct Chat Adulte Stérilisé - Chat d'intérieur"
            });
        });
    }

}

// export async function getPatients(): Promise<any> {
//     return await PatientModel.find();
// }

// export async function deletePatientById(id: string) {
//     return await PatientModel.findByIdAndDelete(id);
// }

// export async function addNewPatient(patient: Patient) {

//     patient.petTypeFood = await getPetFood();

//     const doc = new PatientModel(
//         {
//             petName: patient.petName,

//             petType: patient.petType,

//             ownerName: patient.ownerName,

//             ownerAddress: patient.ownerAddress,

//             ownerPhone: patient.ownerPhone,

//             petTypeFood: patient.petTypeFood,
//         });


//     await doc.save();

//     //  console.log(doc);

//     patient._id = doc._id;

//     return patient;
// }


// export async function getPatientById(id: string) {

//     const patient = await getPatientByIdFromDb(id);

//     return patient;
// }


// export async function getPatientByIdFromDb(id: string) {
//     let patient: Patient | undefined = undefined;

//     await PatientModel.findById(id)
//         .then(async document => {
//             patient = document !== null ? document : undefined;
//             return patient;
//         })
//         .catch(err => {
//             console.log("Error : ", err);
//         });

//     return patient;
// }








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

    // const subs = await CompetitionModel.findOneAndUpdate(
    // { id: req.params.id }, // <------ req.params.id is what you should pass.
    // { subscriptions: req.body },
    // )