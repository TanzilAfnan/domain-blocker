const fs = require ('fs');

const checkPlatform = ()=>{
    console.log(process.platform);
    return process.platform;
}

module.exports = {
    checkPlatform
};