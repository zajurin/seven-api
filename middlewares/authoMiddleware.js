const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')

const auth = (req, res, next)=>{
    const authHeader = req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).send('Unauthenticated !!')
    }
    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token, process.env.SECRET)
        req.user = {userId:payload.IdFromModel, name: payload.name}
        next()

    }catch(error){
        console.log(error)
        res.send(error)
    }
    
}

module.exports = authAUTHOMIDDLEWARE