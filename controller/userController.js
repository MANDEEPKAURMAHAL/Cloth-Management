const mysql = require('mysql');
const db = require('../config/db').localConnect;
const nJwt = require('njwt');
const secret = require('../config/secret');
const helper = require('../config/helper');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    userMobileExistCheck: (req) => {
        return new Promise((resolve, reject) => {
            let userMobileExistQuery = 'SELECT \n\
        user_id \n\
    FROM \n\
    user_master\n\
    WHERE \n\
        user_mobile_number = ' + mysql.escape(req.body.user_mobile_number) + '';
            db.query(userMobileExistQuery, (errs, rows) => {
                if (errs) {
                    return reject(new Error('woops'));
                } else if (rows.length > 0) {
                    return reject({ msg: 'mobile alreday exist' });
                } else {
                    return resolve({ msg: 'mobile not exist' });
                }
            });
        });
    },
    newHashPassword: (req) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(req.body.user_password, saltRounds, (err, hash) => {
                if (err) {
                    return resolve('');
                } else {
                    return resolve(hash);
                }
            });

        })
    },
    newUserDetails: (data, req) => {
        return new Promise((resolve, reject) => {
            let user_id = req.body.user_id ? req.body.user_id : helper.getId();
            let user_password = data ? data : '';
            let user_mobile_number = req.body.user_mobile_number ? req.body.user_mobile_number : '';

            let userSql = 'INSERT user_master SET ';
            let userGenrSql = '';
            if (helper.checkEmpty(user_id)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_id = ' + mysql.escape(user_id) + '';
            }
            if (helper.checkEmpty(user_password)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }

                userGenrSql += ' user_password = ' + mysql.escape(user_password) + '';
            }
            if (helper.checkEmpty(user_mobile_number)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_mobile_number = ' + mysql.escape(user_mobile_number) + '';
            }
            userSql = userSql + ' ' + userGenrSql + ' , user_create_date = now() ON DUPLICATE KEY UPDATE ' + userGenrSql + ' ';

            db.query(userSql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject([]);
                } else {
                    resolve({ user_id: user_id });
                }
            });
        })
    },
    newphotoDetails: (req) => {
        return new Promise((resolve, reject) => {
            let user_id = req.body.user_id ? req.body.user_id : '';
            let product_photo_id = req.body.product_photo_id ? req.body.product_photo_id : helper.getId();
            let product_image = req.file.filename ? req.file.filename : '';
            let product_name = req.body.product_name ? req.body.product_name : '';
            let product_price = req.body.product_price ? req.body.product_price : '';
            let product_quantity = req.body.product_quantity ? req.body.product_quantity : '';

            let userSql = 'INSERT user_product_photo_mapping SET ';
            let userGenrSql = '';
            if (helper.checkEmpty(user_id)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_id = ' + mysql.escape(user_id) + '';
            }
            if (helper.checkEmpty(product_photo_id)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' product_photo_id = ' + mysql.escape(product_photo_id) + '';
            }
            if (helper.checkEmpty(product_image)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' product_image = ' + mysql.escape(product_image) + '';
            }
            if (helper.checkEmpty(product_name)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' product_name = ' + mysql.escape(product_name) + '';
            }
            if (helper.checkEmpty(product_price)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' product_price = ' + mysql.escape(product_price) + '';
            }
            if (helper.checkEmpty(product_quantity)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' product_quantity = ' + mysql.escape(product_quantity) + '';
            }
            userSql = userSql + ' ' + userGenrSql + ' , product_create_date = now() ON DUPLICATE KEY UPDATE ' + userGenrSql + ' ';

            db.query(userSql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject([]);
                } else {
                    resolve({ product_photo_id: product_photo_id });
                }
            });
        })
    },
    logInUser: (req) => {
        return new Promise((resolve, reject) => {
            let user_mobile_number = req.body.user_mobile_number;
            let user_password = req.body.user_password;
            let results = [];
            let sQuery = '';
            sQuery = ' SELECT \n\
                         user_id, \n\
                         user_password  ';
            sQuery += ' FROM \n\
                         user_master \n\
                         WHERE user_active_flag = 1  ';
            sQuery += '  AND user_mobile_number = ' + mysql.escape(user_mobile_number) + '';
            db.query(sQuery, (err, rows) => {
                if (err) {
                    return reject([]);
                }
                else if (rows && rows.length) {
                    let jwt = nJwt.create({ user_id: rows[0].user_id }, secret.secret);
                    bcrypt.compare(user_password, rows[0].user_password, (err, result) => {
                        if (result) {
                            results = {
                                user_id: rows[0].user_id,
                                auth: true,
                                token: jwt.compact()
                            };
                            return resolve(results);
                        }
                        else {
                            return reject("wrong credentials");
                        }
                    });
                } else {
                    return reject("wrong credentials");
                }
            });
        });
    },
    getAllProducts: (req) => {
        return new Promise((resolve, reject) => {
            let user_id = req.query.user_id ? req.query.user_id : '';
            let result = [];
            let sQuery = '';
            sQuery = ' SELECT \n\
                       user_id, \n\
                       product_photo_id,\n\
                       product_image,\n\
                       product_name,\n\
                       product_price,\n\
                       product_quantity';
            sQuery += ' FROM \n\
            user_product_photo_mapping ';
            if (user_id != '') {
                sQuery += ' where user_id = ' + mysql.escape(user_id) + "";
            }
            db.query(sQuery, (err, rows) => {
                if (err) {
                    return reject([]);
                } else if (rows && rows.length) {
                    rows.forEach(element => {
                        result.push({
                            user_id: element.user_id,
                            product_photo_id: element.product_photo_id,
                            product_image: 'http://localhost:3000/' + element.product_image,
                            product_name: element.product_name,
                            product_price: element.product_price,
                            product_quantity: element.product_quantity
                        });
                    });
                    return resolve(result);

                } else {
                    return reject({ msg: "data not found" });
                }
            });
        });
    }
}