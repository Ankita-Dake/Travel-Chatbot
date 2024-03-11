 import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import React, { useEffect,useState } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import './Chatresponse.css'


const Chatresponse = () => {
  const { tag_id } = useParams();
    console.log("id:",tag_id);


  let token = localStorage.getItem("user-token");
  const [currentdata, setCurrentdata] = useState([]);
  const [chatdata,setChatdata] = useState();
  const [getBotResponse, setGetBotResponse] = useState([]);
  const[ByUserTagId,setByUserTagID] = useState([])
  const[History,setHistory]=useState([])
  const [chatHistoryDetails, setChatHistoryDetails] = useState([]);

  
  
  console.log("Token --", token);

  //  Code to get the project details
  useEffect(()=>{
 axios({
      baseURL: `http://127.0.0.1:8000/users_current/${token}`,
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Get Tag by ID res.data:", res.data);
          setCurrentdata([res.data]);
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
        // alert("Error in Tag by ID Data Data");
      });


}, []);

useEffect(() => {
  if(currentdata.length){
    console.log('User Id--', currentdata.id)
    axios({
      baseURL: `http://127.0.0.1:8000/tags-by-user/${currentdata[0].id}`,
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Get Tags of Current User:",res.data);
          setByUserTagID(res.data)
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
        alert("Error in Tags of Current User");
      });
  }

}, [currentdata])
console.log("taggg...",ByUserTagId)


function handleSubmit(event) {
  event.preventDefault();

  axios({

    baseURL: `http://127.0.0.1:8000/histroy/${tag_id}`,
    method: "GET",
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("Get Tag by ID res.data:", res.data);
        const updatedChatHistory = [...chatHistoryDetails];
        updatedChatHistory.push({user_query:chatdata});
        updatedChatHistory.push({botResponse:botResponse});
        setChatHistoryDetails(updatedChatHistory);
      }
    })
    .catch((error) => {
      console.log("ERROR", error);
      //alert("Error in Tag by ID Data Data");
    });


      axios({
           baseURL: `http://127.0.0.1:8000/chat/${token}`,
           method: "POST",
           data: {
           user_query: chatdata
          },
         })
           .then((res) => {
             if (res.status === 200) {
              console.log("result.data:",res.data);;
              setGetBotResponse(res.data);
             }
           })
           .catch((error) => {
             console.log("ERROR", error);
             //alert("Error in Tag by ID Data Data");
           });
// setChatHistoryDetails(preChatHistory=>[
//   ...preChatHistory,{
//     user_query:chatdata,
//     botResponse:botResponse
//   }
// ]);
setChatdata("");
           
} 

console.log('chat response:',chatdata);
 console.log('getBotResponse:',getBotResponse);
 let botResponse;
 if(getBotResponse.length !==0){
  botResponse = getBotResponse.user.bot_response;
 }
 let user_query;
 if(getBotResponse.length !==0){
  user_query = getBotResponse.user.user_query;
 }

 
return (
      <div className="mb-5" style={{width:"100%",backgroundColor:"#eeeee4"}}>
         <Nav className="justify-content-end " activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/Getbytagid"> GO TO ChatHistory</Nav.Link>
        </Nav.Item>
        </Nav>
        
        <Container className="mt-4" >
        <Table striped bordered hover variant="light">
            <thead>
              <tr >
                <th style={{backgroundColor:"#e28743"}}>User Query</th> 
                 <th style={{backgroundColor:"#eab676"}}>Bot Response</th>
              </tr>
            </thead>
            <tbody >
              
              {chatHistoryDetails.map((chatHistoryDetails)=>(
                <tr key={chatHistoryDetails.user_query} > 
                    <td>{chatHistoryDetails.user_query}</td>
                    <td>{chatHistoryDetails.botResponse}</td>
                </tr>
              ))}
              
              <tr>
                <td>{user_query}</td>
                <td>{botResponse}</td>
               </tr>
            </tbody>
          </Table>
          </Container>
      <Container style={{paddingTop:"260px"}}>
        <Form onSubmit={handleSubmit}>
          <Container>
            <Form.Group size="sm" controlId="user query">
              <Form.Label>Type Here</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                name="chatdata"
                value={chatdata}
                onChange={(e) => setChatdata(e.target.value)}
              />
            </Form.Group>
           
            <Button style={{backgroundColor:"#A2678A"}} onClick={()=>
            chatHistoryDetails.push({
              user_query:user_query,
              botResponse:botResponse
            })}
                    size="lg"
                    type="submit"
                    className="mt-3">
                  Send
            </Button>
            
            <table>
            {chatHistoryDetails.map(chatHistoryDetails => (
              <td key={chatHistoryDetails.user_query}>{chatHistoryDetails.user_query}{"  "}{chatHistoryDetails.botResponse}</td>
            ))}
            </table>


          
            </Container>
            </Form>
            </Container>
    </div>
  )
}

export default Chatresponse