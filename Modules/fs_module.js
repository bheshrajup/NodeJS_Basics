// This module helps you with file handling operations such as:

// Reading a file (sync or async way)
// Writing to a file (sync or async way)
// Deleting a file
// Reading the contents of a director
// Renaming a file
// Watching for changes in a file


//import fs module

const { error } = require('console');
const fs =require('fs');

//Present working directory: Documents/NodeJS_Basics/Modules
//Making a new directory called ./fs_module:

fs.mkdir('./FS_Module',(err)=>{

    if(err){
        console.log(err);
    }
    else{
        console.log('Folder created successfully.');
    }
})

const data = "Hi, this is newFile.txt";

fs.writeFile('./Documents/NodeJS_Basics/Modules/FS_Module/myFile.txt', data, (err)=>
{
    if(err){
        console.log(err);
        return;
    }   
    else{
        console.log("Written to file successfully...")
    }
})