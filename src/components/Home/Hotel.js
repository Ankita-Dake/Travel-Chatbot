import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

function Hotel() {
  return (
    <Card style={{ width: '18rem' ,height:"200px"}}>
      <Card.Body>
        <Card.Title>Hotel</Card.Title>
        <Card.Text style={{fontFamily:'monospace'}}>
        'The great advantage of a hotel is that it is a refuge from home life.'
        </Card.Text>
        <Link to={'/Login'}><Button variant="primary">GO TO CHAT </Button></Link>
      </Card.Body>
    </Card>
  );
}

export default Hotel;