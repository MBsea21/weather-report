//////////////////////////////////////////////////////////
//// Custom Decoration & State Dictionaries 
const state = {
  currentTemp : 70,
  currentCity : "Seattle",
  currentSky: "Clear",
  currentTempType: "F",
  currentGardenBackgroundColor: "lightblue"
};
const DEFAULT_CITY = "Seattle";

const landscapeDictionary = {
  80 : "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂",
  79 : "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷",
  69 : "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃",
  59 : "🌲🌲🌲🌲🍂🌲🍁🌲🌲🌲🌲🍂🌲",
  49 : "🌲⛄️⛄️🌲⛄️⛄️🌲🍁🌲⛄️⛄️🍂🌲"
} 

const tempTextColorDictionary = {
  49 :"teal",
  59 :"green",
  69 :"yellow",
  79 :"orange",
  80 : "red"
};

const tempBackgroundColorDictionary = {
  49 :"teal",
  59 :"green",
  69 :"yellow",
  79 :"orange",
  80 : "red"
};



const openWeatherConditions= {
  ThunderStorm: ["⛈⛈⛈⛈⛈⛈⛈⛈⛈⛈⛈⛈⛈", "darkgray"],
  Rain: ["🌧🌈⛈🌧🌧💧💧🌧🌦🌧💧🌧🌧", "lightblue"],
  Drizzle: ["🌧🌧🌈🌧🌧🌧🌦🌧🌧🌈🌧☁️☁️", "azure"],
  Snow: ["🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨","lightsteelblue"],
  Mist: ["🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫","gainsbro"],
  Smoke: ["🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫", "darkgrey"],
  Haze: ["🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫","dimgrey"],
  Dust: ["🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫", "slategray"],
  Fog: ["🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫", "azure"],
  Sand: ["🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫","beige"],
  Ash: ["🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫", "slategrey"],
  Squall: ["⛈🌨⛈🌧🌨⛈🌧🌨⛈🌧🌨⛈🌧", "midnightblue"],
  Tornado: ["🌪⛈⛈🌪⛈⛈🌪⛈⛈🌪⛈⛈🌪", "black"],
  Clear: ["         ☀️   🕊       ", "lightblue"],
  Clouds: ["☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️", "gray"]
};









//////////////////////////////////////////////
///// event handler functions
const increaseCurrentTemp = () => {
  let previousTemp = Number(state.currentTemp);
  let newTemp = previousTemp + 1;
  state.currentTemp = newTemp;
  const tempValueContainer = document.getElementById("tempValue");
  tempValueContainer.innerText = state.currentTemp;
  updateCustomElements()
};

const decreaseCurrentTemp = () => {
  let previousTemp = Number(state.currentTemp);
  let newTemp = previousTemp - 1;
  state.currentTemp = newTemp;
  const tempValueContainer = document.getElementById("tempValue");
  tempValueContainer.innerText = state.currentTemp;
  updateCustomElements()
};

const changeSkyValue = () => {
  const selectedSkyBox = document.getElementById('skySelect');
  const selectedSkyValue = selectedSkyBox.value;
  state.currentSky = selectedSkyValue;
  changeSkyinWeatherBox(state.currentSky);
};

const changeCity = () => {
  const newCity = document.getElementById('cityNameInput');
  state.currentCity = newCity.value;
  getCityCoordandWeatherData(state.currentCity);
};

const resetCity = () => {
  const cityNameInput = document.getElementById('cityNameInput');
  state.currentCity = DEFAULT_CITY;
  cityNameInput.innerText = state.currentCity;
};

const currentTempButtonClicked = () => {
  getCityCoordandWeatherData(state.currentCity)
};

const getCityCoordandWeatherData = (currentCity) => {
  axios
  .get(`http://127.0.0.1:5000/location?q=${currentCity}`)
  .then( (response) => {
    const coordinates = {
      lat: response.data[0].lat,
      lon: response.data[0].lon,
    };
    return getWeatherData(coordinates);
  })
  .catch((error) => {
    console.log(error,'could not find location data');
  });
};

const getWeatherData = (coordinates) => {
  axios
  .get(`http://127.0.0.1:5000/weather?lat=${coordinates.lat}&lon=${coordinates.lon}`)
  .then( (response) => {
    let cityName = response.data['name']
    let weatherData = response.data['weather'];
    let currentWeather = weatherData[0].main;
    let tempData = response.data['main']
    let tempK = tempData.temp;
    let temp = (convertTemp(tempK, "K", state.currentTempType)).toFixed(0);
    state.currentCity = cityName;
    state.currentSky = currentWeather;
    state.currentTemp = Number(temp);
    updateCustomElements();
  })
  .catch((error) => {
    console.log(error,'could not get weather data')
  });
  }

const convertTempButtonClicked = () => {
  if (state.currentTempType === "F") {
    newTemp = convertTemp(state.currentTemp,"F","C").toFixed(0);
    state.currentTemp = newTemp
    state.currentTempType = "C"
  } else if (state.currentTempType === "C") {
    const newTemp = convertTemp(state.currentTemp,"C","F").toFixed(0);
    state.currentTemp = newTemp
    state.currentTempType = "F"
  }
  updateCustomElements();
};


