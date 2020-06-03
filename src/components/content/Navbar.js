import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import { Navbar,Nav } from 'react-bootstrap';
import Logo from '../../Images/Company_logo.png'
import '../../Styles/login_register.css'

localStorage.setItem("isLogedin","yes")

export default () => {

let test = localStorage.getItem("isLogedin")
console.log(test)
  
  return (
    <div>
    <Navbar collapseOnSelect expand="lg"  className="fixed-top shadow-lg align-content-end">
  
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <li className="navbar-brand">
    <Link><img src={Logo} 
  
    className="company_logo" alt="Company_logo"></img></Link>
    </li>
  <Navbar.Collapse id="responsive-navbar-nav">
  
    {test==="yes" &&(
    <Nav className="mr-auto">
    <li className="nav-item">
      <NavLink 
      activeClassName="active"
      className="nav-link" id="dashboard" to="/dashboard"
      >Dashboard</NavLink>
      </li>
      <li className="nav-item">
      <NavLink
      activeClassName="active"
      className="nav-link" to="/employee" id="employee"
      aria-controls="responsive-navbar-nav" 
      >Employee</NavLink>
      </li>
       <li className="nav-item">
      <NavLink
      activeClassName="active"
      className="nav-link menuStyle" to="/payroll" id="payroll">payroll</NavLink >
      </li>
      
      {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
      
    </Nav>
    )}
    {test==="yes" &&(
    <Nav className="ml-auto">
    
    <li className="nav-item">
      <Link
      
      className="nav-link"><i className="fas fa-search"></i></Link>
      </li>
      <li className="nav-item">
      <NavLink 
      to="/settings"
      activeClassName="active"
      className="nav-link"><i className="fas fa-cog"></i></NavLink>
      </li>
      <li className="nav-item">
      <Link 
    
      className="nav-link"><i className="fas fa-bell"></i></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link"
        ><i className="fas fa-sign-out-alt">
          </i> <span className="login_register_nav"> Logout</span></Link>
      </li>
      </Nav>
      )}
      {test==="no" &&(
      <Nav className="ml-auto">
      <li className="nav-item">
        <Link className="nav-link"><i className="fas fa-sign-in-alt"></i> <span className="login_register_nav"> Login</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link"><i className="fas fa-user"></i><span className="login_register_nav"> Sign Up</span></Link>
      </li>
      </Nav>
      )}
  </Navbar.Collapse>

</Navbar>
    
<br></br>
<br></br>
<br></br>

    </div>
  );
}
