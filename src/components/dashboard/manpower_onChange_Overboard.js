import React, {useState } from 'react'
import '../../Styles/dashboard.css'
import Modal from 'react-modal'
import Loader from 'react-loader-spinner'
import {MANPOWER_OVERBOARD_ON_DATE_CHANGE,MANPOWER_OVERBOARD_ON_CLICK} from '../../queries'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from "react-router-dom";


const Manpower_onChange_Overboard =() =>{
  const history = useHistory();
  const[modalIsOpen,setmodalIsOpen] = useState(false)
  const[status,setStatus] = useState('')
  const[count,setCount] = useState('0')
  const[month,setMonth] = useState('')
  const[year,setYear] = useState(0)
    let clickedValue = localStorage.getItem("month_manpower_graph")
    
    let month_date = clickedValue.split(' ')
    let month1 = month_date[0]
    let year1 = parseInt(month_date[1])
    const {error,loading,data} = useQuery(MANPOWER_OVERBOARD_ON_DATE_CHANGE, {
        variables: { month1,year1 },
      });

      const result2 = useQuery(MANPOWER_OVERBOARD_ON_CLICK,{
        variables: { month,year,status },
      });

      const capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

if(error) return <div class="alert alert-danger alert-dismissible">
<button type="button" class="close" data-dismiss="alert"></button>
<div align="center"><strong>{error.message}</strong> </div>
</div>
if(loading) return <Loader 
className="loaderCLassForGraph"
type="ThreeDots"
color="#0073e6"
/>
 const modalClick = (e)=>
 {
   let Month_year = e.target.attributes[0].value || e.target.value
   
   let month_year_status = Month_year.split(':')
   
   let sepStatusDate = month_year_status[1].split(' ')
  
     let month = sepStatusDate[0]
     let yearVal = parseInt(sepStatusDate[1])
     let statusM = month_year_status[0]
         
         setMonth(month)
         setYear(yearVal)
         setCount(month_year_status[2])
         setStatus(capitalizeFirstLetter(statusM))
        
            setmodalIsOpen(true)
         
   
 }
 const empNameOnClick=(emp)=>{
  localStorage.removeItem('emp_Id')
  localStorage.removeItem('emp_status')
  localStorage.removeItem('status_for_toggle')
  if(emp.emp_status==="Backedoff")
  {
   localStorage.removeItem('status_for_toggle')
   localStorage.setItem('status_for_toggle',"Arriving")
  }
  else{
   localStorage.removeItem('status_for_toggle')
   localStorage.setItem('status_for_toggle',emp.emp_status)
  }
  localStorage.setItem('emp_Id',emp.emp_id)
  localStorage.setItem('emp_status',emp.emp_status)
  history.push('/employee/employee_profile')
 };

  const MonthData = ({
    arrive,
    arriveLabel,
    exit,
    exitLabel,
    totalEmployees,
    month
  }) => (
    <div className="container-fluid">
      <label 
      className="monthYr" align="left">
        {month}
      </label>
      <div className="row countDiv">
        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 total">
          <label className="totalHeading">Total</label>
          <div className="totalCount">{totalEmployees}</div>
        </div>
  
        <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
          <button 
          onClick={modalClick}
          value={arriveLabel+":"+month+":"+arrive}
          className="btn primary  text-capitalize col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            {arriveLabel}
            <span 
            value={arriveLabel+":"+month}
            className="badge badge-pill">{arrive || 0}</span>
          </button>
          <hr className="nomarginHr"/>
          <button 
            onClick={modalClick}
            value={exitLabel+":"+month+":"+exit}
            className="btn primary text-capitalize col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            {exitLabel}
            <span
             value={exitLabel+":"+month}
            className="badge badge-pill">{exit || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
  
    const { current_mon, previous_mon } = data.getDynamicManpowerOverBoarddata;
  
    
    if(!modalIsOpen)
    {
 
      return (
            <div className="row container-fluid">
      
          
       <div className="graphHeading"> Manpower Graph</div>
       <hr />
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div className="row widthContainer">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <MonthData
              arrive={previous_mon.parrived}
              totalEmployees={previous_mon.ptotal}
              arriveLabel="arrived"
              exit={previous_mon.pexited}
              exitLabel="exited"
              month={previous_mon.pmon_year}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <MonthData
              arrive={current_mon.carrived}
              arriveLabel="arrived"
              totalEmployees={current_mon.ctotal}
              exit={current_mon.cexited}
              exitLabel="exited"
              month={current_mon.cmon_year}
            />
          </div>
        </div>
      </div>
</div>
)
}
else
        {
          
          if(result2.error) return (<div className="row container-fluid">
                
              
          <div className="form-control graphHeading"> Manpower Graph</div>
          <hr />
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
           <div className="row widthContainer">
           <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <MonthData
              arrive={previous_mon.parrived}
              totalEmployees={previous_mon.ptotal}
              arriveLabel="arrived"
              exit={previous_mon.pexited}
              exitLabel="exited"
              month={previous_mon.pmon_year}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <MonthData
              arrive={current_mon.carrived}
              arriveLabel="arrived"
              totalEmployees={current_mon.ctotal}
              exit={current_mon.cexited}
              exitLabel="exited"
              month={current_mon.cmon_year}
            />
          </div>
           </div>
         </div>
         </div> 
          )
        if(result2.loading) return <Loader 
        className="loaderCLassForGraph"
        type="ThreeDots"
        color="#0073e6"
        />
        
        
         
        
        let finalData = result2.data.getOverBoardEmpBasedOnMonthYearStatus
   
        
        return(
          <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={()=>setmodalIsOpen(false)}>
                  <div>
                    
                  <div className="row modalHeader">
                      <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                      <button
                    className="btn modalBtn text-capitalize col-8 col-sm-8 col-md-4 col-lg-2 col-xl-2"
                    align="left"
                    >{status}<span className="badge badge-pill badge-warning">{count}</span></button>
                  </div>
                  <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                   
                     <div 
                      className="modalLingment"
                      align="right">
                      <span
                      onClick={()=>setmodalIsOpen(false)}
                      >
                      <i className="fas fa-times fa-2x"></i>
                  </span>
                  </div>
                  </div>
                      

                    </div>
                  <hr></hr>
                  <table className="table table-hover table-bordered">
                      <thead className="table-secondary">
                        <tr>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Designation</th>
                          <th>Gender</th>
                          <th>Tentative DOJ</th>
                          <th>DOJ</th>
                          <th>Tentative DOE</th>
                          <th>DOE</th>

                        </tr>
                      </thead>
                      <tbody>
                        {finalData.map(item=>(
                           <tr>
                           <td><span className="empNameTable" onClick={()=> empNameOnClick(item)}>
                                {item.emp_name}</span>
                              </td>
                           <td>{item.emp_department}</td>
                           <td>{item.emp_position}</td>
                           <td>{item.emp_gender}</td>
                           <td>{item.emp_tentative_doj || "-"}</td>
                           <td>{item.emp_doj}</td>
                           <td>{item.emp_tentative_doe || "-"}</td>
                           <td>{item.emp_doe}</td>
                         </tr>
                        ))}
                        
                      </tbody>
                  </table>
                  <div>
         
      </div>
                  </div>
                </Modal>
        )
        
        }  
    
}



export default Manpower_onChange_Overboard
