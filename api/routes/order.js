const express = require('express');
const router = express.Router();
const OrderOpts = require('../models/order');
const HttpUtil = require('../utils/HttpUtils');
const ValidatorUtil = require('../utils/ValidatorUtil');

//Save Order
router.post('/', (req, res, next) => {
    var obj = req.body;
    const order = {
        idorder: req.body.productId,
        nooforder: req.body.nooforder
    }

    if (!ValidatorUtil.isValid(order.idorder)) {
        res.json(HttpUtil.getInvalidRequest('Invalid OrderId'))
    } else if (!ValidatorUtil.isValid(order.nooforder)) {
        res.json(HttpUtil.getInvalidRequest('Invalid nooforder'))
    }
    else {
        OrderOpts.createOrder(order, (data, fields) => {
            if (data === null) {
                res.json(HttpUtil.getError(data));
            } else {
                res.json(HttpUtil.getCreated(data));
            }
        });
    }
});

//Get All Order
router.get('/', (req, res, next) => {
    OrderOpts.getOrder((data, fields) => {
        if (data === null) {
            res.json(HttpUtil.getError(data));
        } else {
            res.json(HttpUtil.getSuccess(data));
        }
    })

});

// get order by orderId
router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
  if (!ValidatorUtil.isValid(id)) {
        res.json(HttpUtil.getInvalidRequest('Invalid Product Id'));
    } else {
        OrderOpts.getOrderByID(id, (data, fields) => {
            if (data === null) {
                res.json(HttpUtil.getError(data));
            } else {
                res.json(HttpUtil.getSuccess(data));
            }
        })
    }
    
});

// delete order by orderId
router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (!ValidatorUtil.isValid(id)) {
        res.json(HttpUtil.getInvalidRequest('Invalid Product Id'));
    } else {
        OrderOpts.deleteOrderByID(id, (data, fields) => {
            if (data === null) {
                res.json(HttpUtil.getError(data));
            } else {
                res.json(HttpUtil.getSuccess(data));
            }
        })
    }

});


module.exports = router;