import React, { useEffect, useState } from "react";

function EmpForm4({ register, errors, defaultValues }) {
  const [input_style, set_input_style] = useState("ideal_empty_input"); // initial state for input
  const [label_style, set_label_style] = useState("ideal_label_on_empty_input"); // initial state for label

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

  return (
    <div className="container-fluid mt-2 mb-2">
      <form autoComplete="on">
        <div className="row mt-1 mb-1 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2 ">
          <div className="subhead row mt-2 ml-2 mb-2">
            <span className="emphead ml-1">
              <b>Exit Information</b>
            </span>
          </div>
        </div>

        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="date"
              id="emp_tDOE"
              name="emp_tDOE"
              defaultValue={defaultValues && defaultValues.emp_tDOE}
              placeholder="dd-mm-yyyy"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_tDOE ? "inputColorLine" : input_style}
            />
            <br />
            {errors.emp_tDOE && (
              <div>
                <span className="inputTextError">
                  Tentative date of exit is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_tDOE"
              className={
                errors.emp_tDOE
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's tentative date of exit here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 ml-2">
            <input
              type="date"
              id="emp_DOE"
              name="emp_DOE"
              defaultValue={defaultValues && defaultValues.emp_DOE}
              placeholder="dd-mm-yyyy"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_DOE ? "inputColorLine" : input_style}
            />
            <br />
            {errors.emp_DOE && (
              <div>
                <span className="inputTextError">
                  Date of exit is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_DOE"
              className={
                errors.emp_DOE
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's date of exit here
            </label>
          </div>
        </div>

        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <div className="form-inline mt-2">
              <label
                htmlFor="emp_ExitReason"
                className={
                  errors.emp_ExitReason
                    ? "inputColorLine sidelabel_on_error mr-2 "
                    : "sidelabel  mr-2"
                }
              >
                Exit Reason
              </label>
              <select
                className={
                  errors.emp_ExitReason
                    ? "inputColorLine form-control mx-sm-3 mb-2 "
                    : "btn empselect  mr-2 mx-sm-3 mb-2"
                }
                id="emp_ExitReason"
                name="emp_ExitReason"
                defaultValue={defaultValues && defaultValues.emp_ExitReason}
                ref={register({ required: true })}
                onBlur={lossFocus} // focus out
              >
                <option value="Terminated">Terminated</option>
                <option value="Resigned">Resigned</option>
                <option value="Absconded">Absconded</option>
                <option value="ContractExpiry">Contract Expiry</option>
              </select>
            </div>
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

export default EmpForm4;
