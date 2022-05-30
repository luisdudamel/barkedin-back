const { ValidationError } = require("express-validation");
const { notFoundError, generalError } = require("./errors");

describe("Given a notFoundError function", () => {
  describe("When its invoked", () => {
    test("Then it should call the responses status method with a 404", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedStatus = 404;

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When its invoked", () => {
    test("Then it should call the responses json method with a message 'Endpoint not found'", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedMessage = { msg: "Endpoint not found" };

      notFoundError(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});

describe("Given a generalError function", () => {
  describe("When its invoked with an error with no custom status code", () => {
    test("Then it should call the responses status method with a 500", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = {};
      const expectedStatus = 500;

      generalError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
