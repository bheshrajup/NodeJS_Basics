//The path module comes in handy while working with file and directory path.
/*
-->join path segment together
-->tell if a path is absolute or not
--> get the last portion/segment of a path
--> get the file extension from a path...
*/

//import 'path' module using the 'require()' method
const path = require('path')


//Assigning a path to the myPath variable
const myPath = '/Documents/NodeJS_Basics/Modules/path_module.js'

const pathInfo={
    fileName: path.basename(myPath),
    folderName: path.dirname(myPath),
    fileExtension: path.extname(myPath),
    absoluteOrNot: path.isAbsolute(myPath),
    detailInfo: path.parse(myPath),
}

console.log(pathInfo)


// 2 differences are to be noted here:

// Difference in path separators: In Windows, file paths use the backslash (\) as the separator between directories, while in macOS/Linux (which is a Unix-based system), file paths use the forward slash (/) as the separator.
// Difference in root directory of the users files: On Windows, the root directory for a user's files is commonly found at C:\Users\username, whereas on macOS and Linux, it is located at /Users/username/. While this holds true for most Windows, macOS, and Linux systems, there may be some variations in the exact location of the user's home directory based on the system's configuration.

