import React,{useState,useEffect} from "react";
import test from "../../../Test.json";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { GET_EMP_ID } from "../../../queries";
import { useQuery } from "@apollo/react-hooks";

const Id = (props) => {
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

  const { error, loading, data } = useQuery(GET_EMP_ID, {
    variables: { type, id },
  });

  useEffect(() => {
    if (data) {
      setFormData(data.getEmployeeIdProofInfo);
      setCancelData(data.getEmployeeIdProofInfo);
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

  let empData = data.getEmployeeIdProofInfo;

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
            id="Employee_pan"
            name="Employee_pan"
            onChange={handleChange}
            value={formData.Employee_pan}
            disabled={disabled}
            ref={register({ required: true })}
            onFocus={onInputFocus}
            onBlur={lossFocus}
            className={errors.Employee_pan ? "inputColorLine" :disabled ? 
            "input_style_on_disabled":input_style}
            
          />
          <br />
          {errors.Employee_pan && (
              <div><span className="inputTextError">Employee PAN is required</span></div>
            )}
          <label htmlFor="Employee_pan" className={errors.Employee_pan ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >PAN Number</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            id="Emploeyee_UAN"
            name="Emploeyee_UAN"
            onChange={handleChange}
            value={formData.Emploeyee_UAN}
            disabled={disabled}
            ref={register({ required: true })}
            onFocus={onInputFocus}
            onBlur={lossFocus}
            className={errors.Emploeyee_UAN ? "inputColorLine" :disabled ? 
            "input_style_on_disabled":input_style}
            
          />
          <br/>
          {errors.Emploeyee_UAN && (
              <div><span className="inputTextError">Employee UAN is required</span></div>
            )}
         <label htmlFor="Emploeyee_UAN" className={errors.Emploeyee_UAN ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >UAN</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            id="emp_designation"
            name="emp_designation"
            onChange={handleChange}
            value={formData.emp_designation}
            disabled={disabled}
            ref={register({ required: true })}
            onFocus={onInputFocus}
            onBlur={lossFocus}
            className={errors.emp_designation ? "inputColorLine" :disabled ? 
            "input_style_on_disabled":input_style}
            
          />
          <br />
          {errors.emp_designation && (
              <div><span className="inputTextError">Employee designation is required</span></div>
            )}
          <label htmlFor="emp_designation" className={errors.emp_designation ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >PF Number</label>
        </div>
      </div>
      <div className="row">
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            id="Employee_ESI_no"
            name="Employee_ESI_no"
            onChange={handleChange}
            value={formData.Employee_ESI_no}
            disabled={disabled}
            ref={register({ required: true })}
            onFocus={onInputFocus}
            onBlur={lossFocus}
            className={errors.Employee_ESI_no ? "inputColorLine" :disabled ? 
            "input_style_on_disabled":input_style}
            
          />
          <br />
          {errors.Employee_ESI_no && (
              <div><span className="inputTextError">Employee ESI no. is required</span></div>
            )}
          <label htmlFor="Employee_ESI_no" className={errors.Employee_ESI_no ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >ESI Number</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            id="Employee_Aadhar_number"
            name="Employee_Aadhar_number"
            onChange={handleChange}
            value={formData.Employee_Aadhar_number}
            disabled={disabled}
            ref={register({ required: true })}
            onFocus={onInputFocus}
            onBlur={lossFocus}
            className={errors.Employee_Aadhar_number ? "inputColorLine" :disabled ? 
            "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Employee_Aadhar_number && (
              <div><span className="inputTextError">Employee Aadhar no. is required</span></div>
            )}
          <label htmlFor="Employee_Aadhar_number" className={errors.Employee_Aadhar_number ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Aadhar Number</label>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            id="Employee_passport_number"
            name="Employee_passport_number"
            onChange={handleChange}
            value={formData.Employee_passport_number}
            disabled={disabled}
            ref={register({ required: true })}
            onFocus={onInputFocus}
            onBlur={lossFocus}
            className={errors.Employee_passport_number ? "inputColorLine" :disabled ? 
            "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Employee_passport_number && (
              <div><span className="inputTextError">Employee passport no. is required</span></div>
            )}
          <label htmlFor="Employee_passport_number" className={errors.Employee_passport_number ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Aadhar Number</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            id="Employee_passport_validity"
            name="Employee_passport_validity"
            onChange={handleChange}
            value={formData.Employee_passport_validity}
            disabled={disabled}
            ref={register({ required: true })}
            onFocus={onInputFocus}
            onBlur={lossFocus}
            className={errors.Employee_passport_validity ? "inputColorLine" :disabled ? 
            "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Employee_passport_validity && (
              <div><span className="inputTextError">Employee passport validity is required</span></div>
            )}
          <label htmlFor="Employee_passport_validity" className={errors.Employee_passport_validity ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Passport validity</label>
        </div>
      </div>
      </div>
      </form>
    </div>
  );
};
export default Id;
