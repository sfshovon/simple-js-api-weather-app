const container = document.querySelector('.container');
const searchBtn = document.querySelector('.search-btn');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const API_KEY = 'bd93e9a026292679ce96964fe8feb009';

// Press Enter To Search
document.getElementById("input-field")
    .addEventListener("keyup", function(e) {
    e.preventDefault();
    if ((e.key == "Enter" && e.value != "")) {
        document.getElementById("myBtn").click();
    }
});

// Get Current Location's Weather Information 
function getCurrentLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess);
    }
    else{
        alert("Your browser does not support geolocation api");
    }
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    // console.log(api);
    fetchData();
}

function fetchData()   {
    fetch(api)
    .then(res => res.json())
    .then(data => weatherInformations(data))
    // .then(data => console.log(data))
}

// Get Search Location's Weather Information
searchBtn.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value;
    if (city === ''){
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => weatherInformations(data))
})


function weatherInformations(data){
            if (data.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const feels = document.querySelector('.weather-details .feels span');

            switch (data.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.alt = 'Not Found';
            }

            temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
            description.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;
            feels.innerHTML = `${parseInt(data.main.feels_like)}<span>°C</span>`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';   
}

