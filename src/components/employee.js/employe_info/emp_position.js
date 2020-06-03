import React, { useState,useEffect } from "react";
import Loader from "react-loader-spinner";
import { GET_EMP_POSITION } from "../../../queries";
import { useQuery } from "@apollo/react-hooks";
import test from "../../../Test.json";
import { useForm } from "react-hook-form";

const Employee_Position = (props) => {
  let type = props.type;
  let id = localStorage.getItem("emp_Id");

  const [disabled, setdisabled] = useState(true);
  const { register, handleSubmit,reset, errors } = useForm();
  const[input_style,set_input_style] =useState("ideal_empty_input") // initial state for input
  const[label_style,set_label_style] =useState("ideal_label_on_empty_input")  // initial state for label
  const [circleloading,setcircleloading] = useState(false)
  const[cancelData,setCancelData] = useState({})
  const [showsave, setshowsave] = useState(false);
  const [formData, setFormData] = useState({});
  const { error, loading, data } = useQuery(GET_EMP_POSITION, {
    variables: { type, id },
  });

  useEffect(() => {
    if(data)
    {

      setFormData(data.getEmployeePositionDept);
      setCancelData(data.getEmployeePositionDept);
    } 
    }, [data])


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
    )
    const onInputFocus=()=>{      // on focus In
      set_input_style("on_focus_input_style")
      set_label_style("on_focus_input_label_style")
    }
    const lossFocus=(e)=>{  // on focus out
  
      const v = (e.target.value)
      console.log(v)
      if(v!==""){
         set_input_style("on_loss_focus_input_style")
        set_label_style("on_loss_focus_input_label_style")
      }
    }
    
    const edit = () => {
      
      setdisabled(false);
      setshowsave(true);
      
    };
  const onSubmit = (e) => {
    
    console.log(e)
    setcircleloading(true)
    setdisabled(true)
    
    }

    const handleChange = e => {
      const name = e.target.name;
      const value = e.target.value;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
    const cancel=()=>{
     // seterrorOnCancel(false)
      setdisabled(true);
      setshowsave(false);
      setFormData(cancelData)
      reset();
     // console.log(errorOnCancel)
      
    }

  let empData = data.getEmployeePositionDept;
  
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
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
          <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div className="text-capitalize emp_prof_btn_click">{props.name}</div>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
        {test.userType==="admin" && showsave===false && 
        
        <div align="right">
        <button className="btn white_color_btn" 
        type="button"
        onClick={edit}>
          Edit
        </button>
      </div>}
      {showsave===true &&  
      <div align="right">
        <button className="btn white_color_btn mr-1" 
        type="button"
        onClick={cancel}
        > 
          Cancel
        </button>
      <button className="btn primaryDarkColor" 
        type="submit"
        disabled={disabled}
        > 
        {circleloading && (
            <span class="spinner-border float-left"></span>
          )}
          Save
        </button>
        </div>
        }
        </div>
        </div>
      <div className="emp_sideLeft mt-2">
      
      <div className="row">
      
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            id="Employee_designation"
            name="Employee_designation"
            onChange={handleChange}
            value={formData.Employee_designation}
            disabled={disabled}
            ref={register({ required: true })}
            onFocus={onInputFocus}     // focus in  
            onBlur={lossFocus}         // focus out
            className={errors.Employee_designation ? "inputColorLine" :disabled ?    // dynamic class for input
            "input_style_on_disabled":input_style}
            
          />
          <br />
          {errors.Employee_designation && (
              <div><span className="inputTextError">Employee designation is required</span></div>
            )}
         <label htmlFor="Employee_designation" className={errors.Employee_designation ?     // dynamic class for label
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Designation</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            id="Employee_department"
            name="Employee_department"
            onChange={handleChange}
            value={formData.Employee_department}
            disabled={disabled}
            ref={register({ required: true })}
            onFocus={onInputFocus}
            onBlur={lossFocus}
            className={errors.Employee_department ? "inputColorLine" : disabled ? 
            "input_style_on_disabled":input_style}
            />
            
          <br />
          {errors.Employee_department && (
             <div><span className="inputTextError">Employee department is required</span></div>
            )}
          <label htmlFor="Employee_department" className={errors.Employee_department ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Department</label>
        </div>
      </div>
      
    </div>
        </form>
    </div>
  );
};
export default Employee_Position;
