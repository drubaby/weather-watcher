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
    const cnt = 5
    const API_KEY = `${process.env.REACT_APP_OPEN_WEATHER_MAP_APP_API_KEY}`;

    const temp_api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city},${country}&cnt=${cnt}`
    );
    const response = await temp_api_call.json();

    // debugger

    if (city && country) {
      this.setState({
        temperature: response.list[0].main.temp,
        humidity: response.list[0].main.humidity,
        description: response.list[0].weather[0].description,
        city: response.city.name,
        country: response.city.country,
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
