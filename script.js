const getWeather = async (city) => {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  const apiKey = "c675236abdmsh8624cfc80526d6fp1867ccjsn522b99171273";
  const host = "weather-by-api-ninjas.p.rapidapi.com";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": host,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Parse response as JSON

    // Assuming response is an object with weather data properties
    const {
      cloud_pct,
      temp,
      feels_like,
      humidity,
      min_temp,
      max_temp,
      wind_speed,
      wind_degrees,
      sunrise,
      sunset,
    } = result;

    // Convert timestamp into human-readable time
    const sunriseTime = new Date(sunrise * 1000); // Convert seconds to milliseconds
    const sunsetTime = new Date(sunset * 1000); // Convert seconds to milliseconds

    // Display the weather data on the webpage
    document.getElementById("cityName").textContent = city;
    document.getElementById("cloud_pct").textContent = cloud_pct;
    document.getElementById("temp").textContent = temp;
    document.getElementById("feels_like").textContent = feels_like;
    document.getElementById("humidity").textContent = humidity;
    document.getElementById("min_temp").textContent = min_temp;
    document.getElementById("max_temp").textContent = max_temp;
    document.getElementById("wind_speed").textContent = wind_speed;
    document.getElementById("wind_degrees").textContent = wind_degrees;
    document.getElementById("sunrise").textContent = sunriseTime.toLocaleString();
    document.getElementById("sunset").textContent = sunsetTime.toLocaleString();
  } catch (error) {
    console.error(error);
  }
};

const submitButton = document.getElementById("submit");
const cityInput = document.getElementById("city");

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const city = cityInput.value;
  await getWeather(city);
});

// Initial call with a default city (Kolkata)
getWeather("Kolkata");