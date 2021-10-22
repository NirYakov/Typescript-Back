import { Schema, model } from 'mongoose';
import Appointment from '../appointment.model';

  const schema = new Schema<Appointment>({

    petId: { type: String, required: true },

    startTime: { type: Date, required: true },

    endTime: { type: Date, required: true },

    feePaidBy: { type: String, required: true }, 

    amount: { type: Number, required: true },

    amountInAmericanDollar: { type: Number, required: true },

  },{ versionKey : false });

  // 3. Create a Model.
const AppointmentModel = model<Appointment>('Appointment', schema);

export default AppointmentModel;