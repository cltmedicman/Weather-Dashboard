var api = '9fe63ab7fe48349244fd6013e7c7d458';
var city = 'Charlotte';

var current = fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + api + '&units=imperial')
  .then(response => response.json());

var fiveDay = fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + api + '&units=imperial')
    .then(response => response.json());

/* var sixteenDay = fetch('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&cnt=5&appid=1f59b4896a4a39c70ef5a09d6e0f11fa&units=imperial')
    .then(response => response.json()); */

console.log(current);
console.log(fiveDay);