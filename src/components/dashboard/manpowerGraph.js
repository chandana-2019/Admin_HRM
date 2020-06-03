import React, { useState } from 'react'
import '../../Styles/dashboard.css'
import ManpowerDept from '../dashboard/mappowerDeptVsCount'
import CurPrevMonth from '../dashboard/currAndprevMonthcCounts'
import ManpowerClickOverboard from '../../components/dashboard/manpower_onChange_Overboard'
import {useQuery} from '@apollo/react-hooks'
import {MANPOWER_GRAPH_MONTH}  from '../../queries/index'
import Loader from 'react-loader-spinner'
import { Chart } from "react-google-charts";

const ManpowerGraph =()=>{
  let go_back ="< Back to level 1"
  const {error,loading,data} = useQuery(MANPOWER_GRAPH_MONTH)
  const[childVisible,setchildVisible] = useState(false)
  const[deptVisible,setdeptVisible] = useState(false)
  
  
  if(loading) return  <Loader 
  className="loaderCLassForGraph"
  type="ThreeDots"
  color="#0073e6"
  />

  
    if(error) return <div class="alert alert-danger alert-dismissible">
    <button type="button" class="close" data-dismiss="alert"></button>
    <div align="center"><strong>{error.message}</strong> </div>
  </div>
  
     const dataWIthoutType = data.getDashboardManpowerActiveCount.map(item=>{
       return{
         mon_year:item.mon_year,
         count:item.total_count
       }
     })
     const header = [["Title", "Total number of employees"]]
     const dataArr = dataWIthoutType.map(obj => Object.values(obj))
     const finalData = header.concat(dataArr)
    
 
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
               
                localStorage.removeItem("month_manpower_graph")
                localStorage.setItem("month_manpower_graph",onClickData)
                
                setchildVisible(!childVisible)
                
                setdeptVisible(!deptVisible)
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
  const btnClick =()=>{
       setchildVisible(false)
       setdeptVisible(false)
      }
      const options = {
        
        curveType: "function",
        legend: { position: "bottom" },
        enableInteractivity: true,
        hAxis: { textStyle: { color: "#0d47a1", underline: true,bold:"1000"},title:"Months of Year" },
        vAxis: {
          title: 'Total Employee'
        },
        colors: ['#0d47a1'],
        legend: { position: "top",alignment: 'end'},
      };
     

if(!childVisible)
{
 
  return (
      
      <div>
        <div>

       <CurPrevMonth />
        </div>
        {
          
    deptVisible ?   
    <div>
       <button 
       onClick={btnClick}
       className="btn white_color_btn"
        >{go_back}</button>      
    <ManpowerDept  /> 
    </div>
    :
    <div className="manpowerChart">
      
      <Chart
        width={'105%'}
        height={'350px'}
        chartType="LineChart"
        data={finalData}
        options={options}
        chartEvents={chartEvents}
        legendToggle
        
      />
    </div>
        }
       
      </div>
  )
  
}
return (
  <div className="manpowerChart">
       <ManpowerClickOverboard  /> 
        {
          
    childVisible ?   
    <div>
       <button 
       onClick={btnClick}
       className="btn white_color_btn"
        >{go_back}</button>      
    <ManpowerDept  /> 
    </div>
    :
      <Chart
        width={'105%'}
        height={'350px'}
        chartType="ColumnChart"
        data={finalData}
        options={options}
        chartEvents={chartEvents}
        
      />
        }
       
      </div>
)
}
 export default ManpowerGraph 
