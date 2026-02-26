document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // 1️⃣ Constructor Function
  // =========================
  function WeatherApp() {
    this.apiKey = "f72f4a5097d4e1d8741379a886c58c5e"; // 👈 PUT YOUR API KEY HERE

    // Store DOM references
    this.weatherDiv = document.getElementById("weather");
    this.cityInput = document.getElementById("city-input");
    this.searchBtn = document.getElementById("search-btn");
  }

  // =========================
  // 2️⃣ Init Method
  // =========================
  WeatherApp.prototype.init = function () {
    this.showWelcome();

    this.searchBtn.addEventListener(
      "click",
      this.handleSearch.bind(this)
    );

    this.cityInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleSearch();
      }
    });
  };

  // =========================
  // 3️⃣ Welcome Message
  // =========================
  WeatherApp.prototype.showWelcome = function () {
    this.weatherDiv.innerHTML =
      "<p>Search for a city to see weather 🌍</p>";
  };

  // =========================
  // 4️⃣ Handle Search
  // =========================
  WeatherApp.prototype.handleSearch = function () {
    const city = this.cityInput.value.trim();

    if (city === "") {
      this.showError("Please enter a city name");
      return;
    }

    this.getWeather(city);
    this.cityInput.value = "";
  };

  // =========================
  // 5️⃣ Loading & Error
  // =========================
  WeatherApp.prototype.showLoading = function () {
    this.weatherDiv.innerHTML = "<p>Loading...</p>";
  };

  WeatherApp.prototype.showError = function (message) {
    this.weatherDiv.innerHTML =
      `<p style="color:red;">${message}</p>`;
  };

  // =========================
  // 6️⃣ Display Current Weather
  // =========================
  WeatherApp.prototype.displayWeather = function (data) {
    this.weatherDiv.innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.main.temp} °C</p>
      <p>${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      <div id="forecast"></div>
    `;
  };

  // =========================
  // 7️⃣ Get Weather + Forecast
  // =========================
  WeatherApp.prototype.getWeather = async function (city) {
    try {
      this.showLoading();

      const weatherURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;

      const forecastURL =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`;

      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(weatherURL),
        axios.get(forecastURL)
      ]);

      this.displayWeather(weatherRes.data);

      const dailyForecast =
        this.processForecastData(forecastRes.data.list);

      this.displayForecast(dailyForecast);

    } catch (error) {
      this.showError("City not found");
    }
  };

  // =========================
  // 8️⃣ Process Forecast (40 → 5)
  // =========================
  WeatherApp.prototype.processForecastData = function (list) {
    return list
      .filter(item => item.dt_txt.includes("12:00:00"))
      .slice(0, 5);
  };

  // =========================
  // 9️⃣ Display 5-Day Forecast
  // =========================
  WeatherApp.prototype.displayForecast = function (forecastList) {
    const forecastDiv = document.getElementById("forecast");

    forecastDiv.innerHTML =
      "<h3>5-Day Forecast</h3><div class='forecast-grid'></div>";

    const grid = forecastDiv.querySelector(".forecast-grid");

    forecastList.forEach(day => {
      const date = new Date(day.dt_txt).toDateString();

      grid.innerHTML += `
        <div class="forecast-card">
          <p>${date}</p>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
          <p>${day.main.temp} °C</p>
          <p>${day.weather[0].description}</p>
        </div>
      `;
    });
  };

  // =========================
  // 🔟 Create App Instance
  // =========================
  const app = new WeatherApp();
  app.init();

});