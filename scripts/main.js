
// Here's the variable we'll used for the persistent default, if it exists.
// By default, we'll use Washington, DC. The currentCity variable should always
// contain the name of the currently displayed city.
let currentCity = "Washington,dc,us";

// Here we'll declare the units of measurement for temperature
let units = "imperial";

// Here we're declaring the HTML objects that will be assigned values at init time
let currentTitle, currentTemp, currentIcon, tempGauge, tempChanger;
let currentHighLow;

// Bad form, but it's a free api.
let apiKey = "c107720496abaa4ee5aefeafc5a80d66";

// When the page loads, we'll see if there's a city in local storage
document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "complete") {
        console.log('readyState = complete');
        initApp();
    }
});

// Here's our document initialization
const initApp = function () {
    console.log('initializing page');

    if (localStorage.getItem("city") !== null) {
        currentCity = localStorage.getItem("city");
        units = localStorage.getItem("units");
    } else {
        currentCity = "Washington,dc,us";
        units = "imperial";
    }

    // Here we make js objects for our interactive items on the page
    const submitButton = document.querySelector("#submit-button");
    const searchBox = document.querySelector("#search-box");
    const saveButton = document.querySelector("#save-button");

    currentTitle = document.querySelector("#current-title");
    currentTemp = document.querySelector("#current-temp");
    currentIcon = document.querySelector("#current-weather-icon");
    tempGauge = document.querySelector("#temp-gauge");

    currentHighLow = document.querySelector("#current-high-low");

    // Now we add the listener to the search button
    submitButton.addEventListener("click", () => {
        updateWeather(searchBox.value);
    });

    saveButton.addEventListener("click", () => {
        saveCity();
    });

    searchBox.addEventListener("keyup", (event) => {
        if (event.keyCode === 13){
            event.preventDefault();
            submitButton.click();
        }
    });

    tempGauge.addEventListener("click", (event) => {
        event.preventDefault();
        console.log('tempchanger');
        if (units === "imperial")
            units = "metric";
        else 
            units = "imperial";
        updateWeather(currentCity);
    }, false);

    // Here we set the weather after the page loads
    updateWeather(currentCity);
}

// Here's our function that runs on page load,
// and also when the user hits the search button
const updateWeather = async (searchValue) => {
    console.log('updating the weather...');

    const weatherData = await getWeatherData(searchValue);

    console.log(weatherData);

    // Here we update the HTML to reflect the weather
    currentTitle.textContent="Current Weather in " + weatherData.name;
    currentTemp.textContent=weatherData.main.temp;
    currentHighLow.textContent=weatherData.main.temp_max + "° | " + weatherData.main.temp_min + "°";
    const iconString = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png";
    currentIcon.src=iconString;
    tempGaugeCheck();
};

// Here we'll call the weather API and return the json
const getWeatherData = async (cityName) => {
    console.log('getting weather data for ' + cityName + '...');

    let apiString;

    if (cityName !== null)
        apiString = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + units + "&appid=" + apiKey;
    else
        apiString = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=" + units + "&appid=" + apiKey;

    const response = await fetch(apiString);
    const jsonData = await response.json();
    console.log("weather for " + cityName + " received.");

    // Now we update our currentCity
    currentCity = cityName;
    return jsonData;
}

// This function is used to change the farenheit and celsius link
const tempGaugeCheck = function () {
    if (units === "imperial")
        tempGauge.innerHTML="F° | <a>C°</a>";
    else
        tempGauge.innerHTML="C° | <a>F°</a>";
}

// This function saves the current city into local storage
const saveCity = function () {
    localStorage.setItem("city", currentCity);
    localStorage.setItem("units", units);
};