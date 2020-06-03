// import React, { useState } from 'react'
// import '../../Styles/dashboard.css'
// import SalaryDeptMinMaxGraph from '../dashboard/salaryGraphMin_max'

// import { Chart } from "react-google-charts";
// import Loader from 'react-loader-spinner'
// import { useQuery } from '@apollo/react-hooks';
// import {SALARY_GRAPH2} from '../../queries'


// const options = {
//   curveType: "function",
//   seriesType: "line",
//   enableInteractivity: true,
//   hAxis: { textStyle: { color: "green", underline: true,bold:"1000" } },
//   series: {
    
//     3: { targetAxisIndex: 1,type: 'bars',color:'66a3ff' }
    
//   },
//   vAxes: {
//     // Adds titles to each axis.
//     0: { title: "Sum of money" },
//     1: { title: "Total employee" }
//   },
//   legend: { position: "bottom" },
//   language: 'hi_IN',
// };


// const SalaryGraph2 =()=>{
//   const[deptVisible,setdeptVisible] = useState(false)
//   const {error,loading,data} = useQuery(SALARY_GRAPH2)

//     if(error) return <div class="alert alert-danger alert-dismissible">
//     <button type="button" class="close" data-dismiss="alert"></button>
//     <div align="center"><strong>{error.message}</strong> </div>
//   </div>

//     if(loading) return <Loader 
//     className="loaderCLassForGraph"
//     type="ThreeDots"
//     color="#0073e6"
//     />

//      const dataWIthoutType = data.getDashSalaryGraphTwoActiveMinMaxAvgCount.map(item=>{
//       return{
//         month_year:item.mon_year,
//         min_salary:item.min_salary,
//         max_salary:item.max_salary,
//         avg_salary:item.avg_salary,
//         total_count:item.total_count
       
//       }
//     })
//     let header=[["Month", "Min Salary", "Max Salary", "Avg Salary", "Total No of Employes"]]
//      const dataArr = dataWIthoutType.map(obj => Object.values(obj))
//      const finalData = header.concat(dataArr)
     
//       const chartEvents = [
//         {
//           eventName: "ready",
//           callback: ({ chartWrapper, google }) => {
//             let svg = document.querySelector("svg");
//             let styles = 'text[text-anchor="middle"] { cursor: pointer; }';
//             var css = document.createElement("style");
//             if (css.styleSheet) {
//               css.styleSheet.cssText = styles;
//             } else {
//               css.appendChild(document.createTextNode(styles));
//             }
//             svg.appendChild(css);
      
//             var handler = function(e) {
//               // console.log(e);
//               var parts = e.targetID.split("#");
//               if (parts.indexOf("label") >= 0) {
//                 let idx = parts[parts.indexOf("label") + 1];
//                   idx = parseInt(idx);
//                   var onClickData = finalData[idx + 1][0]
                
//                 localStorage.removeItem("Month_Dept_salary")
//                 localStorage.setItem("Month_Dept_salary",onClickData)
                
//                 setdeptVisible(!deptVisible)
                
//               }
//             };
//             google.visualization.events.addListener(
//               chartWrapper.getChart(),
//               "click",
//               handler
//             );
//           }
//         }
//       ];
     
//       const btnClick =()=>{
//         setdeptVisible(false)
//        }
//               return (
//                 <div>
//                 {
                
//                 deptVisible ?   
//                 <div>
//                    <span 
//                    onClick={btnClick}
//                    className="btn btn-outline-success"><i className="fas fa-backward "></i></span>      
//                 <SalaryDeptMinMaxGraph  /> 
//                 </div>
//                 :
//                 <div className="salaryGraph">
                
//                 <Chart
//                 chartType="LineChart"
//                 width="100%"
//                 height="350px"
//                 data={finalData}
//                 options={options}
//                 chartEvents={chartEvents}
//                 legendToggle
    
//                 />
                
//                 </div>
//                     }
//                 </div>
            
    
//                 ) 
            
            
//             }
// export default SalaryGraph2
