import React,{useState,useEffect} from 'react'
import test from "../../../Test.json";
import { useForm } from "react-hook-form";

const ProfessionalBackgroundData=({item})=> {

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

    return (
        <div className="emp_sideLeft">
        <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="row">
          <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div className="text-capitalize emp_prof_btn_click">Professional Background</div>
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
              id="Name_of_the_company"
              name="Name_of_the_company"
              onChange={handleChange}
              value={formData.Name_of_the_company}
              disabled={true}
              ref={register({ required: true })}
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.Name_of_the_company ? "inputColorLine" :disabled ? 
              "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Name_of_the_company && (
              <div><span className="inputTextError">Company name is required</span></div>
            )}
          
          <label htmlFor="Name_of_the_company" className={errors.Name_of_the_company ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Name of company</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            className="text-capitalize"
              id="Designation"
              name="Designation"
              onChange={handleChange}
              value={formData.Designation}
              disabled={disabled}
              ref={register({ required: true })}
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.Designation ? "inputColorLine" :disabled ? 
              "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Designation && (
              <div><span className="inputTextError">Designation is required</span></div>
            )}
          <label htmlFor="Designation" className={errors.Designation ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Designation</label>
        </div>
        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <input
            type="text"
            className="text-capitalize"
              id="Company_location"
              name="Company_location"
              onChange={handleChange}
              value={formData.Company_location}
              disabled={disabled}
              ref={register({ required: true })}
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.Company_location ? "inputColorLine" :disabled ? 
              "input_style_on_disabled":input_style}
          />
          <br />
          {errors.Company_location && (
              <div><span className="inputTextError">Company location is required</span></div>
            )}
          <label htmlFor="Company_location" className={errors.Company_location ?
              "inputColorLine input_label_on_error" :disabled ? "input_label_style_on_disabled":label_style}
            >Company location</label>
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
        </div>  
        <hr /> 
        </form>
        </div>
    )
}

export default ProfessionalBackgroundData
