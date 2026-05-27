// const city = document.getElementById("city")
const btn = document.getElementById("search")
const result = document.getElementById("result")
const cityInput = document.getElementById("city")
const suggestions = document.getElementById("suggestions");

const apiKey = "0ee3c341986c4c7e4f2ad97a4dcb8719"

const handler = async () => {
    const city = cityInput.value

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    console.log(city)
    console.log(url)

    const res = await fetch(url)
    const data = await res.json()

    console.log(data)

    result.innerHTML = `
    <h2>City: ${data.name}</h2>
    <p>Temp: ${Math.round(data.main.temp)}</p>
    <p>Weather: ${data.weather[0].main}</p>
    `
}

btn.addEventListener("click", handler)

cityInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        handler()
        cityInput.value = ""
        suggestions.innerHTML = ""
    }
})

cityInput.addEventListener("input", async () => {
    const city = cityInput.value.trim()
    const geourl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const res = await fetch(geourl)
    const data = await res.json()

    suggestions.innerHTML = ""

    data.forEach(place => {
        const div = document.createElement("div")
        div.className = "suggestion-item"

        div.innerText = `${place.name}, ${place.state || ""}, ${place.country}`

        div.addEventListener("click", () => {
            cityInput.value = place.name
            suggestions.innerHTML = ""
            handler()
        })

        suggestions.appendChild(div)
    });
})