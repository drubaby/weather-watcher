import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import DailyWeatherCard from '../components/DailyWeatherCard'

class FiveDayContainer extends React.Component {

  // loop through array of forecast objects
  // find average temp
  // find highest temp
  // find lowest temp
  // find average conditions



  render() {
    // debugger
    if (this.props.loading === true) {
      // console.log('5daycontainer undefined')
      return(<div />)
    }

    return <CardDeck>
    <DailyWeatherCard weather={this.props.day0} />
    <DailyWeatherCard weather={this.props.day1} />
    <DailyWeatherCard weather={this.props.day2} />
    <DailyWeatherCard weather={this.props.day3} />
    <DailyWeatherCard weather={this.props.day4} />
    </CardDeck>
  }
}
export default FiveDayContainer;
