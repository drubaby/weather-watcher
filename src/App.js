import React, { Component } from "react";
import Titles from "./components/Titles";
import LocationForm from "./components/LocationForm";
import Weather from "./components/Weather";
import "./App.css";

class App extends Component {
  state = {
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    city: undefined,
    country: undefined,
    error: undefined
  };

  getWeather = async e => {
    e.preventDefault();
    const API_URL = "api.openweathermap.org/data/2.5/weather?q={washington}";
    const city = e.target.city.value;
    const country = e.target.country.value;
    const API_KEY = `${process.env.REACT_APP_OPEN_WEATHER_MAP_APP_API_KEY}`;
    const temp_api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${API_KEY}`
    );
    const response = await temp_api_call.json();

    if (city && country) {
      this.setState({
        temperature: response.main.temp,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        city: response.name,
        country: response.sys.country,
        error: ""
      });
    } else {
      this.setState({
        error: "Please enter both City and Country code"
      });
    }

    console.log(response);
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
      </div>
    );
  }
}
// Prettier: Opt+Ctrl+F
export default App;
