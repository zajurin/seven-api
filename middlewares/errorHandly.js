const {CustomAPIError} = require('../errors')

const {StatusCodes} = require('http-status-codes')


const errorHandly = (err, req, res, next)=>{
    let errorObj = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, msg:err.message || 'there was an error, try later'
    }

    // if(err instanceof CustomAPIError){
    //     return res.status(err.statusCode).json({message: err.message})
    // }
    if(err.name === 'ValidationError'){
        console.log(Object.values(err.errors))
        errorObj.msg = Object.values(err.errors)
            .maps((item)=> item.message)
            .join(',')
        errorObj.statusCode = 400    
    }
    if(err.code && err.code === 11000){
        errorObj.msg = `Your ${Object.keys(err.keyValue)} is duplicated. Use a different one please`
        errorObj.statusCode = 400
    }
    if(err.name === 'CastError'){
        errorObj.msg = `Id ${err.value} not found`,
        errorObj.statusCode = StatusCodes.NOT_FOUND
    }
    
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
    return res.status(errorObj.statusCode).json({message: errorObj.msg})
}

module.exports = errorHandly