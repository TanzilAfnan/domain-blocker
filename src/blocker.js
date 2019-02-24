const fs = require ('fs');
const config = require('./config');

const GetVar = (variable)=>{

    if(variable == 'host'){
        return config.hostFile[process.platform];
    }
    else if(variable == 'domain'){
        return config.domain;
    }
}

const block = (cb) =>{
    // fs.readFile(GetHostsPath(), (err, data))
    const hostFile =  GetVar('host')
    fs.readFile(hostFile, (error, data) => {
        if(error){
            console.log("Error while reading File : ", error);
            cb(error);
        }
        console.log("Inside");
        let fileContents = data.toString();
        let domains =  GetVar('domain');
        domains.forEach(domain => {
            if(fileContents.indexOf(domains) < 0){
                console.log("website Is Not Present In The Array !");
                let newLine = "\n127.0.0.1" + "\t" + domains;
                fs.appendFile(hostFile, newLine, (err) => {
                    if(err){
                        console.log("Error While appending line :");
                        console.log(err);
                        cb(err);
                        return;
                    }
                    cb(null, "File Updated Successfully");
                    console.log("File Updated Successfully")
                });
            }
            else{
                cb(null, "Domain Already Added in the List!!");
                console.log("Domain Already Added in the List!!")
            }
        });

        // if(err){
        //     console.log(err);
        //     cb(err);
        //     return;
        // }
        // console.log(fileContents);
        // cb(null, fileContents);
    });
};

module.exports = {
    block
};