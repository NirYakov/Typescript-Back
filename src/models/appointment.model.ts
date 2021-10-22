interface Appointment {
    id?: number,

    petId: number,

    startTime: Date,

    endTime: Date,

    feePaidBy: string, // dollar or euro or Canadian dollar /unpaid 

    amount: number,
}

// dollar or euro or Canadian dollar /unpaid 

export default Appointment;