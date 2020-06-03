import React from 'react'
import { Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { CSVLink } from "react-csv";
import { useHistory } from "react-router-dom";

const Header=()=> {
  const history = useHistory();
  const addCompany=()=>{
    history.push('/addcompany')
  }
    return (
        <div className="container-fluid">
            <div className="row">
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
            
          <button className="btn primaryDarkColor"
          onClick={addCompany}
          >Add Company</button>
            </div>
         
            <div className="offset-lg-3 offset-xl-3 col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2">
              <select className="form-control rounded-pill border-3">
                <option selected disabled>Sort by</option>
                <option>1</option>
                <option>1</option>
              </select>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2">
              <input type="text" className="form-control rounded-pill border-3"
              placeholder="Search"
              />
              
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2">
            <CSVLink 
             data={""} filename={"Employee.csv"}
             className="btn white_color_btn col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
             >
           Export
         </CSVLink>
            </div>
            </div>
            
        </div>
    )
}

export default Header
