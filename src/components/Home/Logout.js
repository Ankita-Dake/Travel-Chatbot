import React from 'react'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Logout = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem("user-token");
    console.log("Token --", token);
    const handleLogout = () =>{
        navigate('/Mypage');
        localStorage.clear("user-token");
      }
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial'}}
    >
      <Modal.Dialog style={{color:"#154c79",fontSize:'20px',background:'#154c793'}}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Logout</Modal.Title> */}
        </Modal.Header>

        <Modal.Body>
          <p>Logout From ChatBot</p>
        </Modal.Body>

        <Modal.Footer>
        <Button variant="secondary" onClick={handleLogout}>Logout</Button>
        {/* <button variant="outline-light" type="button" onClick={handleLogout}></button> */}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
}
