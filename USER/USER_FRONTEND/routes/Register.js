const express = require('express');
const User = require('../Models/Registeruser')
const usermodel = require('../Models/userdetails')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;
var privateKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdPUs9lNWuMjO7nbFQjfrg7pCREVHmL29NTTsXU6gDfpE7C/KPo6wiICEvWweEhwHWJoSnjZV62bPdyRLBuavfLFWg0ka3R9DsumCtRA/RZe15GOBz+XrrMk+79/6GCUKz/HlBEWplqZ5Lr2ewVVUuSoaOvZH/B7wTiYlifCQAIQIDAQAB"

const Route = express.Router();

Route.post('/Registeruser', async (req,res) => {
    try{
        var reqData = req.body;

        if (Object.keys(reqData).length === 0){
            throw new Error("Thappu")
        }

        const ExistingEmail = await User.findOne({EmailAddress : reqData.email})

        if(!ExistingEmail){
            throw new Error("Email already exists")
        }
        
        const encpassword = bcrypt.hashSync(reqData.password, saltRounds);

        delete reqData.password;
    
        var token = jwt.sign(reqData, privateKey)
    
        var user = 'userid-' + uuidv4();
    
        console.log(user);
    
        const userData = new User({
            user_id: user,
            password: encpassword,
            user_token: token,
            user_timestamp: new Date().getTime()
        })
    
        var result = await userData.save()

        const userData2 = new usermodel({
            user_id: user,
            Firstname: reqData.Firstname,
            Lastname: reqData.Lastname,
            EmailAddress: reqData.email,
            user_timestamp: new Date().getTime()
        })

        var result2 = await userData2.save()

        var finalData = {
            "userData" : result2,
            "usercount" : result2.length
        }

        console.log(finalData)
    
        res.status(200).json({ "status": 200, "data": finalData, "message": "registered successfully", "error": false })
    }
    catch(error){
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }  
})

Route.post('/login', async (req, res) => {
    try {
        const reqData = req.body;

        var checkExistingUser = await usermodel.findOne({EmailAddress: reqData.email});
        if(!checkExistingUser) 
            throw new Error('User not exist');
        
        const regData = await User.findOne({user_id: checkExistingUser.user_id})
        if(!regData) 
        throw new Error('User not Reqistered');

        const checkPassword = await bcrypt.compareSync(reqData.password, regData.password);
        if(!checkPassword)
        throw new Error('Password not matched')

        var userData = {
            "user_id": checkExistingUser.user_id,
            "Firstname": checkExistingUser.Firstname,
            "Lastname": checkExistingUser.Lastname,
            "EmailAddress": checkExistingUser.EmailAddress,
            "user_timestamp": checkExistingUser.user_timestamp,
            "Token": regData.user_token
        }

        res.status(200).json({ "status": 200, "data": userData, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

Route.delete('/delete/:id', async (req,res) => {
    try{
      usermodel.deleteOne({user_timestamp : parseInt(req.params.id)}, (err, result) => {
        console.log(result)
        if(err) throw err
      })
      res.status(200).json({"status":200,"message":"data deleted","error":false})
        
    }
    catch(error){
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

module.exports = Route;