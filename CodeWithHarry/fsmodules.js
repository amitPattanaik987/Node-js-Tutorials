const fs = require('node:fs');

// fs.readFile("file.txt","utf8",(err,data)=>{
//     console.log(err,data)
// })

const a= fs.readFileSync("file.txt");
console.log(a.toString());

