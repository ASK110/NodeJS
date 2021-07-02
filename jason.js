const dataori = {
    name : 'ASK',
    city : 'Indore'
}
const fs = require("fs")
const jasonData = JSON.stringify(dataori)
fs.writeFile('jason.json',jasonData,(err)=>{
    console.log("done")
})
fs.readFile('jason.json','utf8',(err,data)=>{
    const ori = JSON.parse(data)
    console.log(ori.name)
})