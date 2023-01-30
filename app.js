require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')
const productsRoutes = require('./routes/productsRoutes')
const authoMiddleware = require('./middlewares/authoMiddleware')
const authRoutes = require('./routes/authRoutes')
const ConnectDB = require('./db/ConnectDB.js')
const errorHandlerMiddleware = require('./middlewares/errorHandly')

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.set('trust proxy', 1)
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/products', authoMiddleware, productsRoutes)

app.use(errorHandlerMiddleware)

const starter = async()=>{
    await ConnectDB(process.env.URL_MONGO)
    app.listen(3000, ()=>{
        console.log("running port 3000");
    })

}

starter()