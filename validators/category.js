const Validator = require("fastest-validator")

const v = new Validator();

const schema = {
    name: { type: "string", min: 3, max: 255  },
    address: { type: "string", min: 3, max: 100  },
    $$strict: true 
};

//If you set the $$strict option to true any additional properties will result in an strictObject error.

const check = v.compile(schema);

module.exports = check;