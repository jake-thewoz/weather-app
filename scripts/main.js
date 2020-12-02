
// Here's the variable we'll used for the persistent default, if it exists.
// By default, we'll use Washington, DC
let city = "Washington,DC";
let apiKey = "c107720496abaa4ee5aefeafc5a80d66";

// Here we'll call the weather API and return the json
const getWeatherData = async (cityName) => {
    console.log('getWeatherData ', cityName);

    const apiString = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    const response = await fetch(apiString);
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
}

// When the page loads, we'll see if there's a city in local storage
document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "complete") {
        // Check local storage for a city
        console.log('readyState = complete');

        city = JSON.parse(localStorage.getItem("city"));
        
        initApp();
    }
});

// Here's our document initialization
const initApp = function () {
    console.log('init app');

    // Here we make js objects for our interactive items on the page
    const submitButton = document.querySelector("#submit-button");
    const searchBox = document.getElementById("search-box");

    // Now we add the listener to the search button
    submitButton.addEventListener("click", () => {
        updateWeather(searchBox.value);
    });
}

// Here's our function that runs on page load,
// and also when the user hits the search button
const updateWeather = async (searchValue) => {
    console.log('updateWeather');

    const weatherData = await getWeatherData(searchValue);
    console.log(weatherData);
};