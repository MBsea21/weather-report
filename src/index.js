// "use strict";

const state = {
  currentTemp : 70,
  currentCity : "Seattle",
  currentSky: "Sunny"
};

////TO ADD.......
/////// color changing temp functionality 
////// loading screen style setting functionality. 

/// starting up page view: 
const tempValue = document.getElementById("tempValue");
tempValue.innerText = state.currentTemp;
const cityValue = document.getElementById("cityNameInput");
cityValue.value = state.currentCity;
const skySelectElement = document.getElementById("skySelect");
const skyDisplayElement = document.getElementById("sky");



const updateCityValue = () => {
  const input = document.getElementById("cityNameInput");
  state.currentCity = input;
}

const increaseTemp = () => {
  state.currentTemp += 1;
  const tempValueContainer = document.getElementById("tempValue")
  tempValueContainer.innerText = state.currentTemp;
  changeLandscape(state.currentTemp)
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
  const increaseTempButton = document.querySelector("#increaseTempButton");
  increaseTempButton.addEventListener("click",increaseTemp);
  const decreaseTempButton = document.querySelector("#decreaseTempButton");
  decreaseTempButton.addEventListener("click", decreaseTemp);
  const cityInputUpdate = document.querySelector("cityNameInput");
  cityInputUpdate.addEventListener("input", updateCityValue)
};

document.addEventListener("DOMContentLoaded",registerEventHandlers)


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



const findCustomStyle = (temp,styleDictionary) => {
if (temp <= 49) {
  return styleDictionary[49];
}
if (temp >= 50 & temp <= 59) {
  return styleDictionary[59]
}
if (temp >= 60 & temp <= 69) {
  return styleDictionary[69]
}
else if (temp >= 70 & temp <= 79) {
  return styleDictionary[79]
}
if (temp >= 80){
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

const skiesDictionary = {
  Sunny: "☁️ ☁️ ☁️ ☀️ ☁️ ☁️ ☁️",
  Cloudy: "☁️ ☁️ ☁️ 🌤 ☁️ ☁️ ☁️",
  Rainy: "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧",
  Snowy: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
};


const changeSky = () => {
  skySelectElement.addEventListener('change', (event) => {
    const selectedSky = event.target.value;
  
    if (selectedSky in skiesDictionary) {
        skyDisplayElement.innerText = skiesDictionary[selectedSky];

    } else {
        skyDisplayElement.innerText = "";
    }
  });
};

changeLandscape(state.currentTemp);
changeTempColor(state.currentTemp);
changeSky(state.currentSky);
