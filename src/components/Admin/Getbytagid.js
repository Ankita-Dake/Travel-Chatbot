import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import './Getalldetails.css'


function Getbytagid() {
    const { tag_id } = useParams();
    console.log("id:",tag_id);
    const [myid,setTagid] = useState([])
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

console.log("----", historyDetails)

useEffect(() => {
  if(historyDetails.length){
    console.log('User Id--', historyDetails.id)
    axios({
      baseURL: `http://127.0.0.1:8000/tags-by-user/${historyDetails[0].id}`,
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Get Tags of Current User:",res.data);
          setTagid(res.data)
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
        alert("Error in Tags of Current User");
      });
  }

}, [historyDetails.length])


console.log("Tags of Current User", myid);
// useEffect(() => {
     
//     axios({
//       baseURL: `http://localhost:8000/histroy/${myid.tag_id}`,
//         method: "GET",
//    })
//      .then((res) => {
//        if (res.status === 200) {
//          console.log("Get Tag by ID res.data:", res.data);
//          setTagid([res.data]);
//        }
//      })
//      .catch((error) => {
//       console.log("ERROR", error);
//        alert("Error in Tag by ID  Data",error);
//      });

//   },[]);
//   console.log(" tag deatils", historyDetails);




//  console.log("deatils", historyDetails);
// console.log("deatils", historyDetails.tag_id);


  return (
   <Container className="tagtable">
          <Table striped bordered hover variant="light">

            <thead>
              <tr>
                <th>Tag Name</th>
                <th>Go To</th>
              </tr>
            </thead>

            <tbody>

                { myid.length && myid.map((x, index) =>{
                    return (
                        <tr key={index}>
                        
                        <td>{x.tag_title}</td>
                        
                       
                      <td>
                          <Link to={`/ShowChathistory/${x.tag_id}`}>GoTo</Link> 
                        </td> 
                      </tr>   
                    )
                }
          )}

            </tbody>
          </Table>
        </Container>


  )
}

export default Getbytagid