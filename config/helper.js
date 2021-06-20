var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
exports.checkEmpty = function (val) {
    if (val === '' || val === null || typeof val === 'undefined' || val === 'null' || val == 'null' || val == undefined || val == 'undefined') {
        return false;
    } else {
        return true;
    }
};
exports.getId = function () {
    var dTime = new Date().getTime();
    var genaratedId;
    var rNum = getRandomInt(1, 9);
    genaratedId = '' + rNum + '' + dTime;
    return genaratedId;
};