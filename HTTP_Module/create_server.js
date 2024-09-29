//import http module
const http =require("http");

const server = http.createServer((req,res)=>{
    res.end("Hello, I am Bheshraj Upadhyaya");
})

//listen on port 5001
server.listen(5001,()=>{
    console.log("Server listening at port 5001");
})