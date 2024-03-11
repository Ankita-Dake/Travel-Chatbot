import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import './Chat.css'

const Chatresponse = () => {
  const { tag_id } = useParams();
  console.log("id:", tag_id);

  let token = localStorage.getItem("user-token");
  const [chatdata, setChatdata] = useState("");
  const [currentdata, setCurrentdata] = useState([]);
  const [getBotResponse, setGetBotResponse] = useState({});
  const [chatHistoryDetails, setChatHistoryDetails] = useState([]);


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
console.log("details", setCurrentdata['name'])

  useEffect(() => {
    if (tag_id) {
      axios.get(`http://127.0.0.1:8000/histroy/${tag_id}`)
        .then((res) => {
          if (res.status === 200) {
            console.log("Get Tag by ID res.data:", res.data);
            setChatHistoryDetails(res.data);
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    }
  }, [tag_id]);

  function handleSubmit(event) {
    event.preventDefault();

    axios.post(`http://127.0.0.1:8000/chat/${token}`, { user_query: chatdata })
      .then((res) => {
        if (res.status === 200) {
          console.log("result.data:", res.data);
          const botResponse =res.data.user.bot_response
          setGetBotResponse(res.data);

       
          setChatHistoryDetails(prevChatHistory=>[
            ...prevChatHistory,
            {user_query:chatdata},
            {botResponse:botResponse}
          ]);
         
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
      });

    // Clear the chat input after submission
    setChatdata("");
  }

  return (
    <Container style={{paddingTop:"40px"}}>
    <div className="mb-5" style={{ width: "100%", backgroundColor: "#eeeee4" }}>
      <Nav className="justify-content-end " activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/Getbytagid">GO TO ChatHistory</Nav.Link>
        </Nav.Item>
      </Nav>

      <Container className="mt-4">
        <div className="chat-container">
          
          {chatHistoryDetails.map((chat, index) => (
              <div key={index} className="chat-bubble user-bubble" >
                <div>{chat.user_query}</div>
                <div>{chat.botResponse}</div>
              </div>
          ))}
          
          <div className="chat-bubble bot-bubble">
            <p>
              Bot Response
            </p>
            {getBotResponse.user?.bot_response}
          </div>
        </div>
      </Container>
     

      <Container style={{ paddingTop: "20px" }}>
        <Form onSubmit={handleSubmit}>
          <Container style={{paddingTop:"260px"}}>
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

            <Button
              style={{ backgroundColor: "#A2678A" }}
              size="lg"
              type="submit"
              className="mt-3"
            >
              Send
            </Button>
          </Container>
        </Form>
      </Container>
    </div>
    </Container>
  );
}

export default Chatresponse;
