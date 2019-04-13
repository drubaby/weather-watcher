import React from 'react'

const Weather = (props) => {
  // console.log("Weather component props: ", props)

  const date = new Date(props.date * 1000)
  const displayDate = date.toLocaleDateString("en-US", {weekday: 'long', month: 'long', day: 'numeric'})




  return(
    <div>
      {props.city && <h2>Current Conditions</h2>}
      {props.date && <p>{displayDate}</p>}
      {props.country && props.city && <p>{props.city},    {props.country}</p>}
      {props.temperature && <p>Temperature: {props.temperature}F</p>}
      {props.humidity && <p>Humidity: {props.humidity}%</p>}
      {props.description && <p>Conditions:  {props.description}</p>}
      {props.error && <p>{props.error}</p>}
    </div>
  )
}

export default Weather
