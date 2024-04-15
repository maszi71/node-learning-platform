const Validator = require("fastest-validator")

const v = new Validator();

const schema = {
    title: { type: "string", min: 3, max: 255 },
    time: { type: "string" },
    free : {type : "enum" , values: [ "0", "1" ]},
    $$strict: true 
};

const check = v.compile(schema);

module.exports = check;