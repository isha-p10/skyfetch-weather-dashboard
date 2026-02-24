const apiKey = "f72f4a5097d4e1d8741379a886c58c5e";


const weatherDiv = document.getElementById("weather");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

async function getWeather(city) {
  try {
    weatherDiv.innerHTML = "<p>Loading...</p>";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await axios.get(url);

    displayWeather(response.data);
  } catch (error) {
    weatherDiv.innerHTML =
      "<p style='color:red;'>City not found. Please try again.</p>";
  }
}

function displayWeather(data) {
  weatherDiv.innerHTML = `
    <h2>${data.name}</h2>
    <p>${data.main.temp} °C</p>
    <p>${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
  `;
}

// Button click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    weatherDiv.innerHTML =
      "<p style='color:red;'>Please enter a city name.</p>";
    return;
  }

  getWeather(city);
  cityInput.value = "";
});

// Enter key support
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});