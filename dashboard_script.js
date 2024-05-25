const Cities = [  "Kolkata",
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
"Berlin",];
const labels = [];
const temperatures = [];
const humidities = [];

async function fetchWeatherData(City) {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${City}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c675236abdmsh8624cfc80526d6fp1867ccjsn522b99171273',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error(error);
  }
}

async function fetchAndStoreWeatherData() {
  for (const City of Cities) {
    const weatherData = await fetchWeatherData(City);
    labels.push(City);
    temperatures.push(weatherData.temp);
    humidities.push(weatherData.humidity);
  }

  createChart();
}

function createChart() {
  const ctx = document.getElementById('weather-chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temperatures,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Humidity (%)',
          data: humidities,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

fetchAndStoreWeatherData();