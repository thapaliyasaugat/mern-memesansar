const mongoose = require('mongoose')

const ConnectDb = () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("database connected sucessfully")
    } catch (error) {
        console.log("error connecting db")
    }
}
module.exports = ConnectDb