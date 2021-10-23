import axios from 'axios';
import config from 'config';
//  import app from '../app'; 

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
        "ownerPhone": "050-1112234"
      };

      const response = await axios({
        method: 'post',
        url: `http://localhost:${port}/patients`,
        data: patObj

      });

      expect(response.status).toBe(201);
    })
  })
});

test.only("should specify json in the content type header", async () => {

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
      url: `http://localhost:${port}/patients`,
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
            url: `http://localhost:${port}/patients`,
            data: patObj[i]
          })
            .then(function (response: any) {
              // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
              const statCode = response.status;

              numberSt = statCode;
              return statCode;

            }).catch(e => {
              // console.log({
              //   message: "oops :(",
              //   error: e,
              // })

              numberSt = e.response.status;

            });

          console.log("response.status : ", numberSt);
          expect(numberSt).toBe(404);
        }
      })
    })
  });
