import React from "react";

const LocationForm = props => {
  return (
    <form onSubmit={props.loadWeather}>
      <input type="text" name="city" placeholder="City..." />
      <input type="text" name="country" placeholder="Country..." />
      <button type='submit'>Load Weather</button>
    </form>
  );
};
export default LocationForm;
