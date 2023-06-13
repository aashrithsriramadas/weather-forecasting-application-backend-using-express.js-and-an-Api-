const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){

    console.log(req.body.cityName);
    const cityName=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=f65c640ca47171996386d8bbb2d511f3&units=metric";
    https.get(url,function(response){
    //    console.log(response.statusCode);
    response.on("data",function(data){


        const weatherData = JSON.parse(data)
       // console.log(weatherData);
       const temp=weatherData.main.temp
       const weatherDescription = weatherData.weather[0].description
       const icon = weatherData.weather[0].icon

       const imageUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"


        
       res.write("<p>The weather is currently "+weatherDescription+".<p>")

       res.write("<h1>The temp in "+cityName+" is "+temp+" degree celsius.<h1>")
       res.write("<img src="+imageUrl+">")
       
       res.send()
    });
    
    });

})


    //res.send("server is up and running");// we can have only send for a get.




app.listen(3000,function(){
    console.log("server is running on port");
})