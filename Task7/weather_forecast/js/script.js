async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;

    if (!cityName) {
        alert('Пожалуйста, введите название города.');
        return;
    }

    try {
        const apiKey = '';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=ru`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            showError('Город не найден. Пожалуйста, введите корректное название города.');
        } else {
            displayWeather(data);
        }
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        showError('Произошла ошибка при получении данных о погоде.');
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Температура: ${Math.round(data.main.temp - 273.15)}°C</p>
        <p>Описание: ${data.weather[0].description}</p>
        <p>Влажность: ${data.main.humidity}%</p>
        <p>Скорость ветра: ${data.wind.speed} м/с</p>
    `;

    const weatherImage = document.getElementById('weatherImage');
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    weatherImage.innerHTML = `<img src="${iconUrl}" alt="Погодные условия">`;
}

function showError(message) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<p class="error">${message}</p>`;
}