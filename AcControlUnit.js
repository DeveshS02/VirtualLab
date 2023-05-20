const weatherApiKey = "8bfa3cba8138475a9db210137232804";
let cityName = "";
const tempSpan = document.getElementById('temperature');
const humiditySpan = document.getElementById('humidity');
const locationSpan = document.getElementById('location');
const timeSpan = document.getElementById('time');
const daySpan = document.getElementById('dayOfWeek');

let AC = 1;
let cond_temp = 0;
let cond_humidity = 0;
const acdiv = document.getElementsByClassName('ac-blows-air')[0];

function SetCityName(e){
    cityName = e.target.value;
    locationSpan.innerText = cityName;
    console.log(cityName);
}

function SetTime(e){
    timeInput = e.target.value;
    timeSpan.innerText = timeInput;
}

function SetDayOfWeek(e){
    dayInput = e.target.value;
    daySpan.innerText = dayInput;
}

function handleClick(){
    let url =`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey} &q=${cityName}&aqi=no`;
    fetch(url)
    .then(res=> res.json())
    .then(data => {
        cond_temp = data.current.temp_c;
        cond_humidity = data.current.humidity;
        tempSpan.innerText = data.current.temp_f + "F";
        humiditySpan.innerText = data.current.humidity + "%";
        switchAC();
        return data;
    })
    .catch(error => {
        console.error(error);
    });
}

function switchAC(){
    if(timeInput<17 && timeInput>=8 && cond_temp >= 78){
        AC = 1;
    }else if(cond_humidity>85 && cond_temp >=78 && timeInput>=8 && timeInput<17){
        AC = 1;
    }else if(cond_humidity>85 && cond_temp >=78 && dayInput.toLowerCase()=="sunday" || dayInput.toLowerCase()=="saturday"){
        AC = 1;
    }else if(dayInput.toLowerCase()=="sunday" || dayInput.toLowerCase()=="saturday" && cond_humidity >= 85){
        AC = 1;
    }else{
        AC = 0;
    }

    if(!AC){
        acdiv.classList.add("acoff");
        document.getElementById("acStatus").innerText = "AC Turned off: Saving Power";
        console.log(document.getElementById("acStatus"));
    }else{
        acdiv.classList.remove("acoff");
        console.log(document.getElementById("acStatus"));
        document.getElementById("acStatus").innerText = "AC Turned on";
    }
}