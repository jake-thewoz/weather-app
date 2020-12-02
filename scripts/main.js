
// Here's the variable we'll used for the persistent default, if it exists
let city = "";

// Here we'll call the weather API and return the json
const getWeatherData = async () => {
    const response = await fetch("weather api");
    return await response.json();
}

