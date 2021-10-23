

interface Appointment {
    _id?: string,

    petId: string,

    startTime: Date,

    endTime: Date,

    description: string,

    feePaidBy: string,

    amount: number,

    amountInAmericanDollar?: number,
}


export default Appointment;
