const User = require("../../database/models/User");
const mongoose = require("../mocks/mongoose");
const { userWithFavsMock } = require("../mocks/userMocks");
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
        populate: jest.fn(() => ({
          populate: jest.fn(() => Promise.resolve([])),
        })),
      }));

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await getFavDogs(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedError);
    });
  });
});
