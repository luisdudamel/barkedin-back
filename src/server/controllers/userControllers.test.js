const User = require("../../database/models/User");
const { registerUser } = require("./userControllers");

User.findOne = jest.fn().mockReturnValue(false);
User.create = jest.fn().mockResolvedValue(true);

describe("Given a registerUser controller", () => {
  describe("When its called with a name, 'Marta', username 'Marta' and a password '1234'", () => {
    test("Then it should call the responses method json with a 201, and the method json with the message 'New user created succesfully'", async () => {
      const expectedStatus = 201;
      const expectedMessage = { msg: "New user created succesfully" };
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
});
