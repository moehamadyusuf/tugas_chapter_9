const express = require('express')
const app = express()
const { sequelize } = require('./models')
const session = require('express-session')
const nodemailer = require('nodemailer')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/user', require('./routes/user'))

let mailTtransporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "moehamad"
    }
})

//session
app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: false,
}));

app.set('view engine', 'ejs')

app.get("/",(req,res)=>{
    console.log("Test root api running")
    return res.send("Test root api running")
})


const connectDb = async ()=>{
    console.log('Checking database connection...')
    try {
        await sequelize.authenticate()
        console.log('Database connection established.')
    } catch (e) {
        console.log('Database connection failed', e)
        process.exit(1)
    }
}

(async ()=> {
    await connectDb()
    app.listen(4000, ()=>{
        console.log("server running 127.0.0.1:4000")
    })

})()

