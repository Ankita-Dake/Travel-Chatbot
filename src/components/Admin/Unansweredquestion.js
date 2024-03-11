import React, {useEffect, useState} from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";

export const Unansweredquestion = () => {
  const [data, setCurrentUserData] = useState([]);
  const [userdetails,setUserDetails] = useState([])
  let token = localStorage.getItem("user-token");
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
    console.log("Token --", token);
 
    useEffect(() => {
     
      axios({
        // baseURL: `http://localhost:8000/histroy/${15}`,
       baseURL: `http://127.0.0.1:8000/users_current/${token}`,
       method: "GET",
     })
       .then((res) => {
         if (res.status === 200) {
           console.log("Get Tag by ID res.data:", res.data);
           setCurrentUserData([res.data]);
         }
       })
       .catch((error) => {
         console.log("ERROR", error);
         // alert("Error in Tag by ID Data Data");
       });
 
    },[]);
    console.log("deatils", data);

  // Code to get User Data from API call
  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await axios.get(
          "http://127.0.0.1:8000/not-answer-question/", config
        );
        console.log("Get User Data", userData.data);
        setUserDetails(userData.data);
      } catch (error) {
        console.log("Data fetching Error Occured in User Data");
      }
    }

    getUserData();
   
  }, []);
  console.log("deatils", userdetails);
  console.log("data--", setUserDetails)
  // console.log("User type:-", data[0].user_type)
  return (
    <div >
       <div className="container">
        <div className="mt-3">
        {data.user_type === "ADMIN" 
                    ? 
           <h1></h1>
            : ""
            }
            <h3>All UnAnswered Questions Ask By User</h3>
            <table striped bordered hover variant="light" className="table">
                <thead>
                    <tr>
                        <th>Questions</th>
        
                    </tr>
                </thead>
                <tbody>
                    {
                        userdetails.map((user,index) =>{ 
                            return <tr key={index}>
                                    <td>{user.questions}</td>
                            </tr>
                        })
                    }   
                    
                </tbody>
            </table>
        </div>
    </div>

    </div>
   
  )
}
