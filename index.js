const express = require("express");
const app = express();
const dotenv = require("dotenv");

// imports
const dbConnect = require("./config/db");
const userRoute = require("./routes/userRoute");
const workoutRoute = require("./routes/workoutRoute");

dotenv.config();
dbConnect();

app.use(express.json());
app.get('/', (req, res, next) =>{
    res.status(200).json({Message: 'home screen'})
    next();
})

// routes
app.use('/api/user', userRoute);
app.use('/api/user/workout', workoutRoute);

const port = process.env.PORT || 8081
app.listen(port, () =>{
    console.log(`Port Started listening at ${port}`)
})