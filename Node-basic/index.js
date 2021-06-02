const log = (...a)=>console.log(...a)

const path = require('path');
log(path.dirname(__filename))
log(path.basename(__filename))
log(path.extname(__filename))
log(path.normalize('../../.././/.//////irr/file.txt'))
log(path.join(__filename,'//./test.txt'))

const fs = require('fs');
// fs.mkdir("img",(err)=>{if(err) throw err; log("Folder Created Successfully")})

// fs.writeFile("img/newFile.txt","Hello Nepal",{encoding: 'utf-8'},(err)=>{if(err) throw err; log("Folder Created Successfully")})
const f1 = fs.readFile("img/newFile.txt",{encoding: 'utf-8'},(e,d)=>log("Async loaded "+d))
try{
var f2 = fs.readFileSync("img/newFile.txt",{encoding: 'utf-8'})
log("Sync Loaded "+f2)
}catch(e){
    log(e.message)
}

// if(f2) fs.appendFile('img/newFile.txt',": A country of Mountains.",log)
// fs.rmdir('honey',(err)=>{if (err) throw err; else log("Folder Honey Deleted")});
const os = require('os');
log(`Free RAM ${os.freemem()/(2**30)} GB  of Total ${os.totalmem()/(2**30)}`)
log(`TempDir ${os.tmpdir()}, OS Type ${os.type()} \n\n`)
log('Uptime is '+os.uptime()/3600 +" hrs")


const http = require('http')
const server = http.createServer((req, res)=>{
    if (req.url == '/') {
        res.write('This is what you get as a response');
        res.end();
    }
});
server.listen(8000);
console.log('Listening on Port 8000: Goto localhost:8000/')

