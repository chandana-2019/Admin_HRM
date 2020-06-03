import React, { useState } from 'react'
import {Chart} from 'react-google-charts'
import {SALARY_GRAPH_ONCLICK_DEPARTMENT,SALARY_GRAPH1_2_DEPT_WISE_POPUP} from '../../queries'
import Loader from 'react-loader-spinner'
import { useQuery } from '@apollo/react-hooks';
import Modal from 'react-modal'
import { useHistory } from "react-router-dom";



const Salary_Dept_Min_Max=()=> {
  const history = useHistory();
  const[modalIsOpen,setmodalIsOpen] = useState(false)
  const[dept,setDept] = useState('')
   let month_year = localStorage.getItem('Month_Dept_salary')
   let month_date = month_year.split(' ')
    let month = month_date[0]
    let year = parseInt(month_date[1])

    const {error,loading,data} = useQuery(SALARY_GRAPH_ONCLICK_DEPARTMENT, {
      variables: { month,year },
    });
    const result2 = useQuery(SALARY_GRAPH1_2_DEPT_WISE_POPUP,{
      variables: { month,year,dept },
    });

    if(error) return <div className="alert alert-danger alert-dismissible">
      <button type="button" className="close" data-dismiss="alert"></button>
      <div align="center"><strong>{error.message}</strong> </div>
    </div>
      if(loading) return <Loader 
      className="loaderCLassForGraph"
      type="ThreeDots"
      color="#0073e6"
      />
      
      const dataWIthoutType = data.getActiveDeptEmpAndSalaryDetailsBasedOnMonYear.map(item=>{
        return{
          dept_name:item.dept_name,
          ctc:item.ctc, 
          gross:item.gross,
          variation:item.variation,
          count:item.count,
        }
      })
      const header = [["Department","CTC","Gross Salary","Variation of CTC","Total no. of employees"]]
      const dataArr = dataWIthoutType.map(obj => Object.values(obj))
      const finalData = header.concat(dataArr)
  
 
  const options = {

    curveType: "function",
    seriesType: "line",
    enableInteractivity: true,
    colors: ['#e9ebf7',"#4e7fcc","#0a367a","#ffef4f","#c38d00","#fbbd05"],
    hAxis: { textStyle: { color: "#0d47a1", underline: true,bold:"1000" },title:"Departments" },
    series: {
      
      3: { targetAxisIndex: 1,type: 'bars',color:'#4e7fcc' }
      
    },
    vAxes: {
      // Adds titles to each axis.
      0: { title: "Sum of money" },
      1: { title: "Total employee" }
    },
    legend: { position: "top",alignment: 'end'},
  };

    const chartEvents = [
      {
        eventName: "ready",
        callback: ({ chartWrapper, google }) => {
          let svg = document.querySelector("svg");
          let styles = 'text[text-anchor="middle"] { cursor: pointer; }';
          var css = document.createElement("style");
          if (css.styleSheet) {
            css.styleSheet.cssText = styles;
          } else {
            css.appendChild(document.createTextNode(styles));
          }
          svg.appendChild(css);
    
          var handler = function(e) {
            var parts = e.targetID.split("#");
            if (parts.indexOf("label") >= 0) {
              let idx = parts[parts.indexOf("label") + 1];
                idx = parseInt(idx);
                var onClickData = finalData[idx + 1][0]
                   setDept(onClickData)
                   console.log(onClickData)
                   setmodalIsOpen(true)
              
            }
          };
          google.visualization.events.addListener(
            chartWrapper.getChart(),
            "click",
            handler
          );
        }
      }
    ];

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

    if(data.getActiveDeptEmpAndSalaryDetailsBasedOnMonYear.length===0)
       {
          
           return <div className="alert alert-danger alert-dismissible">
           <button type="button" className="close" ></button>
           <div align="center"><strong>OOoopss !!</strong> No data for the selected fields</div>
         </div>
       }
       else{

        if(!modalIsOpen)
        {
        return (
            <div className="container-fluid">
         <Chart
          chartType="LineChart"
          width="100%"
          height="350px"
          data={finalData}
          options={options}
          chartEvents={chartEvents}
          legendToggle
          
        />
        </div>
        )
       }
       else{
        if(result2.error) return <div className="container-fluid">
        <Chart
         chartType="LineChart"
         width="100%"
         height="350px"
         data={finalData}
         options={options}
         chartEvents={chartEvents}
         legendToggle
         
       />
       </div>
        if(result2.loading)  return <Loader 
          className="loaderCLassForGraph"
          type="ThreeDots"
          color="#0073e6"
          />
          
          let finalData1 = result2.data.getSalaryGgraphPopUpByMonYearDept
              console.log(finalData1)

        
              return(
                <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={()=>setmodalIsOpen(false)}>
                        <div>
                          
                        <div className="row">
                      <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                      <button
                    className="btn modalBtn text-capitalize col-8 col-sm-8 col-md-4 col-lg-2 col-xl-2"
                    align="left"
                    >{dept}<span className="badge badge-pill badge-warning">{finalData1.length}</span>
                    </button>
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
                                <th>CTC</th>
                                <th>Gross Salary</th>
                                
      
                              </tr>
                            </thead>
                            <tbody>
                              {finalData1.map(item=>(
                                
                                 <tr>
                                  
                                  <td><span className="empNameTable" onClick={()=> empNameOnClick(item)}>
                                {item.emp_name}</span>
                              </td>
                                 <td>{item.emp_department}</td>
                                 <td>{item.emp_position}</td>
                                 <td>{(item.emp_ctc).toLocaleString('en-IN')}</td>
                                 <td>{(item.emp_gross_salary).toLocaleString('en-IN') || "-"}</td>
                                 
                               </tr>
                              ))}
                              
                            </tbody>
                        </table>
                      
                        </div>
                      </Modal>
              )
         }
        }
      }

export default Salary_Dept_Min_Max