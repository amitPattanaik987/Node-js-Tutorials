const http = require('http');
const fs=require('fs')

const port=process.env.PORT || 3000;

const server = http.createServer((req,res)=>{
    
    res.setHeader('Content-Type','text/html')
    console.log(req.url)
    
    if(req.url=='/'){
        res.statusCode=200;
        res.end('<h1>Hello guys</h1>')
    }
    else if(req.url=='/site'){
        const data=fs.readFileSync('index.html');
        res.end(data.toString());
    }
    else if(req.url=='/about'){
        res.statusCode=200;
        res.end('<h1>About Page</h1>')
    }
    else{
        res.statusCode=404;
        res.end('<h1>Error Page</h1>')
    }
})

server.listen(port,()=>{
    console.log("server listening")
})