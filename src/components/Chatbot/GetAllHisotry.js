import "./Gethistory.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function GetAllHisotry() {
    const { tag_id } = useParams();
    console.log("id:",tag_id);

    const [historyDetails, setHistoryDetails] = useState([]);

    let token = localStorage.getItem("user-token");
    
    console.log("Token --", token);

    //  Code to get the project details
    useEffect(()=>{
   axios({
        //baseURL: `http://localhost:8000/histroy/${15}`,
        baseURL: `http://127.0.0.1:8000/users_current/${token}`,
        method: "GET",
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Get Tag by ID res.data:", res.data);
            setHistoryDetails([res.data]);
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
          // alert("Error in Tag by ID Data Data");
        });


}, []);




 console.log("deatils", historyDetails);
// console.log("deatils", historyDetails.tag_id);


  return (
    <div>
    <Container className="mt-5" style={{backgroundColor:"gray"}}>
      <Row>
        <Col md={4}style={{marginLeft:"30%",marginTop:"5%"}} >
          <Card>
            <Card.Body>
              <Card.Title>Profile Information</Card.Title>
              <Card.Text>
                <p>Name: { historyDetails[0] && historyDetails[0].name}</p>
                <p>Email: {historyDetails[0] && historyDetails[0].email}</p>
                <p>Phone Number:{historyDetails[0] && historyDetails[0].phone_number}</p>
                <div>
                       <Link to={'/Updateuser/:id'}><Button variant="primary">Update</Button></Link>
                    <Link style={{marginLeft:"20px"}} to={'/Delete'}><Button variant="danger">Delete</Button></Link>
                      </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  //  <Container className="tagtable">
  //   <div>
  //   <h2 style={{marginBottom: "40px",float:"left"}}>Profile Details</h2>
  //   </div>
  //   <Container style={{marginBottom:"60px",float:"right"}}>
  //         <Table striped bordered hover variant="light" style={{width:"70%"}}>

  //           <thead>
  //             <tr>
  //               <th>Name</th>
  //               <th>Email</th>
  //               <th>User Type</th>
  //               <th>Phone Number</th>
  //             </tr>
  //           </thead>

  //           <tbody>

  //               { historyDetails.map((x, index) =>{
  //                   return (
  //                       <tr key={index}>
  //                       <td>{x.name}</td>
  //                       <td>{x.email}</td>
  //                       <td>{x.user_type}</td>
  //                       <td>{x.phone_number}</td>
  //                       <div>
  //                       <Link to={'/Updateuser/:id'}><Button variant="primary">Update</Button></Link>
  //                       <Link style={{marginLeft:"20px"}} to={'/Delete'}><Button variant="danger">Delete</Button></Link>
  //                       </div>
  //                     </tr>   
  //                   )
  //               }
  //         )}

  //           </tbody>
           
  //         </Table>
  //         </Container>
  //       </Container>
  )
}

export default GetAllHisotry