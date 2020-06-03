import React, { useState } from "react";
import Loader from "react-loader-spinner";
import { GET_EMP_Evaluation,GET_EMPLOYEE_DATA } from "../../../queries";
import { ADD_EVALUATION } from "../../../mutations";
import EvaluationComp from "./evaluationData";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { ToastContainer, toast } from 'react-toastify';
import TodayDate from '../../../Helper/TodayDate'

const Evaluation = (props) => {
  let status = localStorage.getItem('emp_status')
  const { register, handleSubmit, errors } = useForm();
  const [disabled, setdisabled] = useState(false);
  const[input_style,set_input_style] =useState("ideal_empty_input")
  const[label_style,set_label_style] =useState("ideal_label_on_empty_input")
  let type = props.type;
  let id = localStorage.getItem("emp_Id");
  const { error, loading, data } = useQuery(GET_EMP_Evaluation, {
    variables: { type, id },
  });
  const [addEmployeeEvaluationInfo, result] = useMutation(ADD_EVALUATION,{
    refetchQueries: [
      {
        
        query: GET_EMP_Evaluation,
        variables: { type,id }
      },
      {
        
        query: GET_EMPLOYEE_DATA,
        variables: { status }
      }
    ]
  });

  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [circleloading,setcircleloading] = useState(false)


  
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

  let empData = data.getEmployeeEvaluationInfo;
   
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
  const onSubmit = (data) => {
    setcircleloading(true)
     setdisabled(true);
    let { evaluaterName, evaluationNote, evaluationType } = data;
    console.log(evaluaterName + ":" + evaluationNote + ":" + evaluationType);
    addEmployeeEvaluationInfo({
      variables: { id, evaluaterName, evaluationNote, evaluationType },
    });

    console.log(result);
    toast.success( 'Evaluation updated sucessfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
      });
    setcircleloading(false)
    setmodalIsOpen(false)
  };

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
{/* Same as */}
     <ToastContainer />
      <div className="row">
      <div className="emp_prof_btn_click form-group col-10 col-sm-10 col-md-8 col-lg-3 col-xl-3">
        Evaluation
      </div>
      <div className="form-group col-10 col-sm-10 col-md-8 col-lg-3 col-xl-3">
        <button className="btn white_color_btn" 
        onClick={() => setmodalIsOpen(true)}
        >
        <i className="fas fa-plus"></i> Add Evaluation
           </button>
      </div>
      </div>
      { empData.length===0 && <div className="alert alert-warning alert-dismissible">
            <button type="button" className="close" data-dismiss="alert"></button>
            <div align="center">
              <strong>Ooopppsss !!! No data</strong>{" "}
            </div>
          </div>}
      {empData.map((item) => (
        <EvaluationComp item={item} />
      ))}

      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setmodalIsOpen(false)}
      >
        <div>
          <div className="modalLingment" align="right">
            <span onClick={() => setmodalIsOpen(false)}>
              <i className="fas fa-times fa-2x"></i>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group col-10 col-sm-10 col-md-8 col-lg-4 col-xl-4">
            <input
              type="text"
              name="evaluaterName"
              id="evaluaterName"
              ref={register({ required: true })}
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.evaluaterName ? "inputColorLine" : input_style}
            />
            {errors.evaluaterName && (
              <div><span className="inputTextError">Evaluator name is required</span></div>
            )}
            
            <label htmlFor="evaluaterName" className={errors.evaluaterName ? "inputColorLine input_label_on_error" : label_style}
            >Evaluator's Name</label>
          </div>
          <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <input
              type="text"
              name="evaluationNote"
              id="evaluationNote"
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.evaluationNote ? "inputColorLine" : input_style}
              ref={register({ required: true })}
            />
            
            {errors.evaluationNote && (
              <div><span className="inputTextError">Evaluator note is required</span></div>
            )}
            
            <label htmlFor="evaluationNote" className={errors.evaluationNote ? "inputColorLine input_label_on_error" : label_style}
            >Evaluator note here</label>
          </div>
          
          <div className="form-group col-10 col-sm-10 col-md-8 col-lg-4 col-xl-4">
            <select
              
              name="evaluationType"
              className={errors.evaluationType ? "inputColorLine form-control" : "form-control"}
              ref={register({ required: true })}
            >
              <option value="Recommended">Recommended</option>
              <option value="Average">Average</option>
              <option value="Blacklisted">Blacklisted</option>
            </select>
            {errors.evaluationType && (
              <div><span className="inputTextError">Evaluator type is required</span></div>
            )}
            
            <label htmlFor="evaluationNote" className={errors.evaluationType ? "inputColorLine input_label_on_error" : label_style}
            >Evaluation</label>
          </div>

          <div className="form-group col-10 col-sm-10 col-md-8 col-lg-4 col-xl-4">
            {console.log(TodayDate())}
            <input
              type="date"
              name="evaluationDate"
              id="evaluationDate"
              value="2020-05-15"
              onChange={(e)=>console.log(e)}
              ref={register({ required: true })}
              onFocus={onInputFocus}
              onBlur={lossFocus}
              className={errors.evaluationDate ? "inputColorLine" : input_style}
            />
            {errors.evaluationDate && (
              <div><span className="inputTextError">Evaluator name is required</span></div>
            )}
            
            <label htmlFor="evaluationDate" className={errors.evaluationDate ? "inputColorLine input_label_on_error" : label_style}
            >Evaluation Date</label>
          </div>

          <div className="form-group ">
          
            <button className="btn primaryDarkColor  col-7 col-sm-7 col-md-5 col-lg-1 col-xl-1 ml-3"
            disabled={disabled ? "disabled" : ""}
            >
            {circleloading && (
            <span class="spinner-border float-right"></span>
          )}
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Evaluation;
