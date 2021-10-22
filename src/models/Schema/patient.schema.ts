import { Schema, model } from 'mongoose';
import Patient from '../patient.model';

// 1. Create an interface representing a document in MongoDB.

// Patient

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<Patient>({
    petName: { type: String, required: true },
    
    petType: { type: String, required: true },
    
    ownerName: { type: String, required: true },
    
    ownerAddress: { type: String, required: true },

    ownerPhone: { type: String, required: true },
    
    petTypeFood: { type: String, required: true },
}, { versionKey : false });

// 3. Create a Model.
const PatientModel = model<Patient>('Patient', schema);

export default PatientModel;