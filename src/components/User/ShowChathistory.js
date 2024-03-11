import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import axios from 'axios';

export const ShowChathistory = () => {
    const { tag_id } = useParams();
    console.log("id:",tag_id);

    const [chatHistoryDetails, setChatHistoryDetails] = useState([]);


     //  Code to get the project details
     useEffect(()=>{
        axios({

             baseURL: `http://127.0.0.1:8000/histroy/${tag_id}`,
             method: "GET",
           })
             .then((res) => {
               if (res.status === 200) {
                 console.log("Get Tag by ID res.data:", res.data);
                 setChatHistoryDetails([res.data]);
               }
             })
             .catch((error) => {
               console.log("ERROR", error);
               // alert("Error in Tag by ID Data Data");
             });
     
     
     }, []);
     
     console.log("Chat history by tags----", chatHistoryDetails)

  return (
    <Container style={{paddingTop: "90px"}}>
          <Table striped bordered hover variant="light">

            <thead>
              <tr>
                <th style={{backgroundColor:"#e28743"}}>User query</th>
                <th  style={{backgroundColor:"#eab676"}}>Bot response</th>
              </tr>
            </thead>

            <tbody>

                { chatHistoryDetails.length && chatHistoryDetails[0].length !==0 ? 

                    chatHistoryDetails[0].map((x, index) =>{
                        return (
                            <tr key={index}>
                            
                            <td>{x.user_query}</td>
                            <td>{x.bot_response}</td>
                            
                        </tr>   
                        )
                    }
                    )
                
                : <h4>No Chat history</h4>}

            </tbody>
          </Table>
        </Container>
  )
}
