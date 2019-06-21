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
const hostFile =  GetVar('host');


const unBlock = (cb) => {

    try{
        var data = fs.readFileSync(hostFile);
        data = data.toString();
        let dataArray = data.split('\n');
        let fileContents = data.toString();
        console.log(fileContents);
        let domains =  GetVar('domain');
        domains.forEach(domain => {

            console.log("domain: "+domain);
            console.log("index:" + fileContents.indexOf(domain));
            if(fileContents.indexOf(domain) < 0){
                cb(null, "Domain not blocked yet.");
                console.log("Domain not blocked yet.")
            }
            else{
                
                console.log("website Is Present In The Blocked List !");
                let domainLine = "\n127.0.0.1" + "\t" + domain;

                let lastIndex = -1; // let say, we have not found the keyword

                for (let index=0; index<dataArray.length; index++) {
                    if (dataArray[index].includes(domain)) { // check if a line contains the  keyword
                        lastIndex = index; // found a line includes a  keyword
                        break; 
                    }
                }
            
                dataArray.splice(lastIndex, 1); // remove the keyword from the data Array
                
                const updatedData = dataArray.join('\n');
                try{
                    fs.writeFileSync(hostFile, updatedData)
                    console.log ('Successfully updated the file data');
                }
                catch(e){
                    console.log("Error while updating the file!!!");
                    console.log(e);
                }
                
            }
        });
    }
    catch(err){
        console.log(err)
    }

}

const block = (cb) =>{
    // fs.readFile(GetHostsPath(), (err, data))
    
    try{
        var data = fs.readFileSync(hostFile);
        let fileContents = data.toString();
        console.log(fileContents);
        let domains =  GetVar('domain');
        domains.forEach(domain => {

            console.log("Doain: "+domain);
            console.log("index:" + fileContents.indexOf(domain));
            if(fileContents.indexOf(domain) < 0){
                console.log("website Is Not Present In The Array !");
                let newLine = "\n127.0.0.1" + "\t" + domain;
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
    }
    catch(err){
        console.log(err)
    }
    
    
     

    // fs.readFile(hostFile, (error, data) => {
    //     if(error){
    //         console.log("Error while reading File : ", error);
    //         cb(error);
    //     }
    //     console.log("Inside");
    //     let fileContents = data.toString();
    //     let domains =  GetVar('domain');
    //     domains.forEach(domain => {
    //         if(fileContents.indexOf(domains) < 0){
    //             console.log("website Is Not Present In The Array !");
    //             let newLine = "\n127.0.0.1" + "\t" + domain;
    //             fs.appendFile(hostFile, newLine, (err) => {
    //                 if(err){
    //                     console.log("Error While appending line :");
    //                     console.log(err);
    //                     cb(err);
    //                     return;
    //                 }
    //                 cb(null, "File Updated Successfully");
    //                 console.log("File Updated Successfully")
    //             });
    //         }
    //         else{
    //             cb(null, "Domain Already Added in the List!!");
    //             console.log("Domain Already Added in the List!!")
    //         }
    //     });
     
    // });
};

module.exports = {
    block,
    unBlock
};