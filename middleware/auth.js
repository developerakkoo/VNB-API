const axios = require('axios');

exports.authenticateReq = (req,res,next)=>{
    let data = JSON.stringify({
        "email": "sddeveloper96@gmail.com",
        "password": "uQsLVyYT#Lky@3H"
    });
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
        headers: { 
        'Content-Type': 'application/json'
        },
        data : data
    };
    
    axios.request(config)
    .then((response) => {
        req.token = response.data.token;
        next();
    })
    .catch((error) => {
        res.status(400).json(error);
    });
    
}

