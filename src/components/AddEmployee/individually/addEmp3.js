import React, { useEffect, Fragment, useState } from "react";

function EmpForm3({ register, errors, defaultValues }) {
  const [input_style, set_input_style] = useState("ideal_empty_input"); // initial state for input
  const [label_style, set_label_style] = useState("ideal_label_on_empty_input"); // initial state for label
  const [emp_style, set_emp_style] = useState("ideal_emp_input"); // custom for Employee input

  useEffect(() => {
    console.log("hi", [defaultValues]);
  }, []);

  const onInputFocus = () => {
    // on focus In
    set_input_style("on_focus_input_style");
    set_label_style("on_focus_input_label_style");
    set_emp_style("on_focus_EmpInput_style");
  };

  const lossFocus = (e) => {
    // on focus out
    const v = e.target.value;
    console.log(v);
    if (v !== "") {
      set_input_style("on_loss_focus_input_style");
      set_label_style("on_loss_focus_input_label_style");
      set_emp_style("on_focus_EmpInput_style");
    }
  };

  const [inputFields, setInputFields] = useState([
    {
      Emp_Qualification: [],
      emp_Specialisation: [],
      emp_institute: [],
      emp_EdustartDate: [],
      emp_EdufinDate: [],
      emp_CGPA: [],
      emp_CGPAselect: [],
    },
  ]);

  const [inputFieldsnew, setInputFieldsnew] = useState([
    {
      emp_companyName: [],
      emp_designation: [],
      emp_location: [],
      emp_profstartDate: [],
      emp_profEndDate: [],
    },
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      Emp_Qualification: [],
      emp_Specialisation: [],
      emp_institute: [],
      emp_EdustartDate: [],
      emp_EdufinDate: [],
      emp_CGPA: [],
      emp_CGPAselect: [],
    });
    setInputFields(values);
  };

  const handleAddnewFields = () => {
    const values = [...inputFieldsnew];
    values.push({
      emp_companyName: [],
      emp_designation: [],
      emp_location: [],
      emp_profstartDate: [],
      emp_profEndDate: [],
    });
    setInputFieldsnew(values);
  };

  const handleInputChange = (index, event) => {
    event.preventDefault();
    const values = [...inputFields];
    switch (event.target.name) {
      case "Emp_Qualification":
        values[index].Emp_Qualification = event.target.value;
        break;
      case "emp_Specialisation":
        values[index].emp_Specialisation = event.target.value;
        break;
      case "emp_institute":
        values[index].emp_institute = event.target.value;
        break;
      case "emp_EdustartDate":
        values[index].emp_EdustartDate = event.target.value;
        break;
      case "emp_EdufinDate":
        values[index].emp_EdufinDate = event.target.value;
        break;
      case "emp_CGPA":
        values[index].emp_CGPA = event.target.value;
        break;
      default:
        values[index].emp_CGPAselect = event.target.value;
    }

    setInputFields(values);
  };

  const handlenewInputChange = (index, event) => {
    event.preventDefault();
    const values = [...inputFieldsnew];

    switch (event.target.name) {
      case "emp_companyName":
        values[index].emp_companyName = event.target.value;
        break;
      case "emp_designation":
        values[index].emp_designation = event.target.value;
        break;
      case "emp_location":
        values[index].emp_location = event.target.value;
        break;
      case "emp_profstartDate":
        values[index].emp_profstartDate = event.target.value;
        break;
      default:
        values[index].emp_profEndDate = event.target.value;
    }

    setInputFieldsnew(values);
  };

  return (
    <div className="container-fluid mt-2 mb-2">
      <form autoComplete="on">
        <div className="row mt-1 mb-1 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="subhead row mt-2 ml-2 mb-2">
            <span className="emphead ml-1">
              <b>Educational Background</b>
            </span>
          </div>
        </div>
        {inputFields.map((inputField, index) => (
          <Fragment key={`${inputField}~${index}`}>
            <div className="row mt-1 mb-1 ml-2 mr-2 ">
              {" "}
              <br></br>
            </div>
            <div className="row mt-4 mb-2 ml-2 mr-2">
              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-1">
                <select
                  id="Emp_Qualification"
                  name="Emp_Qualification"
                  placeholder="Qualification"
                  defaultValue={
                    defaultValues &&
                    defaultValues.Emp_Qualification &&
                    inputField.Emp_Qualification
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.Emp_Qualification ? "inputColorLine" : input_style
                  }
                  //value={inputField.Emp_Qualification}
                  onChange={(event) => handleInputChange(index, event)}
                >
                  <option value="BTech">BTech</option>
                  <option value="MBA">MBA</option>
                  <option value="Diploma">Diploma</option>
                </select>
                {errors.Emp_Qualification && (
                  <div>
                    <span className="inputTextError">
                      Qualification is required
                    </span>
                  </div>
                )}
                <label
                  htmlFor="Emp_Qualification"
                  className={
                    errors.Emp_Qualification
                      ? "inputColorLine input_label_on_error"
                      : label_style
                  }
                >
                  Enter employee's qualification here
                </label>
              </div>

              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-1">
                <select
                  id="emp_Specialisation"
                  name="emp_Specialisation"
                  defaultValue={
                    defaultValues &&
                    defaultValues.emp_Specialisation &&
                    inputField.emp_Specialisation
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.emp_Specialisation ? "inputColorLine" : input_style
                  }
                  // value={inputField.emp_Specialisation}
                  onChange={(event) => handleInputChange(index, event)}
                >
                  <option value="ComputerScience">Computer science</option>
                  <option value="HumanResource">Human Resource</option>
                  <option value="Electrical">Electrical</option>
                </select>

                {errors.emp_Specialisation && (
                  <div>
                    <span className="inputTextError">
                      Specialisation is required.
                    </span>
                  </div>
                )}
                <label
                  htmlFor="emp_Specialisation"
                  className={
                    errors.emp_Specialisation
                      ? "inputColorLine input_label_on_error"
                      : label_style
                  }
                >
                  Enter employee's specialisation here
                </label>
              </div>
              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <input
                  type="text"
                  id="emp_institute"
                  name="emp_institute"
                  placeholder="Institute Name"
                  defaultValue={
                    defaultValues && defaultValues && inputField.emp_institute
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.emp_institute ? "inputColorLine" : input_style
                  }
                  //value={inputField.emp_institute}
                  onChange={(event) => handleInputChange(index, event)}
                />

                {errors.emp_institute && (
                  <div>
                    <span className="inputTextError">
                      Institute name is required.
                    </span>
                  </div>
                )}
                <label
                  htmlFor="emp_institute"
                  className={
                    errors.emp_institute
                      ? "inputColorLine input_label_on_error"
                      : label_style
                  }
                >
                  Enter the institute's name here
                </label>
              </div>
            </div>
            {/*Section 1 - ROW 2 BELOW */}

            <div className="row mt-4 mb-4 ml-2 mr-2">
              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-4 mb-4">
                <input
                  type="date"
                  id="emp_EdustartDate"
                  name="emp_EdustartDate"
                  placeholder="dd-mm-yyyy"
                  defaultValue={
                    defaultValues &&
                    defaultValues.emp_EdustartDate &&
                    inputField.emp_EdustartDate
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.emp_EdustartDate ? "inputColorLine" : input_style
                  }
                  //value={inputField.emp_EdustartDate}
                  onChange={(event) => handleInputChange(index, event)}
                />

                {errors.emp_EdustartDate && (
                  <div>
                    <span className="inputTextError">
                      Education Start date is required.
                    </span>
                  </div>
                )}
                <label
                  htmlFor="emp_EdustartDate"
                  className={
                    errors.emp_EdustartDate
                      ? "inputColorLine input_label_on_error"
                      : label_style
                  }
                >
                  Enter the education start date here
                </label>
              </div>

              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-4 mb-4">
                <input
                  type="date"
                  id="emp_EdufinDate"
                  name="emp_EdufinDate"
                  placeholder="dd-mm-yyyy"
                  defaultValue={
                    defaultValues &&
                    defaultValues.emp_EdufinDate &&
                    inputField.emp_EdufinDate
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.emp_EdufinDate ? "inputColorLine " : input_style
                  }
                  //value={inputField.emp_EdufinDate}
                  onChange={(event) => handleInputChange(index, event)}
                />

                {errors.emp_EdufinDate && (
                  <div>
                    <span className="inputTextError">
                      Education End date is required.
                    </span>
                  </div>
                )}
                <label
                  htmlFor="emp_EdufinDate"
                  className={
                    errors.emp_EdufinDate
                      ? "inputColorLine input_label_on_error"
                      : label_style
                  }
                >
                  Enter education end date here
                </label>
              </div>
              <div className="form-group  form-inline col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4  mb-3">
                <div className="fo mt-3">
                  <input
                    type="number"
                    min="0"
                    id="emp_CGPA"
                    name="emp_CGPA"
                    placeholder="73"
                    defaultValue={
                      defaultValues &&
                      defaultValues.emp_CGPA &&
                      inputField.emp_CGPA
                    }
                    ref={register({ required: true })}
                    onBlur={lossFocus} // focus out
                    className={errors.emp_CGPA ? "inputColorLine" : emp_style}
                    //value={inputField.emp_CGPA}
                    onChange={(event) => handleInputChange(index, event)}
                  ></input>
                  <label
                    htmlFor="emp_CGPA"
                    className={
                      errors.emp_CGPA
                        ? "inputColorLine input_label_on_error "
                        : label_style
                    }
                  >
                    Enter the score in CGPA or Percentage
                  </label>
                  {errors.emp_CGPA && (
                    <div>
                      <span className="inputTextError">
                        CGPA or Percentage is required.
                      </span>
                    </div>
                  )}
                </div>
                <select
                  id="emp_CGPAselect"
                  name="emp_CGPAselect"
                  defaultValue={
                    defaultValues &&
                    defaultValues.emp_CGPAselect &&
                    inputField.emp_CGPAselect
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.emp_CGPAselect
                      ? "inputColorLine form-control mx-sm-3 mb-2"
                      : "btn empselect mx-sm-3 mb-2"
                  }
                  //value={inputField.emp_CGPAselect}
                  onChange={(event) => handleInputChange(index, event)}
                >
                  <option value="Percentage">Percentage</option>
                  <option value="CGPA">CGPA</option>
                </select>
              </div>
            </div>

            <div className="row mt-4 mb-4 ml-2 mr-2"></div>
          </Fragment>
        ))}
        <div className="row mt-2 mb-2 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <button
              className="btn add_btn"
              type="button"
              onClick={handleAddFields}
            >
              <i className="fas fa-plus"></i> Add Education
            </button>
          </div>
        </div>

        <hr />
        {/*  SECTION  2 BELOW */}
        <div className="row mt-1 mb-1 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="subhead row mt-2 ml-2 mb-2">
            <span className="emphead ml-1">
              <b>Professional Background </b>
            </span>
          </div>
        </div>
        {inputFieldsnew.map((inputField, index) => (
          <Fragment key={`${inputField}~${index}`}>
            <div className="row mt-1 mb-1 ml-2 mr-2 ">
              {" "}
              <br></br>
            </div>
            <div className="row mt-2 mb-2 ml-2 mr-2">
              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-2">
                <input
                  type="text"
                  id="emp_companyName"
                  name="emp_companyName"
                  placeholder="Company name"
                  defaultValue={
                    defaultValues &&
                    defaultValues.emp_companyName &&
                    inputField.emp_companyName
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.emp_companyName ? "inputColorLine" : input_style
                  }
                  //value={inputField.emp_companyName}
                  onChange={(event) => handlenewInputChange(index, event)}
                />

                {errors.emp_companyName && (
                  <div>
                    <span className="inputTextError">
                      Company name is required.
                    </span>
                  </div>
                )}

                <label
                  htmlFor="emp_companyName"
                  className={
                    errors.emp_companyName
                      ? "inputColorLine input_label_on_error"
                      : label_style
                  }
                >
                  Enter the name of the company here
                </label>
              </div>
              {/* */}
              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-2">
                <input
                  type="text"
                  id="emp_designation"
                  name="emp_designation"
                  placeholder="Designation"
                  defaultValue={
                    defaultValues &&
                    defaultValues.emp_designation &&
                    inputField.emp_designation
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.emp_designation ? "inputColorLine" : input_style
                  }
                  //value={inputField.emp_designation}
                  onChange={(event) => handlenewInputChange(index, event)}
                />

                {errors.emp_designation && (
                  <div>
                    <span className="inputTextError">
                      Designation is required.
                    </span>
                  </div>
                )}
                <label
                  htmlFor="emp_designation"
                  className={
                    errors.emp_designation
                      ? "inputColorLine input_label_on_error"
                      : label_style
                  }
                >
                  Enter the designation here
                </label>
              </div>
              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-2">
                <input
                  type="text"
                  id="emp_location"
                  name="emp_location"
                  placeholder="Location"
                  defaultValue={
                    defaultValues &&
                    defaultValues.emp_location &&
                    inputField.emp_location
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.emp_location ? "inputColorLine" : input_style
                  }
                  //value={inputField.emp_location}
                  onChange={(event) => handlenewInputChange(index, event)}
                />

                {errors.emp_location && (
                  <div>
                    <span className="inputTextError">
                      Employee location is required.
                    </span>
                  </div>
                )}
                <label
                  htmlFor="emp_location"
                  className={
                    errors.emp_location
                      ? "inputColorLine input_label_on_error"
                      : label_style
                  }
                >
                  Enter the company's location here
                </label>
              </div>
            </div>
            {/* SEC 2 -ROW 2 BELOW */}

            <div className="row mt-4 mb-4 ml-2 mr-2 ">
              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-4">
                <input
                  type="date"
                  name="emp_profstartDate"
                  placeholder="dd-mm-yyyy"
                  defaultValue={
                    defaultValues &&
                    defaultValues.emp_profstartDate &&
                    inputField.emp_profstartDate
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.emp_profstartDate ? "inputColorLine" : input_style
                  }
                  // value={inputField.emp_profstartDate}
                  onChange={(event) => handlenewInputChange(index, event)}
                />

                {errors.emp_profstartDate && (
                  <div>
                    <span className="inputTextError">
                      Profession Start date is required.
                    </span>
                  </div>
                )}
                <label
                  htmlFor="emp_profstartDate"
                  className={
                    errors.emp_profstartDate
                      ? "inputColorLine input_label_on_error"
                      : label_style
                  }
                >
                  Enter the profession start date here
                </label>
              </div>

              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-4">
                <input
                  type="date"
                  id="emp_profEndDate"
                  name="emp_profEndDate"
                  placeholder="dd-mm-yyyy"
                  defaultValue={
                    defaultValues &&
                    defaultValues.emp_profEndDate &&
                    inputField.emp_profEndDate
                  }
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.emp_profEndDate ? "inputColorLine" : input_style
                  }
                  //value={inputField.emp_profEndDate}
                  onChange={(event) => handlenewInputChange(index, event)}
                />

                {errors.emp_profEndDate && (
                  <div>
                    <span className="inputTextError">
                      {" "}
                      Profession End date is required.
                    </span>
                  </div>
                )}
                <label
                  htmlFor="emp_profEndDate"
                  className={
                    errors.emp_profEndDate
                      ? "inputColorLine input_label_on_error"
                      : label_style
                  }
                >
                  Enter profession end date here
                </label>
              </div>
              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-4"></div>
            </div>

            <div className="row mt-4 mb-4 ml-2 mr-2"></div>
          </Fragment>
        ))}
        <div className="row mt-2 mb-2 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <button
              className="btn add_btn"
              type="button"
              onClick={handleAddnewFields}
            >
              <i className="fas fa-plus"></i> Add Work Experience
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

export default EmpForm3;
