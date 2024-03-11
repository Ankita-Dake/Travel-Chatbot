import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';


 export const Profilepage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <div>
         <Nav className="justify-content-end " activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/Getbytagid">ChatHistory</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/Chat">Start Chat</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

// export default Profilepage