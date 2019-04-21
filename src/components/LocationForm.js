import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LocationForm = props => {
  return (
    <Form onSubmit={props.loadWeather}>
      <Form.Group>
      <Form.Label>City</Form.Label>
      <Form.Control type="text" placeholder="City..." />
      <Form.Label>Country</Form.Label>
      <Form.Control type="text" placeholder="Country"/>
        <Button variant="secondary" type="submit">
          Load Weather{" "}
        </Button>
      </Form.Group>
    </Form>
  );
};
export default LocationForm;
