// Whole-script strict mode syntax
"use strict";

const DEFAULT_CITY = "Seattle";

const state = {
  currentTemp: 50,
  currentCity: "Seattle",
  currentSky: "Sunny",
  latitude: 123,
  longitude: 123,
  temperature: 123,
  sky: "dfsfasd"
};

document.getElementById("tempValue").innerText = state.currentTemp;

const initTempColor = () => {
  document.getElementById('tempValue').style.color = findTempColorStyle();
}

const increaseTemp = () => {
  state.currentTemp += 1;
  document.getElementById("tempValue").innerText = state.currentTemp;
  initTempColor();
  initLandscape();
}

const decreaseTemp = () => {
  state.currentTemp -= 1;
  document.getElementById("tempValue").innerText = state.currentTemp;
  initTempColor();
  initLandscape();
}

const findTempColorStyle = () => {
  if (state.currentTemp <= 49) {
    return tempColorStyleDictionary[49];
  } else if (state.currentTemp >= 50 && state.currentTemp <= 59) {
    return tempColorStyleDictionary[50];
  } else if (state.currentTemp >= 60 && state.currentTemp <= 69) {
    return tempColorStyleDictionary[60];
  } else if (state.currentTemp >= 70 && state.currentTemp <= 79) {
    return tempColorStyleDictionary[70];
  } else {
    return tempColorStyleDictionary[80];
  }
}

const initLandscape = () => {
  document.getElementById('landscape').innerText = findLandscapeStyle();
}

const findLandscapeStyle = () => {
  if (state.currentTemp <= 49) {
    return landscapeDictionary[49];
  } else if (state.currentTemp >= 50 && state.currentTemp <= 59) {
    return landscapeDictionary[50];
  } else if (state.currentTemp >= 60 && state.currentTemp <= 69) {
    return landscapeDictionary[60];
  } else if (state.currentTemp >= 70 && state.currentTemp <= 79) {
    return landscapeDictionary[70];
  } else {
    return landscapeDictionary[80];
  }
}

const tempColorStyleDictionary = {
  49: "teal",
  50: "green",
  60: "yellow",
  70: "orange",
  80: "red",
};

const landscapeDictionary = {
  49: "🌲⛄️⛄️🌲⛄️⛄️🌲🍁🌲⛄️⛄️🍂🌲",
  50: "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲",
  60: "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃",
  70: "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷",
  80: "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂",
};

const skiesDictionary = {
  Ash: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Clear: "         ☀️   🕊       ",
  Clouds: "☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️",
  Cloudy: "☁️ ☁️ ☁️ 🌤 ☁️ ☁️ ☁️",
  Drizzle: "🌧🌈🌧🌧🌧🌦🌧🌧🌈🌧☁️☁️",
  Dust: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Fog: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Haze: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Mist: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Rain: "🌧🌈⛈🌧🌧💧💧🌧🌦🌧💧🌧🌧",
  Rainy: "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧",
  Sand: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Smoke: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Snow: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨",
  Snowy: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨",
  Squall: "🌨⛈🌧🌨⛈🌧🌨⛈🌧",
  Sunny: "☁️ 🕊   ☀️ ☁️  🦅 ☁️",
  ThunderStorm: "⛈⛈⛈⛈⛈⛈⛈⛈⛈⛈⛈",
  Tornado: "🌪⛈⛈🌪⛈⛈🌪⛈⛈"
};

const skiesColorDictionary = {
  Ash: "lightsteelblue",
  Clear: "lightblue",
  Clouds: "lightgrey",
  Cloudy: "lightgrey",
  Drizzle: "lightblue",
  Dust: "lightsteelblue",
  Fog: "lightsteelblue",
  Haze: "yellowgreen",
  Mist: "lightsteelblue",
  Rain: "lightblue",
  Rainy: "lightblue",
  Sand: "lightsteelblue",
  Smoke: "lightsteelblue",
  Snow: "lightsteelblue",
  Snowy: "lightsteelblue",
  Squall: "lightblue",
  Sunny: "rgb(221, 255, 255)",
  ThunderStorm: "lightblue",
  Tornado: "lightblue"
};

