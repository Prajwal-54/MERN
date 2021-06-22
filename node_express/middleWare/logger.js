
//for dealing with dates and time
const moment = require("moment");
const fs = require("fs");
const path = require("path");


const logger = (req, res, next) => {

  //logging url everytime user enter or change url
  let log=`${req.protocol}://${req.get('host')}${req.originalUrl} ${moment().format()} \n`;



// saving logging details in separate file
fs.appendFile(path.join(__dirname,'logDetails.txt'),log,err=>{
    if (err) throw err;
  
    console.log(log);
})
  
  next();
};


module.exports=logger;