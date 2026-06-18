const apiKey = " dcc79727052d440ca0e41909261706";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if(city !== ""){
        getWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        searchBtn.click();
    }
});

async function getWeather(city){

    const url =
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try{

        const response = await fetch(url);
        const data = await response.json();

        if(data.error){
            alert("City not found!");
            return;
        }

        document.getElementById("cityName").innerText =
            data.location.name + ", " +
            data.location.country;

        document.getElementById("temperature").innerText =
            Math.round(data.current.temp_c) + "°C";

        document.getElementById("description").innerText =
            data.current.condition.text;

        document.getElementById("humidity").innerText =
            data.current.humidity + "%";

        document.getElementById("wind").innerText =
            data.current.wind_kph + " km/h";

        document.getElementById("feelsLike").innerText =
            Math.round(data.current.feelslike_c) + "°C";

        document.getElementById("visibility").innerText =
            data.current.vis_km + " km";

        document.getElementById("weatherIcon").src =
            "https:" + data.current.condition.icon;

        changeBackground(
            data.current.condition.text.toLowerCase()
        );

    }catch(error){

        console.error(error);
        alert("Something went wrong!");
    }
}

function changeBackground(weather){

    if(weather.includes("sun") || weather.includes("clear")){

        document.body.style.background =
        "linear-gradient(135deg,#f6d365,#fda085)";

    }

    else if(weather.includes("rain")){

        document.body.style.background =
        "linear-gradient(135deg,#4facfe,#00f2fe)";

    }

    else if(weather.includes("cloud")){

        document.body.style.background =
        "linear-gradient(135deg,#bdc3c7,#2c3e50)";

    }

    else{

        document.body.style.background =
        "linear-gradient(135deg,#667eea,#764ba2)";
    }
}

function updateDate(){

    const today = new Date();

    const options = {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"
    };

    document.getElementById("currentDate").innerText =
        today.toLocaleDateString("en-US", options);
}

updateDate();



getWeather("Chennai");