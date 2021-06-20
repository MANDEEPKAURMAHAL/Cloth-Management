const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// to access token in request
app.use(bearerToken());
app.use(express.static('uploads'));
app.use('/user', require('./route/user.js'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});