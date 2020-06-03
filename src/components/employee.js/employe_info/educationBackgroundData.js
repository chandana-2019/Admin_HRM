import React,{useState,useEffect} from 'react'
import test from "../../../Test.json";
import { useForm } from "react-hook-form";
const EducationBackgroundData = ({ item }) => {
  
    const [disabled, setdisabled] = useState(true);
    const { register, handleSubmit, reset, errors } = useForm();
    const[input_style,set_input_style] =useState("ideal_empty_input")
    const[label_style,set_label_style] =useState("ideal_label_on_empty_input")
    const [circleloading, setcircleloading] = useState(false);
    const [cancelData, setCancelData] = useState({});
    const [showsave, setshowsave] = useState(false);
    const [formData, setFormData] = useState({});
  
  
    useEffect(() => {
      if (item) {
        setFormData(item);
        setCancelData(item);
      }
    }, [item]);
  
    const edit = () => {
      setdisabled(false);
      setshowsave(true);
    };
    const onSubmit = (e) => {
      
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
    return (
      
            <div className="emp_sideLeft">
        
            <form onSubmit={handleSubmit(onSubmit)}>
        
            <div className="row">
          <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div className="text-capitalize emp_prof_btn_click">Educational Background</div>
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
            className="text-capitalize"
              id="Employee_qualification"
              name="Employee_qualification"
              onChange={handleChange}
              value={formData.Employee_qualification}
              disabled={true}
              ref={register({ required: true })}
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.Employee_qualification ? "inputColorLine" :disabled ? 
              "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Employee_qualification && (
              <div><span className="inputTextError">Qualification is required</span></div>
            )}
          <label htmlFor="Employee_qualification" className={errors.Employee_qualification ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Qualification</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            className="text-capitalize"
              id="Employee_specification"
              name="Employee_specification"
              onChange={handleChange}
              value={formData.Employee_specification}
              disabled={disabled}
              ref={register({ required: true })}
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.Employee_specification ? "inputColorLine" :disabled ? 
              "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Employee_specification && (
              <div><span className="inputTextError">Specification is required</span></div>
            )}  
          <label htmlFor="Employee_specification" className={errors.Employee_specification ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Specification</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            className="text-capitalize"
              id="Institute_name"
              name="Institute_name"
              onChange={handleChange}
              value={formData.Institute_name}
              disabled={disabled}
              ref={register({ required: true })}
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.Institute_name ? "inputColorLine" :disabled ? 
              "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Institute_name && (
              <div><span className="inputTextError">Institute name is required</span></div>
            )}  
          <label htmlFor="Institute_name" className={errors.Institute_name ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Institute name</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            className="text-capitalize"
              id="Start_date"
              name="Start_date"
              onChange={handleChange}
              value={formData.Start_date}
              disabled={disabled}
              ref={register({ required: true })}
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.Start_date ? "inputColorLine" :disabled ? 
              "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Start_date && (
              <div><span className="inputTextError">Start date is required</span></div>
            )}  
          <label htmlFor="Start_date" className={errors.Start_date ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Start date</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            className="text-capitalize"
              id="End_date"
              name="End_date"
              onChange={handleChange}
              value={formData.End_date}
              disabled={disabled}
              ref={register({ required: true })}
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.End_date ? "inputColorLine" :disabled ? 
              "input_style_on_disabled":input_style}
          />
          <br />
          {errors.End_date && (
              <div><span className="inputTextError">End date is required</span></div>
            )}  
          <label htmlFor="End_date" className={errors.End_date ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >End date</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            className="text-capitalize"
              id="CGPA"
              name="CGPA"
              onChange={handleChange}
              value={formData.CGPA}
              disabled={disabled}
              ref={register({ required: true })}
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.CGPA ? "inputColorLine" :disabled ? 
              "input_style_on_disabled":input_style}
          />
          <br />
          {errors.CGPA && (
              <div><span className="inputTextError">CGPA is required</span></div>
            )}  
          <label htmlFor="CGPA" className={errors.CGPA ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >CGPA</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            className="text-capitalize"
              id="Percentage"
              name="Percentage"
              onChange={handleChange}
              value={formData.Percentage}
              disabled={disabled}
              ref={register({ required: true })}
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.Percentage ? "inputColorLine" :disabled ? 
              "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Percentage && (
              <div><span className="inputTextError">Percentage is required</span></div>
            )}  
          <label htmlFor="Percentage" className={errors.Percentage ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Percentage</label>
        </div>
        
        </div> 
        <hr /> 
        
        </form>
        
         </div>
        
    )
}

export default EducationBackgroundData
