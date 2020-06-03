import React,{useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { GET_EMP_EDUCATION } from "../../../queries";
import { useQuery } from "@apollo/react-hooks";
import Education from './educationBackgroundData'

const EducationalBackground=(props)=> {

    let type = props.type;
    let id = localStorage.getItem("emp_Id");


    const { error, loading, data } = useQuery(GET_EMP_EDUCATION, {
      variables: { type, id },
    });
 
    


    if (loading)
    return (
      <Loader
        className="loaderCLassForGraph"
        type="ThreeDots"
        color="#0073e6"
      />
    );

  if (error)
    return (
      <div className="alert alert-danger alert-dismissible">
        <button type="button" className="close" data-dismiss="alert"></button>
        <div align="center">
          <strong>{error.message}</strong>{" "}
        </div>
      </div>
    );
    let empData = data.getEmployeeEducationInfo
  
    if(empData===null || empData==="" || empData.length===0)
     return(

    <div className="alert alert-warning alert-dismissible">
        <button type="button" className="close" data-dismiss="alert"></button>
        <div align="center">
          <strong>Ooopppsss !!! No data</strong>{" "}
        </div>
      </div>
     )
    return (
        <div className="container-fluid"> 
        {empData.map((item) => (
        <Education item={item} name="Educational Background"/>
      ))}
        </div>
    )
}

export default EducationalBackground
