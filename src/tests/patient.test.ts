import axios from 'axios';
import config from 'config';

const port = config.get<number>("port");

describe("POST /patient", () => {
  describe("give all clear for the patient", () => {

    test("should respond with a 201 status code", async () => {
      const url = `http://localhost:${port}/patients`;
      const patObj = {
        "petName": "tst",
        "petType": "cat",
        "ownerName": "tst tst",
        "ownerAddress": "ramat gan",
        "ownerPhone": "050-0000000"
      };

      let numberStatus = 0;

      await axios({
        method: 'post',
        url: url,
        data: patObj

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

  const url = `http://localhost:${port}/patients`;
  const patObj = {
    "petName": "tst",
    "petType": "cat",
    "ownerName": "tst tst",
    "ownerAddress": "ramat gan",
    "ownerPhone": "050-1112234"
  };

  const response = await axios({
    method: 'post',
    url: url,
    data: patObj

  }).catch(e => {
    console.log({
      message: "oops :(",
      error: e,
    })
  });

  expect(response!.headers['content-type']).toEqual(expect.stringContaining("json"))
})



describe("POST /patients", () => {
  describe("not all params for the patient", () => {

    test("should respond with a 404 status code", async () => {
      const url = `http://localhost:${port}/patients`;
      const patObj =
        [{
          "petName": "tst",
          "petType": "cat",
          "ownerName": "tst tst",
          "ownerAddress": "ramat gan",
        },
        {
          "petName": "tst",
          "petType": "cat",
          "ownerName": "tst tst",
          "ownerPhone": "050-1112230"
        },
        {
          "petName": "tst",
          "ownerAddress": "ramat gan",
        },
        {
          "petName": "tst",
          "petType": "cat",
        },
        {},
        {
          "ownerName": "tst tst",
          "ownerPhone": "050-1112230"
        }
        ];

      for (let i = 0; i < patObj.length; i++) {
        let numberSt: any;

        await axios({
          method: 'post',
          url: url,
          data: patObj[i]
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


describe("Get /patients", () => {
  describe("get all patient", () => {

    test("should respond with a 200 status code", async () => {

      let numberSt = 0.0;
      const url = `http://localhost:${port}/patients`;
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