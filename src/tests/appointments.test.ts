
import axios from 'axios';
import config from 'config';


const port = config.get<number>("port");


describe("GET /appointments/unpaid", () => {
    describe("give all clear for the patient status code 200", () => {

        test("should respond with a 200 status code", async () => {
            const url = `http://localhost:${port}/appointments/unpaid`;
            let numberStatus = 0;

            await axios({
                method: 'get',
                url: url,
            }).then(response => {
                numberStatus = response.status;
            }).catch(e => {
                console.log(e);
            });

            expect(numberStatus).toBe(200);

        })
    })
});


describe("GET /appointments/day/:date", () => {
    describe("get appointments ap for 2000-01-01 should return status code 200 ", () => {

        test("should respond with a 200 status code", async () => {
            const url = `http://localhost:${port}/appointments/day/2000-01-01`;
            let numberStatus = 0;

            await axios({
                method: 'get',
                url: url,
            }).then(response => {
                numberStatus = response.status;
            }).catch(e => {
                console.log(e);
            });

            expect(numberStatus).toBe(200);

        })
    })
});


describe("GET /patientbill/:id", () => {
    describe("get appointments bill for 617304fc166a38931b9300c6 should return status code 200 ", () => {

        test("should respond with a 200 status code", async () => {
            const url = `http://localhost:${port}/patientbill/617304fc166a38931b9300c6`;
            let numberStatus = 0;

            await axios({
                method: 'get',
                url: url,
            }).then(response => {
                numberStatus = response.status;
            }).catch(e => {
                console.log(e);
            });

            expect(numberStatus).toBe(200);

        })
    })
});




describe("POST /appointments", () => {
    describe("give all clear for the appointments", () => {

        test("should respond with a 201 status code", async () => {
            const url = `http://localhost:${port}/appointments`;
            const appoObj = {
                "petId": "6173051e166a38931b9300ca",
                "startTime": "2000-01-09T15:00:00.000Z",
                "endTime": "2000-01-09T16:00:00.000Z",
                "description": "  description ! ",
                "feePaidBy": "EUR",
                "amount": 20
            };

            let numberStatus = 0;

            await axios({
                method: 'post',
                url: url,
                data: appoObj

            }).then(response => {
                numberStatus = response.status;
            }).catch(e => {
                console.log(e);
            });

            expect(numberStatus).toBe(201);
        })
    })
});

test("should specify json in the content type header", async () => {

    const url = `http://localhost:${port}/appointments`;
    const appoObj = {
        "petId": "6173051e166a38931b9300ca",
        "startTime": "2000-01-09T15:00:00.000Z",
        "endTime": "2000-01-09T16:00:00.000Z",
        "description": "  description ! ",
        "feePaidBy": "EUR",
        "amount": 20
    };

    const response = await axios({
        method: 'post',
        url: url,
        data: appoObj
    }).catch(e => {
        console.log({
            message: "oops :(",
            error: e,
        })
    });

    expect(response!.headers['content-type']).toEqual(expect.stringContaining("json"))
})



describe("POST /appointments", () => {
    describe("not all params for the appointments", () => {

        test("should respond with a 404 status code", async () => {
            const url = `http://localhost:${port}/appointments`;
            const appoObj =
                [
                    {},
                {
                    "startTime": "2000-01-014T15:00:00.000Z",
                    "endTime": "2000-01-014T16:00:00.000Z",
                    "description": "  description ! ",
                    "feePaidBy": "EUR",
                    "amount": 17
                },
                {
                    "petId": "6173051e166a38931b9300ca",
                },
                {
                    "petId": "6173051e166a38931b9300ca",
                    "startTime": "2000-01-014T15:00:00.000Z",
                    "endTime": "2000-01-014T16:00:00.000Z",
                }
                ];

            for (let i = 0; i < appoObj.length; i++) {
                let numberSt: any;

                await axios({
                    method: 'post',
                    url: url,
                    data: appoObj[i]
                })
                    .then(function (response) {
                        const statCode = response.status;

                        numberSt = statCode;
                        return statCode;

                    }).catch(e => {

                        numberSt = e.response.status;

                    });

                expect(numberSt).toBe(404);
            }
        })
    })
});


describe("Get /appointments/:id", () => {

    const id = '6173044f802ac134117fdf46';
    describe(`get all appointments for ${id}`, () => {

        test("should respond with a 200 status code", async () => {

            let numberSt = 0.0;
            const url = `http://localhost:${port}/appointments/${id}`;
            await axios({
                method: 'get',
                url: url
            })
                .then(function (response) {
                    const statCode = response.status;

                    numberSt = statCode;
                    return statCode;

                }).catch(e => {
                    numberSt = e.response.status;

                });

            expect(numberSt).toBe(200);
        }
        )
    })
});