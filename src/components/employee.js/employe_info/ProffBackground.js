import React from 'react'
import Loader from "react-loader-spinner";
import { GET_EMP_PROF_BACKGROUND } from "../../../queries";
import { useQuery } from "@apollo/react-hooks";
import ProfBack from './professionalBackgroundData'

const Proffbackground=(props)=> {

    let type = props.type;
    let id = localStorage.getItem("emp_Id");
    const { error, loading, data } = useQuery(GET_EMP_PROF_BACKGROUND, {
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

    let empData = data.getEmployeeProfessionalInfo
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
      <ProfBack item={item} />
    ))}
      </div>
    )
}

export default Proffbackground
