import React from 'react'
import { useQuery } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";
import { GET_ALL_EMP_STATUS_COUNT } from "../../queries";

const StatusBtn=(props)=> {
    const { error, loading, data } = useQuery(GET_ALL_EMP_STATUS_COUNT);
    if (error)
    return (
      <div className="alert alert-danger alert-dismissible">
        <button type="button" className="close" data-dismiss="alert"></button>
        <div align="center">
          <strong>{error.message}</strong>{" "}
        </div>
      </div>
    );

    if (loading)
    return (
      <Loader
        className="loaderCLassForGraph"
        type="ThreeDots"
        color="#0073e6"
      />
    );
    
    return (
        <div>

            <div className="row emp_sideRightBtns ml-4">
                {data.getEmployeeAllStatusCount.map(item=>{
            const className = props.activeButton === item.emp_status ? "primaryDarkColor statusBTN" : "white_color_btn statusBTN";
           return(
               <div 
               key={item.value}
               >
                <button 
                 className={`btn ${className} "
                 `}
                onClick={props.trigerOnStatusBtnClick}
                value={item.emp_status}
                >
                  {item.emp_status}
                  <span className="badge badge-pill badge-warning"
                  value={item.emp_status}
                  >{item.total_count}</span>
                </button>
              </div>
              )
                   })}
            
          </div>
        </div>
    )
}
export default StatusBtn