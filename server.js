const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const ConnectDb = require('./config/db')
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const userRoute = require("./routes/users")
dotenv.config()
//connrct db
ConnectDb()
const app = express()

//middlewares
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/users', userRoute);


const PORT = process.env.PORT || 5000
app.listen(5000, () => {
    console.log(`server running on port ${PORT}`)
})