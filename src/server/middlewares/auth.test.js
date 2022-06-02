const { auth } = require("./auth");

const mockId = { name: "Rocko", username: "The dog", password: "1234" };

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  verify: () => mockId,
}));

describe("Given the auth function", () => {
  describe("When it receives a request with a valid token", () => {
    const req = {
      headers: {
        authorization: "Bearer ",
      },
    };

    test("Then the 'next' function should be invoked", () => {
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });

    test("Then it should add to the received request the user id by the token", () => {
      const next = () => {};

      auth(req, null, next);

      expect(req).toHaveProperty("userId", mockId);
    });
  });

  describe("When it receives a request with no token", () => {
    test("Then the 'next' function should be called with an error with the message 'Invalid authentication'", () => {
      const req = {
        headers: {
          authorization: "",
        },
      };

      const next = jest.fn();
      const expectedError = new Error();
      expectedError.message = "Invalid authentication";

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