// const skiesStyleDictionary = {
//   Sunny: "sunny",
//   Haze: "haze",
//   Cloudy: "cloudy",
//   Rainy: "rainy",
//   Snowy: "snowy",
// };

const initDefaultCity = () => {
  state.currentCity = DEFAULT_CITY;
  document.getElementById("cityNameInput").value = state.currentCity;
  document.getElementById("headerCityName").innerText = state.currentCity;
  getCurrentTemp();
}

const updateCityValue = () => {
  state.currentCity = document.getElementById("cityNameInput").value;
  document.getElementById("headerCityName").innerText = state.currentCity;
}

const findGardenContentColor = () => {
  return skiesColorDictionary[state.currentSky];
}

const updateSky = () => {
  state.currentSky = document.getElementById("skySelect").value;
  document.getElementById("sky").innerText = skiesDictionary[state.currentSky];
  document.getElementById("gardenContent").style.backgroundColor = findGardenContentColor();
}

const getCurrentTemp = () => {
  axios.get('http://127.0.0.1:5000/location',
    {
      params: {
        q: document.getElementById("cityNameInput").value
      }
    })
    .then((response) => {
      state.latitude = response.data[0].lat;
      state.longitude = response.data[0].lon;

      console.log('success in findLatitudeAndLongitude!', state.latitude, state.longitude);

      axios.get('http://127.0.0.1:5000/weather',
        {
          params: {
            // lat: 47.6038321,
            // lon: -122.330062
            lat: state.latitude,
            lon: state.longitude
          }
        })
        .then((response) => {
          state.temperature = response.data.main.temp;
          state.sky = response.data.weather[0].main;
    
          console.log('success in find temperature and sky', Math.round(kelvinToFarenheit(state.temperature)), state.sky);
          document.getElementById("tempValue").innerText = Math.round(kelvinToFarenheit(state.temperature));
          document.getElementById("skySelect").value = state.sky;
          updateSky();
        })
        .catch((error) => {
          console.log('error in find temperature and sky!');
          console.log(error)
        });

    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
      console.log(error)
    });
}

const kelvinToFarenheit = (temp) => {
  return (temp - 273.15) * 9 / 5 + 32;
}

// const kelvinToCelcius = (temp) => {
//   return temp - 273.15;
// }

const registerEventHandlers = () => {
  const increaseTempControl = document.getElementById("increaseTempControl");
  increaseTempControl.addEventListener("click", increaseTemp);

  const decreaseTempControl = document.getElementById("decreaseTempControl");
  decreaseTempControl.addEventListener("click", decreaseTemp);

  const cityNameInput = document.getElementById("cityNameInput");
  cityNameInput.addEventListener("input", updateCityValue);

  const cityNameReset = document.getElementById("cityNameReset");
  cityNameReset.addEventListener("click", initDefaultCity);

  const skySelect = document.getElementById("skySelect");
  skySelect.addEventListener("change", updateSky);

  const currentTempButton = document.getElementById("currentTempButton");
  currentTempButton.addEventListener("click", getCurrentTemp);

  const cityNameInputBtn = document.getElementById("cityNameInputBtn");
  cityNameInputBtn.addEventListener("click", getCurrentTemp);

};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("tempValue").innerText = state.currentTemp;
  document.getElementById("cityNameInput").value = state.currentCity;
  document.getElementById("headerCityName").innerText = state.currentCity;
  document.getElementById("sky").innerText = skiesDictionary[state.currentSky];
  document.getElementById("gardenContent").style.backgroundColor = findGardenContentColor();

  initTempColor();
  initLandscape();
  registerEventHandlers();
});
