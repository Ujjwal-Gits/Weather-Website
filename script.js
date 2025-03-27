const apiKey = 'Your API Key Here'; // Your OpenWeatherMap API key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const suggestionsList = document.getElementById('suggestions');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');

// Expanded city list for suggestions
const cities = [
    'Amsterdam', 'Athens', 'Auckland', 
    'Bangkok', 'Barcelona', 'Beijing', 'Berlin', 'Bogota', 'Boston', 'Brussels', 
    'Cairo', 'Calgary', 'Cape Town', 'Chicago', 'Copenhagen', 
    'Delhi', 'Dhaka', 'Dubai', 'Dublin', 
    'Edinburgh', 'Edmonton', 
    'Frankfurt', 
    'Geneva', 'Glasgow', 
    'Hamburg', 'Hanoi', 'Helsinki', 'Hong Kong', 'Houston', 
    'Istanbul','Morang', 'Kathmandu', 'Lalitpur', 'Bhaktapur',
    'Janakpur', 'Biratnagar', 'Nepalgunj', 'Dhangadhi', 'Butwal', 'Bhairahawa', 'Birgunj', 'Bardibas', 'Bhadrapur', 'Dharan', 'Itahari', 'Kirtipur', 'Bhaktapur',
    'Pokhara', 'Biratnagar', 'Nepalgunj', 'Dhangadhi', 'Butwal', 'Bhairahawa', 'Birgunj', 'Bardibas', 'Bhadrapur', 'Dharan', 'Itahari', 'Kirtipur', 'Bhaktapur',
    'Jakarta', 'Jerusalem', 
    'Karachi', 'Kiev', 'Kolkata', 'Kuala Lumpur', 
    'Lagos', 'Lima', 'Lisbon', 'London', 'Los Angeles', 
    'Madrid', 'Manila', 'Melbourne', 'Mexico City', 'Miami', 'Milan', 'Montreal', 'Moscow', 'Mumbai', 'Munich', 
    'Nairobi', 'Naples', 'Nashville', 'New York', 'New Delhi', 'Nottingham', 
    'Osaka', 'Oslo', 
    'Paris', 'Perth', 'Philadelphia', 'Phoenix', 'Prague', 
    'Quebec', 
    'Rio de Janeiro', 'Rome', 
    'San Francisco', 'Santiago', 'Sao Paulo', 'Seattle', 'Seoul', 'Shanghai', 'Singapore', 'Stockholm', 'Sydney', 
    'Taipei', 'Tehran', 'Tokyo', 'Toronto', 'Tunis', 
    'Vancouver', 'Vienna', 
    'Warsaw', 'Washington', 
    'Zurich'
];

// Fetch weather data from OpenWeatherMap API
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        weatherResult.style.opacity = '0.5';
        weatherResult.style.transition = 'opacity 0.3s ease';
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} m/s`;
        pressure.textContent = `${data.main.pressure} hPa`;

        weatherResult.style.opacity = '1';
    } catch (error) {
        cityName.textContent = error.message;
        temperature.textContent = '--°C';
        description.textContent = '';
        humidity.textContent = '--%';
        wind.textContent = '-- m/s';
        pressure.textContent = '-- hPa';
        weatherResult.style.opacity = '1';
    }
}

// Show city suggestions based on input
function showSuggestions(input) {
    suggestionsList.innerHTML = '';
    if (!input) {
        suggestionsList.style.display = 'none';
        return;
    }

    const filteredCities = cities
        .filter(city => city.toLowerCase().startsWith(input.toLowerCase()))
        .sort(); // Sort alphabetically for better UX

    if (filteredCities.length > 0) {
        suggestionsList.style.display = 'block';
        filteredCities.slice(0, 10).forEach(city => { // Limit to 10 suggestions
            const li = document.createElement('li');
            li.textContent = city;
            li.addEventListener('click', () => {
                cityInput.value = city;
                suggestionsList.style.display = 'none';
                fetchWeather(city);
            });
            suggestionsList.appendChild(li);
        });
    } else {
        suggestionsList.style.display = 'none';
    }
}

// Event listeners for search functionality
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        suggestionsList.style.display = 'none';
    }
});

cityInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    showSuggestions(value);
});

cityInput.addEventListener('keydown', (e) => {
    // Allow suggestions for any letter typed
    const value = e.target.value.trim() + e.key.toLowerCase();
    if (/^[a-z]$/i.test(e.key)) { // Check if it's a letter
        showSuggestions(value);
    }
});

cityInput.addEventListener('blur', () => {
    setTimeout(() => suggestionsList.style.display = 'none', 200); // Delay to allow click
});

// Animate clouds
const clouds = document.querySelectorAll('.cloud');
clouds.forEach(cloud => {
    const speed = cloud.dataset.speed;
    const startTop = Math.random() * 80 + 10; // Random top position (10-90%)
    cloud.style.top = `${startTop}%`;
    cloud.style.animation = `float ${speed}s linear infinite`;

    cloud.addEventListener('animationiteration', () => {
        cloud.style.top = `${Math.random() * 80 + 10}%`; // New random top position
    });
});

// Initial weather display
fetchWeather('Kathmandu'); // Default city