const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path")

const authRouter = require("./routes/v1/auth");
const userRouter = require("./routes/v1/user");

const app = express();
//The express.static() function is a built-in middleware function in Express.
// It serves static files and is based on serve-static. 
// incoming request go to static files
app.use("/courses/covers" , express.static(path.join(__dirname , "public" , "courses" , "covers"))  )
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user" , userRouter);


app.use((error , req , res , next)=> {
    res.status(error.status || 500).json({messg: error.message || "SERVER INTERNAL ERROR"})
  })

module.exports = app;
