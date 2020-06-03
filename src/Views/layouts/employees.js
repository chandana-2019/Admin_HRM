import React, { Component } from 'react'
import EmpStatus from '../../components/employee.js/empStatus'

export default class employees extends Component {
    render() {
        return (
            <div className="container-fluid">
                <EmpStatus />
            </div>
        )
    }
}
