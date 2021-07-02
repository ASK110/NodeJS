console.log("WELCOME TO PRACTICE MODE")
const fs = require("fs")
const http = require("http")
const re = require("requests")
var date = new Date()
var ts = Date.now()
console.log(date.getDate())
// const server = http.createServer((req,res)=>{
//     if (req.url==="/"){
//         console.log("HOME")
//         fs.readFile('./content/text.txt','utf8',(err,data)=>{
//             if (err){
//                 console.log(err)
//             } else {
//                 res.write(data)
//                 res.end("HOME")
//             }
//         })
//     }
//     else if (req.url==="/about"){
//         console.log("ABOUT")
//         res.end("ASK")
//     }else{
//         console.log("ERROR")
//         res.end("OOPS!!")
//     }
// }).listen("8080",()=>{
//     console.log("Port:8080 Running....")
// })