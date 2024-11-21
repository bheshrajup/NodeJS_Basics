//event driven porgramming
//paradigm where program flow is largely determined by events or user actions, rather than by the program's logic. 
//emit() - which causes an event to occur
//on() -used to listen for a particular event and when this event occurs



//import "events" module and creating an instance of the EventEmotter class
const EventEmitter = require('events');
const MyEmitter = new EventEmitter();//instance

//lisner function - welcomeUser()
const WelcomeUser=()=>{
    console.log("wecome to server");    
}

//listinig userjoined event using the on() metohd
MyEmitter.on('userJoined' , WelcomeUser);

//emitter the userjoined event the emit() method
MyEmitter.emit('userJoined');