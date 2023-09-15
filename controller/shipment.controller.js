const axios = require('axios');  
const { response } = require('express');
const moment = require('moment');


exports.createShipment = async (req,res)=>{
try {
    let data = JSON.stringify({
        "order_id": "22114477",
        "order_date": moment().format('YYYY-MM-DD'),
        "billing_customer_name": req.body.customer_first_name,
        "billing_last_name": req.body.customer_last_name,
        "billing_address": req.body.shipping_address,
        "billing_city": req.body.shipping_city,
        "billing_pincode": req.body.shipping_pincode,
        "billing_state": req.body.shipping_state,
        "billing_country": "India",
        "billing_email": req.body.shipping_email,
        "billing_phone": req.body.phonenumber,
        "shipping_is_billing": true,
        "order_items": [
        {
            "name": req.body.productName,
            "sku": req.body.productCategory,
            "units": req.body.quantity,
            "selling_price": req.body.price
        }
        ],
        "payment_method": req.body.payment_method,
        "sub_total": req.body.subtotal,
        "length": req.body.length,
        "breadth": req.body.breadth,
        "height": req.body.height,
        "weight": req.body.weight,
        "pickup_location": "HomeNew",
        "vendor_details": {
        "email": "abcdd@abcdd.com",
        "phone": 9879879879,
        "name": "Coco Cookie",
        "address": "Street 1 test city tes",
        "address_2": "",
        "city": "delhi",
        "state": "new delhi",
        "country": "india",
        "pin_code": "110077",
        "pickup_location": "HomeNew"
        }
    });
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/shipments/create/forward-shipment',
        headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${req.token}`
        },
        data : data
    };
    
    axios.request(config)
    .then((response) => {
        if (response.data.error) {
            return res.status(response.data.error.status_code).json({message:response.data}); 
        }
        res.status(200).json(response.data);
    })
    .catch((error) => {
        res.status(400).json({message:'All filed are require'});
        console.log(response.status);
    });
} catch (error) {
    res.status(400).json({message:error.message});
}
}

exports.getAllShipments = async (req,res)=>{
    try {
let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://apiv2.shiprocket.in/v1/external/orders?page=${req.query.page}&per_page=${req.query.per_page}`,
    headers: { 
    'Authorization': `Bearer ${req.token}`
    }
};
    axios.request(config)
    .then((response) => {
        // console.log(JSON.stringify(response.data));
        return res.status(200).json(response.data)
    })
    .catch((error) => {
        res.status(400).json({message:error.message});
    });
    
    } catch (error) {
    res.status(400).json({message:error.message});
        
    }
}

exports.getShipmentsById = async (req,res)=>{
    try {
let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://apiv2.shiprocket.in/v1/external/orders/show/${req.params.Id}`,
    headers: { 
    'Authorization': `Bearer ${req.token}`
    }
};
    axios.request(config)
    .then((response) => {
        // console.log(JSON.stringify(response.data));
        return res.status(200).json(response.data)
    })
    .catch((error) => {
        // console.log(error);
        return res.status(404).json({message:'Order ID not found'})
    });
    
    } catch (error) {
    res.status(400).json({message:error.message});
        
    }
}

exports.trackOrder = async (req,res)=>{
    // console.log(req.body.AWBNum);
    try {
let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${req.body.AWBNum}`,
    headers: { 
    'Authorization': `Bearer ${req.token}`
    }
};
    axios.request(config)
    .then((response) => {
        const AWBNum = req.body.AWBNum
        const track_status = response.data.tracking_data.track_status
        if (track_status == 0) {
            
            return res.render('trackStatus',{ milestones, progress,AWBNum })
        }
    })
    .catch((error) => {
        // console.log(error);
        const AWBNum = req.body.AWBNum
        const OrderId = '0'
        const order = 0
        const milestones = [
            { img: "https://icons.veryicon.com/png/o/miscellaneous/template-3/no-order.png", label:"No Order Found"}
        ]
        return res.render('trackStatus',{ milestones,AWBNum,OrderId,order })
    });
    
    } catch (error) {
    res.status(400).json({message:error.message});
    }
}

exports.OrderStatusPage = async (req,res)=>{
    try {
        const AWBNum = "123456"
        const milestones = [
            { img: "https://i.imgur.com/9nnc9Et.png", label:"Order Processed"},
            { img: "https://i.imgur.com/u1AzR7w.png",label:"Order Shipped"},
            { img: "https://www.pngall.com/wp-content/uploads/12/Delivery-PNG-File.png",label:"In Transits"},
            { img: "https://cdn-icons-png.flaticon.com/512/6459/6459980.png",label:"Delivered"},
        ];
        const progress = 100;
        // console.log(error);
    res.render('trackStatus',{ milestones, progress,AWBNum })
    
    } catch (error) {
    res.status(400).json({message:error.message});
    }
}



exports.trackOrderPage = async (req,res)=>{
    try {
    res.render('trackOrder')
    
    } catch (error) {
    res.status(400).json({message:error.message});
    }
}

exports.getAllOrderPage = async (req,res)=>{
    try {
        const milestones = []
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://apiv2.shiprocket.in/v1/external/orders`,
            headers: { 
                'Authorization': `Bearer ${req.token}`
            }
        };
        
        axios.request(config)
        .then((response) => {
            const orders = response.data.data
            let order
            // console.log(orders.length);
            if (orders.length == 0) {
                order = 0
                milestones.push({ img: "https://icons.veryicon.com/png/o/miscellaneous/template-3/no-order.png", label:"No order found"});
            return res.render('allOrder',{milestones,order});
            }
            orders.forEach(order => {
                milestones.push({ AWBnumber: order.shipments.awb,OrderId:order.id,CustomerName:order.customer_name,CustomerContact:order.customer_phone,Payment:order.payment_method,Status:order.status,DeliveredDate:order.delivered_date},)
            });
            order = 1
            res.render('allOrder',{ milestones,order})
        })
        .catch((error) => {
            console.log(error);
        });
        
        
        
            
            // { AWBnumber: "0000",OrderId:"7410",CustomerName:"test1",CustomerContact:"0000",Payment:"COD",Status:"active"},
            // { AWBnumber: "1111",OrderId:"78520",CustomerName:"test1",CustomerContact:"0000",Payment:"COD",Status:"active"},
            // { AWBnumber: "22222",OrderId:"8520",CustomerName:"test1",CustomerContact:"0000",Payment:"COD",Status:"active"},
        
    
    
    } catch (error) {
    res.status(400).json({message:error.message});
    }
}



