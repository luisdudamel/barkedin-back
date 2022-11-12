const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");

const jwt = require("jsonwebtoken");
const connectDB = require("../../database/index");
const User = require("../../database/models/User");
const { app } = require("../index");

const {
  mockUserDogPaginated,
  mockPaginatedResponse,
  mockCreateDog,
  mockEditedDog,
} = require("../mocks/dogMocks");
const Dog = require("../../database/models/Dog");
const { mockUser } = require("../mocks/userMocks");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await Dog.create(mockCreateDog);
  await Dog.create(mockEditedDog);
  await User.create(mockUser);
});

afterEach(async () => {
  await User.deleteMany({});
  await Dog.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a GET 'dogs/favdogs/0' endpoint", () => {
  describe("When it receives a request with an existent username ", () => {
    test("Then it should respond with status 200 and a list of the user's fav dogs''", async () => {
      const existentUserMock = {
        username: "paco",
        page: 0,
      };

      jwt.verify = jest.fn().mockResolvedValue("1234");

      User.findOne = jest.fn(() => ({
        populate: jest.fn().mockReturnValue(mockUserDogPaginated),
      }));

      const { _body: favdogs } = await request(app)
        .get("/dogs/favdogs/0")
        .send(existentUserMock)
        .set("Authorization", "Bearer 1234")
        .expect(200);

      expect(favdogs).toEqual(mockPaginatedResponse);
    });
  });
});

describe("Given a DELETE 'dogs/:idDog' endpoint", () => {
  describe("When it receives a request with an existent dog ", () => {
    test("Then it should respond with status 200 and a message 'Dog succesfully deleted'", async () => {
      const existentUserMock = {
        id: "62a04cae43289d71a6e728a2",
      };
      const expectedMessage = { message: "Dog succesfully deleted" };

      jwt.verify = jest
        .fn()
        .mockReturnValue({ id: "62a04cae43289d71a6e728a2" });

      const { body: message } = await request(app)
        .delete("/dogs/62966036b74969251496bffd")
        .send(existentUserMock)
        .set("Authorization", "Bearer 1234")
        .expect(200);

      expect(message).toEqual(expectedMessage);
    });
  });
});
