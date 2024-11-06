    const apiKey = '42f2487147ab78c6297870f22ae2bb77';
    const locationInput = document.getElementById('location-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherOutput = document.getElementById('weather-output');
    const suggestions = document.getElementById('suggestions');

    const countriesAndStates = ["United States", "Canada", "Australia", "Germany", "India"];

    locationInput.addEventListener('input', () => {
        const input = locationInput.value.toLowerCase();
        suggestions.innerHTML = '';
        if (input) {
            const filteredLocations = countriesAndStates.filter(location => location.toLowerCase().includes(input));
            filteredLocations.forEach(location => {
                const div = document.createElement('div');
                div.textContent = location;
                div.addEventListener('click', () => {
                    locationInput.value = location;
                    suggestions.innerHTML = '';
                });
                suggestions.appendChild(div);
            });
        }
    });

    searchBtn.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    });

    async function fetchWeather(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Location not found');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            weatherOutput.textContent = error.message;
        }
    }

    function displayWeather(data) {
        const { name, main, weather, wind } = data;
        weatherOutput.innerHTML = `
            <h2>Weather in ${name}</h2>
            <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}" class="weather-icon">
            <div class="weather-details">
                <p>Temperature: ${main.temp}°C</p>
                <p>Weather: ${weather[0].description}</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Wind Speed: ${wind.speed} m/s</p>
            </div>
        `;
    }

//  42f2487147ab78c6297870f22ae2bb77
























