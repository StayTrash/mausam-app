// // // const city = document.getElementById("city")
// // const btn = document.getElementById("search")
// // const result = document.getElementById("result")
// // const cityInput = document.getElementById("city")
// // const suggestions = document.getElementById("suggestions");

// // const apiKey = "0ee3c341986c4c7e4f2ad97a4dcb8719"

// // const handler = async () => {
// //     const city = cityInput.value

// //     result.innerHTML = `
// //         <p>Loading weather...</p>
// //     `;

// //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
// //     console.log(city)
// //     console.log(url)

// //     const res = await fetch(url)
// //     const data = await res.json()

// //     console.log(data)

// //     result.innerHTML = `
// //     <h2>City: ${data.name}</h2>
// //     <p>Temp: ${Math.round(data.main.temp)}</p>
// //     <p>Weather: ${data.weather[0].main}</p>
// //     `
// // }

// // btn.addEventListener("click", handler)

// // cityInput.addEventListener("keypress", (e) => {
// //     if (e.key == "Enter") {
// //         handler()
// //         cityInput.value = ""
// //         suggestions.innerHTML = ""
// //     }
// // })

// // cityInput.addEventListener("input", async () => {
// //     const city = cityInput.value.trim()
// //     const geourl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

// //     const res = await fetch(geourl)
// //     const data = await res.json()

// //     suggestions.innerHTML = ""

// //     data.forEach(place => {
// //         const div = document.createElement("div")
// //         div.className = "suggestion-item"

// //         div.innerText = `${place.name}, ${place.state || ""}, ${place.country}`

// //         div.addEventListener("click", () => {
// //             cityInput.value = place.name
// //             suggestions.innerHTML = ""
// //             handler()
// //         })

// //         suggestions.appendChild(div)
// //     });
// // })





// const cityInput = document.getElementById("cityInput");
// const result = document.getElementById("result");
// const searchBtn = document.getElementById("search-btn");
// const locationBtn = document.getElementById("locationBtn");
// const historyDiv = document.getElementById("history");

// const apiKey = "0ee3c341986c4c7e4f2ad97a4dcb8719";

// const handler = async () => {
//     const city = cityInput.value.trim();

//     if (!city) {
//         result.innerHTML = "Please enter your city";
//         return;
//     }

//     console.log(city);

//     result.innerHTML = `
//         <div class="loader"></div>
//         <p>Loading weather...</p>
//         `;

//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             result.innerHTML = "City not found";
//             return;
//         }

//         const data = await response.json();

//         let history =
//             JSON.parse(
//                 localStorage.getItem("history")
//             ) || [];

//         history = history.filter(
//             item => item !== data.name
//         );

//         history.unshift(data.name);

//         history = history.slice(0, 5);

//         localStorage.setItem(
//             "history",
//             JSON.stringify(history)
//         );

//         renderHistory();

//         const lat = data.coord.lat;
//         const lon = data.coord.lon;
//         const icon = data.weather[0].icon;
//         const iconurl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

//         result.innerHTML = `
//         <h1>City: ${data.name}</h1>
//         <p>Temperature: <b>${data.main.temp}</b></p>
//         <img src="${iconurl}" alt="wather-icon">
//         <p>Weather: ${data.weather[0].main}</p>
//         <p>Humidity: ${data.main.humidity}%</p>
//         <p>Wind: ${data.wind.speed} km/h</p>
//         <p>Latitute: ${lat}, Longitute: ${lon}</p>
//         `

//     } catch (err) {
//         result.innerHTML = "Something went wrong";
//         console.log(err);
//     }
// }

// searchBtn.addEventListener("click", handler);
// const suggestions = document.getElementById("suggestion-items");

// // cityInput.addEventListener("keypress", (e) => {
// //     if (e.key == "Enter") {
// //         handler();
// //         cityInput.value = "";
// //         suggestions.innerHTML = "";
// //     }
// // });

// cityInput.addEventListener("keydown", (e) => {
//     if (e.key == "Enter") {
//         handler();
//         cityInput.value = "";
//         suggestions.innerHTML = "";
//     }
// });

