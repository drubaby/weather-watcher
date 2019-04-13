import React from "react";
import Card from "react-bootstrap/Card";

// loop through array of forecast objects

// TODO:
// find avg humidity
// find total rain volume
// find total snow volume if any

const DailyWeatherCard = props => {
  if (!props.weather) {
    return null;
  }

  // Collect all temperatures in array of forecasts
  let temps = [];
  let conditions = [];
  let main_conditions = []
  let weather_icons = []
  for (const forecast of props.weather) {
    temps.push(forecast.main.temp);
    conditions.push(forecast.weather[0].description);
    main_conditions.push(forecast.weather[0].main)
    weather_icons.push(forecast.weather[0].icon)
  }

  // Thanks stack overflow......
  function mode(arr) {
    return arr
    .sort(
      (a, b) =>
      arr.filter(v => v === a).length - arr.filter(v => v === b).length
    )
    .pop();
  }

  // Find average daily weather conditions
  let avg_condition = mode(conditions)

  let weather_icon = mode(weather_icons)

  // Find avg, high and low temps
  // const avg_temp =
  // temps.reduce((partial_sum, a) => partial_sum + a) / temps.length;
  const high_temp = Math.round(Math.max.apply(null, temps));
  const low_temp = Math.round(Math.min.apply(null, temps));

  let date = new Date(props.weather[0].dt_txt);
  const displayDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Title>{displayDate}</Card.Title>
      <Card.Img src={`http://openweathermap.org/img/w/` + weather_icon +`.png`} />
      <Card.Body>

            <h4>{high_temp}F</h4>{low_temp}F
        {<p>Conditions: {avg_condition}</p>}
      </Card.Body>
    </Card>
  );
};
export default DailyWeatherCard;
