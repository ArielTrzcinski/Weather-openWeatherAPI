var city = document.querySelector('.city');
var imgContainer = document.querySelector('.imgContainer');
var tempContainer = document.querySelector('.tempContainer');
var pressContainer = document.querySelector('.pressContainer');
var humidityContainer = document.querySelector('.humidityContainer');
var windSpeedContainer = document.querySelector('.windSpeedContainer');
var coordinates = [];
var myWeather;


(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onPositionReceived);

        function onPositionReceived(position) {
            coordinates.push(position.coords.latitude);
            coordinates.push(position.coords.longitude);
            getWeather();
        }

    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}());

function getWeather() {

    function stworzObiekt() {
        return new XMLHttpRequest();
    }

    var req = stworzObiekt();

    req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + coordinates[0] + '&lon=' + coordinates[1] + '&APPID=a00af395454b17597209aed1b7cfe2ba&units=metric', true);
    req.send(null);

    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            var jsonObj = eval("(" + req.responseText + ")");
            myWeather = {
                name: jsonObj.name,
                country: jsonObj.sys.country,
                temp: jsonObj.main.temp,
                pressure: jsonObj.main.pressure + ' hPa',
                humidity: jsonObj.main.humidity + ' %',
                windSpeed: jsonObj.wind.speed + ' m/s',
                icon: jsonObj.weather[0].icon
            };

            city.textContent = myWeather.name + ', ' + myWeather.country;
            imgContainer.innerHTML = '<img class="weather-widget__img" src="https://openweathermap.org/img/w/' + myWeather.icon + '.png" alt="Weather London , GB" width="50" height="50">';
            tempContainer.innerHTML = myWeather.temp + ' &deg;<span>C</span>';
            pressContainer.textContent = 'Ciśnienie: ' + myWeather.pressure;
            humidityContainer.textContent = 'Wilgotność powietrza: ' + myWeather.humidity;
            windSpeedContainer.textContent = 'Prędkość wiatru: ' + myWeather.windSpeed;

        }
    };
}

tempContainer.addEventListener('click', function () {

    if (document.querySelector('span').textContent === 'C') {
        tempContainer.innerHTML = (myWeather.temp * 9 / 5 + 32) + ' &deg;<span>F</span>';
    } else if (document.querySelector('span').textContent === 'F') {
        tempContainer.innerHTML = myWeather.temp + ' &deg;<span>C</span>';
    }

});
