import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';

const Navigationbar=()=>{
return(
     <Navbar bg="dark">
         <NavbarBrand href="/" >SWD</NavbarBrand>
         <NavbarToggle aria-controls="basic-navbar-nav"></NavbarToggle>
         <NavbarCollapse id="basic-navbar-nav">
             <Nav className="ml-auto">
                 <NavItem><NavLink href='#'>Documents</NavLink></NavItem>
                 <NavItem><NavLink href='#'>Scholarship</NavLink></NavItem>
                 <NavDropdown title="Complaints" id="basic-nav-dropdown">
                     <NavDropdown.Item href="#">Maintenance Complaint</NavDropdown.Item>
                 </NavDropdown>
                 <NavDropdown title="Registrations" id="basic-nav-dropdown">
                     <NavDropdown.Item href="#">Grace</NavDropdown.Item>
                 </NavDropdown>
                 <NavItem><NavLink href='#'>Edit</NavLink></NavItem>
             </Nav>
         </NavbarCollapse>
     </Navbar>
    );
}

export default Navigationbar;