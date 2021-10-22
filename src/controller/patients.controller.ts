import { Request, Response } from "express";
import config from "config";
import { getPatients, getPatientById, addNewPatient, deletePatientById } from '../service/patients.service'
import Patient from "../models/patient.model";
import axios from "axios";
import getRandomInt from "../utills/randomInt";

const port = config.get<number>("port");


export async function getAllPatients(req: Request, res: Response) {
    // const userId = res.locals.user._id;

    const patients = await getPatients();

    return res.send(patients);
}

// app.post('/test', (req, res) => {
//     res.json({requestBody: req.body})  // <==== req.body will be a parsed JSON object
//   })


export async function getPatient(req: Request, res: Response) {
    const id = req.params.id;

    const patient = await getPatientById(+id);


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


    patient.petTypeFood = await getPetFood();

    // console.log(patient);

    await addNewPatient(patient);

    return res.status(201).send(
        {
            linkToCreatedById: `http://localhost:${port}/patients/${patient.id}`,
            linkToCreatedName: `http://localhost:${port}/patients/${patient.petName}`,
            patient: patient
        });
}

export async function deletePatient(req: Request, res: Response) {

    const id = req.params.id;
    const patient = await deletePatientById(+id);

    return res.status(200).send(
        {
            deletedPatient: patient
        }
    );
}



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