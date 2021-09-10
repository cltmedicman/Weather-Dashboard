var api = '9fe63ab7fe48349244fd6013e7c7d458';
var savedPlaces = [];

var currentCityEl = document.querySelector("#current-city");
var tempEl = document.querySelector('#temp');
var windEl = document.querySelector('#wind');
var humidityEl = document.querySelector('#humidity');
var uvEl = document.querySelector('#UV');
var day1El = document.querySelector('#day1');
var day2El = document.querySelector('#day2');
var day3El = document.querySelector('#day3');
var day4El = document.querySelector('#day4');
var day5El = document.querySelector('#day5');
var cityEl = document.querySelector('#city');
var stateEl = document.querySelector('#state-id');
var submitBtn = document.querySelector('.submitbtn');
var searchEl = document.querySelector('.search');

searchHx();

submitBtn.addEventListener('click', function() {
  var city = cityEl.value;
  var state = stateEl.value
  var place = city + ',' + state + ',US';
  place = place.toUpperCase();
  currentWeather(place);
})

document.addEventListener('click', function(e) {
  var target = e.target;
  if (target.classList.contains('saved-btn')) {
    var place = target.innerText;
    place = place.toUpperCase();
    currentWeather(place);
  }
})

function searchHx () {
  if (JSON.parse(localStorage.getItem('Places')) != null) {
    var storedPlaces = JSON.parse(localStorage.getItem('Places'));
    searchEl.innerHTML = "";
  
    for (i = 0; i < storedPlaces.length; i++) {
      searchList(storedPlaces[i]);
    }
  }
}

function currentWeather (place) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + place + '&appid=' + api + '&units=imperial')
  .then(function(response) {return response.json()})
  .then(function(data) {
    
    var iconId = data.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
    var date = moment();
    date = moment(date).format("MM/DD/YYYY");
    currentCityEl.innerHTML = place + " (" + date + ") <img src=\"" + iconUrl + "\">";
    tempEl.innerHTML = "<h3>Temp:&nbsp;" + data.main.temp + "&#8457;</h3>";
    windEl.innerHTML = "<h3>Wind:&nbsp;" + data.wind.speed + "&nbsp;Mph&nbsp;💨</h3>";
    humidityEl.innerHTML = "<h3>Humidity:&nbsp;" + data.main.humidity + "&nbsp;&#37;</h3>";
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    
    uvIndex(lat, lon);
    fiveDay(place);
    
    if (JSON.parse(localStorage.getItem('Places')) != null) {
      savedPlaces = JSON.parse(localStorage.getItem('Places'));
    } else {
      savedPlaces.push(place);
      localStorage.setItem('Places', JSON.stringify(savedPlaces));
      searchList(place);
    }
    
    if (!savedPlaces.includes(place)) {
      if (savedPlaces.length >= 5) {
        savedPlaces.shift();
        searchHx();
      }
      searchList(place);
      savedPlaces.push(place);
      localStorage.setItem('Places', JSON.stringify(savedPlaces));
    }
  })
}

function uvIndex(lat, lon) {
  fetch('https://api.openweathermap.org/data/2.5/uvi?appid=' + api + '&lat=' + lat + '&lon=' + lon)
  .then(function(response) {return response.json()})
  .then (function(data) {
    
    var uV = data.value;
    
    if (uV < 3) {
      uvEl.innerHTML = "<h3>UV Index:&nbsp;<span style=\"background-color:green; color:blue; font-weight:bold; font-size:20px;\">&nbsp;&nbsp;" + uV + "&nbsp;&nbsp;</span></h3>";
    } else if (uV >= 3 && uV < 8) {
      uvEl.innerHTML = "<h3>UV Index:&nbsp;<span style=\"background-color:yellow; color:blue; font-weight:bold; font-size:20px;\">&nbsp;&nbsp;" + uV + "&nbsp;&nbsp;</span></h3>";
    } else if (uV >= 8) {
      uvEl.innerHTML = "<h3>UV Index:&nbsp;<span style=\"background-color:red; color:white; font-weight:bold; font-size:20px;\">&nbsp;&nbsp;" + uV + "&nbsp;&nbsp;</span></h3>";
    }
  })
}

