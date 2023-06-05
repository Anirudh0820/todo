const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth_routes");
const taskRoutes = require("./routes/task_routes");
// const db_Connect = require("./dotenv/db_Connect");

// mongoose.connect(db_Connect, () =>{
//     console.log("database connected");
// })
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
// app.use()

app.use((req, res, next) => {
    console.log("Hello from middleware");
    next();
});



app.listen(PORT, () => {
    console.log("server running on port " + PORT);
  });


mongoose.connect( process.env.db_Connect,
    { useUnifiedTopology: true, useNewUrlParser: true },
     console.log("connected to db")
  );


  
