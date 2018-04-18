const express = require('express');
const router = express.Router();
const ProductOpts = require('../models/product');
const HttpUtil = require('../utils/HttpUtils');
const ValidatorUtil = require('../utils/ValidatorUtil');
const multer = require('multer');
const checkAuth = require('../middleware/checkAuth');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toString() + file.originalname);
//     }
// });

// without declaration of storage
const upload = multer({ dest: 'uploads/' });
//const upload = multer({storage: storage});
//Handle incoming get request


// product route

//Save product
router.post('/', upload.single('scannerClass'), (req, res, next) => {
    console.log(req.file);
    var obj = req.body;
    const product = {
        name: req.body.name,
        price: req.body.price
    }

    if (!ValidatorUtil.isValid(obj.name)) {
        res.json(HttpUtil.getInvalidRequest('Invalid User Name'))
    } else if (!ValidatorUtil.isValid(obj.price)) {
        res.json(HttpUtil.getInvalidRequest('Invalid Price'))
    }
    else {
        ProductOpts.createProduct(product, (data, fields) => {
            if (data === null) {
                res.json(HttpUtil.getError(data));
            } else {
                res.json(HttpUtil.getCreated(data));
            }
        });
    }
});


//Get all product
router.get('/', (req, res, next) => {

    ProductOpts.getProduct((data, fields) => {
        if (data === null) {
            res.json(HttpUtil.getError(data));
        } else {
            res.json(HttpUtil.getSuccess(data));
        }
    })
})

// get product by id
router.get('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    if (!ValidatorUtil.isValid(id)) {
        res.json(HttpUtil.getInvalidRequest('Invalid Product Id'));
    } else {
        ProductOpts.getProductBYId(id, (data, fields) => {
            if (data === null) {
                res.json(HttpUtil.getError(data));
            } else {
                res.json(HttpUtil.getSuccess(data));
            }
        })
    }
});

router.put('/:productId', (req, res, next) => {

    res.send({
        Message: 'Product Patch Request is used for partial updation'
    })
});

router.get('/getProduct/:productId', checkAuth, (req, res, next) => {

    res.send({
        Message: 'get product without using dastabase is working'
    })
});

// router.patch('/updateProduct', (req, res, next) => {

//   update the data using patch request
router.patch('/:productId', (req, res, next) => {

    const obj = req.body;
    const id = req.params.productId;

    const updateObj = {
        name: obj.name,
        price: obj.price,
        idproduct: id
    }

    if (!ValidatorUtil.isValid(updateObj.name)) {
        res.json(HttpUtil.getInvalidRequest('Invalide name'));
    } else if (!ValidatorUtil.isValid(updateObj.price)) {
        res.json(HttpUtil.getInvalidRequest('Price is not valid'));
    }
    else if (!ValidatorUtil.isValid(updateObj.idproduct)) {
        res.json(HttpUtil.getInvalidRequest('Product Id is not valid'));
    }

    else {
        ProductOpts.updateProduct(updateObj, (data, fields) => {

            if (data === null) {
                res.json(HttpUtil.getError(data));
            } else {
                res.json(HttpUtil.getSuccess(data));
            }

        })
    }

});

// delete the data by using product id
router.delete('/:productId', (req, res, next) => {

    const id = req.params.productId;

    if (!ValidatorUtil.isValid(id)) {
        res.json(HttpUtil.getInvalidRequest('Invalid Product Id'))
    } else {
        ProductOpts.deleteProductById(id, (data, fields) => {
            if (data === null) {
                res.json(HttpUtil.getError(data));
            } else {
                res.json(HttpUtil.getSuccess(data));
            }
        });
    }
});


module.exports = router;  