// let debounceTimer;

// cityInput.addEventListener("input", async () => {
//     clearTimeout(debounceTimer);

//     debounceTimer = setTimeout(async () => {
//         const city = cityInput.value.trim();

//         if (!city) {
//             suggestions.innerHTML = "";
//             return;
//         }

//         const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

//         try {
//             const response = await fetch(url);

//             if (!response.ok) {
//                 suggestions.innerHTML = "";
//                 return;
//             }

//             const data = await response.json();

//             // console.log(data);
//             suggestions.innerHTML = "";

//             data.forEach(place => {
//                 const div = document.createElement("div");

//                 div.innerText = `
//                 ${place.name}, ${place.state || ""}, ${place.country}
//             `

//                 div.addEventListener("click", () => {
//                     cityInput.value = place.name;
//                     handler();
//                     suggestions.innerHTML = "";
//                 })

//                 suggestions.appendChild(div);
//             });
//         } catch (err) {
//             console.log(err);
//         }
//     }, 400);
// });

// const renderHistory = () => {
//     const history = JSON.parse(localStorage.getItem("history")) || [];

//     historyDiv.innerHTML = "";

//     history.forEach(city => {
//         const div = document.createElement("div");
//         div.className = "history-item";
//         div.innerText = city;

//         div.addEventListener("click", () => {
//             cityInput.value = city;
//             handler();
//         });
//         historyDiv.appendChild(div);
//     });
// }

// const fetchWeatherByCoords = async (lat, lon) => {

//     result.innerHTML = `
//         <div class="loader"></div>
//         <p>Loading weather...</p>
//         `;

//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             result.innerHTML = "City not found";
//             return;
//         }

//         const data = await response.json();

//         // const lat = data.coord.lat;
//         // const lon = data.coord.lon;
//         const icon = data.weather[0].icon;
//         const iconurl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

//         result.innerHTML = `
//             <h1>City: ${data.name}</h1>
//             <p>Temperature: <b>${data.main.temp}</b></p>
//             <img src="${iconurl}" alt="wather-icon">
//             <p>Weather: ${data.weather[0].main}</p>
//             <p>Humidity: ${data.main.humidity}%</p>
//             <p>Wind: ${data.wind.speed} km/h</p>
//             <p>Latitude: ${data.coord.lat}</p>
//             <p>Longitude: ${data.coord.lon}</p>
//         `

//     } catch (err) {
//         result.innerHTML = "Something went wrong";
//         console.log(err);
//     }
// }


// locationBtn.addEventListener("click", () => {
//     navigator.geolocation.getCurrentPosition(position => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;

//         fetchWeatherByCoords(lat, lon);
//     }, error => {
//         result.innerHTML = "Location permission denied"
//     });
// });

// renderHistory();
















const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("locationBtn");
const historyDiv = document.getElementById("history");
const suggestions = document.getElementById("suggestion-items");
const themeBtn = document.getElementById("themeBtn");

const apiKey = "0ee3c341986c4c7e4f2ad97a4dcb8719";

let debounceTimer;

// SAFE HISTORY
const getHistory = () => {
    try{
        return JSON.parse(
            localStorage.getItem("history")
        ) || [];
    }catch{
        return [];
    }
};

// SAVE HISTORY
const saveHistory = (city) => {

    let history = getHistory();

    history = history.filter(
        item => item !== city
    );

    history.unshift(city);

    history = history.slice(0,5);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    renderHistory();
};

// RENDER HISTORY
const renderHistory = () => {

    const history = getHistory();

    historyDiv.innerHTML = "";

    history.forEach(city => {

        const div =
        document.createElement("div");

        div.className =
        "history-item";

        div.innerText = city;

        div.addEventListener(
            "click",
            () => {

                cityInput.value = city;
                handler();

            }
        );

        historyDiv.appendChild(div);

    });

};

