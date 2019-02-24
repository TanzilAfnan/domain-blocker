const fs = require ('fs');
const config = require('./config');

const GetHostsPath = ()=>{
    // console.log(config);
    return config.hostFile[process.platform];
    // return process.platform;
}

const blocker = () =>{

};

module.exports = {
    GetHostsPath
};