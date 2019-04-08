import React from "react";
import Card from "react-bootstrap/Card";
import cloudy from '../images/cloudy.png'

// Example of props.weather object:
//
// clouds: {all: 68}
// dt: 1554660000
// dt_txt: "2019-04-07 18:00:00"
// main: {temp: 63.05, temp_min: 55.73, temp_max: 63.05, pressure: 1015.38, sea_level: 1015.38, …}
// sys: {pod: "d"}
// weather: [{…}]
// wind: {speed: 7.63, deg: 136.001}


const DailyWeatherCard = props => {
  // console.log('DailyWeatherCard props ', props.weather)
  if (!props.weather) {
    return null
  }
  // console.log(new Date(props.weather.dt))
  const date = new Date(props.weather.dt)
  const displayDate = date.toLocaleDateString("en-GB", {day: 'numeric', month: 'short'})

  // debugger
  // console.log(date)
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Title>{displayDate}</Card.Title>
      <Card.Img src={cloudy} />
      <Card.Body>
        {<p>Temp {props.weather.main.temp}</p>}
        {<p>Conditions: {props.weather.weather[0].description}</p>}
      </Card.Body>
    </Card>
  );
};
export default DailyWeatherCard;
