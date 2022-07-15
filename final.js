window.addEventListener("scroll", () => {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});


// API
const apiWeather = {
  key: "4e7b7cae3f92ddcb1a05b8c5eec7c40b",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};
let body = document.querySelector("body");
let yearOfCopyright = document.getElementById("yearOfCopyright");
yearOfCopyright.innerHTML = new Date().getFullYear();
let result = document.getElementById("result");
let container_result_state = document.querySelector(".container-result-state");
let resultOfWeather = document.getElementById("resultOfWeather");
let container_result_weather = document.querySelector(
  ".container-result-weather"
);

let faileCheck = document.getElementById('faile');


// INPUT FUNCTION
function searchState() {
  let input = document.getElementById("country-input").value || "uzbekistan";
  console.log(input);
  let res = [
    "south korea",
    "southkorea",
    "republicOfKorea",
    "republicOfKorea",
    "korea",
  ];
  if (res.includes(input)) {
    input = "republic of korea";
  }


  getData(input);
}


getData("uzbekistan");
document.getElementById("country-input").value;


// INPUT CHECK
async function getData(input = "uzbekistan") {
  let url1 = `https://restcountries.com/v3.1/name/${input}?fullText=true`;
  let url2 = `${apiWeather.baseurl}weather?q=${input}&units=metric&APPID=${apiWeather.key}`;
  
try {
  let data = await fetch(url1).then((data) => {
    return data.json();
  });
  let data2 = await fetch(url2).then((data) => {
    return data.json();
  });
  container_result_state.classList.add("showState");
  container_result_weather.classList.add("showState");
  showingResultsOfState(data[0]);
  showingResultsOfWeather(data2);
  faileCheck.innerHTML = "";

} catch (e) {
  faileCheck.innerHTML = "Please enter a valid country name"
}
}


// RESULT OF STATE
function showingResultsOfState(obj) {
  container_result_state.style.backgroundImage = `url("${obj.flags.svg}")`;
  let newHtmlEl = `
    <div>
    <h2>${obj.name.common}</h2>
    <p><span>Capital:</span> ${obj.capital[0]}</p>
    <p><span>Population:</span> ${obj.population}</p>
    <p><span>Currency:</span> ${obj.currencies[Object.keys(obj.currencies)].name}</p>
    <p><span>Continent:</span> ${obj.region}</p>
    <p><span>Languages:</span> ${Object.values(obj.languages)
      .toString()
      .split(",")
      .join(", ")}</p>
    <a href="${obj.maps.googleMaps}" target="_blank">
        <span>Open with Google map</span>
    </a>
            
          </div>
          <div>
              <img class="flag" src="${obj.flags.svg}" alt="${obj.name.common}" />
          </div>
    `;
  result.innerHTML = newHtmlEl;
  let t_country = document.getElementById('t_country');
  t_country.innerHTML = obj.name.common;

  let t_capital = document.getElementById('t_capital');
  t_capital.innerHTML = obj.capital[0];

  let t_population = document.getElementById('t_population');
  t_population.innerHTML = obj.population;

  let t_currency = document.getElementById('t_currency');
  t_currency.innerHTML = obj.currencies[Object.keys(obj.currencies)].name;

  let t_continent = document.getElementById('t_continent');
  t_continent.innerHTML = obj.region;

  let t_languages = document.getElementById('t_languages');
  t_languages.innerHTML = Object.values(obj.languages)
  .toString()
  .split(",")
  .join(", ");

  let t_timezone = document.getElementById('t_timezone');
  t_timezone.innerHTML = obj.timezones[0];

  let official= document.getElementById('official')
  official.innerHTML= obj.name.official;

  let subregion = document.getElementById('subregion');
  subregion.innerHTML = obj.subregion;

  let translations = document.getElementById('translations');
  translations.innerHTML = obj.translations.kor.official;

  let latlng = document.getElementById('latlng');
  latlng.innerHTML = obj.latlng;

  let area = document.getElementById('area');
  area.innerHTML = obj.area;
  
  let car = document.getElementById('car');
  car.innerHTML = obj.car.signs;

  let startOfWeek = document.getElementById('startOfWeek');
  startOfWeek.innerHTML = obj.startOfWeek;

  let independent = document.getElementById('independent');
  independent.innerHTML = obj.independent;

  let symbol= document.getElementById('symbol');
  symbol.innerHTML = `${obj.currencies[Object.keys(obj.currencies)].symbol}`;


  let demonyms = document.getElementById('demonyms');
  demonyms.innerHTML = obj.demonyms.eng.m;

  let landlock = document.getElementById('landlock');
  landlock.innerHTML = obj.landlocked;

  let idd = document.getElementById('idd');
  idd.innerHTML = obj.idd.root;


  let status= document.getElementById('status');
  status.innerHTML = obj.status;

  let tld= document.getElementById('tld');
  tld.innerHTML = obj.tld;

}


// RESULT OF WEATHER
function showingResultsOfWeather(obj) {
  let sunny = [
    "sun",
    "sunny",
    "bright",
    "blazing",
    "sunlight",
    "sunshine",
    "hot",
    "warm",
    "cool",
    "cold",
    "freezing",
  ];
  let rainy = ["rain", "raining", "rainy", "drizzling", "pouring", "lashing"];
  let clouds = [
    "cloud",
    "clouds",
    "cloudy",
    "gloomy",
    "foggy",
    "overcast",
    "starredclouds",
  ];
  let fog = ["mist", "haze", "dense fog", "patchy fog"];
  let snow = [
    "snow",
    "snowing",
    "snowfall",
    "snowstorm",
    "snowflake",
    "blizzard",
  ];
  let breeze = [
    "breeze",
    "breezing",
    "fresh air",
    "blustery",
    "windstorm",
    "hurricane",
  ];
  if (obj.name === "Republic of Korea") {
    obj.name = "South Korea";
  }
  if (obj.weather[0].description == "clear sky") {
    container_result_weather.style.background = `url("./img/clearsky.jpg")`;
  } else if (sunny.includes(obj.weather[0].main.toLowerCase())) {
    container_result_weather.style.background = `url("./img/sunny.jpg")`;
  } else if (rainy.includes(obj.weather[0].main.toLowerCase())) {
    container_result_weather.style.background = `url("./img/rain.jpg")`;
  } else if (clouds.includes(obj.weather[0].main.toLowerCase())) {
    container_result_weather.style.background = `url("./img/scatteredclouds.jpg")`;
  } else if (fog.includes(obj.weather[0].main.toLowerCase())) {
    container_result_weather.style.background = `url("./img/foggy.jpg")`;
  } else if (snow.includes(obj.weather[0].main.toLowerCase())) {
    container_result_weather.style.background = `url("./img/snow.jpg")`;
  } else if (breeze.includes(obj.weather[0].main.toLowerCase())) {
    container_result_weather.style.background = `url("./img/wind.jpg")`;
  } 

  let newHtmlEl = `
<div>
    <h1>${obj.name}, ${obj.sys.country}</h1>
    <h3> ${dateBuilder(new Date())}</h3>
    <h1>${obj.main.temp}°C</h1>
    <h3>${obj.weather[0].main}</h3>
    <h4>${obj.weather[0].description}</h4>
    <h4>humidity: ${obj.main.humidity}</h4>
    <h3>${obj.main.temp_min}°C / ${obj.main.temp_max}°C</h3>
</div>
    `;
  resultOfWeather.innerHTML = newHtmlEl;
}


// DATE_BUILDER
function dateBuilder(s) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[s.getDay()];
  let date = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
