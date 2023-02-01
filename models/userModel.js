const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "A password is needed"]
    }
})

UserModel.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

UserModel.methods.createJWT = function(){
    return jwt.sign({IdFromModel: this._id, name: this.username}, process.env.SECRET, {expiresIn: '30d'})
}

UserModel.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('usuarios', UserModel)