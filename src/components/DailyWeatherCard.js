import React from "react";
import Card from "react-bootstrap/Card";
import cloudy from "../images/cloudy.png";

// Example of forecast object item, array of 1-8 of these in a day:
// 0:
// clouds: {all: 0}
// dt: 1555113600
// dt_txt: "2019-04-13 00:00:00"
// main: {temp: 48.7, temp_min: 48.7, temp_max: 48.7, pressure: 1011.9, sea_level: 1011.9, …}
// rain: {}
// sys: {pod: "n"}
// weather: Array(1)
// 0: {id: 804, main: "Clouds", description: "overcast clouds", icon: "04d"}
// wind: {speed: 15.23, deg: 237.501}

// loop through array of forecast objects

// find average conditions
// find avg humidity
// find total rain volume
// find total snow volume if any

const DailyWeatherCard = props => {
  // console.log('DailyWeatherCard props ', props.weather)
  if (!props.weather) {
    return null;
  }

  // Collect all temperatures in array of forecasts
  let temps = [];
  let conditions = [];
  for (const forecast of props.weather) {
    // console.log("forecast is: ", forecast);
    temps.push(forecast.main.temp);
    conditions.push(forecast.weather[0].description);
  }

// Find average daily weather conditions
  let avg_condition = conditions.sort((a, b) =>
    conditions.filter(v => v === a).length - conditions.filter(v => v === b).length)
      .pop()

  // console.log("avg_condition: ", avg_condition);

  // Thanks stack overflow......
  // function mode(arr) {
  //   return arr
  //     .sort(
  //       (a, b) =>
  //         arr.filter(v => v === a).length - arr.filter(v => v === b).length
  //     )
  //     .pop();
  // }

  // Find avg, high and low temps
  // const avg_temp =
    // temps.reduce((partial_sum, a) => partial_sum + a) / temps.length;
  const high_temp = Math.max.apply(null, temps);
  const low_temp = Math.min.apply(null, temps);


  const date = new Date(props.weather[0].dt_txt);

  // console.log(date)
  // const new_date_str = date.split(" ")[0]
  // const just_space = new_date_str.split("-").join(" ")

  const displayDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });




  return (
    <Card style={{ width: "18rem" }}>
      <Card.Title>{displayDate}</Card.Title>
      <Card.Img src={cloudy} />
      <Card.Body>
        {<p>{high_temp}F/{low_temp}F</p>}
        {<p>Conditions: {avg_condition}</p>}
      </Card.Body>
    </Card>
  );
};
export default DailyWeatherCard;
