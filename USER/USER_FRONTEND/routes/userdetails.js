const express = require('express');
const usermodel = require('../Models/userdetails')
var jwt = require('jsonwebtoken');
var privateKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdPUs9lNWuMjO7nbFQjfrg7pCREVHmL29NTTsXU6gDfpE7C/KPo6wiICEvWweEhwHWJoSnjZV62bPdyRLBuavfLFWg0ka3R9DsumCtRA/RZe15GOBz+XrrMk+79/6GCUKz/HlBEWplqZ5Lr2ewVVUuSoaOvZH/B7wTiYlifCQAIQIDAQAB"


const router = express.Router()

router.get('/getusers', async (req, res) => {
    try {
        const userdata = await usermodel.find();
        var finaldata = {
            userData : userdata,
            userDataLength : userdata.length
        }
        res.status(200).json({ "status": 200, "data": finaldata, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

router.get('/getuser/:id', async (req, res) => {
    try {
        console.log("auth", req.header('authorization'))

        const userdata = await usermodel.findOne({user_id:req.params.id});

        res.status(200).json({ "status": 200, "data": userdata, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

router.get('/getuser', async (req, res) => {
    try {
        const token = req.header('authorization')?.split(' ')[1]
        if(!token)
        throw new Error('Token need to send in header')

        const decToken = await verifyToken(token);
        console.log("decToken",decToken)

        const user = await usermodel.findOne({EmailAddress: decToken.email})

        res.status(200).json({ "status": 200, "data": user, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

async function verifyToken(token){
    return jwt.verify(token, privateKey, function (err, payload) {

        if (err === null) {
            return payload;
        }
        if (err.name === 'TokenExpiredError') {
            throw new Error('Token has expired.')
        }
        if (err.name === 'JsonWebTokenError') {
            throw new Error('Token is malformed.')
        }
        throw new Error('Unknown issue in JWT Token.')
    });
}

module.exports = router;