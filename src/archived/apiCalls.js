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
    let weatherData = response.data['weather'];
    let currentWeather = weatherData[0].main;
    let tempData = response.data['main']
    let tempK = tempData.temp
    let tempF = (convertTemp(tempK, "K", "F")).toFixed(1);
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