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

    // Create table row for the city's weather data
    const weatherRow = `
        <tr>
          <td>${city}</td>
          <td>${cloud_pct}</td>
          <td>${temp}</td>
          <td>${feels_like}</td>
          <td>${humidity}</td>
          <td>${min_temp}</td>
          <td>${max_temp}</td>
          <td>${wind_speed}</td>
          <td>${wind_degrees}</td>
          <td>${sunriseTime.toLocaleString()}</td>
          <td>${sunsetTime.toLocaleString()}</td>
        </tr>
      `;

    // Append the weather data row to the table
    document.getElementById("weatherData").innerHTML += weatherRow;
  } catch (error) {
    console.error(error);
  }
};

const cities = [
  "Kolkata",
  "Maharashtra",
  "Tamil Nadu",
  "Moscow",
  "New York",
  "Tokyo",
  "Rome",
  "Seoul",
  "Barcelona",
  "Paris",
  "Beijing",
  "Berlin",
];

// Fetch weather data for each city and populate the table
const fetchWeatherForCities = async () => {
  for (const city of cities) {
    await getWeather(city);
  }
};

fetchWeatherForCities();