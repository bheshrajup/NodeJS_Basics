//give arguments in emit()
const eventEmitter = require('events');
const myEvent = new eventEmitter();

///lisner function
const birthday=(name,age)=>{
    console.log(`happy birthday ${name}, you are now ${age}`);
}

//leastning
myEvent.on('birthdayGreet', birthday);

myEvent.emit('birthdayGreet','Ram','40');