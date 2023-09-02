const UNSPLASH_API_KEY = 'Lx-AzLYWKaEjIRplTZkbg9B4WE8yCs7Fdj2DBI98NW4';
const OPENWEATHER_API_KEY = 'c0f3acdfe2673a083760784d8994178b';
const UNSPLASH_ENDPOINT = 'https://api.unsplash.com/search/photos';
const OPENWEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
let timeout = null;

locationInput.addEventListener('keyup', (e) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        const query = e.target.value;
        if (query.length > 2) { // To avoid too many API calls for short inputs
            document.getElementById("heading").style.display = "block";
            fetchWeather(query);
            fetchImages(query);
        }
    }, 1000); // Wait for 1 second after user stops typing
});

function fetchImages(query) {
    const url = `${UNSPLASH_ENDPOINT}?query=${query}&client_id=${UNSPLASH_API_KEY}&per_page=6`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const imagesContainer = document.getElementById('imagesContainer');
            // Clear previous images
            imagesContainer.innerHTML = '';
        
            data.results.forEach(image => {
                const img = document.createElement('img');
                img.src = image.urls.small;
                imagesContainer.appendChild(img);
            });
        })
        .catch(error => {
            console.error("Error fetching image", error);
        });
}


function fetchWeather(query) {
    const url = `${OPENWEATHER_ENDPOINT}?q=${query}&appid=${OPENWEATHER_API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherContainer = document.getElementById('weatherContainer');
            weatherContainer.innerHTML = `Temperature: ${data.main.temp}°C, Weather: ${data.weather[0].description}`;
        })
        .catch(error => {
            console.error("Error fetching weather", error);
        });
}
