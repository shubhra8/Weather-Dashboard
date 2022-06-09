let button = document.querySelector("button");
let APIKey = "76f3655a6068a6965efdc5b12f9e9d18";
let temp = document.getElementById("Temperature");
let wind = document.getElementById("Wind");
let Humid = document.getElementById("Humidity");
let Uvindex= document.getElementById("UVindex");
var main = document.getElementById("main");
var city=document.getElementById("cityName");
var searchhistory =document.getElementById("search-history");
var imagecurrent=document.getElementById("imgcurrent");
var datecurrent=document.getElementById("datecurrent");
var dateforecast1=document.getElementById("dateforecast1");
 var dateforecast2=document.getElementById("dateforecast2");
 var dateforecast3=document.getElementById("dateforecast3");
 var dateforecast4=document.getElementById("dateforecast4");
 var dateforecast5=document.getElementById("dateforecast5");
var Tempforecast1=document.getElementById("Tempforecast1");
var Tempforecast2=document.getElementById("Tempforecast2");
var Tempforecast3=document.getElementById("Tempforecast3");
var Tempforecast4=document.getElementById("Tempforecast4");
var Tempforecast5=document.getElementById("Tempforecast5");
var Windforecast1=document.getElementById("Windforecast1");
var Windforecast2=document.getElementById("Windforecast2");
var Windforecast3=document.getElementById("Windforecast3");
var Windforecast4=document.getElementById("Windforecast4");
var Windforecast5=document.getElementById("Windforecast5");
var Humidityforecast1=document.getElementById("Humidityforecast1");
var Humidityforecast2=document.getElementById("Humidityforecast2");
var Humidityforecast3=document.getElementById("Humidityforecast3");
var Humidityforecast4=document.getElementById("Humidityforecast4");
var Humidityforecast5=document.getElementById("Humidityforecast5");
var imgforecast1=document.getElementById("imgforecast1");
var imgforecast2=document.getElementById("imgforecast2");
var imgforecast3=document.getElementById("imgforecast3");
var imgforecast4=document.getElementById("imgforecast4");
var imgforecast5=document.getElementById("imgforecast5");
var div1=document.getElementById("maindiv");
let button1;


//var apiCall2='https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&appid=76f3655a6068a6965efdc5b12f9e9d18';
//This function will be called when search button is pressed 
function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    main.style.display="block";
    var search = document.querySelector("#search-input").value;
    console.log(search);
    var apiCall='https://api.openweathermap.org/data/2.5/weather?q='+search+'&appid='+APIKey+'&units=metric'
    fetch(apiCall)
        .then(function(response) {
          return response.json();
        })
        .then(function (data) {
            console.log(data);
            const unixTimestamp = data.dt;
           const milliseconds = unixTimestamp * 1000
          const dateObject = new Date(milliseconds)
          
        city.innerHTML= search;
        localStorage.setItem('cityInput',JSON.stringify(search));
         button1=document.createElement("button");
         button1.setAttribute("id","button1");
         div1.appendChild(button1);
         button1.innerHTML=localStorage.getItem('cityInput');
       //  var a=localStorage.getItem('cityInput');
        button1.addEventListener('click',handleSubmit1);
        
        datecurrent.innerHTML=dateObject.toDateString();
        imagecurrent.src='http://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png';
      console.log(data.coord.lat);
      printData(data.coord.lat,data.coord.lon)
    });
   
    }

//This function will be called when search history button is clicked
    function handleSubmit1(event) {
    event.preventDefault();
    console.log(event.target);
    main.style.display="block";
    var a=event.target.innerHTML;
    var b = a.replace(/['"]+/g, '')
    console.log(b);
    
   
    var apiCallsearch='https://api.openweathermap.org/data/2.5/weather?q='+b+'&appid='+APIKey;
    fetch(apiCallsearch)
        .then(function(response) {
          return response.json();
        })
        .then(function (data) {
            console.log(data);
            const unixTimestamp = data.dt;
           const milliseconds = unixTimestamp * 1000
          const dateObject = new Date(milliseconds) 
        city.innerHTML= b;
        datecurrent.innerHTML=dateObject.toDateString();
        imagecurrent.src='http://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png';
      console.log(data.coord.lat);
      printData(data.coord.lat,data.coord.lon)
    });
   
    }
    //This function will print data of current and forecasted weather conditions
 function printData(lat,lon){
    var apiCall2='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid='+APIKey+'&units=metric';
     //temp.innerHTML='Temperature: '+data.main.temp;
     //wind.innerHTML='Wind:  '+data.wind.speed+ 'mph';
     //Humid.innerHTML='Humidity  '+data.main.humidity+ '%';
       fetch(apiCall2)
        .then(function(response) {
          return response.json();
        })
        .then(function (data) {
      console.log(data);
     
    temp.innerHTML='Temperature: '+data.current.temp+'ºC'
     wind.innerHTML='Wind:  '+data.current.wind_speed+ 'mph';
     Humid.innerHTML='Humidity  '+data.current.humidity+ '%';
     Uvindex.innerHTML='Uv Index '+data.current.uvi;
     var uv=data.current.uvi;
     var Humidityforecast=[Humidityforecast1,Humidityforecast2,Humidityforecast3,Humidityforecast4,Humidityforecast5]
     var Windforecast=[Windforecast1,Windforecast2,Windforecast3,Windforecast4,Windforecast5]
     var Tempforecast=[Tempforecast1,Tempforecast2,Tempforecast3,Tempforecast4,Tempforecast5]
     var dateforecast=[dateforecast1,dateforecast2,dateforecast3,dateforecast4,dateforecast5]
     var imgforecast=[imgforecast1,imgforecast2,imgforecast3,imgforecast4,imgforecast5]

    for(i=0;i<=4;i++){
           const milliseconds = data.daily[i+1].dt * 1000
          const dateObject = new Date(milliseconds)
          const humanDateFormat = dateObject.toDateString();
          //const date=dateObject.substring(1,14);
          //console(date);
          datefinal=dateforecast[i]
          tempfinal=Tempforecast[i]
          windfinal=Windforecast[i]
          humidfinal=Humidityforecast[i]
          imagefinal=imgforecast[i]
          console.log(datefinal);
        datefinal.innerHTML=humanDateFormat;
        tempfinal.innerHTML='Temp: ' +data.daily[i+1].temp.day+'ºC';
        windfinal.innerHTML='Wind: ' +data.daily[i+1].wind_speed+ 'MPH';
        humidfinal.innerHTML='Humidity: ' +data.daily[i+1].humidity+ '%';
        imagefinal.src='http://openweathermap.org/img/wn/'+data.daily[i+1].weather[0].icon+'@2x.png';
    }
     console.log(uv);
     //Here we are checking the UVindex 
     if (uv <=2){
         Uvindex.style.backgroundColor='green';
     }
     else if (uv <=5){
          Uvindex.style.backgroundColor='orange';
     }
     else{
         Uvindex.style.backgroundColor='red';
     }
    });
    

 }

button.addEventListener('click',handleSubmit)
 