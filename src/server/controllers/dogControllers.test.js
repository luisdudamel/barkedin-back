const User = require("../../database/models/User");
const { getFavDogs } = require("./dogControllers");

const mockToken = "token";
jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: () => mockToken,
}));

describe("Given a getFavDogs controller", () => {
  describe("When its called with an existent username with existent faved dogs", () => {
    test("Then it should call the responses status method with a 200", async () => {
      const req = {
        body: {
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
        body: {
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
