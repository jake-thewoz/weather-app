
// Here's the variable we'll used for the persistent default, if it exists.
// By default, we'll use Washington, DC. The currentCity variable should always
// contain the name of the currently displayed city.
let currentCity = "Washington,dc,us";

// Here we'll declare the units of measurement for temperature
let units = "imperial";

// Here we're declaring the HTML objects that will be assigned values at init time
let currentTemp, currentIcon;

// Bad form, but it's a free api.
let apiKey = "c107720496abaa4ee5aefeafc5a80d66";

// When the page loads, we'll see if there's a city in local storage
document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "complete") {
        // Check local storage for a city
        console.log('readyState = complete');
        
        initApp();
    }
});

// Here's our document initialization
const initApp = function () {
    console.log('initializing page');

    if (localStorage.getItem("city") !== null) {
        currentCity = localStorage.getItem("city");
    } else {
        currentCity = "Washington,dc,us";
    }

    updateWeather(currentCity);

    // Here we make js objects for our interactive items on the page
    const submitButton = document.querySelector("#submit-button");
    const searchBox = document.querySelector("#search-box");
    const saveButton = document.querySelector("#save-button");

    currentTemp = document.querySelector("#current-temp");
    currentIcon = document.querySelector("#current-weather-icon");

    // Now we add the listener to the search button
    submitButton.addEventListener("click", () => {
        updateWeather(searchBox.value);
    });

    saveButton.addEventListener("click", () => {
        saveCity();
    });
}

// Here's our function that runs on page load,
// and also when the user hits the search button
const updateWeather = async (searchValue) => {
    console.log('updating the weather...');

    const weatherData = await getWeatherData(searchValue);

    console.log(weatherData);

    // Here we update the HTML to reflect the weather
    currentTemp.textContent=weatherData.main.temp;
    const iconString = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png";
    currentIcon.src=iconString;
};

// Here we'll call the weather API and return the json
const getWeatherData = async (cityName) => {
    console.log('getting weather data for ' + cityName + '...');

    const apiString = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + units + "&appid=" + apiKey;

    const response = await fetch(apiString);
    const jsonData = await response.json();
    console.log("weather for " + cityName + " received.");

    // Now we update our currentCity
    currentCity = cityName;
    return jsonData;
}

// This function saves the current city into local storage
const saveCity = function () {
    localStorage.setItem("city", currentCity);
};