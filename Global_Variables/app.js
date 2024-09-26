console.log(__dirname);
console.log(__filename);


//Define a global variables 
global.myVariable="Hello world";

//Access the global variable
console.log(myVariable)

const sayHello = require('./hello.js');
sayHello('Bheshraj');
sayHello("Raj")
sayHello("Rohit");