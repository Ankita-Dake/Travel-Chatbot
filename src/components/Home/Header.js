import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "./Header.css";
import { useEffect,useState } from "react";
import { Logout } from './Logout';
import Login from '../Login/Login';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Header = () => {
  let token = localStorage.getItem("user-token");
  console.log("Token --", token);
  const navigate = useNavigate();

  return (
    <div>
   
    <Navbar className="bg-body-tertiary">
      <Container>
        <a href="/Mypage" className='mynav' style={{color:"black",fontSize:"30px"}}>Welcome To Travel Chatbot</a>
        <Navbar.Toggle />
        {token ? <Button> <Link to={'/Logout'}><Button variant="primary">Logout </Button></Link></Button>:
        <Button><Link to={'/Login'}><Button variant="primary">Login</Button></Link></Button>
        }
      </Container>
    </Navbar>
    
    </div>
  )
}

export default Header
