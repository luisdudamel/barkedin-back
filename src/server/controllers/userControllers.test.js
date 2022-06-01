const bcrypt = require("bcrypt");
const User = require("../../database/models/User");
const { registerUser, loginUser } = require("./userControllers");

const mockToken = "token";
jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: () => mockToken,
}));

describe("Given a registerUser controller", () => {
  describe("When its called with a inexistent username: name, 'Marta', username 'Marta' and a password '1234'", () => {
    test("Then it should call the responses method json with a 201, and the method json with the message 'New user created succesfully'", async () => {
      User.findOne = jest.fn().mockReturnValue(false);
      User.create = jest.fn().mockResolvedValue(true);

      const expectedStatus = 201;
      const expectedMessage = { message: "New user created succesfully" };
      const req = {
        body: {
          name: "Marta",
          username: "Marta",
          password: "1234",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const next = jest.fn();

      await registerUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When its called with a existent username: name, 'Marta', username 'Marta' and a password '1234'", () => {
    test("Then it should call the next function with an error", async () => {
      User.findOne = jest.fn().mockReturnValue(true);

      const req = {
        body: {
          name: "Marta",
          username: "Marta",
          password: "1234",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      const errorExpected = new Error();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(errorExpected);
    });
  });

  describe("When its called with an inexistent request body", () => {
    test("Then it should call the next function with an error", async () => {
      const errorExpected = new Error();
      User.findOne = jest.fn().mockReturnValue(errorExpected);

      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a userLogin controller", () => {
  describe("When its called with a existent username 'Marta' and a password '1234'", () => {
    test("Then it should call the responses method status with a 200, and the method json with a token'", async () => {
      const expectedStatus = 200;
      const req = {
        body: {
          username: "Marta",
          password: "1234",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });
  });

  describe("When its called with a non existent username 'Marta'", () => {
    test("Then it should call the next function with a message 'Incorrect username'", async () => {
      const req = {
        body: {
          username: "Marta",
          password: "1234",
        },
      };
      User.findOne = jest.fn().mockReturnValue(false);
      const next = jest.fn();
      const mockedError = new Error();
      mockedError.message = "Incorrect username";

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(mockedError);
    });
  });

  describe("When its called with an existent username 'Marta' and an incorrect password", () => {
    test("Then it should call the next function with a message 'Incorrect password'", async () => {
      const req = {
        body: {
          username: "Marta",
          password: "1234",
        },
      };

      const next = jest.fn();
      const mockedError = new Error();
      mockedError.message = "Incorrect password";

      User.findOne = jest.fn().mockReturnValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(mockedError);
    });
  });
});