///////////////////////////////////////////////
///// functions that find/alter state values. 
const updateConvertTempButton = () => {
  let buttonText = ""
  if (state.currentTempType === "F") {
    buttonText = "Convert to Celsius";
  }
  else if (state.currentTempType === "C") {
    buttonText = "Convert to Fahrenheit";
  };
  const converTempButton = document.getElementById('conversionButton');
  converTempButton.innerText = buttonText;
};

const findCustomStyle = (temp,styleDictionary) => {
  if (state.currentTempType === "C") {
    temp = convertTemp(state.currentTemp,"C","F")
  }
  if (temp <= 49.0) {
    return styleDictionary[49];
  }
  if (temp >= 50.0 & temp <= 59) {
    return styleDictionary[59];
  }
  if (temp >= 60.0 & temp <= 69) {
    return styleDictionary[69];
  }
  else if (temp >= 70.0 & temp <= 79) {
    return styleDictionary[79];
  }
  if (temp >= 80.0){
    return styleDictionary[80];
  }
};

const changeLandscape= (currentTemp) => {
  let landscapeString = findCustomStyle(currentTemp,landscapeDictionary);
  const weatherGardenLandscapeContainer = document.getElementById("landscape");
  weatherGardenLandscapeContainer.innerText = landscapeString;
};
const changeTempColor = (currentTemp) => {
  let tempColor = findCustomStyle(currentTemp, tempTextColorDictionary);
  const tempValueSurrounds = document.getElementById('tempValueBox')
  tempValueSurrounds.style.color = tempColor;
};

const changeSkyinWeatherBox = (currentSky) => {
  const skyDisplayElement = document.getElementById('sky');
  const skyBackgroundColorElement = document.getElementById('gardenContent');
  if (currentSky in openWeatherConditions) {
    let skyData = openWeatherConditions[currentSky];
    let skyString = skyData[0];
    let backgroundColorString = skyData[1];
    skyDisplayElement.innerText = skyString;
    skyBackgroundColorElement.style.backgroundColor = backgroundColorString;
  }
  else {
    skyDisplayElement.innerText = "error for sky";
  }
};

////////////////////////////////////
////// helper functions 
const convertTemp = (temp, inputType, outputType) => {
  //celcius to farenheit
  if (outputType === "F" & inputType === "C") {
    return temp*1.8+32;
  }
  //farenheit to celcius
  else if (outputType === "C" & inputType === "F") {
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
    console.log("error could not convert temp");
  };
};



/////////////////////////////////////////////
//// functions that help set up page on load

const registerEventHandlers = () => {
  //temp button event handlers
  const increaseTempButton = document.querySelector("#increaseTempButton");
  increaseTempButton.addEventListener("click",increaseCurrentTemp);
  
  const decreaseTempButton = document.querySelector("#decreaseTempButton");
  decreaseTempButton.addEventListener("click", decreaseCurrentTemp);
  
  const conversionButton = document.querySelector("#conversionButton");
  conversionButton.addEventListener("click",convertTempButtonClicked);
  
  const getRealtimeTempButton = document.querySelector("#currentTempButton");
  getRealtimeTempButton.addEventListener("click",currentTempButtonClicked);
  
  /// city button event handlers
  const cityUpdateButton = document.querySelector("#cityUpdate");
  cityUpdateButton.addEventListener('click', changeCity);
  
  const cityInput= document.getElementById('cityNameInput');
  cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("cityUpdate").click()
    }
  });
  
  const resetButton = document.querySelector("#cityNameReset");
  resetButton.addEventListener('click', resetCity); 

  /// Sky input event handler
  const skyChoiceBox = document.querySelector("#skySelect");
  skyChoiceBox.addEventListener('change', changeSkyValue);
};

const updateCustomElements = () => {
  /// update header bar
  const headerCityNameContainer = document.getElementById('headerCityName')
  headerCityNameContainer.innerText = state.currentCity

  /// update temp bar
  const tempValueElement = document.getElementById('tempValue');
  tempValueElement.innerText = state.currentTemp
  changeTempColor(state.currentTemp)
  const tempClassElements = document.getElementsByClassName('tempType')
  for (var i = 0; i < tempClassElements.length; i++){
    tempClassElements[i].innerText = state.currentTempType;
  }
  tempClassElements.innerText = state.currentTempType
  updateConvertTempButton()
  const realtimeCityButtonElement = document.getElementById('cityName')
  realtimeCityButtonElement.innerText = state.currentCity

  /// update sky box
  const skyInputElement = document.getElementById('skySelect')
  skyInputElement.value = state.currentSky

  //// update cityName box 
  const cityInputElement = document.getElementById('cityNameInput');
  cityInputElement.value = state.currentCity ;

  /// update weather garden
  changeLandscape(state.currentTemp);
  changeSkyValue(state.currentSky);
}

const setOriginalValues = () => {
  const tempValue = document.getElementById("tempValue");
  tempValue.innerText = state.currentTemp;
  const cityValue = document.getElementById("cityNameInput");
  cityValue.value = state.currentCity;
  getCityCoordandWeatherData(state.currentCity);}
  const realtimeCityElement = document.getElementById('cityName')
  realtimeCityElement.innerText = state.currentCity

setOriginalValues()



const onLoad = () => {
  document.addEventListener("DOMContentLoaded",registerEventHandlers);
}

onLoad()

