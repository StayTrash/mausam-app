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

const apiKey = "0ee3c341986c4c7e4f2ad97a4dcb8719";

const handler = async () => {
    const city = cityInput.value;
    
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
        
    } catch(err) {
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
})




cityInput.addEventListener("input", async () => {
    const city = cityInput.value.trim();

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
});