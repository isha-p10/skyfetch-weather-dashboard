const apiKey = "f72f4a5097d4e1d8741379a886c58c5e";

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios
    .get(url)
    .then(response => {
      console.log(response.data);
      displayWeather(response.data);
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
    });
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weather");

  weatherDiv.innerHTML = `
    <h2>${data.name}</h2>
    <p>${data.main.temp} °C</p>
    <p>${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
  `;
}

// Fetch weather for London (hardcoded for Part 1)
fetchWeather("London");
// Function to fetch weather data
function getWeather(city) {
    // Build the complete URL
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    
    // Make API call using Axios
    axios.get(url)
        .then(function(response) {
            // Success! We got the data
            console.log('Weather Data:', response.data);
            displayWeather(response.data);
        })
        .catch(function(error) {
            // Something went wrong
            console.error('Error fetching weather:', error);
            document.getElementById('weather-display').innerHTML = 
                '<p class="loading">Could not fetch weather data. Please try again.</p>';
        });
}

// Function to display weather data
function displayWeather(data) {
    // Extract the data we need
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;
    // Put it on the page
    document.getElementById('weather-display').innerHTML = weatherHTML;


// Call the function when page loads
getWeather('London');