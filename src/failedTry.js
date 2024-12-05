// import getCityCoordAndWeatherData from apiCalls.js 

const state = {
  currentTemp : 70.0,
  currentCity : "Seattle",
  currentSky: "Clear"
};
const DEFAULT_CITY = "Default City";

/// starting up page view: 
const tempValue = document.getElementById("tempValue");
tempValue.innerText = state.currentTemp;
const cityValue = document.getElementById("cityNameInput");
cityValue.value = state.currentCity;
const skyDisplayElement = document.getElementById("sky");
const cityNameElement = document.getElementById('cityName');
const resetButton = document.getElementById('cityNameReset');




const updateCityValue = () => {
  const input = document.getElementById("cityNameInput");
  state.currentCity = input;
}

const increaseTemp = () => {
  state.currentTemp += 1;
  const tempValueContainer = document.getElementById("tempValue")
  tempValueContainer.innerText = state.currentTemp;
  changeLandscape(state.currentTemp);
  changeTempColor(state.currentTemp);
};

const decreaseTemp = () => {
  state.currentTemp -= 1;
  const tempValueContainer = document.getElementById("tempValue")
  tempValueContainer.innerText = state.currentTemp
  changeLandscape(state.currentTemp);
  changeTempColor(state.currentTemp);
};

const registerEventHandlers = () => {
  //temp button event handlers
  const increaseTempButton = document.querySelector("#increaseTempButton");
  increaseTempButton.addEventListener("click",increaseTemp);
  const decreaseTempButton = document.querySelector("#decreaseTempButton");
  decreaseTempButton.addEventListener("click", decreaseTemp);
  
  /// city button event handlers
  const cityUpdateButton = document.querySelector("#cityUpdate");
  cityUpdateButton.addEventListener('click', changeCity);
  const resetButton = document.querySelector("#cityNameReset");
  resetButton.addEventListener('click', resetCity); 

  /// change sky
  const skyChoiceBox = document.querySelector("#skySelect");
  skyChoiceBox.addEventListener('change', changeSkyValue);
}



const changeLandscape= (currentTemp) => {
  let landscapeString = findCustomStyle(currentTemp,landscapeDictionary)
  // let colorString = findCustomStyle(currentTemp,styleDictionary)
  const weatherGardenLandscapeContainer = document.getElementById("landscape")
  weatherGardenLandscapeContainer.innerText = landscapeString
}
const changeTempColor = (currentTemp) => {
  let tempColor = findCustomStyle(currentTemp, tempColorDictionary);
  const tempValue = document.getElementById('tempValue');
  tempValue.style.color=tempColor;
}

const changeSkyinWeatherBox = (currentSky) => {
  const skyDisplayElement = document.getElementById('sky')
  if (currentSky in openWeatherConditions) {
    skyDisplayElement.innerText = openWeatherConditions[currentSky];
  }
  else {
    skyDisplayElement.innerText = "";
  }
}

const changeSkyValue = () => {
  const selectedSkyBox = document.getElementById('skySelect');
  const selectedSkyValue = selectedSkyBox.value;
  state.currentSky = selectedSkyValue
  changeSkyinWeatherBox(state.currentSky)
};

const changeCity = () => {
  const newCity = document.getElementById('cityNameInput')
  state.currentCity = newCity.value
  getCityCoordandWeatherData(state.currentCity)

}

const resetCity = () => {
  const cityNameInput = document.getElementById('cityNameInput')
  const cityNameHeader = document.getElementById('cityName')
  state.currentCity = DEFAULT_CITY
  cityNameInput.innerText = state.currentCity
  cityNameHeader.innerText = state.currentCity
};




const findCustomStyle = (temp,styleDictionary) => {
if (temp <= 49.0) {
  return styleDictionary[49];
}
if (temp >= 50.0 & temp <= 59) {
  return styleDictionary[59]
}
if (temp >= 60.0 & temp <= 69) {
  return styleDictionary[69]
}
else if (temp >= 70.0 & temp <= 79) {
  return styleDictionary[79]
}
if (temp >= 80.0){
  return styleDictionary[80]
}
};

