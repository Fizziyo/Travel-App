
document.getElementById('travel-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    
    // Fetch geonames data
    fetch(`http://api.geonames.org/searchJSON?name_equals=${destination}&username=blossom_gurl`)
    .then(response  => response.json())
    .then(data => {

        // Fetch weather data
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${destination}&key=3abd260934194676ad221e5bde48dcb3`)
        .then(response => response.json())
        .then(weatherData => {

            // Fetch pixabay data
            fetch(`https://pixabay.com/api/?key=38441237-8f697030e72d4a02dade9df60&q=${destination}&image_type=photo`)
            .then(response => response.json())
            .then(imageData => {
                const imgURL = imageData.hits[0].webformatURL;

                document.getElementById('results').innerHTML = `
                    <h2>${destination}, ${data.geonames[0].countryName}</h2>
                    <img src="${imgURL}" alt="${destination}" width="300">
                    <p>Weather: ${weatherData.data[0].weather.description}</p>
                    <p>Temperature: ${weatherData.data[0].temp.toFixed(2)}&deg;C</p>
                    <p> Days left :${calculateDays(date)}</p>
                    <p>MAX Temperature: ${weatherData.data[0].app_max_temp.toFixed(2)}&deg;C</p>
                    <p>MIN Temperature: ${weatherData.data[0].app_min_temp.toFixed(2)}&deg;C</p>

                `;
            })
        });
    });
});
function calculateDays(date) {
    const currentDate = new Date();
    const future = new Date(date);
    const diffInTime = future.getTime() - currentDate.getTime();

    // Convert the time difference into days
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

    return diffInDays;
}


