
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Sidebar.css"
import { Logout } from './Logout';
import Nav from 'react-bootstrap/Nav';
import { Profilepage } from '../Admin/Profilepage';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/esm/Container';
function Sidebar() {
  const [show, setShow] = useState(false);
  let token = localStorage.getItem("user-token");
  const [historyDetails, setHistoryDetails] = useState([]);
  const navigate = useNavigate();
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

console.log("dataaa----",historyDetails)
  
  return (
   <Container>
    <div style={{backgroundColor:"#eeeee4"}} className='mystyle'>
    {historyDetails[0] && historyDetails[0].user_type === "ADMIN" 
                    ? 
                    <Nav className='mt-5'>
                    <Nav.Item as="li">
                      <Nav.Link href="/GetAllHistory"  > My Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link href="/Getalldetails">View All Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link href="/Unansweredquestion">UnAnsweredQuestions Lists</Nav.Link>
                    </Nav.Item>
                    </Nav>
                    

                    : 
                    ""
                  }
        {historyDetails[0] && historyDetails[0].user_type === "USER" 
                    ? 
                    <Nav className='mt-5'>
                    <Nav.Item as="li">
                      <Nav.Link href="/GetAllHistory">My Profile</Nav.Link>
                    </Nav.Item>
                    <Profilepage/>
                    </Nav>
                    
                    : 
                    ""
                  }
       
      </div>
      <div style={{backgroundColor:"whitesmoke",paddingTop:"20px",height:"400px"}} className='mt-4'>
                   
      </div>
      
      </Container>
  );
}

export default Sidebar;