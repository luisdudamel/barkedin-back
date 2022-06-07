const User = require("../../database/models/User");
const mockCreateDog = require("../mocks/dogMocks");
const { getFavDogs, deleteFavDog, createFavDog } = require("./dogControllers");

const mockToken = "token";
jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: () => mockToken,
}));

jest.mock("../../database/models/Dog", () => ({
  ...jest.requireActual("../../database/models/Dog"),
  findByIdAndDelete: jest
    .fn()
    .mockResolvedValueOnce(true)
    .mockRejectedValueOnce(new Error()),
  create: jest.fn().mockResolvedValue({ id: "1234" }),
  findOneAndUpdate: jest.fn().mockResolvedValueOnce(true),
}));

jest.mock("../../database/models/User", () => ({
  ...jest.requireActual("../../database/models/User"),
  findOneAndUpdate: jest.fn().mockResolvedValueOnce(true),
}));

describe("Given a getFavDogs controller", () => {
  describe("When its called with an existent username with existent faved dogs", () => {
    test("Then it should call the responses status method with a 200", async () => {
      const req = {
        userId: {
          username: "luis1",
          password: "1234",
        },
      };
      const expectedError = 200;

      User.findOne = jest.fn(() => ({
        populate: jest.fn().mockReturnValue("Doggies"),
      }));

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await getFavDogs(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When its called with a not existent username", () => {
    test("Then it should call the next function", async () => {
      const req = {
        userId: {
          username: "luis1",
          password: "1234",
        },
      };

      User.findOne = jest.fn(() => ({
        populate: jest.fn().mockReturnValue(null),
      }));

      const next = jest.fn();
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await getFavDogs(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a deleteFavDog controller", () => {
  describe("When its called with existent dog", () => {
    test("Then it should call the responses method with a 200 and json method with the message 'Dog succesfully deleted'", async () => {
      const req = {
        params: { idDog: 1234 },
      };
      const expectedStatus = 200;
      const expectedMessage = { message: "Dog succesfully deleted" };

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await deleteFavDog(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When its called with a non existent dog", () => {
    test("Then it should call the responses method with a 200 and json method with the message 'Dog succesfully deleted'", async () => {
      const req = {
        params: { idDog: "1234" },
      };

      const next = jest.fn();
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await deleteFavDog(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a createFavDog controller", () => {
  describe("When its called with a dog", () => {
    test("Then it should call the responses method with a 201 and json method with the message 'Dog succesfully Created'", async () => {
      const req = {
        body: {
          username: "Firu",
          newDog: mockCreateDog.mockJsonCreateDog,
        },
        file: { filename: "Foto de firu.jpg" },
      };
      const expectedStatus = 201;
      const expectedMessage = { message: "Dog succesfully created" };

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      await createFavDog(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When its called with a dog", () => {
    test("Then it should call the responses method with a 201 and json method with the message 'Dog succesfully Created'", async () => {
      const req = {
        body: {
          username: "Firu",
          newDog: mockCreateDog.mockJsonCreateDog,
        },
        file: { filename: "Foto de firu.jpg" },
      };
      const expectedStatus = 201;
      const expectedMessage = { message: "Dog succesfully created" };

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      await createFavDog(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When its called with a dog with no image file", () => {
    test("Then it should call the next function", async () => {
      const req = {
        body: {
          username: "Firu",
          newDog: mockCreateDog,
        },
        file: {},
      };

      jest.mock("fs", () => ({
        ...jest.requireActual("fs"),
        rename: jest.fn().mockRejectedValueOnce(-1),
      }));

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      await createFavDog(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
