const app = require("./app");
require("dotenv").config();
const mongoose = require('mongoose');

const port = process.env.PORT;

(async ()=> {
 const connection =    await mongoose.connect(process.env.MONGO_URI);
 console.log(`mongo is connected ${connection}`)
})();

app.listen(port , ()=> {
    console.log(`App is running in Port ${port}`)
})