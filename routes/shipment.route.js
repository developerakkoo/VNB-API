const route = require('express').Router();
const auth = require('../middleware/auth');
const {
    createShipment,
    getAllShipments,
    getShipmentsById,
    trackOrderPage,
    trackOrder,
    getAllOrderPage
} = require('../controller/shipment.controller')
const admin = require('../controller/admin.controller')

route.post('/admin/signup',admin.postSignup);

route.post('/admin/login',admin.postLogin);

route.post('/create/shipment',auth.authenticateReq,createShipment);

route.get('/get/all/orders',auth.authenticateReq,getAllShipments);

route.get('/get/byId/orders/:Id',auth.authenticateReq,getShipmentsById);

route.get('/track/orders',auth.authenticateReq,trackOrderPage);

route.post('/track/orders',auth.authenticateReq,trackOrder);

route.get('/get/all/orders-page',auth.authenticateReq,getAllOrderPage);

module.exports = {shipmentRoute : route}