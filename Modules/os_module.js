//The OS module provides the methods/functions with which information about operating system can be got.

//import
 
const os = require('os');

//os.uptime()
const systemUptime = os.uptime()

//os.userInfo()
const userInfo = os.userInfo();

//Store some other information about myWindowsOS in this object

const otherInfo={
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem : os.freemem(),
};

//results
console.log(systemUptime) //output in seconds
console.log(userInfo)
console.log(otherInfo)