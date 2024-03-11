import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
function Weather() {
  return (
    <Card style={{ width: '18rem',height:"200px" }}>
      <Card.Body>
        <Card.Title>Weather</Card.Title>
        <Card.Text style={{fontFamily:'monospace'}}>
        "Wherever you go, no matter what the weather, always bring your own sunshine."
        </Card.Text>
        <Link to={'/Login'}><Button variant="primary">GO TO CHAT </Button></Link>
      </Card.Body>
    </Card>
  );
}

export default Weather;