import React from 'react'
import Travel from'./Hotel';
import Hotel from './Travel';
import Weather from './weather';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "./Mypage.css";
import demo1 from './demo1.jpeg'

export const Mypage = () => {
  return (
    
    <div className="mydiv">
         <Container>
        <Row>
          <Col xs={6} md={4} className='col1'>
          <Travel/>
          </Col>
          <Col xs={6} md={4}>
          <Hotel/>
          </Col>
          <Col xs={6} md={4}>
          <Weather/>
          </Col>
        </Row>
      </Container>
      {/* <h5>Register Here</h5>
      <Link to={'/Register'}><Button variant="secondary">Secondary</Button></Link> */}
     {/* <img src={demo1} class="img-thumbnail" alt="..."/> */}
    </div>
  )
}
