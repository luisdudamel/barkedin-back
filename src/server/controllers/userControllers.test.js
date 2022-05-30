const { registerUser } = require("./userControllers");

describe("Given a registerUser controller", () => {
  describe("When its called with a name, 'Marta', username 'Marta' and a password '1234'", () => {
    test("Then it should call the responses method json with a 201, and the method json with the message 'New user created succesfully'", async () => {
      const expectedStatus = 201;
      const newUserToRegister = {
        body: {
          name: "Marta",
          username: "Marta",
          password: "1234",
        },
      };

      await registerUser(newUserToRegister, null, null);

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      expect(res.json).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
