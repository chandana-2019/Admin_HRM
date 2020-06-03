import React,{useState,useEffect} from 'react'
import test from "../../../Test.json";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { GET_EMP_EXIT_STATUS } from "../../../queries";
import { useQuery } from "@apollo/react-hooks";
const ExitInfo =(props)=> {
    let type = props.type;
    let id = localStorage.getItem("emp_Id");

    const [disabled, setdisabled] = useState(true);
    const { register, handleSubmit, reset, errors } = useForm();
    const[input_style,set_input_style] =useState("ideal_empty_input")
    const[label_style,set_label_style] =useState("ideal_label_on_empty_input")
    const [circleloading, setcircleloading] = useState(false);
    const [cancelData, setCancelData] = useState({});
    const [showsave, setshowsave] = useState(false);
    const [formData, setFormData] = useState({});


    const { error, loading, data } = useQuery(GET_EMP_EXIT_STATUS, {
      variables: { type, id },
    });
    useEffect(() => {
      if (data) {
        setFormData(data.getEmployeeExitInfo);
        setCancelData(data.getEmployeeExitInfo);
      }
    }, [data]);
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

    const onInputFocus=()=>{
      set_input_style("on_focus_input_style")
      set_label_style("on_focus_input_label_style")
    }
    const lossFocus=(e)=>{
  
      const v = (e.target.value)
      console.log(v)
      if(v!==""){
         set_input_style("on_loss_focus_input_style")
        set_label_style("on_loss_focus_input_label_style")
      }
    }
  let empData = data.getEmployeeExitInfo

  
  const edit = () => {
    setdisabled(false);
    setshowsave(true);
  };
  const onSubmit = (e) => {
    console.log(e);
    setcircleloading(true);
    setdisabled(true);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const cancel = () => {
    setdisabled(true);
    setshowsave(false);
    setFormData(cancelData);
    reset();
  };




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
            <div className="row emp_sideLeft">
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            id="tdoe"
            name="Employee_tentative_date_of_exit"
            onChange={handleChange}
            value={formData.Employee_tentative_date_of_exit}
            disabled={disabled}
            ref={register({ required: true })}
            onFocus={onInputFocus}
            onBlur={lossFocus}
            className={errors.Employee_tentative_date_of_exit ? "inputColorLine" :disabled ? 
            "input_style_on_disabled":input_style}
          />
          <br />
          
          {errors.Employee_tentative_date_of_exit && (
              <div><span className="inputTextError">Employee Bank name is required</span></div>
            )}
         <label htmlFor="Employee_tentative_date_of_exit" className={errors.Employee_tentative_date_of_exit ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Tentative date of exit</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            id="Employee_date_of_exit"
            name="Employee_date_of_exit"
            onChange={handleChange}
            value={formData.Employee_date_of_exit}
            disabled={disabled}
            ref={register({ required: true })}
            onFocus={onInputFocus}
            onBlur={lossFocus}
            className={errors.Employee_date_of_exit ? "inputColorLine" :disabled ? 
            "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Employee_date_of_exit && (
              <div><span className="inputTextError">Employee Bank name is required</span></div>
            )}
         <label htmlFor="Employee_date_of_exit" className={errors.Employee_date_of_exit ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Date of exit</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            id="Emp_exit_reason"
            name="Emp_exit_reason"
            onChange={handleChange}
            value={formData.Emp_exit_reason}
            disabled={disabled}
            ref={register({ required: true })}
            onFocus={onInputFocus}
            onBlur={lossFocus}
            className={errors.Emp_exit_reason ? "inputColorLine" :disabled ? 
            "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Emp_exit_reason && (
              <div><span className="inputTextError">Employee Bank name is required</span></div>
            )}
         <label htmlFor="Emp_exit_reason" className={errors.Emp_exit_reason ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Exit reson</label>
        </div>
        
    </div>
    
    </form>
    </div>
    )
}
export default ExitInfo
