//multiple on function are lintning for a single event happen

const EventEmitter = require('events');//importing
const  myEmmitter = new EventEmitter(); //instance

//listener function 1: sayhello
const sayHello=()=>{
    console.log("hello user");
}

//lisnener function 2: sayHi
const sayHi=()=>{
    console.log("hi user");
}

//lisnener function 3: newYear
const newYear=()=>{
    console.log("happy new year");
}

//subcsribing to 'userJoined' event
myEmmitter.on('userJoined', sayHello);
myEmmitter.on('userJoined', sayHi);
myEmmitter.on('userJoined', newYear);

myEmmitter.emit('userJoined');