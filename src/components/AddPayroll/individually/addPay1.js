import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

function PayForm1({ register, errors, defaultValues }) {
  const [input_style, set_input_style] = useState("ideal_empty_input"); // initial state for input
  const [label_style, set_label_style] = useState("ideal_label_on_empty_input"); // initial state for label
  const history = useHistory();
  useEffect(() => {
    console.log("hi", defaultValues);
  }, []);

  const onInputFocus = () => {
    // on focus In
    set_input_style("on_focus_input_style");
    set_label_style("on_focus_input_label_style");
  };

  const lossFocus = (e) => {
    // on focus out
    const v = e.target.value;
    console.log(v);
    if (v !== "") {
      set_input_style("on_loss_focus_input_style");
      set_label_style("on_loss_focus_input_label_style");
    }
  };
  let today = new Date().toISOString().substr(0, 10);

  let yourDate = new Date();
  let now_year = yourDate.getFullYear();
  //console.log("the year from new date() is " + now_year);
  let month_value = yourDate.getMonth() + 1;
  //console.log("the month value from new date() is " + month_value);

  const now_month = yourDate.toLocaleString("default", { month: "long" });
  //console.log("the month in full from new date() is " + now_month);

  /*
  let dayt = new Date().toISOString().split("T")[0];
  console.log("check the format of this: " + dayt);
*/

  const handlepaymonth = (event) => {
    let paymonthvalue = event.target.value;
    console.log(
      "picked value from dropdown is" + JSON.stringify(paymonthvalue)
    );
    //picked valueformat is"2023-07"
  };

  const addBulkPay = () => {
    history.push("/addpaybulk");
  };
  return (
    <div className="admin_form container-fluid mt-4 mb-4 ">
      <form autoComplete="on">
        <div className="row mt-1 mb-1 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div class="col">
            <div className="form-group ml-2">
              <label className="on_loss_focus_input_style">Payroll Month</label>
              <div className="form-inline">
                <label className="on_loss_focus_input_label_style mr-2">
                  Select the payroll month you want to update
                </label>

                <input
                  type="month"
                  id="paymonth"
                  name="paymonth"
                  className="monthdropdn btn"
                  defaultValue="2020-05"
                  onChange={handlepaymonth}
                />
              </div>
            </div>
          </div>
          <div class="col testc float-right form-inline">
            <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4  ml-4 mr-4 ">
              {" "}
              <br></br>
            </div>
            <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
              {" "}
              <br></br>
            </div>
            <button
              className="blk btn btn-primary mt-2"
              type="button"
              onClick={addBulkPay}
            >
              Bulk Upload Excel
            </button>
          </div>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="emp_no"
              defaultValue={defaultValues && defaultValues.emp_no}
              placeholder="Employee Number"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_no ? "inputColorLine" : input_style}
            />
            {errors.emp_no && (
              <div>
                <span className="inputTextError">
                  Employee Number is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_no"
              className={
                errors.emp_no
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee number here.
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="text"
              id="emp_name"
              name="emp_name"
              defaultValue={defaultValues && defaultValues.emp_name}
              placeholder="Employee Name"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_name ? "inputColorLine" : input_style}
            />
            {errors.emp_name && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Employee Name is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_name"
              className={
                errors.emp_name
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee name here
            </label>
          </div>
        </div>
        <div className="row mt-1 mb-1 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <label htmlFor="EmployeeStatus" className="sidelabel mr-4">
              Employee Status
            </label>

            <select
              className="btn primary_light ml-4"
              name="EmployeeStatus"
              defaultValue={defaultValues && defaultValues.EmployeeStatus}
              ref={register({ required: true })}
              className={
                errors.EmployeeStatus
                  ? "inputColorLine form-control mx-sm-3 mb-2"
                  : "btn primary_light ml-4"
              }
            >
              <option value="Arriving">Arriving</option>
              <option value="Active">Active</option>
              <option value="Exiting">Exiting</option>
              <option value="Exited">Exited</option>
              <option value="Backed-off">Backed-off</option>
            </select>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="ActualWorkDays"
              defaultValue={defaultValues && defaultValues.ActualWorkDays}
              placeholder="Actual no of work days"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.ActualWorkDays ? "inputColorLine" : input_style}
            />
            <br />
            {errors.ActualWorkDays && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Actual no of work days is required.
                </span>
              </div>
            )}
            <label
              htmlFor="ActualWorkDays"
              className={
                errors.ActualWorkDays
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's actual no of working days
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="BillableNodays"
              defaultValue={defaultValues && defaultValues.BillableNodays}
              placeholder="Billable no of days"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.BillableNodays ? "inputColorLine" : input_style}
            />
            {errors.BillableNodays && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Billable No of days is required.
                </span>
              </div>
            )}
            <label
              htmlFor="BillableNodays"
              className={
                errors.BillableNodays
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter billable no of days
            </label>
          </div>
        </div>

        {/* ======================================   residence  ====================================== */}
        <div className="row mt-1 mb-1 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="payctc"
              defaultValue={defaultValues && defaultValues.payctc}
              placeholder="CTC"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.payctc ? "inputColorLine" : input_style}
            />
            {errors.payctc && (
              <div>
                <span className="inputTextError"> CTC is required.</span>
              </div>
            )}
            <label
              htmlFor="payctc"
              className={
                errors.payctc
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's current cost to company here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="payEarnedFixed"
              defaultValue={defaultValues && defaultValues.payEarnedFixed}
              placeholder="Earned fixed"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.payEarnedFixed ? "inputColorLine" : input_style}
            />
            {errors.payEarnedFixed && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Earned fixed is required.
                </span>
              </div>
            )}
            <label
              htmlFor="payEarnedFixed"
              className={
                errors.payEarnedFixed
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's earned fixed here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="payEarnedVariables"
              defaultValue={defaultValues && defaultValues.payEarnedVariables}
              placeholder="Earned Variable"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.payEarnedVariables ? "inputColorLine" : input_style
              }
            />
            {errors.payEarnedVariables && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Earned Variable is required.
                </span>
              </div>
            )}
            <label
              htmlFor="BillableNodays"
              className={
                errors.payEarnedVariables
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's earned variable here
            </label>
          </div>
        </div>
        {/*  next row  */}

        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="payGrossSalary"
              defaultValue={defaultValues && defaultValues.payGrossSalary}
              placeholder="Gross Salary"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.payGrossSalary ? "inputColorLine" : input_style}
            />
            {errors.payGrossSalary && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Gross Salary is required.
                </span>
              </div>
            )}
            <label
              htmlFor="payGrossSalary"
              className={
                errors.payGrossSalary
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's gross salary here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="payDeductions"
              defaultValue={defaultValues && defaultValues.payDeductions}
              placeholder="Deductions"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.payDeductions ? "inputColorLine" : input_style}
            />
            {errors.payDeductions && (
              <div>
                <span className="inputTextError"> Deductions is required.</span>
              </div>
            )}
            <label
              htmlFor="payDeductions"
              className={
                errors.payDeductions
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's deductions here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="payNetSalary"
              defaultValue={defaultValues && defaultValues.payNetSalary}
              placeholder="Net Salary"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.payNetSalary ? "inputColorLine" : input_style}
            />
            {errors.payNetSalary && (
              <div>
                <span className="inputTextError"> Net Salary is required.</span>
              </div>
            )}
            <label
              htmlFor="payNetSalary"
              className={
                errors.payNetSalary
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's net salary here
            </label>
          </div>
        </div>

        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="payAadhaarCard"
              defaultValue={defaultValues && defaultValues.payAadhaarCard}
              placeholder="Aadhaar Card"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.payAadhaarCard ? "inputColorLine" : input_style}
            />
            {errors.payAadhaarCard && (
              <div>
                <span className="inputTextError">
                  Aadhaar Card no is required.
                </span>
              </div>
            )}
            <label
              htmlFor="payAadhaarCard"
              className={
                errors.payAadhaarCard
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's aadhaar card number here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="payUAN"
              defaultValue={defaultValues && defaultValues.payUAN}
              placeholder="UAN"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.payUAN ? "inputColorLine" : input_style}
            />
            {errors.payUAN && (
              <div>
                <span className="inputTextError"> UAN is required.</span>
              </div>
            )}
            <label
              htmlFor="payUAN"
              className={
                errors.payUAN
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's UAN here
            </label>
          </div>
        </div>
        <div className="row mt-1 mb-1 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
      </form>
    </div>
  );
}

export default PayForm1;
