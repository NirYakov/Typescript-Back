import Appointment from "../../models/appointment.model"
import { IAppointmentService } from "../interfaces-services/appointments.interface";


export class AppointmentServiceMock implements IAppointmentService {

    getAppointments(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAppointmentsForPatient(petId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteAppointmentById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAppointmentsByIdFromDb(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async addNewAppointment(appointment: Appointment): Promise<any> {

    }

    getRateToDollar(moneyAmount: number, feePaidBy: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAppointmentsForDay(date: Date): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAllUnpaidAppointments(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAppointmentsByUnpaidFromDb(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getPatientBillById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

// const appointmentsDummy: Appointment[] =
// [
//   {
//     _id: ObjectId("6173dcf073c9b1be33720956"),
//     petId: '6173044f802ac134117fdf46',
//     startTime: ISODate("2000-01-02T10:00:00.000Z"),
//     endTime: ISODate("2000-01-02T11:00:00.000Z"),
//     description: 'description Post mannn',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.28
//   },
//   {
//     _id: ObjectId("6173dd2373c9b1be33720958"),
//     petId: '617304e3166a38931b9300c4',
//     startTime: ISODate("2000-01-02T10:00:00.000Z"),
//     endTime: ISODate("2000-01-02T11:00:00.000Z"),
//     description: 'description 617304e3166a38931b9300c4',
//     feePaidBy: '$',
//     amount: 20,
//     amountInAmericanDollar: 20
//   },
//   {
//     _id: ObjectId("6173dd6f73c9b1be3372095a"),
//     petId: '6173044f802ac134117fdf46',
//     startTime: ISODate("2000-02-02T10:00:00.000Z"),
//     endTime: ISODate("2000-02-02T11:00:00.000Z"),
//     description: 'description ~~',
//     feePaidBy: 'Canadian dollar',
//     amount: 29,
//     amountInAmericanDollar: 23.58
//   },
//   {
//     _id: ObjectId("6173dda173c9b1be3372095c"),
//     petId: '617304cc166a38931b9300c2',
//     startTime: ISODate("2000-01-04T12:00:00.000Z"),
//     endTime: ISODate("2000-01-04T13:00:00.000Z"),
//     description: ' ++== description ',
//     feePaidBy: 'Canadian dollar',
//     amount: 29,
//     amountInAmericanDollar: 23.58
//   },
//   {
//     _id: ObjectId("6173de0073c9b1be3372095e"),
//     petId: '617304fc166a38931b9300c6',
//     startTime: ISODate("2000-01-01T14:00:00.000Z"),
//     endTime: ISODate("2000-01-04T15:00:00.000Z"),
//     description: ' 00  : description',
//     feePaidBy: 'unpaid',
//     amount: 29,
//     amountInAmericanDollar: 29
//   },
//   {
//     _id: ObjectId("6173de3973c9b1be33720960"),
//     petId: '617304e3166a38931b9300c4',
//     startTime: ISODate("2000-01-01T14:00:00.000Z"),
//     endTime: ISODate("2000-01-01T15:00:00.000Z"),
//     description: ' >> description ',
//     feePaidBy: 'dollar',
//     amount: 34,
//     amountInAmericanDollar: 34
//   },
//   {
//     _id: ObjectId("6173de8f73c9b1be33720962"),
//     petId: '617304fc166a38931b9300c6',
//     startTime: ISODate("2000-01-01T15:00:00.000Z"),
//     endTime: ISODate("2000-01-01T16:00:00.000Z"),
//     description: ' [ description ] ',
//     feePaidBy: 'unpaid',
//     amount: 17,
//     amountInAmericanDollar: 17
//   },
//   {
//     _id: ObjectId("61750e77be221da7d519874e"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.31
//   },
//   {
//     _id: ObjectId("61750ea4be221da7d5198751"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.31
//   },
//   {
//     _id: ObjectId("61750ec9be221da7d5198753"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.31
//   },
//   {
//     _id: ObjectId("61750ed8be221da7d5198756"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.31
//   },
//   {
//     _id: ObjectId("617510c6be221da7d5198769"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.34
//   },
//   {
//     _id: ObjectId("617510c6be221da7d519876b"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.34
//   },
//   {
//     _id: ObjectId("6175110cbe221da7d5198771"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.34
//   },
//   {
//     _id: ObjectId("6175110cbe221da7d5198775"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.34
//   },
//   {
//     _id: ObjectId("6175952814c12b50e95db04e"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.31
//   },
//   {
//     _id: ObjectId("6175952914c12b50e95db050"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.31
//   },
//   {
//     _id: ObjectId("6175954e114ab4dab33e0e03"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.31
//   },
//   {
//     _id: ObjectId("6175954f114ab4dab33e0e05"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.31
//   },
//   {
//     _id: ObjectId("61759594136e7ac3b8294ec6"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.31
//   }
//   ,
//   {
//     _id: ObjectId("61759595136e7ac3b8294ec8"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.31
//   },
//   {
//     _id: ObjectId("6175a5f4b7c320a48dedc6b9"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.34
//   },
//   {
//     _id: ObjectId("6175a5f5b7c320a48dedc6bb"),
//     petId: '6173051e166a38931b9300ca',
//     startTime: ISODate("2000-01-09T15:00:00.000Z"),
//     endTime: ISODate("2000-01-09T16:00:00.000Z"),
//     description: '  description ! ',
//     feePaidBy: 'EUR',
//     amount: 20,
//     amountInAmericanDollar: 23.34
//   }
// ]