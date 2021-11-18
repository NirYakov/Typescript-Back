import Patient from "../../models/patient.model";
import { IPatientsService } from "../interfaces-services/patients.interface";

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



const patientsDummy: Patient[] =
    [
        {
            _id: "6172e559533a321ae52b6a38",
            petName: 'new',
            petType: 'wolf',
            ownerName: 'new new',
            ownerAddress: 'holon',
            ownerPhone: '050-1112230',
            petTypeFood: 'Salmon and Sweet Potato Recipe Dog Food',
        },
        {
            _id: "6172f797fed73682f2128f97",
            petName: 'mor',
            petType: 'wolf',
            ownerName: 'mor mor',
            ownerAddress: 'holon',
            ownerPhone: '050-1112230',
            petTypeFood: 'Leckerlie Mix',
        },
        {
            _id: "6172f9d2fed73682f2128f99",
            petName: 'ray',
            petType: 'dog',
            ownerName: 'ray ray',
            ownerAddress: 'holon',
            ownerPhone: '050-1112230',
            petTypeFood: 'Dentalife',
        },
        {
            _id: "6172f9eafed73682f2128f9b",
            petName: 'ben',
            petType: 'cat',
            ownerName: 'ben ben',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112230',
            petTypeFood: 'Salmon and Sweet Potato Recipe Dog Food',
        },
        {
            _id: "6172fa06fed73682f2128f9d",
            petName: 'yan',
            petType: 'mouse',
            ownerName: 'yan yan',
            ownerAddress: 'tel aviv yafo',
            ownerPhone: '050-1112239',
            petTypeFood: 'Carrefour émincés pour chat',
        },
        {
            _id: "6172fa18fed73682f2128f9f",
            petName: 'may',
            petType: 'fox',
            ownerName: 'may may',
            ownerAddress: 'holon',
            ownerPhone: '050-1112232',
            petTypeFood: "Ultra Premium Direct Chat Adulte Stérilisé - Chat d'intérieur",
       },
        {
            _id: "6172fa25fed73682f2128fa1",
            petName: 'ran',
            petType: 'cat',
            ownerName: 'ran ran',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Ragoût au veau, à la dinde et aux légumes',
        },
        {
            _id: "6173044f802ac134117fdf46",
            petName: 'lee',
            petType: 'cat',
            ownerName: 'lee lee',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Mini Mix'
        },
        {
            _id: "617304cc166a38931b9300c2",
            petName: 'ran',
            petType: 'cat',
            ownerName: 'ran ran',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Salchicha con ternera y zanahoria'
        },
        {
            _id: "617304e3166a38931b9300c4",
            petName: 'may',
            petType: 'fox',
            ownerName: 'may may',
            ownerAddress: 'holon',
            ownerPhone: '050-1112232',
            petTypeFood: "Ultra Premium Direct Chat Adulte Stérilisé - Chat d'intérieur"
        },
        {
            _id: "617304fc166a38931b9300c6",
            petName: 'yan',
            petType: 'mouse',
            ownerName: 'yan yan',
            ownerAddress: 'tel aviv yafo',
            ownerPhone: '050-1112239',
            petTypeFood: "Ultra Premium Direct Chat Adulte Stérilisé - Chat d'intérieur"
        },
        {
            _id: "6173050d166a38931b9300c8",
            petName: 'ben',
            petType: 'cat',
            ownerName: 'ben ben',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112230',
            petTypeFood: 'Mini Mix'
        },
        {
            _id: "6173051e166a38931b9300ca",
            petName: 'ray',
            petType: 'dog',
            ownerName: 'ray ray',
            ownerAddress: 'holon',
            ownerPhone: '050-1112230',
            petTypeFood: 'Fusées'
        },
        {
            _id: "61730532166a38931b9300cc",
            petName: 'mor',
            petType: 'wolf',
            ownerName: 'mor mor',
            ownerAddress: 'holon',
            ownerPhone: '050-1112230',
            petTypeFood: 'Fusées'
        },
        {
            _id: "61730541166a38931b9300ce",
            petName: 'new',
            petType: 'wolf',
            ownerName: 'new new',
            ownerAddress: 'holon',
            ownerPhone: '050-1112230',
            petTypeFood: 'MwSt Balls'
        },
        {
            _id: "61730552166a38931b9300d0",
            petName: 'new',
            petType: 'wolf',
            ownerName: 'new new',
            ownerAddress: 'holon',
            ownerPhone: '050-1112230',
            petTypeFood: 'Puppy & Junior Heritage Formula'
        },
        {
            _id: "617308dd73962088abc93382",
            petName: 'new',
            petType: 'wolf',
            ownerName: 'new new',
            ownerAddress: 'holon',
            ownerPhone: '050-1112230',
            petTypeFood: 'Puppy & Junior Heritage Formula'
        },
        {
            _id: "61730b08215ef587d93e89c8",
            petName: 'hue',
            petType: 'wolf',
            ownerName: 'hue hue',
            ownerAddress: 'holon',
            ownerPhone: '050-1112230',
            petTypeFood: 'Ragoût au veau, à la dinde et aux légumes'
        },
        {
            _id: "61744ae051dab9b3716fec58",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Leckerlie Mix'
        },
        {
            _id: "61744c98e7aadb56d617e69c",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Salchicha con ternera y zanahoria'
        }
        ,
        {
            _id: "61744ec65c181540b473b4b6",
            petName: 'mor',
            petType: 'wolf',
            ownerName: 'mor mor',
            ownerAddress: 'holon',
            ownerPhone: '050-1112230',
            petTypeFood: 'Puppy & Junior Heritage Formula'
        },
        {
            _id: "6174500236dae005e1a5c58f",
            petName: 'mor',
            petType: 'wolf',
            ownerName: 'mor mor',
            ownerAddress: 'holon',
            ownerPhone: '050-1112230',
            petTypeFood: 'Carrefour émincés pour chat'
        },
        {
            _id: "6174528b2071436dda908e1d",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Carrefour émincés pour chat'
        },
        {
            _id: "617459eee24d29a5d8ad4f9b",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Ragoût au veau, à la dinde et aux légumes'
        },
        {
            _id: "61745a6ce24d29a5d8ad4f9d",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Ragoût au veau, à la dinde et aux légumes'
        },
        {
            _id: "617505678f8e6dc3ccfc24ce",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Ragoût au veau, à la dinde et aux légumes'
        },
        {
            _id: "617505688f8e6dc3ccfc24d0",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Puppy & Junior Heritage Formula'
        },
        {
            _id: "6175069e8f8e6dc3ccfc24da",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'MwSt Balls'
        },
        {
            _id: "6175075070e454aef23ac3e5",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-0000000',
            petTypeFood: 'Dentalife'
        },
        {
            _id: "6175083970e454aef23ac3ea",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Salchicha con ternera y zanahoria'
        },
        {
            _id: "6175110cbe221da7d5198773",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-0000000',
            petTypeFood: 'Fusées'
        },
        {
            _id: "6175110dbe221da7d5198778",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Salmon and Sweet Potato Recipe Dog Food'
        },
        {
            _id: "6175a5eeb7c320a48dedc6b3",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-0000000',
            petTypeFood: 'Salchicha con ternera y zanahoria'
        },
        {
            _id: "6175a5f0b7c320a48dedc6b5",
            petName: 'tst',
            petType: 'cat',
            ownerName: 'tst tst',
            ownerAddress: 'ramat gan',
            ownerPhone: '050-1112234',
            petTypeFood: 'Salmon and Sweet Potato Recipe Dog Food'
        }
    ];