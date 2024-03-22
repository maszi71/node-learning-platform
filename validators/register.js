const Validator = require("fastest-validator")

const v = new Validator();

const schema = {
    name: { type: "string", min: 3, max: 255 },
    username: { type: "string", min: 3, max: 100 },
    email : {type : "email" , min : 10  , max : 100},
    phonenumber : {type : "string"},
    password : {type : "string" , min : 8 , max : 24},
    confirmpassword : {type : "equal" , field : "password"},
    $$strict: true 
};

//If you set the $$strict option to true any additional properties will result in an strictObject error.

const check = v.compile(schema);

module.exports = check;