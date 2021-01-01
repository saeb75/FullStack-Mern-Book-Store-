const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const cors = require("cors")
//import routes
const authRouter = require('./Routes/auth')
const userRouter = require('./Routes/user')
const catogoryRouter = require('./Routes/catogory')
const productRouter = require('./Routes/product')

//app
const app = express()
require('dotenv').config()

//db
mongoose.
        connect(process.env.DATABASE,
            {useNewUrlParser:true , useCreateIndex:true})
            .then(()=> console.log('Connected Database..'))

//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

//routes middleware
app.use('/Api',authRouter)
app.use('/Api',userRouter)
app.use('/Api',catogoryRouter)
app.use('/Api',productRouter)
















const port = process.env.PORT || 8000


app.listen(port,() => {
    console.log('server is running on port 8000')
})

