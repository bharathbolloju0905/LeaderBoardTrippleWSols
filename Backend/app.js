const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")

const connectDB = require("./DB/connect")

const userRoutes = require("./routes/user.routes")
dotenv.config()

PORT = process.env.PORT 

app.use(cors(
    {
        origin: ["http://localhost:5173",],
        credentials: true,
    }
));



app.use(express.json());

app.use("/api/users", userRoutes)



app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
});