// findTempColorandLandscape(temp)

const landscapeDictionary = {
  80 : "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂",
  79 : "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷",
  69 : "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃",
  59 : "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲",
  49 : "🌲⛄️⛄️🌲⛄️⛄️🌲🍁🌲⛄️⛄️🍂🌲"
} 

const tempColorDictionary = {
  49 :"teal",
  59 :"green",
  69 :"yellow",
  79 :"orange",
  80 : "red"
};


const openWeatherConditions= {
  ThunderStorm: "⛈⛈⛈⛈⛈⛈⛈⛈⛈⛈⛈",
  Rain: "🌧🌈⛈🌧🌧💧💧🌧🌦🌧💧🌧🌧",
  Drizzle: "🌧🌈🌧🌧🌧🌦🌧🌧🌈🌧☁️☁️",
  Snow: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨",
  Mist: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Smoke: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Haze: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Dust: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫", 
  Fog: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫", 
  Sand: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Ash: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫", 
  Squall: "🌨⛈🌧🌨⛈🌧🌨⛈🌧", 
  Tornado: "🌪⛈⛈🌪⛈⛈🌪⛈⛈", 
  Clear: "         ☀️   🕊       ", 
  Clouds: "☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️"
};





const getCityCoordandWeatherData = (currentCity) => {
  axios
  .get(`http://127.0.0.1:5000/location?q=${currentCity}`)
  .then( (response) => {
    const coordinates = {}
    let lat= response.data[0].lat;
    let lon= response.data[0].lon;
    coordinates['lat'] = lat
    coordinates['lon'] = lon
    console.log('success in find latitude and longitude!', coordinates)
    return getWeatherData(coordinates)
  })
  .catch((error) => {
    console.log(error,'could not find location data')
  })
};


const getWeatherData = (coordinates) => {
  axios
  .get(`http://127.0.0.1:5000/weather?lat=${coordinates.lat}&lon=${coordinates.lon}`)
  .then( (response) => {
    const cityWeatherData = {}
    let cityName = response.data['name']
    let weatherData = response.data['weather'];
    let currentWeather = weatherData[0].main;
    let tempData = response.data['main']
    let tempK = tempData.temp
    let tempF = (convertTemp(tempK, "K", "F")).toFixed(1);
    state.currentCity = cityName
    state.currentSky = currentWeather
    state.currentTemp = tempF

    const cityNameContainer = document.getElementById('headerCityName')
    cityNameContainer.innerText = state.currentCity
    const tempValueContainer = document.getElementById('tempValue')
    tempValueContainer.innerText = state.currentTemp
    changeSkyinWeatherBox(state.currentSky)
    changeTempColor(state.currentTemp)
    changeLandscape(state.currentTemp)
    cityWeatherData['currentWeather']= currentWeather
    cityWeatherData['currentTemp'] = tempF
    cityWeatherData['currentTempType'] = "F"
    console.log('success in finding weather data for city!',cityWeatherData
    )
    return cityWeatherData
  })
  .catch((error) => {
    console.log(error,'could not get weather data')
  });

  }

const convertTemp = (temp, inputType, outputType) => {
  //celcius to farenheit
  if (outputType === "C" & inputType === "F") {
    return temp*1.8+32;
  }
  //farenheit to celcius
  else if (inputType === "F" & outputType === "C") {
    return (temp-32)/1.8;
  }
  //kelvin to farenheit
  else if (inputType === "K" & outputType === "F") {
    return (temp*1.8)-459.67;
  }
  // kelvin to celcius
  else if (inputType === "K" & outputType === "C") {
    return temp - 273.15;
  }
  else {
    console.log("error");
  };
};

document.addEventListener("DOMContentLoaded",registerEventHandlers)
changeLandscape(state.currentTemp);
changeTempColor(state.currentTemp);
changeSkyValue(state.currentSky);