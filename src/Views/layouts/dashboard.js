import React, { useState } from 'react'
import ManpowerGraph from '../../components/dashboard/manpowerGraph'
import SalaryGraph from '../../components/dashboard/salaryGraph'
import AgeChart from '../../components/dashboard/age'
import LocationChart from '../../components/dashboard/location'
import ReligionChart from '../../components/dashboard/religion'
import GenderChart from '../../components/dashboard/gender'
import '../../Styles/dashboard.css'

const  Dashboard =()=>{
  

        return (
          <div className="container-fluid">
              
            <div className="row">
             
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 manPowerGraphDiv ml-3">
               
              <ManpowerGraph />
              </div>
            
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 salaryGraphDiv ml-4">
              
              <SalaryGraph />
            </div>
            </div>
            <div className="row mt-4">
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ageChartDiv">
            <AgeChart />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 religionChartDiv">
            
            <ReligionChart />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 genderChartDiv">
              <GenderChart />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 locationChartDiv">
              <LocationChart />
            </div>
           </div>
           </div>
           
        )
    
}
export default Dashboard
