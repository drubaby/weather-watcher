import React from "react";
import Card from "react-bootstrap/Card";

const DailyWeatherCard = props => {
  if (!props.weather) {
    return null;
  }

  let date = new Date(props.weather[0].dt_txt);
  const displayDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });

  // Collect all temperatures in array of forecasts
  let temps = [];
  let conditions = [];
  let main_conditions = [];
  let weather_icons = [];
  let humidities = [];
  let rain_volumes = [];
  let snow_volumes = [];

  for (const forecast of props.weather) {
    temps.push(forecast.main.temp);
    conditions.push(forecast.weather[0].description);
    main_conditions.push(forecast.weather[0].main);
    weather_icons.push(forecast.weather[0].icon);
    humidities.push(forecast.main.humidity);
    if (forecast.rain) {
      rain_volumes.push(forecast.rain["3h"]);
    }
    if (forecast.snow) {
      snow_volumes.push(forecast.snow["3h"]);
    }
  }

  function getSum(total, num) {
    return total + num;
  }

  let snowfall = snow_volumes.length > 0 ? snow_volumes.reduce(getSum) : 0;
  let rainfall = rain_volumes.length > 0 ? rain_volumes.reduce(getSum) : 0;
  let precipitation;

  if (rainfall > 0) {
    precipitation = <p> Rain: {Math.round(rainfall)}mm</p>;
  } else if (snowfall > 0) {
    precipitation = <p> Snow: {Math.round(snowfall)}mm</p>;
  } else {
    precipitation = <p />;
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
  let avg_condition = mode(conditions);
  let weather_icon = mode(weather_icons);
  let avg_humidity = Math.round(
    humidities.reduce((partial_sum, a) => partial_sum + a) / humidities.length
  );

  // Find avg, high and low temps
  // const avg_temp =
  // temps.reduce((partial_sum, a) => partial_sum + a) / temps.length;
  const high_temp = Math.round(Math.max.apply(null, temps));
  const low_temp = Math.round(Math.min.apply(null, temps));

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Title>{displayDate}</Card.Title>
      <Card.Img
        src={`http://openweathermap.org/img/w/` + weather_icon + `.png`}
      />
      <Card.Body>
        <h4>{high_temp}°F</h4>
        {low_temp}°F
        {<p>Conditions: {avg_condition}</p>}
        <p>Humidity: {avg_humidity}%</p>
        {precipitation}
      </Card.Body>
    </Card>
  );
};
export default DailyWeatherCard;
