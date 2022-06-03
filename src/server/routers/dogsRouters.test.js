const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");

const jwt = require("jsonwebtoken");
const connectDB = require("../../database/index");
const User = require("../../database/models/User");
const { app } = require("../index");
const getUserFavsResponse = require("../mocks/userMocks");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await connectDB(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a GET 'dogs/favdogs' endpoint", () => {
  describe("When it receives a request with an existent username ", () => {
    test("Then it should respond with status 201 and message 'New user created succesfully''", async () => {
      const existentUserMock = {
        username: "paco",
      };

      jwt.verify = jest.fn().mockResolvedValue("tokencito");

      User.findOne = jest.fn(() => ({
        populate: jest.fn().mockReturnValue(getUserFavsResponse),
      }));

      const { _body: favdogs } = await request(app)
        .get("/dogs/favdogs")
        .send(existentUserMock)
        .set("Authorization", "Bearer 1234")
        .expect(200);

      expect(favdogs).toEqual(getUserFavsResponse);
    });
  });
});
