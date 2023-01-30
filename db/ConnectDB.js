const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const ConnectDB = (url)=>{
    mongoose.connect(url)
}

module.exports = ConnectDB