// RENDER WEATHER
const renderWeather = (data) => {

    const icon =
    data.weather[0].icon;

    const iconUrl =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

    result.innerHTML = `
        <h2>${data.name}</h2>

        <img src="${iconUrl}" alt="icon">

        <h3>${data.main.temp} °C</h3>

        <p>${data.weather[0].main}</p>

        <p>Humidity:
        ${data.main.humidity}%</p>

        <p>Wind:
        ${data.wind.speed} km/h</p>

        <p>Latitude:
        ${data.coord.lat}</p>

        <p>Longitude:
        ${data.coord.lon}</p>
    `;
};

// WEATHER BY CITY
const handler = async () => {

    const city =
    cityInput.value.trim();

    if(!city){
        result.innerHTML =
        "Enter city";
        return;
    }

    suggestions.innerHTML = "";

    searchBtn.disabled = true;

    result.innerHTML = `
        <div class="loader"></div>
        <p>Loading weather...</p>
    `;

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response =
        await fetch(url);

        if(!response.ok){
            result.innerHTML =
            "City not found";
            return;
        }

        const data =
        await response.json();

        renderWeather(data);
        saveHistory(data.name);

    }catch(err){

        result.innerHTML =
        "Something went wrong";

        console.log(err);

    }finally{
        searchBtn.disabled = false;
    }
};

// WEATHER BY COORDS
const fetchWeatherByCoords =
async (lat, lon) => {

    result.innerHTML = `
        <div class="loader"></div>
        <p>Loading...</p>
    `;

    try{

        const response =
        await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            result.innerHTML =
            "Location weather failed";
            return;
        }

        const data =
        await response.json();

        renderWeather(data);
        saveHistory(data.name);

    }catch(err){
        result.innerHTML =
        "Something went wrong";
    }

};

// SEARCH
searchBtn.addEventListener(
    "click",
    handler
);

// ENTER SEARCH
cityInput.addEventListener(
    "keydown",
    (e) => {

        if(e.key === "Enter"){

            handler();
            cityInput.value = "";
            suggestions.innerHTML = "";

        }

    }
);

// DEBOUNCED SUGGESTIONS
cityInput.addEventListener(
    "input",
    () => {

        clearTimeout(
            debounceTimer
        );

        debounceTimer =
        setTimeout(async () => {

            const city =
            cityInput.value.trim();

            if(city.length < 2){
                suggestions.innerHTML="";
                return;
            }

            try{

                const response =
                await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
                );

                if(!response.ok){
                    return;
                }

                const data =
                await response.json();

                if(
                    city !==
                    cityInput.value.trim()
                ){
                    return;
                }

                suggestions.innerHTML = "";

                if(data.length===0){

                    suggestions.innerHTML=
                    "<div>No matches</div>";

                    return;
                }

                data.forEach(place => {

                    const div =
                    document.createElement(
                        "div"
                    );

                    div.className =
                    "suggestion-item";

                    div.innerText =
                    `${place.name},
                    ${place.state || ""},
                    ${place.country}`;

                    div.addEventListener(
                        "click",
                        () => {

                            cityInput.value =
                            place.name;

                            suggestions.innerHTML =
                            "";

                            handler();

                        }
                    );

                    suggestions.appendChild(
                        div
                    );

                });

            }catch(err){
                console.log(err);
            }

        },400);

    }
);

// LOCATION
locationBtn.addEventListener(
    "click",
    () => {

        navigator.geolocation
        .getCurrentPosition(

            position => {

                fetchWeatherByCoords(
                    position.coords.latitude,
                    position.coords.longitude
                );

            },

            error => {

                if(error.code===1){
                    result.innerHTML =
                    "Permission denied";
                }
                else if(error.code===2){
                    result.innerHTML =
                    "Location unavailable";
                }
                else{
                    result.innerHTML =
                    "Location timeout";
                }

            }

        );

    }
);

// THEME
themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        const isDark =
        document.body.classList.contains(
            "dark"
        );

        localStorage.setItem(
            "theme",
            isDark
            ? "dark"
            : "light"
        );

        themeBtn.innerText =
        isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

    }
);

// LOAD THEME
const savedTheme =
localStorage.getItem(
    "theme"
);

if(savedTheme==="dark"){

    document.body.classList.add(
        "dark"
    );

    themeBtn.innerText =
    "☀️ Light Mode";

}

renderHistory();