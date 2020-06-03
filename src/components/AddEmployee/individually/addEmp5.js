import React, { useEffect, Fragment, useState } from "react";

function EmpForm5({ register, errors, defaultValues }) {
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

  const [inputFields, setInputFields] = useState([
    { emp_evalNote: [], emp_eval: [], evaluator_name: [] },
  ]);

  const handleAddFields = () => {
    const defaultValue = [...inputFields];
    defaultValue.push({ emp_evalNote: [], emp_eval: [], evaluator_name: [] });
    setInputFields(defaultValue);
  };

  const handleInputChange = (index, event) => {
    event.preventDefault();
    const defaultValue = [...inputFields];
    if (event.target.name === "emp_evalNote") {
      defaultValue[index].emp_evalNote = event.target.value;
    } else if (event.target.name === "emp_eval") {
      defaultValue[index].emp_eval = event.target.value;
    } else {
      defaultValue[index].evaluator_name = event.target.value;
    }

    setInputFields(defaultValue);
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
              <b>Evaluation </b>
            </span>
          </div>
        </div>
        {inputFields.map((inputField, index) => (
          <Fragment key={`${inputField}~${index}`}>
            <div className="row mt-4 mb-2 ml-2 mr-2">
              <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <input
                  type="text"
                  id="emp_evalNote"
                  name="emp_evalNote"
                  placeholder="Evaluation Note"
                  defaultValue={
                    defaultValues &&
                    defaultValues.emp_evalNote &&
                    inputField.emp_evalNote
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.emp_evalNote ? "inputColorLine" : input_style
                  }
                  //value={inputField.emp_evalNote}
                  onChange={(event) => handleInputChange(index, event)}
                />
                {errors.emp_evalNote && (
                  <div>
                    <span className="inputTextError">
                      Evaluation note is required.
                    </span>
                  </div>
                )}
                <label
                  htmlFor="emp_evalNote"
                  className={
                    errors.emp_evalNote
                      ? "inputColorLine input_label_on_error"
                      : label_style
                  }
                >
                  Enter employee's evaluation note here
                </label>
              </div>
            </div>
            <div className="row mt-4 mb-4 ml-2 mr-2">
              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-inline mt-2">
                  <label
                    htmlFor="emp_eval"
                    className={
                      errors.emp_eval
                        ? "inputColorLine sidelabel_on_error mr-2 "
                        : "sidelabel  mr-2"
                    }
                  >
                    Evaluation
                  </label>
                  <select
                    className={
                      errors.emp_eval
                        ? "inputColorLine form-control mx-sm-3 mb-2 "
                        : "btn empselect  mr-2 mx-sm-3 mb-2"
                    }
                    id="emp_eval"
                    name="emp_eval"
                    defaultValue={
                      defaultValues &&
                      defaultValues.emp_eval &&
                      inputField.emp_eval
                    }
                    ref={register({ required: true })}
                    onBlur={lossFocus} // focus out
                    //value={inputField.emp_eval}
                    onChange={(event) => handleInputChange(index, event)}
                  >
                    <option value="Recommended">Recommended</option>
                    <option value="Blacklisted">Blacklisted</option>
                    <option value="Average">Average</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row mt-4 mb-4 ml-2 mr-2">
              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <input
                  type="text"
                  id="evaluator_name"
                  name="evaluator_name"
                  placeholder="John Doe"
                  defaultValue={
                    defaultValues &&
                    defaultValues.evaluator_name &&
                    inputField.evaluator_name
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.evaluator_name ? "inputColorLine" : input_style
                  }
                  //value={inputField.evaluator_name}
                  onChange={(event) => handleInputChange(index, event)}
                />
                {errors.evaluator_name && (
                  <div>
                    <span className="inputTextError">
                      Name of the evaluator is required.
                    </span>
                  </div>
                )}
                <label
                  htmlFor="evaluator_name"
                  className={
                    errors.evaluator_name
                      ? "inputColorLine input_label_on_error"
                      : label_style
                  }
                >
                  Name of the evaluator
                </label>
              </div>
            </div>
            <div className="row mt-2 mb-2 ml-2 mr-2 ">
              {" "}
              <br></br>
            </div>
          </Fragment>
        ))}
        <div className="row mt-4 mb-4 ml-1 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <button
              type="button"
              className="btn add_btn"
              onClick={handleAddFields}
            >
              <i className="fas fa-plus"></i> Add Evaluation
            </button>
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

export default EmpForm5;
