const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");

const connectDB = require("../../database/index");
const User = require("../../database/models/User");
const { app } = require("../index");

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

describe("Given a POST 'users/register' endpoint", () => {
  describe("When it receives a request with valid name, username and password", () => {
    test("Then it should respond with status 201 and message 'New user created succesfully''", async () => {
      const newUserData = {
        name: "paco",
        username: "paco",
        password: "paco",
      };

      const expectedMessage = "New user created succesfully";

      const { body } = await request(app)
        .post("/users/register")
        .send(newUserData)
        .expect(201);

      expect(body.msg).toBe(expectedMessage);
    });
  });
});
