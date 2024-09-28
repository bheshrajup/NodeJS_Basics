//emit() should always defiend after on function

const EventEmitter = require('events');
const myEmmitter = new EventEmitter();

//lostener function 1
const sayHi= ()=>{
    console.log("hi user");
}

//listner function 2
const sayHello = ()=>{
    console.log("hello user");
}

//registering sayHi function as listner
myEmmitter.on('userJoined',sayHi);

//Emitting the event
//myEmmitter.emit('userJoined'); //it print only 'hi user' because before this only sayHI function is regitered

//registering sayHello finction as listner
myEmmitter.on('userJoined', sayHello);
myEmmitter.emit('userJoined');//it print both 'hi user' and 'hello user' because it is defined after registering of both functions