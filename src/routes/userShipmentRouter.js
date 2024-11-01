const express = require('express');
const userShipmentController = require('../controllers/User/userShipmentController');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

router.post('/create', userShipmentController.createShipment);
router.put('/user/shipment', userShipmentController.updateShipment);
router.delete('/user/shipment', userShipmentController.deleteShipment);
router.get('/user/shipment', userShipmentController.getUserShipments);

module.exports = router;
