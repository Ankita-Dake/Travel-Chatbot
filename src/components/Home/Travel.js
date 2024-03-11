import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import demo from './demo.jpg'
import "./Mypage.css"
import { Link } from "react-router-dom";

function Travel() {
  return (
    <Card style={{ width: '18rem',height:"200px"}} className='mystyle'>
      <Card.Body>
        <Card.Title>Travel</Card.Title>
        <Card.Text style={{fontFamily:'monospace'}}>
        “Remember that happiness is a way of travel – not a destination.” 
        </Card.Text>
        <Link to={'/Login'}><Button variant="primary">GO TO CHAT</Button></Link>
      </Card.Body>
    </Card>
  );
}

export default Travel;