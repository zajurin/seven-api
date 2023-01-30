const UserModel = require('../models/userModel')
const {BadRequestError, UnautenticatedError} = require('../errors')

const registerUser = async (req, res)=>{
    const {username, password} = req.body
    if(!username || !password){
        throw new BadRequestError('Please provide email and Password')
        // res.status(401).send('Please provide email and Password')
    }
    const usernameExists = await UserModel.create({...req.body})
    const token = usernameExists.createJWT()
    res.status(201).json({data: {user: usernameExists}, token})
}

const loginUser = async (req, res)=>{
    const {username, password} = req.body
    if(!username || !password){
        throw new BadRequestError('To login an email and password is necessary')
        // res.status(400).send('To login an email and password is necessary')
    }
    const usernameExists = await UserModel.findOne({username})
    if(!usernameExists){
        throw new UnautenticatedError('Invalid Username')
        // res.status(401).send('Invalid Username')
    }
    const isPasswordCorrect = await usernameExists.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnautenticatedError('Incorrect Password')
        // res.status(401).send('Incorrect Password')
    }
    const token = usernameExists.createJWT()
    res.status(200).json({data:{user: usernameExists.username}, token})
}

module.exports = {registerUser, loginUser}