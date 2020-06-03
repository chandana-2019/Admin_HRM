import React,{  useState} from 'react'
import Loader from 'react-loader-spinner'
import { MANPOWER_DEPT_VS_COUNT,MANPOWER_DEPARTMENT_EMPLOYE } from "../../queries";
import { Chart } from "react-google-charts";
import { useQuery } from '@apollo/react-hooks';
import Modal from 'react-modal'
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

 const ManpowerDeptVsCount = () => {
  const history = useHistory();
  const[modalIsOpen,setmodalIsOpen] = useState(false)
  const[dept,setDept] = useState('')

    let clickedValue = localStorage.getItem("month_manpower_graph")
    let month_date = clickedValue.split(' ')
    let month = month_date[0]
    let year = parseInt(month_date[1])

    const {error,loading,data} = useQuery(MANPOWER_DEPT_VS_COUNT, {
        variables: { month,year },
      });


      const result2 = useQuery(MANPOWER_DEPARTMENT_EMPLOYE,{
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
      
      const dataWIthoutType = data.getAllActiveDeptEmpsByMonthYear.map(item=>{
        return{
          dept_name:item.dept_name,
          count:item.total_emp_count
        }
      })
      const header = [["Title", "Total number of employees"]]
      const dataArr = dataWIthoutType.map(obj => Object.values(obj))
      const finalData = header.concat(dataArr)

      const options = {
        
        curveType: "function",
        
        enableInteractivity: true,
        hAxis: { textStyle: { color: "#0d47a1", underline: true,bold:"1000" },title:"Months of Year" },
        vAxis: {
          title: 'Total Employee'
        },
        colors: ['#4e7fcc'],
        legend: { position: "top",alignment: 'end'},
      };


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



     
        const chartEvents=[
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
                // console.log(e);
                var parts = e.targetID.split("#");
                if (parts.indexOf("label") >= 0) {
                  let idx = parts[parts.indexOf("label") + 1];
                  idx = parseInt(idx);
                   
                   var onClickData = finalData[idx + 1][0]
                   setDept(onClickData)
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
        ]

       if(data.getAllActiveDeptEmpsByMonthYear.length===0)
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
            <div className="manpowerChart">   
             <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnVisibilityChange
                  draggable
                  pauseOnHover
                  />
                  {/* Same as */}
              <ToastContainer />    
            <Chart
                width={'100%'}
                height={'350px'}
                chartType="ColumnChart"
                data={finalData}
                options={options}
                chartEvents={chartEvents}
            />

</div>
        )
    }
           else{
             if(result2.error) return <div className="manpowerChart"> 
                   
            <Chart
                width={'100%'}
                height={'350px'}
                chartType="ColumnChart"
                data={finalData}
                options={options}
                chartEvents={chartEvents}
            />

            </div>
             if(result2.loading) return <Loader 
             className="loaderCLassForGraph"
             type="ThreeDots"
             color="#0073e6"
             />
             let finalData1 = result2.data.getOverBoardEmpBasedOnDeptMonthYearStatus
              
              
                return(
                  <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={()=>setmodalIsOpen(false)}>
                          <div>
                            
                          <div className="row modalHeader">
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
                                  <th>Gender</th>
                                  <th>Tentative DOJ</th>
                                  <th>DOJ</th>
                                  <th>Tentative DOE</th>
                                  <th>DOE</th>
        
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
                                   <td>{item.emp_gender}</td>
                                   <td>{item.emp_tentative_doj || "-"}</td>
                                   <td>{item.emp_doj}</td>
                                   <td>{item.emp_tentative_doe || "-"}</td>
                                   <td>{item.emp_doe}</td>
                                 </tr>
                                ))}
                                
                              </tbody>
                          </table>
                          <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnVisibilityChange
                  draggable
                  pauseOnHover
                  />
                  {/* Same as */}
              <ToastContainer />
                          </div>
                        </Modal>
                )
           }
              
              


                
              
       }
          
  
}
 export default ManpowerDeptVsCount