function fiveDay(place) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + place + '&appid=' + api + '&units=imperial')
  .then(function(response) {return response.json()})
  .then(function(data) {
    
    var date = moment();
    var time = " 15:00:00";

    var date1 = moment(date).add(1, 'd').format("YYYY-MM-DD");
    date1 = date1 + time;
    const day1 = new Array();
    for (i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt === date1) {
        day1.push(data.list[i]);
        
        day1El.innerHTML = "<div class=\"days\"><h4>" + moment(date).add(1,'d').format("MM/DD/YYYY") + "</h4>"
        + "<p><img src=\"http://openweathermap.org/img/wn/" + day1[0].weather[0].icon + ".png\"></p>"
        + "<h6>Temp:&nbsp;" + day1[0].main.temp + "&#8457;</h6>"
        + "<h6>Wind:&nbsp;" + day1[0].wind.speed + "&nbsp;Mph&nbsp;💨</h6>"
        + "<h6>Humidity:&nbsp;" + day1[0].main.humidity + "&nbsp;&#37;</h6></div>"
      }
    }

    var date2 = moment(date).add(2, 'd').format("YYYY-MM-DD");
    date2 = date2 + time;
    const day2 = new Array();
    for (i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt === date2) {
        day2.push(data.list[i]);
        
        day2El.innerHTML = "<div class=\"days\"><h4>" + moment(date).add(2,'d').format("MM/DD/YYYY") + "</h4>"
        + "<p><img src=\"http://openweathermap.org/img/wn/" + day2[0].weather[0].icon + ".png\"></p>"
        + "<h6>Temp:&nbsp;" + day2[0].main.temp + "&#8457;</h6>"
        + "<h6>Wind:&nbsp;" + day2[0].wind.speed + "&nbsp;Mph&nbsp;💨</h6>"
        + "<h6>Humidity:&nbsp;" + day2[0].main.humidity + "&nbsp;&#37;</h6></div>"
      }
    }
    
    var date3 = moment(date).add(3, 'd').format("YYYY-MM-DD");
    date3 = date3 + time;
    const day3 = new Array();
    for (i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt === date3) {
        day3.push(data.list[i]);
        
        day3El.innerHTML = "<div class=\"days\"><h4>" + moment(date).add(3,'d').format("MM/DD/YYYY") + "</h4>"
        + "<p><img src=\"http://openweathermap.org/img/wn/" + day3[0].weather[0].icon + ".png\"></p>"
        + "<h6>Temp:&nbsp;" + day3[0].main.temp + "&#8457;</h6>"
        + "<h6>Wind:&nbsp;" + day3[0].wind.speed + "&nbsp;Mph&nbsp;💨</h6>"
        + "<h6>Humidity:&nbsp;" + day3[0].main.humidity + "&nbsp;&#37;</h6></div>"
      }
    }

    var date4 = moment(date).add(4, 'd').format("YYYY-MM-DD");
    date4 = date4 + time;
    const day4 = new Array();
    for (i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt === date4) {
        day4.push(data.list[i]);
        
        day4El.innerHTML = "<div class=\"days\"><h4>" + moment(date).add(4,'d').format("MM/DD/YYYY") + "</h4>"
        + "<p><img src=\"http://openweathermap.org/img/wn/" + day4[0].weather[0].icon + ".png\"></p>"
        + "<h6>Temp:&nbsp;" + day4[0].main.temp + "&#8457;</h6>"
        + "<h6>Wind:&nbsp;" + day4[0].wind.speed + "&nbsp;Mph&nbsp;💨</h6>"
        + "<h6>Humidity:&nbsp;" + day4[0].main.humidity + "&nbsp;&#37;</h6></div>"
      }
    }

    var date5 = moment(date).add(5, 'd').format("YYYY-MM-DD");
    date5 = date5 + time;
    const day5 = new Array();
    for (i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt === date5) {
        day5.push(data.list[i]);
        
        day5El.innerHTML = "<div class=\"days\"><h4>" + moment(date).add(5,'d').format("MM/DD/YYYY") + "</h4>"
        + "<p><img src=\"http://openweathermap.org/img/wn/" + day5[0].weather[0].icon + ".png\"></p>"
        + "<h6>Temp:&nbsp;" + day5[0].main.temp + "&#8457;</h6>"
        + "<h6>Wind:&nbsp;" + day5[0].wind.speed + "&nbsp;Mph&nbsp;💨</h6>"
        + "<h6>Humidity:&nbsp;" + day5[0].main.humidity + "&nbsp;&#37;</h6></div>"
      }
    }

  })
}

function searchList(place){
  var divContainer = document.querySelector('.search');
  var div = document.createElement("div");
  var button = document.createElement("button");
  button.innerHTML = place;
  button.classList.add('btn');
  button.classList.add('btn-secondary');
  button.classList.add('saved-btn');
  button.setAttribute("type", "button");
  button.setAttribute("style", "width: 100%; text-transform: capitalize;");
  div.appendChild(button);
  divContainer.appendChild(div);
}