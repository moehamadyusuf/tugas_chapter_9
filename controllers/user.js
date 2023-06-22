const {User} = require('../models')


exports.register = async (req,res,next)=>{
    try {
        const userCreate = await User.create({
            UserName: req.body.UserName,
            Email: req.body.Email,
            Password: req.body.Password,
            PhoneNumber: req.body.PhoneNumber,
            DateOfBirth: req.body.DateOfBirth,
            Address: req.body.Address
        })

        return res.status(200).json({
            data: userCreate
        })
    } 
     catch (error) {
        console.log(error)
        return req.status(500).json(`server error: ${error}`)
    }
}

exports.login = async(req,res,next)=>{
    try {
        const foundUser = await User.findOne({where : {email:req.body.email}})
        if (foundUser.password == req.body.password){
            return res.status(200).json(`login seccess, welcome ${foundUser.username}`)
        } else {
            return res.status(200).json(`login failed, email and password not match`)
        }
    } catch (error) {
        console.log(error)
        return req.status(500).json(`server error: ${error}`)
    }
}

exports.RemoveAccount = async(req,res,next)=>{
    try {
        const foundUser = await User.findOne({where : {id:req.body.email}})
        if (foundUser.password == req.body.password){
            User.destroy({
                where : {email : req.body.email}
            })
            .then(()=>{
                return res.status(200).json(`your account removed, goodbay ${req.body.email}`)
            })
            .catch(err =>{
                return res.status(200).json(`your account failed, (^_*)`)
            })
            return res.status(200).json(`your account removed, goodbay ${req.body.email}`)
        } else {
            return res.status(200).json(`remove account failed, email and password not match`)
        }

    } catch (error) {
        console.log(error)
        return req.status(500).json(`server error: ${error}`)        
    }
}