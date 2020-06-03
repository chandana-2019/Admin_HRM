import React, { useState,useRef } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { DEPT_DESIG } from "../../queries";
import {ADD_DEPARTMENTS,ADD_DESIGNATION,DELETE_DEPARTMENT,DELETE_DESIGNATION} from '../../mutations'
import Loader from "react-loader-spinner";
import { CSVLink } from "react-csv"; 
import { useForm } from "react-hook-form";
import test from "../../Test.json";
import { ToastContainer, toast } from 'react-toastify';


const Settings = () => {
  const camelCase = str => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  };

  const [showDepartment, setshowDepartment] = useState(false);
  const [showDesignation, setshowDesignation] = useState(false);
  const[input_style,set_input_style] =useState("ideal_empty_input")
  const[show,setShow] = useState(null)
  const [circleloading, setcircleloading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  
 
  const { loading:loadingQ, error:errorQ, data:dataQ } = useQuery(DEPT_DESIG);
  const [createDep] = useMutation(ADD_DEPARTMENTS,{
    refetchQueries: [
      {
        query: DEPT_DESIG
      }
    ]
  })
  const [createDesig] = useMutation(ADD_DESIGNATION,{
    refetchQueries: [
      {
        query: DEPT_DESIG
      }
    ]
  })

  const [deleteDept] = useMutation(DELETE_DEPARTMENT,{
    refetchQueries: [
      {
        query: DEPT_DESIG
      }
    ]
  })
  const [deleteDesig] = useMutation(DELETE_DESIGNATION,{
    refetchQueries: [
      {
        query: DEPT_DESIG
      }
    ]
  })


  if (errorQ)
    return (
      <div className="alert alert-danger alert-dismissible">
        <button type="button" className="close" data-dismiss="alert"></button>
        <div align="center">
          <strong>{errorQ.message}</strong>{" "}
        </div>
      </div>
    );
  if (loadingQ)
    return (
      <Loader
        className="loaderCLassForGraph"
        type="ThreeDots"
        color="#0073e6"
      />
    );
   
    
  const finalData = dataQ.getAllDeptsAndDesignations;
  
  // const filterColumns = finalData => {
  //   const columns = Object.keys(finalData[0]);
  //   console.log(columns)
  //   let headers = [];
  //   columns.forEach((col, idx) => {
  //     if (col !== "") {
  //       // OR if (idx !== 0)
  //       headers.push({ label: camelCase(col), key: col });
  //     }
  //   });

  //   return headers;
  // };
  
 

  const createDepartment = ()=>{
    setshowDepartment(true)
    
    
  }
  const createDesignation = ()=>{
    setshowDesignation(true)
  }
  const cancelDepartment = ()=>{
     setshowDepartment(false)
  }
  const cancelDesignation =()=>{
    setshowDesignation(false)
  }
  const deleteDepartment = async (e) => {
    setcircleloading(true)
    let dept_name = e.target.attributes[1].value
    setShow(dept_name)
  try{
    
    await deleteDept({variables: {dept_name}})
    setcircleloading(false)
    toast.info(camelCase(dept_name)+" - Deleted", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
      });
}
catch(err){
  setcircleloading(false)
  setShow(dept_name+"Dept")
    
    let error = err.graphQLErrors[0].message
     toast.error( error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
      });
  
}
  }
  const deleteDesignation = async (e) => {
    setcircleloading(true)
    let designation = e.target.attributes[1].value
    setShow(designation)
    
    try{
      
      await deleteDesig({variables: {designation}})
      
    setcircleloading(false)
    toast.info(camelCase(designation)+" - Deleted", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
      });
}
  catch(err){
    setcircleloading(false)
    setShow(designation+"desig")
    let error = err.graphQLErrors[0].message
     toast.error( error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
      });
  
}
    }
  const submitDesignation = async (e) => { 
    let designation = e.designation
    setcircleloading(true)
    try{
        await createDesig({variables: {designation}})
        setcircleloading(false)
        setshowDesignation(false)
    }
    catch(err){
      setcircleloading(false)
        let error = err.graphQLErrors[0].message
         toast.error( error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
          });
      
    }

  };
 
  const submitDepartment = async (e) => {
    let dept_name = e.department
    setcircleloading(true)
    try{
      
        await createDep({variables: {dept_name}})
        setcircleloading(false)
        setshowDepartment(false)
        
    }
    catch(err){
      setcircleloading(false)
        let error = err.graphQLErrors[0].message
         toast.error( error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
          });
      
    }
      
  };
  const onInputFocus=()=>{
    set_input_style("on_focus_input_style")
    
  }
  const lossFocus=(e)=>{
    const v = (e.target.value)
    
    if(v!==""){
       set_input_style("on_loss_focus_input_style")
      
    }
  }
  return (
    <div className="container-fluid">
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
     <ToastContainer />   
      <h5>Settings</h5>
      <hr />

      {test.userType==="admin" && <div className="row form-group">  
      <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
        <button className="btn white_color_btn"
        onClick={createDepartment}
        type="button"
        >
        <i className="fas fa-plus"></i> Create Department
           </button>
      </div>
      <div className="offset-md-2 offset-lg-3 offset-xl-3 col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2">
        <button className="btn white_color_btn"
        onClick={createDesignation}
        type="button"
        >
        <i className="fas fa-plus"></i> create Designation
           </button>
      </div>
      </div>}

      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6
        settingDepartment 
        ">
          <h5 className="dept_header">Departments</h5>
          <hr />
          {showDepartment === true && 
          <div className="form-group">
            <form onSubmit={handleSubmit(submitDepartment)}>
             <input type="text"
             name="department"
             ref={register({ required: true })}
             onFocus={onInputFocus}
             onBlur={lossFocus}
            className={errors.department ? "inputColorLine col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mr-4" : 
            input_style+ " col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mr-4"}
             autoFocus
             />
             {errors.department && (
              <div
               ><span className="inputTextError">required</span></div>
            )}
             <button className="btn white_color_btn
             col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2
             "
             type="button"
             onClick={cancelDepartment}
             >cancel</button>
             <button className="btn primaryDarkColor
             col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2
             " 
             disabled={circleloading && true}
             type="submit">
               {circleloading &&  <span className="spinner-border float-right"></span>}
               Save</button>
             </form>
          </div>}
          <div className="table-responsive">
          {finalData.departments.map((item, index)=>(
            <div key={index}>
         <button className="btn primary_light 
         col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 
         text-left text-capitalize"
         type="button"
         
         >{item.department}
         {test.userType==="admin" && (show!==item.department) ? <i className="fas fa-times float-right"
        value={item.department}
        onClick={deleteDepartment}
         >
         </i>
         :circleloading===true && (show===item.department) && <span className="spinner-border float-right"></span>
         }
         </button>
         <br />
         </div>
          ))}
         </div>
        </div>
        
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 settingDesignation" 
        align="left">
          <h5 className="desig_header">Designations</h5>
          <hr />
          {showDesignation === true && 
          <div className="form-group">
            <form onSubmit={handleSubmit(submitDesignation)}>
             <input type="text"
             name="designation"
             className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 "
             ref={register({ required: true })}
             onFocus={onInputFocus}
             onBlur={lossFocus}
             className={errors.designation ? "inputColorLine col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mr-4" : 
            input_style+ " col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mr-4"}
            autoFocus
             />
             {errors.designation && (
              <div
               ><span className="text-danger">required</span></div>
            )}
             <button className="btn white_color_btn
             col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2
             "
             onClick={cancelDesignation}
             type="button"
             >cancel</button>
             <button className="btn primaryDarkColor
             col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2
             "
             disabled={circleloading === true && true}
             type="submit"
             >{circleloading ==true &&  <span className="spinner-border float-right"></span>}
             Save</button>
             </form>
          </div>}
          <div className="table-responsive">
        {finalData.designations.map((item, index)=>(
          <div key={index}>
         <button className="btn primary_light 
        col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 
         text-left text-capitalize
         
         form-group"
         type="button"
         >{item.designation}
         
         {test.userType==="admin" && (show!==item.designation)  ?  <i className="fas fa-times float-right"
         value={item.designation}
         onClick={deleteDesignation}
         >
         </i>
         
         :circleloading===true && (show===item.designation) && <span className="spinner-border float-right"></span>
         }
         
         </button>
         
         </div>
          ))}
          </div>
        
        </div>
      </div>
    </div>
  );
};
export default Settings;
