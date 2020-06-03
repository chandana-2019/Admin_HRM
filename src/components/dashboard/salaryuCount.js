import React, { useState } from "react";
import "../../Styles/dashboard.css";
import Loader from "react-loader-spinner";
import {
  SALARY_OVERBOARD_FIRRST_LOAD,
  SALARY_GRAPH1_2_DEPT_WISE_POPUP,
} from "../../queries";
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal'
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";


const SalaryuCount = () => {
  const history = useHistory();
  const numDifferentiation = (val) => {
    if (val >= 10000000) val = (val / 10000000).toFixed(2) + " Cr";
    else if (val >= 100000) val = (val / 100000).toFixed(2) + " L";
    else if (val >= 1000) val = (val / 1000).toFixed(2) + " K";
    return val;
  };
 
  
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const[status,setStatus] = useState('Active')
  const[month,setMonth] = useState('')
  const[year,setYear] = useState(1)
  const { error, loading, data } = useQuery(SALARY_OVERBOARD_FIRRST_LOAD);
  const result2 = useQuery(SALARY_GRAPH1_2_DEPT_WISE_POPUP, {
    variables: { month, year, dept:"no" },
  });

  if (error)
    return (
      <div class="alert alert-danger alert-dismissible">
        <button type="button" class="close" data-dismiss="alert"></button>
        <div align="center">
          <strong>{error.error.message}</strong>{" "}
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

    
  const modalClick = (e) => {
    let Month_year =  e.target.value || e.target.attributes[1].value;
    let sepStatusDate = Month_year.split(" ");
    let month = sepStatusDate[0];
    let yearVal = parseInt(sepStatusDate[1]);
    
    setMonth(month);
    setYear(yearVal);  
    setmodalIsOpen(true);
    
   };


  const MonthData = ({
    ctc,
    ctcLabel,
    variation,
    variationLabel,
    gross,
    month,
    percent,
  }) => (
    <div className="container-fluid">
      <label className="monthYr" align="left">
        {month}
        
      </label>
      <div className="row countDiv">
        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 total">
          <label className="totalHeading">gross</label>
          <div className="totalCount">{gross}</div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
          <button className="btn primary text-capitalize col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          onClick={modalClick} 
          value={month}
          >
            {ctcLabel}
            <span className="badge badge-pill"
            value={month}
            >{ctc || 0}</span>
          </button>
          <hr className="nomarginHr" />
          <button className="btn primary text-capitalize col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          onClick={modalClick} 
          value={month}
          >
            {variationLabel}
            <span className="badge badge-pill"
            value={month}
            >
              {variation + "(" + percent + "%)" || 0}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
  
  const empNameOnClick=(emp)=>{
    localStorage.removeItem('emp_Id')
    localStorage.removeItem('emp_status')
    localStorage.removeItem('status_for_toggle')
    if(emp.emp_status==="Backedoff")
    {
     localStorage.removeItem('status_for_toggle')
     localStorage.setItem('status_for_toggle',"Arriving")
    }
    else{
     localStorage.removeItem('status_for_toggle')
     localStorage.setItem('status_for_toggle',emp.emp_status)
    }
    localStorage.setItem('emp_Id',emp.emp_id)
    localStorage.setItem('emp_status',emp.emp_status)
    history.push('/employee/employee_profile')
   };
  const {
    current_month,
    previous_month,
  } = data.getCurandPreMonthSalaryStatusOverBoard;

  let variationCurr = current_month.variation;
  let variationPrev = previous_month.variation;
  let currGross = current_month.gross;
  let currCTC = current_month.ctc;
  let prevGross = previous_month.gross
  let prevCTC = previous_month.ctc

  let PercentagePre = ((prevGross-prevCTC)/prevGross)*100 || 0
  let Percentage = ((currGross - currCTC) / currGross) * 100;
  let positiveVarCur = 0;
  let positiveVarPrev = 0;
  let minusVarCur = 0;
  let minusVarPrev = 0;

  if (variationCurr < 0) {
    positiveVarCur = numDifferentiation(Math.abs(variationCurr));
    minusVarCur = "-" + positiveVarCur;
  } else {
    minusVarCur = numDifferentiation(current_month.variation);
  }
  if (variationPrev < 0) {
    positiveVarPrev = numDifferentiation(Math.abs(variationCurr));
    minusVarPrev = "-" + positiveVarPrev;
  } else {
    minusVarPrev = numDifferentiation(previous_month.variation);
  }
  if(!modalIsOpen)
  {
  return (
    <div className="row container-fluid">
      
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div className="row widthContainer">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <MonthData
              ctc={numDifferentiation(previous_month.ctc)}
              gross={numDifferentiation(previous_month.gross) || 0}
              ctcLabel="CTC"
              variation={minusVarPrev || 0}
              variationLabel="Var"
              month={previous_month.mon_year}
              percent={PercentagePre.toFixed(2)}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <MonthData
              ctc={numDifferentiation(current_month.ctc)}
              ctcLabel="CTC"
              gross={numDifferentiation(current_month.gross) || 0}
              variation={minusVarCur || 0}
              variationLabel="Var"
              month={numDifferentiation(current_month.mon_year)}
              percent={Percentage.toFixed(2)}
            />
          </div>
        </div>
      </div>
      </div>
  )
}
else
        {
          if(result2.error) return (<div className="row container-fluid">
            
          <div className="container-fluid">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div className="row widthContainer">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <MonthData
              ctc={numDifferentiation(previous_month.ctc)}
              gross={numDifferentiation(previous_month.gross)}
              ctcLabel="CTC"
              variation={minusVarPrev}
              variationLabel="Var"
              month={previous_month.mon_year}
              percent={Percentage.toFixed(2)}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <MonthData
              ctc={numDifferentiation(current_month.ctc)}
              ctcLabel="CTC"
              gross={numDifferentiation(current_month.gross)}
              variation={minusVarCur}
              variationLabel="Var"
              month={numDifferentiation(current_month.mon_year)}
              percent={Percentage.toFixed(2)}
            />
          </div>
        </div>
      </div>
          </div>
          </div>
          )
       if(result2.loading) return <Loader 
       className="loaderCLassForGraph"
       type="ThreeDots"
       color="#0073e6"
       />
       let finalData = result2.data.getSalaryGgraphPopUpByMonYearDept
       
       

         return(
            <Modal
              isOpen={modalIsOpen}
              shouldCloseOnOverlayClick={false}
              onRequestClose={() => setmodalIsOpen(false)}
            >
              <div>
                <div className="row modalHeader">
                  <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <button
                      className="btn modalBtn text-capitalize col-8 col-sm-8 col-md-3 col-lg-2 col-xl-2"
                      align="left"
                    >
                     {status}<span className="badge badge-pill badge-warning">{finalData.length}</span>
                    </button>
                  </div>
                  <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div className="modalLingment" align="right">
                      <span onClick={() => setmodalIsOpen(false)}>
                        <i className="fas fa-times fa-2x"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <table className="table table-hover table-bordered">
                  <thead className="table-secondary">
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>CTC</th>
                      <th>Gross Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalData.map((item) => (
                      <tr>
                        <td>
                          <span
                            className="empNameTable"
                            onClick={() => empNameOnClick(item)}
                          >
                            {item.emp_name}
                          </span>
                        </td>
                        <td>{item.emp_department}</td>
                        <td>{item.emp_position}</td>
                        <td>{item.emp_ctc.toLocaleString("en-IN")}</td>
                        <td>
                          {item.emp_gross_salary.toLocaleString("en-IN") || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Modal>
         )
       }
       
    
              }
            
          
export default SalaryuCount;
