const { Joi } = require("express-validation");

const createDogSchema = {
  body: Joi.object({
    name: Joi.string()
      .max(20)
      .messages({ message: "Dog name is Required" })
      .required(),
    age: Joi.number()
      .max(2)
      .messages({ message: "Dog age is required" })
      .required(),
    weight: Joi.string()
      .max(3)
      .messages({ message: "Dog weight is Required" })
      .required(),
    toy: Joi.string()
      .max(15)
      .messages({ message: "Dog toy is Required" })
      .required(),
    title: Joi.string()
      .max(20)
      .messages({ message: "Dog title is Required" })
      .required(),
    personality: Joi.string()
      .max(10)
      .messages({ message: "Dog title is Required" })
      .required(),
    breed: Joi.string()
      .max(20)
      .messages({ message: "Dog breed is Required" })
      .required(),
    picture: Joi.string()
      .messages({ message: "Dog breed is Required" })
      .required(),
  }),
};

module.exports = { createDogSchema };
