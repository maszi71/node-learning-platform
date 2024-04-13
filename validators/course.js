const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  name: { type: "string", min: 3, max: 255 },
  description: { type: "string", min: 3 },
  address: { type: "string" },
  support: { type: "string" },
  price: { type: "string" },
  status: { type: "string" },
  discount: { type: "string" },
  category: { type: "string" },
  teacher: { type: "string" },
  $$strict: true,
};

//If you set the $$strict option to true any additional properties will result in an strictObject error.

const check = v.compile(schema);

module.exports = check;
