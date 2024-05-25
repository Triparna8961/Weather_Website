async function populateWeatherTable(city) {
  const url = `https://world-weather-online-api1.p.rapidapi.com/weather.ashx?q=${city}&num_of_days=1&format=json&extra=localObsTime&tp=1&lang=en&timezone=Asia%2FKolkata`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c675236abdmsh8624cfc80526d6fp1867ccjsn522b99171273",
      "X-RapidAPI-Host": "world-weather-online-api1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); // Parse JSON response

    
    document.getElementById(
      "cityNameHourly"
    ).innerText = `Weather Data for ${city}`;



    // Clear previous data
    const weatherDataElement = document.getElementById("weatherData");
    weatherDataElement.innerHTML = "";

    // Extract hourly weather data
    const hourlyData = data.data.weather[0].hourly;

    // Populate table rows with weather data
    hourlyData.forEach((hour) => {
      // Convert time from provided format to 12-hour format
      const time12Hrs = convertTo12Hrs(hour.time);

      const row = document.createElement("tr");
      row.innerHTML = `
                  <td>${time12Hrs}</td>
                  <td>${hour.cloudcover}</td>
                  <td>${hour.tempC}</td>
                  <td>${hour.FeelsLikeC}</td>
                  <td>${hour.humidity}</td>
                  <td>${hour.windspeedKmph}</td>
                  <td>${hour.winddir16Point}</td>
                  <td>${hour.WindChillC}</td>
                  <td>${hour.chanceofrain}</td>
                  <td>${hour.uvIndex}</td>

              `;
      weatherDataElement.appendChild(row);
    });
  } catch (error) {
    console.error(error); // Log any errors
  }
}

// Function to convert time from provided format to 12-hour format
function convertTo12Hrs(time) {
  let hours = Math.floor(time / 100);
  const minutes = time % 100;
  let period = "AM";

  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }

  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
}


// Call populateWeatherTable with default city (Kolkata) on window load
window.onload = function () {
  populateWeatherTable("Kolkata");
};

// Form submission event listener
submitButton.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent default form submission
  const city = cityInput.value;
  populateWeatherTable(city); // Call populateWeatherTable with user input
});

