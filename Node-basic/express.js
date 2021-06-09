const express = require("express");
const config = require("./config/ports");
const app = express();
const { port, log } = config;
const path = require("path");
const fs = require("fs");

//Using HTTP CORE MODULE
// const http  = require('http')
// const server = http.createServer((request,response)=>{
//     response.end(fs.readFileSync(path.join(__dirname,'pages','home.html')))
// })
// server.listen(3001)

const router = require("./routes");

//Using Express.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.get("/error", (req, res) => {
  throw new Error("Broken: Not Ready");
});

app.use((err, req, res, next) =>
  res.status(500).json({ error: err.message, msg: "Something Went Wrong!!" })
);
app.listen(port, () => console.log("Listening 3000"));
