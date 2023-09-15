const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


async function  postSignup (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    Admin.findOne({ email: email})
    .then(admin => {
        if(admin){
            return res.status(406).json({
            status: false,
            message: 'User with email Already Exists'
        })
        }
        bcrypt.hash(password, 12)
        .then((hashedPasswords) => {
            const admin = new Admin({
                email: email,
                password: hashedPasswords
            })
            return admin.save();
        }).then((result) => {
            return res.status(201).json({message: 'Admin Created Successfully!', status: '201', userId: result._id});
        
        })
    })
    .catch(error =>{
        return res.status(400).json({message: error.message, status:'error'});
        })
    }

    async function postLogin (req, res){
        console.log("admin login",req.body);
        try {
            try     {    
                const email = req.body.email
                const password = req.body.password
                const savedUser = await Admin.findOne({email:email});
                if(!savedUser){
                    return res.status(404).json({message:`User not found with this email ${req.body.email}`,statusCode:404})
                }
                if(!(await bcrypt.compare(password, savedUser.password))){
                    return res.status(401).json({message:`Incorrect Password`,statusCode:401});
                }
                const payload = {
                    userId: savedUser._id,
                    email:  savedUser.email 
                }
                const token = await jwt.sign(payload, process.env.jwt_SECRET_KEY, {expiresIn: '24h'});
                const postRes = {
                    User : savedUser.name,
                    Id:savedUser._id,
                    accessToken : token
                }
                res.status(200).json({message:`User login successfully`,statusCode:200,data:postRes});
            }catch(error){
                res.status(500).json({Message:error.message,status:'ERROR',statusCode:500});
            }
        } catch (error) {
            return res.status(400).json({message: error.message, status:'error'});
            
        }
    }



    module.exports={
        postSignup,
        postLogin
    }