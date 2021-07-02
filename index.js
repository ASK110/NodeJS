const ex = require("express");
const path = require("path");
const fs = require("fs");
const hbs = require("hbs")
const rq = require("requests");
const { Console } = require("console");

const staticPath = path.join(__dirname,'./static');
console.log(path.join(__dirname,'./content'));
const app = ex();
app.use(ex.static(staticPath))
app.set('view engine','hbs')
hbs.registerPartials(path.join(__dirname,"./templates/partials"))
//after renaming folder views to templates
app.set('views',path.join(__dirname,"./templates"))
// var weather = fs.createReadStream()
app.get('/',(req,res)=>{console.log("home");res.render('index')})

app.get('/weather',(req,res)=>{
    rq('https://api.openweathermap.org/data/2.5/weather?q=Indore&appid=0deae38ccac5032bbdf190e79c90ba7f'
    ).on('data',(chunk)=>{
        function timefilter(da) {
            p="AM"
            if (da>12){
                t=da-12
                p="PM"
            }
            return {0:t,1:p}
        }
        function monthfilter(da){
            const months={
                0:"JAN",
                1:"FEB",
                2:"MAR",
                3:"APR",
                4:"MAY",
                5:"JUN",
                6:"JUL",
                7:"AUG",
                8:"SEP",
                9:"OCT",
                10:"NOV",
                11:"DEC",
            }
            return months[da]
        }
        function dayfilter(da){
            const days = {
                0:"SUN",
                1:"MON",
                2:"TUS",
                3:"WED",
                4:"THU",
                5:"FRI",
                6:"SAT"
            }
            return days[da]
        }
        var date = new Date()
        var objdata = JSON.parse(chunk);
        var day = dayfilter(date.getDay());
        var weather = objdata.weather.main;
        var icon = objdata.weather.icon;
        var time = timefilter(date.getHours())
        console.log("weather");
        res.render('weather',{
        city:objdata.name,
        country:objdata.sys.country,
        temp:((objdata.main.temp-273.15).toString()).slice(0,4),
        mintemp:((objdata.main.temp_min-273.15).toString()).slice(0,4),
        maxtemp:((objdata.main.temp_max-273.15).toString()).slice(0,4),
        weather:weather,
        icon:icon,
        month:monthfilter(date.getMonth()),
        time:("0"+time[0]).slice(-2)+":"+("0"+date.getMinutes()).slice(-2)+time[1],
        date:("0"+date.getDate()).slice(-2),
        day: day
    })
    }).on('end',(err)=>{
        if (err) return console.log("connection closed..",err);
    })
    })

app.get('/contect',(req,res)=>{console.log("contect");res.render('contect')})

app.get('/about',(req,res)=>{console.log("about");res.render('about')})
app.all('*',(req,res)=>{res.render('404')})
//app.get('/about',(req,res)=>{res.sendFile(path.join(staticPath,"index.html"))})

//app.get('/',(req,res)=>{
    //res.status(200).send("hello")
    //res.sendFile(path.join(staticPath,"/index.html"))
    //res.sendFile(path.resolve(__dirname,'./content/Home.css'))
//})
app.listen(8080)