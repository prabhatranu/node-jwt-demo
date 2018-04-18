const express = require('express');
const router = express.Router();
const UserOpts = require('../models/user');
const HttpUtil = require('../utils/HttpUtils');
const ValidatorUtil = require('../utils/ValidatorUtil');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {

    var obj = req.body;

    if (!ValidatorUtil.isValid(obj.emailId)) {
        res.json(HttpUtil.getInvalidRequest('Invalid email id'));
    }
    
    // email id is exist or not
    // else {
    //     UserOpts.isEmailExist(obj.emailId, (data, fields) => {
    //         if (data === null) {
    //             res.json(HttpUtil.getError(data));
    //         } else if (data.length > 0) {
    //             res.json({
    //                 Message: "Email Already exist"
    //             });
    // } else {

    //     //Encrypted Password
    //     bcrypt.hash(obj.password, 10, (err, hash) => {
    //         if (err) {
    //             res.json('Invalid Password');
    //         }

    //         else {
    //             const user = {
    //                 emailId: obj.emailId,
    //                 password: hash
    //             }
    //             // Creating new user if email id is not exist                  
    //             if (!ValidatorUtil.isValid(user.emailId)) {
    //                 res.json(HttpUtil.getInvalidRequest('Invalid email id'));
    //             } else if (!ValidatorUtil.isValid(user.password)) {
    //                 res.json(HttpUtil.getInvalidRequest('Invalid password'));
    //             }
    //             else {
    //                 UserOpts.createUser(user, (data, fields) => {
    //                     if (data === null) {
    //                         res.json(HttpUtil.getError(data));
    //                     } else {
    //                         res.json(HttpUtil.getCreated(data));
    //                     }
    //                 });
    //             }
    //         }
    //     })
    // }
    //  }
    else {


        const user = {
            emailId: obj.emailId,
            password: obj.password
        }
        // Creating new user if email id is not exist                  
        if (!ValidatorUtil.isValid(user.emailId)) {
            res.json(HttpUtil.getInvalidRequest('Invalid email id'));
        } else if (!ValidatorUtil.isValid(user.password)) {
            res.json(HttpUtil.getInvalidRequest('Invalid password'));
        }
        else {
            UserOpts.createUser(user, (data, fields) => {
                if (data === null) {
                    res.json(HttpUtil.getError(data));
                } else {
                    res.json(HttpUtil.getCreated(data));
                }
            });
        }
    }
})
//}   

// });

//user login

router.post('/login', (req, res, next) => {
    var obj = req.body;
    let userRecord = [];
    const user = {
        emailId: req.body.emailId,
        password: req.body.password
    }
    if (!ValidatorUtil.isValid(user.emailId)) {
        res.json(HttpUtil.getInvalidRequest('Invalid emailId'))
    } else if (!ValidatorUtil.isValid(user.password)) {
        res.json(HttpUtil.getInvalidRequest('Invalid password'))
    }
    else {
        UserOpts.isEmailExist(user.emailId, (data, fields) => {
            if (data === null) {
                res.json(HttpUtil.getError(data));
            } else {
                userRecord = data[0];
                // res.json(HttpUtil.getSuccess(userRecord));
                console.log('userRecordh is:', data.length);
                console.log('userRecordh is:', userRecord.password);
                console.log('userRecordh is:', user.emailId);

                if (userRecord.emailId === user.emailId) {

                    return res.json({
                        Message: "Auth email failed"
                    })
                }

                bcrypt.compare(req.body.password, userRecord.password, (err, result) => {

                    if (err) {
                        return res.json({
                            Message: "Auth failed"
                        })
                    }
                    if (result) {
                        return res.status(200).json({
                            Message: "suceess"
                        })
                    }
                })
            }
        });
    }
    jwt.sign({ user }, 'mysecratekey', { expiresIn: '10000s' }, (err, token) => {
        res.json({
            token
        })
    });
});

// delete order by orderId
router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if (!ValidatorUtil.isValid(id)) {
        res.json(HttpUtil.getInvalidRequest('Invalid user Id'));
    } else {
        UserOpts.deletById(id, (data, fields) => {
            if (data === null) {
                res.json(HttpUtil.getError(data));
            } else {
                res.json(HttpUtil.getDeleted(data));
            }
        })
    }

});


router.get('/:emailCheck', (req, res, next) => {
    console.log(req.params.emailCheck)
    const emailId = req.params.emailCheck;
    console.log(emailId)
    if (!ValidatorUtil.isValid(emailId)) {
        res.json(HttpUtil.getInvalidRequest('Invalid user Id'));
    } else {
        UserOpts.isEmailExist(emailId, (data, fields) => {
            if (data === null) {
                res.json(HttpUtil.getError(data));
            } else {
                res.json(HttpUtil.getDeleted(data));
            }
        })
    }

});



module.exports = router;  