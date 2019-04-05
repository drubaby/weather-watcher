import React from 'react'

const DailyWeatherCard = props => {
  <div>
    Day of week
    Date

    {props.description && <p>Conditions:  {props.description}</p>}

    {props.main.temp_min} / {props.main.temp_max}


    {props.error && <p>{props.error}</p>}
  </div>
}
export default DailyWeatherCard
