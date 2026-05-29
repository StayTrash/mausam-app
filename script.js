// // const city = document.getElementById("city")
// const btn = document.getElementById("search")
// const result = document.getElementById("result")
// const cityInput = document.getElementById("city")
// const suggestions = document.getElementById("suggestions");

// const apiKey = "0ee3c341986c4c7e4f2ad97a4dcb8719"

// const handler = async () => {
//     const city = cityInput.value

//     result.innerHTML = `
//         <p>Loading weather...</p>
//     `;

//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
//     console.log(city)
//     console.log(url)

//     const res = await fetch(url)
//     const data = await res.json()

//     console.log(data)

//     result.innerHTML = `
//     <h2>City: ${data.name}</h2>
//     <p>Temp: ${Math.round(data.main.temp)}</p>
//     <p>Weather: ${data.weather[0].main}</p>
//     `
// }

// btn.addEventListener("click", handler)

// cityInput.addEventListener("keypress", (e) => {
//     if (e.key == "Enter") {
//         handler()
//         cityInput.value = ""
//         suggestions.innerHTML = ""
//     }
// })

// cityInput.addEventListener("input", async () => {
//     const city = cityInput.value.trim()
//     const geourl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

//     const res = await fetch(geourl)
//     const data = await res.json()

//     suggestions.innerHTML = ""

//     data.forEach(place => {
//         const div = document.createElement("div")
//         div.className = "suggestion-item"

//         div.innerText = `${place.name}, ${place.state || ""}, ${place.country}`

//         div.addEventListener("click", () => {
//             cityInput.value = place.name
//             suggestions.innerHTML = ""
//             handler()
//         })

//         suggestions.appendChild(div)
//     });
// })





const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("locationBtn");
const historyDiv = document.getElementById("history");

const apiKey = "0ee3c341986c4c7e4f2ad97a4dcb8719";

const handler = async () => {
    const city = cityInput.value.trim();

    if (!city) {
        result.innerHTML = "Please enter your city";
        return;
    }

    console.log(city);

    result.innerHTML = `
        <div class="loader"></div>
        <p>Loading weather...</p>
        `;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            result.innerHTML = "City not found";
            return;
        }

        const data = await response.json();

        let history =
            JSON.parse(
                localStorage.getItem("history")
            ) || [];

        history = history.filter(
            item => item !== data.name
        );

        history.unshift(data.name);

        history = history.slice(0, 5);

        localStorage.setItem(
            "history",
            JSON.stringify(history)
        );

        renderHistory();

        const lat = data.coord.lat;
        const lon = data.coord.lon;
        const icon = data.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        result.innerHTML = `
        <h1>City: ${data.name}</h1>
        <p>Temperature: <b>${data.main.temp}</b></p>
        <img src="${iconurl}" alt="wather-icon">
        <p>Weather: ${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} km/h</p>
        <p>Latitute: ${lat}, Longitute: ${lon}</p>
        `

    } catch (err) {
        result.innerHTML = "Something went wrong";
        console.log(err);
    }
}

searchBtn.addEventListener("click", handler);
const suggestions = document.getElementById("suggestion-items");

cityInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        handler();
        cityInput.value = "";
        suggestions.innerHTML = "";
    }
});


let debounceTimer;

cityInput.addEventListener("input", async () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
        const city = cityInput.value.trim();

        if (!city) {
            suggestions.innerHTML = "";
            return;
        }

        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // console.log(data);
            suggestions.innerHTML = "";

            data.forEach(place => {
                const div = document.createElement("div");

                div.innerText = `
                ${place.name}, ${place.state || ""}, ${place.country}
            `

                div.addEventListener("click", () => {
                    cityInput.value = place.name;
                    handler();
                    suggestions.innerHTML = "";
                })

                suggestions.appendChild(div);
            });
        } catch (err) {
            console.log(err);
        }
    }, 400);
});

const renderHistory = () => {
    const history = JSON.parse(localStorage.getItem("history")) || [];

    historyDiv.innerHTML = "";

    history.forEach(city => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerText = city;

        div.addEventListener("click", () => {
            cityInput.value = city;
            handler();
        });
        historyDiv.appendChild(div);
    });
}

const fetchWeatherByCoords = async (lat, lon) => {

    result.innerHTML = `
        <div class="loader"></div>
        <p>Loading weather...</p>
        `;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            result.innerHTML = "City not found";
            return;
        }

        const data = await response.json();

        // const lat = data.coord.lat;
        // const lon = data.coord.lon;
        const icon = data.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        result.innerHTML = `
            <h1>City: ${data.name}</h1>
            <p>Temperature: <b>${data.main.temp}</b></p>
            <img src="${iconurl}" alt="wather-icon">
            <p>Weather: ${data.weather[0].main}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} km/h</p>
            <p>Latitude: ${data.coord.lat}</p>
            <p>Longitude: ${data.coord.lon}</p>
        `

    } catch (err) {
        result.innerHTML = "Something went wrong";
        console.log(err);
    }
}


locationBtn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetchWeatherByCoords(lat, lon);
    }, error => {
        result.innerHTML = "Location permission denied"
    });
});

renderHistory();