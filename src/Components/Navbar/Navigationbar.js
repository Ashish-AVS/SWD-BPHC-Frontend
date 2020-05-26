import React from 'react';
import {Nav, Navbar,NavDropdown} from 'react-bootstrap';


const Navigationbar=()=>{
return(
     <Navbar expand='md' className="navbar navbar-fixed-top" style={{backgroundColor:"#2c3e50"}}>
         <Navbar.Brand style={{fontSize:25,color:'#ffffff'}} href="/" ><b>SWD</b></Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
         <Navbar.Collapse id="basic-navbar-nav">
             <Nav style={{fontSize:18,fontWeight: 500}} className="m-3 ml-auto">
                 <Nav.Item ><Nav.Link style={{color:'#ffffff'}}href='#'>Documents</Nav.Link></Nav.Item>
                 <Nav.Item><Nav.Link style={{color:'#ffffff'}} href='#'>Scholarship</Nav.Link></Nav.Item>
                 <NavDropdown style={{color:'#ffffff'}} title="Complaints" id="basic-nav-dropdown">
                     <NavDropdown.Item style={{fontSize:15,padding:7}} href="#">Maintenance Complaint</NavDropdown.Item>
                 </NavDropdown>
                 <NavDropdown style={{color:'#ffffff'}} title="Registrations" id="basic-nav-dropdown">
                     <NavDropdown.Item style={{fontSize:15,padding:7}} href="#">Grace</NavDropdown.Item>
                 </NavDropdown>
                 <Nav.Item><Nav.Link style={{color:'#ffffff'}} href='#'>Edit</Nav.Link></Nav.Item>
                 <Nav.Item className="ml-3 mt-2 "><span style={{color:'#ffffff'}} className="glyphicon glyphicon-off"></span>&nbsp;&nbsp;&nbsp;&nbsp;</Nav.Item>
             </Nav>
         </Navbar.Collapse>
     </Navbar>
    );
}

export default Navigationbar;