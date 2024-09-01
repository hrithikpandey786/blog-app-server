const express = require("express");
const app = express();
const postRoute = require("./routes/post.route");
const cors = require("cors");
const PORT = process.env.PORT || 8800
const authRoute = require("./routes/auth.route");
require("dotenv").config();


app.use(express.static("../Frontend"));
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))

app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, ()=>{
    console.log("Server is listening to port 8800");
})