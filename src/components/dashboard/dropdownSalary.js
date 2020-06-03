import React, { Component } from 'react'
import '../../Styles/dashboard.css'
export default class dropdownSalary extends Component {
  
    render() {
        return (
            <div>
                <div className="form-group row">
                <div className="col-8 col-sm-8 col-md-6 col-lg-6 col-xl-8 alignDropSelect">
                <select
                className="form-control salaryOption">
                  <option>Salary Graph1</option>
                  <option>Salary Graph2</option>
                </select>
                </div>
              </div>
            </div>
        )
    }
}
