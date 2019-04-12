import React, { Component } from "react";
import Titles from "./components/Titles";
import LocationForm from "./components/LocationForm";
import Weather from "./components/Weather";
import FiveDayContainer from "./containers/FiveDayContainer";
// import DailyWeatherCard from "./components/DailyWeatherCard"
import "./App.css";

class App extends Component {
  state = {
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    city: undefined,
    country: undefined,
    loading: true,
    error: undefined
  };

  getWeather = async e => {
    e.preventDefault();

    // const API_URL = "api.openweathermap.org/data/2.5/weather?q={washington}";

    // const city = e.target.city.value;
    const city = "Detroit";
    // const country = e.target.country.value;
    const country = "US";
    const API_KEY = `${process.env.REACT_APP_OPEN_WEATHER_MAP_APP_API_KEY}`;

    const current_conditions_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=imperial`)
    const current_conditions_response = await current_conditions_call.json()

    const temp_api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast/?q=${city},${country}&APPID=${API_KEY}&units=imperial`
    );

    const response = await temp_api_call.json();

    const list_obj = response.list;
    console.log("list_obj: ", list_obj);

    // Problem: response includes array of 40 forecast objects in .list
    // response.list[0] is current conditions
    // need to loop through array and create 5 new arrays of each day's forecast
    // list object includes:
    // dt: 1554757200
    // dt_txt: "2019-04-08 21:00:00"

    // One solution: just grab forecasts for 24 hrs in future e.g:
    // today: list_obj[0], tomorrow: list_obj[9]
    // let now = new Date()
    // Tue Apr 09 2019 05:44:18 GMT-0400 (Eastern Daylight Time)
    // let today = now.getDate()
    // 9
    // make date obj
    // newObj = new Date(dt_txt)
    // "2019-04-08 21:00:00"
    // newObj.getDate()
    // 8
    const today_date_obj = new Date(list_obj[0].dt_txt);
    const today_date_num = today_date_obj.getDate();

    let day0_forecasts = [];
    let day1_forecasts = [];
    let day2_forecasts = [];
    let day3_forecasts = [];
    let day4_forecasts = [];

    for (const forecast of list_obj) {
      // debugger
      const day_obj = new Date(forecast.dt_txt);
      const forecast_date = day_obj.getDate()
      console.log("For Of loop forecast_date: ", forecast_date);
      // console.log('today_date_num === ')
      if (forecast_date === today_date_num) {
        day0_forecasts.push(forecast);
      } else if (forecast_date === today_date_num + 1) {
        day1_forecasts.push(forecast)
      } else if (forecast_date === today_date_num + 2) {
        day2_forecasts.push(forecast)
      } else if (forecast_date === today_date_num + 3) {
        day3_forecasts.push(forecast)
      } else if (forecast_date === today_date_num + 4) {
        day4_forecasts.push(forecast)
      }
    }
    console.log("day0 forecasts: ", day0_forecasts);
    console.log("day1 forecasts: ", day1_forecasts);
    console.log("day2 forecasts: ", day2_forecasts);
    console.log("day3 forecasts: ", day3_forecasts);
    console.log("day4 forecasts: ", day4_forecasts);

    if (city && country) {
      this.setState({
        temperature: current_conditions_response.main.temp,
        humidity: current_conditions_response.main.humidity,
        description: current_conditions_response.weather[0].description,
        city: current_conditions_response.name,
        country: current_conditions_response.sys.country,
        current_date: current_conditions_response.dt,
        day0: response.list[0],
        day1: response.list[1],
        day2: response.list[2],
        day3: response.list[3],
        day4: response.list[4],
        loading: false,
        error: ""
      });
    } else {
      this.setState({
        error: "Please enter both City and Country code",
        loading: true
      });
    }

    console.log("5 day weather call: ", response);
  };

  render() {
    return (
      <div className="App">
        <Titles className="App-header" />
        <LocationForm loadWeather={this.getWeather} />
        <Weather
          date={this.state.current_date}
          temperature={this.state.temperature}
          humidity={this.state.humidity}
          description={this.state.description}
          city={this.state.city}
          country={this.state.country}
          error={this.state.error}
        />
        <FiveDayContainer
          loading={this.state.loading}
          day0={this.state.day0}
          day1={this.state.day1}
          day2={this.state.day2}
          day3={this.state.day3}
          day4={this.state.day4}
        />
      </div>
    );
  }
}

// <DailyWeatherCard
//   temperature={this.state.temperature}
//   humidity={this.state.humidity}
//   description={this.state.description}
//   city={this.state.city}
//   country={this.state.country}
//   error={this.state.error}
// />

// Prettier: Opt+Ctrl+F
export default App;
