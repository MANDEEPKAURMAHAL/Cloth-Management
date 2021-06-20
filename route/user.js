const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const HttpStatus = require('http-status-codes');
const auth = require('../config/auth')
const jwtAuth = auth.jwtAuth;
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } });


//Created a registration api
//Used hash and salt for password
router.post('/signupUser', (req, res) => {
  userController.userMobileExistCheck(req).then((data) => {
    userController.newHashPassword(req).then((data) => {
      userController.newUserDetails(data, req).then((data) => {
        res.status(HttpStatus.OK).send(data)
      }).catch((e) => {
        res.status(HttpStatus.CONFLICT).send(e);
      });
    }).catch((e) => {
      res.status(HttpStatus.CONFLICT).send(e);
    });
  }).catch((e) => {
    res.status(HttpStatus.CONFLICT).send(e);
  });
});

// Created a login api with auth
router.post('/logInUser', (req, res) => {
  userController.logInUser(req).then((data) => {
    res.send(data);
  }).catch((e) => {
    res.status(HttpStatus.CONFLICT).send(e);
  });
});

// Updated user details api with token
// provide parameter user_id for update detail
router.post('/updateUserDetail', jwtAuth, (req, res) => {
  userController.newHashPassword(req).then((data) => {
    userController.newUserDetails(data, req).then((data) => {
      res.status(HttpStatus.OK).send(data)
    }).catch((e) => {
      res.status(HttpStatus.CONFLICT).send(e);
    });
  }).catch((e) => {
    res.status(HttpStatus.CONFLICT).send(e);
  });
});

//Add and update Product with photo and other information
//For update add product_photo_id parameter
router.post('/addAndUpdateProductWithImage', jwtAuth, upload.single('product_image'), (req, res) => {
  userController.newphotoDetails(req).then((data) => {
    res.status(HttpStatus.OK).send(data)
  }).catch((e) => {
    res.status(HttpStatus.CONFLICT).send(e);
  });
});

// List all product
router.get("/getAllProducts", (req, res) => {
  userController.getAllProducts(req).then((data) => {
    res.send(data);
  }).catch((e) => {
    res.status(HttpStatus.CONFLICT).send(e);
  });
});



module.exports = router