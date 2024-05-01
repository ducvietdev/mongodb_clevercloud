const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
async function connect() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect Successfully!!!')
    } 
    catch(error) {
        console.log('Connect Failure!!!', error)
    }
}   

module.exports = {connect}