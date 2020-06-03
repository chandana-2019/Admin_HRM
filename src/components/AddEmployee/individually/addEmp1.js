import React, { useEffect, useState } from "react";
import UploadEmpImg from "../individually/emp_image.jpg";

function EmpForm1({ register, errors, defaultValues }) {
  const [input_style, set_input_style] = useState("ideal_empty_input"); // initial state for input
  const [label_style, set_label_style] = useState("ideal_label_on_empty_input"); // initial state for label
  const [backedOffStatus, setbackedOffStatus] = useState(false);
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

  const backedOftoggle = (e) => {
    let checked = e.target.checked;
    setbackedOffStatus(checked);
  };

  return (
    <div className="container-fluid mt-2 mb-2">
      <form autoComplete="on">
        <div className="row mt-4 mb-4 ml-2 mr-2 ">
          <span className="emphead ml-1">Basic Information </span>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2 ">
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4  mt-4">
            <label htmlFor="UploadImage" className="sidelabel mr-2 mb-3">
              Upload Employee's Photograph here
            </label>
            <div className="uploadImage">
              <UploadPreview />
            </div>
          </div>

          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <div className="form-group col-12 mt-4 mb-2 ">
              <input
                type="text"
                name="Employee_Name"
                defaultValue={defaultValues && defaultValues.Employee_Name}
                placeholder="Employee Name"
                ref={register({ required: true })}
                onBlur={lossFocus} // focus out
                className={
                  errors.Employee_Name ? "inputColorLine" : input_style
                }
              />

              {errors.Employee_Name && (
                <div>
                  <span className="inputTextError">
                    Employee Name is required.
                  </span>
                </div>
              )}

              <label
                htmlFor="Employee_Name"
                className={
                  errors.Employee_Name
                    ? "inputColorLine input_label_on_error"
                    : label_style
                }
              >
                Enter the name of the employee here
              </label>
            </div>
            <div className="form-group col-12 mt-2 mb-2 ">
              {" "}
              <br></br>
            </div>

            <div className="form-group col-12 mt-2 mb-2 ">
              <input
                type="text"
                name="Employee_DOB"
                // defaultValue={defaultValues && defaultValues.Employee_DOB}
                placeholder="DOB"
                ref={register({ required: true })}
                onBlur={lossFocus} // focus out
                className={errors.Employee_DOB ? "inputColorLine" : input_style}
              />

              {errors.Employee_DOB && (
                <div>
                  <span className="inputTextError">
                    Employee DOB is required.
                  </span>
                </div>
              )}
              <label
                htmlFor="Employee_DOB"
                className={
                  errors.Employee_DOB
                    ? "inputColorLine input_label_on_error"
                    : label_style
                }
              >
                Enter the employee's Date of Birth
              </label>
            </div>
            <div className="form-group col-12 mt-2 mb-2 ">
              {" "}
              <br></br>
            </div>
            <div className="form-group col-12 mt-2 mb-2">
              <div className="form-inline mt-2">
                <label
                  htmlFor="marital_status"
                  className={
                    errors.marital_status
                      ? "inputColorLine sidelabel_on_error mr-2"
                      : "sidelabel mr-2"
                  }
                >
                  Marital Status
                </label>
                <select
                  name="marital_status"
                  className={
                    errors.marital_status
                      ? "inputColorLine form-control mx-sm-3 mb-2"
                      : "btn empselect mx-sm-3 mb-2"
                  }
                  defaultValue={defaultValues && defaultValues.marital_status}
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                >
                  <option value="Married">Married</option>
                  <option value="Single">Single</option>
                  <option value="Separated">Separated</option>
                  <option value="Widowed">Widowed</option>
                </select>
                {errors.marital_status && (
                  <div>
                    <span className="inputTextError">
                      Marital Status is required
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="form-group col-12 mt-2 mb-2 ">
              {" "}
              <br></br>
            </div>
            <div className="form-group col-12 mt-2 mb-2">
              <input
                type="text"
                id="Employee_nationality"
                name="Employee_nationality"
                placeholder="Nationality"
                defaultValue={
                  defaultValues && defaultValues.Employee_nationality
                }
                ref={register({ required: true })}
                onBlur={lossFocus} // focus out
                className={
                  errors.Employee_nationality ? "inputColorLine" : input_style
                }
              />
              {errors.Employee_nationality && (
                <div>
                  <span className="inputTextError">
                    Employee Nationality is required.
                  </span>
                </div>
              )}
              <label
                htmlFor="Employee_nationality"
                className={
                  errors.Employee_nationality
                    ? "inputColorLine input_label_on_error"
                    : "ideal_label_on_empty_input  mr-2"
                }
              >
                Enter the employee's nationality here
              </label>
            </div>
            <div className="form-group col-12 mt-2 mb-2 ">
              {" "}
              <br></br>
            </div>
            <div className="form-group col-12 mt-2 mb-2">
              <select
                className={
                  errors.EmpReligion
                    ? "inputColorLine form-control "
                    : "form-control relgSelect "
                }
                id="EmpReligion"
                name="EmpReligion"
                defaultValue={defaultValues && defaultValues.EmpReligion}
                ref={register({ required: true })}
                onBlur={lossFocus} // focus out
                className={errors.EmpReligion ? "inputColorLine" : input_style}
              >
                <option value="">Religion</option>
                <option value="African Traditional & Diasporic">
                  African Traditional & Diasporic
                </option>
                <option value="Agnostic">Agnostic</option>
                <option value="Atheist">Atheist</option>
                <option value="Baha'i">Baha'i</option>
                <option value="Buddhism">Buddhism</option>
                <option value="Cao Dai">Cao Dai</option>
                <option value="Chinese traditional religion">
                  Chinese traditional religion
                </option>
                <option value="Christianity">Christianity</option>
                <option value="Hinduism">Hinduism</option>
                <option value="Islam">Islam</option>
                <option value="Jainism">Jainism</option>
                <option value="Juche">Juche</option>
                <option value="Judaism">Judaism</option>
                <option value="Neo-Paganism">Neo-Paganism</option>
                <option value="Nonreligious">Nonreligious</option>
                <option value="Rastafarianism">Rastafarianism</option>
                <option value="Secular">Secular</option>
                <option value="Shinto">Shinto</option>
                <option value="Sikhism">Sikhism</option>
                <option value="Spiritism">Spiritism</option>
                <option value="Tenrikyo">Tenrikyo</option>
                <option value="Unitarian-Universalism">
                  Unitarian-Universalism
                </option>
                <option value="Zoroastrianism">Zoroastrianism</option>
                <option value="primal-indigenous">primal-indigenous</option>
                <option value="Other">Other</option>
              </select>
              {errors.EmpReligion && (
                <div>
                  <span className="inputTextError">
                    Employee Religion is required.
                  </span>
                </div>
              )}
              <label
                htmlFor="religion_opt"
                className={
                  errors.religion_opt
                    ? "inputColorLine input_label_on_error mt-2 mr-4"
                    : "ideal_label_on_empty_input  mr-2"
                }
              >
                Enter the employee's religion here.
              </label>
            </div>
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <div className="form-group col-12 mt-4 mb-2">
              <input
                type="text"
                name="emp_no"
                defaultValue={defaultValues && defaultValues.emp_no}
                placeholder="Employee Number "
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
                Enter the employee number here
              </label>
            </div>
            <div className="form-group col-12 mt-2 mb-2 ">
              {" "}
              <br></br>
            </div>
            <div className="form-group col-12 mt-2 mb-2">
              <div className="form-inline mt-2">
                <label
                  htmlFor="bloodGroup"
                  className={
                    errors.bloodGroup
                      ? "inputColorLine sidelabel_on_error mr-2 "
                      : "sidelabel mr-2"
                  }
                >
                  Select Blood Group:
                </label>
                <select
                  className={
                    errors.bloodGroup
                      ? "inputColorLine form-control mx-sm-3 mb-2"
                      : "btn empselect  mr-2 mx-sm-3 mb-2"
                  }
                  name="bloodGroup"
                  defaultValue={defaultValues && defaultValues.bloodGroup}
                  ref={register({ required: true })}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
            <div className="form-group col-12 mt-2 mb-2 ">
              {" "}
              <br></br>
            </div>
            <div className="form-group col-12 mt-2 mb-2">
              <div className="form-inline mt-2">
                <label
                  htmlFor="Gender"
                  className={
                    errors.emp_gender
                      ? "inputColorLine sidelabel_on_error mr-2 "
                      : "sidelabel mr-2"
                  }
                >
                  Gender
                </label>
                <select
                  className={
                    errors.emp_gender
                      ? "inputColorLine form-control mx-sm-3 mb-2"
                      : "btn empselect   mx-sm-3 mb-2"
                  }
                  name="emp_gender"
                  defaultValue={defaultValues && defaultValues.emp_gender}
                  ref={register({ required: true })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="form-group col-12 mt-2 mb-2 ">
              {" "}
              <br></br>
            </div>
            <div className="form-group col-12 mt-2 mb-2">
              <div className="form-inline mt-2">
                <label
                  htmlFor="Residential_status"
                  className={
                    errors.Residential_status
                      ? "inputColorLine sidelabel_on_error mr-2 "
                      : "sidelabel mr-2"
                  }
                >
                  Residential Status
                </label>
                <select
                  name="Residential_status"
                  defaultValue={
                    defaultValues && defaultValues.Residential_status
                  }
                  ref={register({ required: true })}
                  className={
                    errors.Residential_status
                      ? "inputColorLine form-control mx-sm-3 mb-2"
                      : "btn empselect   mx-sm-3 mb-2"
                  }
                >
                  <option value="Non-Resident">Non-Resident</option>
                  <option value="Resident">Resident</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------- */}

        <hr />
        <div className="row ml-2 mr-2 mt-4 mb-4"></div>
        <div className="row ml-2 mr-2 mt-6 mb-6">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <label
              htmlFor="backedOffStatus "
              className={
                errors.backedOffStatus
                  ? "inputColorLine sidelabel_on_error mt-2 mr-4"
                  : "sidelabel mr-2"
              }
            >
              Current Employee Status
            </label>

            <button type="button" className="btn btn-light ml-3">
              <span className="mr-3">Backed off</span>
              <label className="switch">
                <input
                  type="checkbox"
                  name="backedOffStatus"
                  //defaultChecked={false}
                  defaultValue={defaultValues && defaultValues.backedOffStatus}
                  onClick={backedOftoggle}
                  ref={register({ required: true })}
                  onBlur={lossFocus} // focus out
                  className={
                    errors.backedOffStatus ? "inputColorLine" : input_style
                  }
                ></input>
                <span className="slider round"></span>
              </label>
            </button>
          </div>

          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="date"
              name="emp_toj"
              defaultValue={defaultValues && defaultValues.emp_toj}
              placeholder="Tentative Date of Joining"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_toj ? "inputColorLine" : input_style}
            />
            {errors.emp_toj && (
              <div>
                <span className="inputTextError">
                  Tentative date of joining is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_toj"
              className={
                errors.emp_toj
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Please select the tentative date of joining .
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="date"
              id="emp_doj"
              name="emp_doj"
              defaultValue={defaultValues && defaultValues.emp_doj}
              placeholder="Date of Joining"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_doj ? "inputColorLine" : input_style}
            />
            {errors.emp_doj && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Date of Joining is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_doj"
              className={
                errors.emp_doj
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Please select the date of joining .
            </label>
          </div>
        </div>
        <div className="row ml-2 mr-2 mt-6 mb-6">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4  mt-4 mb-4">
            <input
              type="number"
              min="0"
              name="emp_probation"
              defaultValue={defaultValues && defaultValues.emp_probation}
              placeholder="Probation Period"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_probation ? "inputColorLine" : input_style}
            />

            {errors.emp_probation && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Probation period is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_probation"
              className={
                errors.emp_probation
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter your probation period in days.
            </label>
          </div>

          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-4 mb-4">
            <input
              type="date"
              name="emp_confDate"
              defaultValue={defaultValues && defaultValues.emp_confDate}
              placeholder="Confirmation Date"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_confDate ? "inputColorLine" : input_style}
            />

            {errors.emp_confDate && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Confirmation Date is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_confDate"
              className={
                errors.emp_confDate
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Please select the Confirmation date .
            </label>
          </div>
        </div>

        <div className="row ml-2 mr-2  mt-4  mb-4">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4  mt-4">
            <input
              type="tel"
              id="Emp_personal_mobNo"
              name="Emp_personal_mobNo"
              defaultValue={defaultValues && defaultValues.Emp_personal_mobNo}
              placeholder="Personal Mobile Number"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_personal_mobNo ? "inputColorLine" : input_style
              }
            />

            {errors.Emp_personal_mobNo && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Personal Mobile Number is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_personal_mobNo"
              className={
                errors.Emp_personal_mobNo
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter the employee's personal mobile number here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4  mt-4">
            <input
              type="email"
              id="Emp_personal_email_ID"
              name="Emp_personal_email_ID"
              defaultValue={
                defaultValues && defaultValues.Emp_personal_email_ID
              }
              placeholder="Personal Email Address"
              ref={register({
                required: "Personal Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_personal_email_ID ? "inputColorLine" : input_style
              }
            />

            {errors.Emp_personal_email_ID && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Personal Email Address is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Employee_personal_email_ID"
              className={
                errors.Employee_personal_email_ID
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's personal email address here
            </label>
          </div>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2 ">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-2">
            <input
              type="email"
              name="Emp_ofl_emailID"
              defaultValue={defaultValues && defaultValues.Emp_ofl_emailID}
              placeholder="Official Email ID"
              ref={register({
                required: "Official Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_ofl_emailID ? "inputColorLine" : input_style
              }
            />
            {errors.Emp_ofl_emailID && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Official Email ID is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_ofl_emailID"
              className={
                errors.Emp_ofl_emailID
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter the employee's official email ID here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-2">
            <input
              type="number"
              min="0"
              name="Emp_ofl_mobNo"
              placeholder="Official Mobile Number"
              defaultValue={defaultValues && defaultValues.Emp_ofl_mobNo}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.Emp_ofl_mobNo ? "inputColorLine" : input_style}
            />
            {errors.Emp_ofl_mobNo && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Official Mobile Number is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_ofl_mobNo"
              className={
                errors.Emp_ofl_mobNo
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's official mobile number here
            </label>
          </div>
        </div>
        <div className="row mt-2 mb-2 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2 ">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="emergency_contactNo"
              placeholder="Emergency Contact Number"
              defaultValue={defaultValues && defaultValues.emergency_contactNo}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.emergency_contactNo ? "inputColorLine" : input_style
              }
            />

            {errors.emergency_contactNo && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Emergency Contact Number is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emergency_contactNo"
              className={
                errors.emergency_contactNo
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter the employee's emergency contact number here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="text"
              name="EmergencyContactName"
              defaultValue={defaultValues && defaultValues.EmergencyContactName}
              placeholder="Emergency Contact Name"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.EmergencyContactName ? "inputColorLine" : input_style
              }
            />

            {errors.EmergencyContactName && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Emergency Contact Name is required.
                </span>
              </div>
            )}
            <label
              htmlFor="EmergencyContactName"
              className={
                errors.EmergencyContactName
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's emergency contact name here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="text"
              name="EmergencyContactRelation"
              defaultValue={
                defaultValues && defaultValues.EmergencyContactRelation
              }
              placeholder="Emergency Contact Relation"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.EmergencyContactRelation ? "inputColorLine" : input_style
              }
            />
            {errors.EmergencyContactRelation && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Emergency Contact Relation is required.
                </span>
              </div>
            )}
            <label
              htmlFor="EmergencyContactRelation"
              className={
                errors.EmergencyContactRelation
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's relationship with the emergency contact here
            </label>
          </div>
          <div className="row mt-1 mb-1 ml-2 mr-2 ">
            {" "}
            <br></br>
          </div>
          <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ml-2 mr-3  mt-4 mb-4">
            <input
              type="text"
              name="EmergencyContactAddress"
              defaultValue={
                defaultValues && defaultValues.EmergencyContactAddress
              }
              placeholder="Emergency Contact Address "
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.EmergencyContactAddress ? "inputColorLine" : input_style
              }
            />
            {errors.EmergencyContactAddress && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Emergency Contact Address is required.
                </span>
              </div>
            )}
            <label
              htmlFor="EmergencyContactAddress"
              className={
                errors.EmergencyContactAddress
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter the employee's emergency contact address here
            </label>
          </div>
        </div>
        <div className="row mt-2 mb-2 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        {/* --------------------------------------fatherand  spouse info-------------------------------- */}

        <hr />
        <div className="row mt-2 mb-2 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2 ">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4  mt-4 mb-4">
            <input
              type="text"
              name="Emp_fatherName"
              placeholder="Father's Name"
              defaultValue={defaultValues && defaultValues.Emp_fatherName}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.Emp_fatherName ? "inputColorLine" : input_style}
            />

            {errors.Emp_fatherName && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Father's Name is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_fatherName"
              className={
                errors.Emp_fatherName
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's Father's Name here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4  mt-4 mb-4">
            <input
              type="text"
              name="Emp_SpouseName"
              defaultValue={defaultValues && defaultValues.Emp_SpouseName}
              placeholder="Spouse Name"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.Emp_SpouseName ? "inputColorLine" : input_style}
            />

            {errors.Emp_SpouseName && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Spouse Name is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_SpouseName"
              className={
                errors.Emp_SpouseName
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's Spouse's name ,if married.
            </label>
          </div>
        </div>
        <div className="row mt-2 mb-2 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <hr />
        <div className="row mt-4 mb-4 ml-2 mr-2 "></div>

        {/* ======================================   residence  ====================================== */}

        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 mt-2 mb-2">
            <input
              type="text"
              name="Emp_ResidentAddress"
              defaultValue={defaultValues && defaultValues.Emp_ResidentAddress}
              placeholder="Resident Address"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_ResidentAddress ? "inputColorLine" : input_style
              }
            />
            {errors.Emp_ResidentAddress && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Resident Address is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_ResidentAddress"
              className={
                errors.Emp_ResidentAddress
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's resident address here.
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-2 mb-2">
            <input
              type="number"
              min="0"
              name="Emp_ResidentPIN"
              defaultValue={defaultValues && defaultValues.Emp_ResidentPIN}
              placeholder="Resident PIN Code"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_ResidentPIN ? "inputColorLine" : input_style
              }
            />
            {errors.Emp_ResidentPIN && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Resident PIN Code is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_ResidentPIN"
              className={
                errors.Emp_ResidentPIN
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's resident PIN.
            </label>
          </div>
        </div>

        <div className="row mt-4 mb-6 ml-2 mr-2 ">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-2 mb-6">
            <input
              type="text"
              id="Emp_ResidentCity"
              name="Emp_ResidentCity"
              placeholder="Resident City"
              defaultValue={defaultValues && defaultValues.Emp_ResidentCity}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_ResidentCity ? "inputColorLine" : input_style
              }
            />

            {errors.Emp_ResidentCity && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Resident City is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_ResidentCity"
              className={
                errors.Emp_ResidentCity
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's resident city here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-2 mb-6">
            <input
              type="text"
              id="Emp_ResidentState"
              name="Emp_ResidentState"
              placeholder="Resident State"
              defaultValue={defaultValues && defaultValues.Emp_ResidentState}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_ResidentState ? "inputColorLine" : input_style
              }
            />

            {errors.Emp_ResidentState && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Resident State is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_ResidentState"
              className={
                errors.Emp_ResidentState
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's resident state here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-2 mb-6">
            <input
              type="text"
              id="Emp_ResidentCountry"
              name="Emp_ResidentCountry"
              placeholder=" Resident Country"
              defaultValue={defaultValues && defaultValues.Emp_ResidentCountry}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_ResidentCountry ? "inputColorLine" : input_style
              }
            />

            {errors.Emp_ResidentCountry && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Resident Country is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Employee_ResidentCountry"
              className={
                errors.Employee_ResidentCountry
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's resident country here
            </label>
          </div>
        </div>
        <div className="row mt-2 mb-2 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2 ">
          <div className="form-group col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 mt-4 mb-4">
            <input
              type="text"
              name="Emp_PermanentAddress"
              defaultValue={defaultValues && defaultValues.Emp_PermanentAddress}
              placeholder="Permanent Address"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_PermanentAddress ? "inputColorLine" : input_style
              }
            />
            {errors.Emp_PermanentAddress && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Permanent Address is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_PermanentAddress"
              className={
                errors.Emp_PermanentAddress
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's permanent address here.
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-4 mb-4">
            <input
              type="number"
              min="0"
              name="Emp_PermanentPIN"
              defaultValue={defaultValues && defaultValues.Emp_PermanentPIN}
              placeholder="Permanent PIN Code"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_PermanentPIN ? "inputColorLine" : input_style
              }
            />
            {errors.Emp_PermanentPIN && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Permanent PIN Code is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_PermanentPIN"
              className={
                errors.Emp_PermanentPIN
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's permanent PIN
            </label>
          </div>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2 ">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-2 mb-4">
            <input
              type="text"
              id="Emp_PermanentCity"
              name="Emp_PermanentCity"
              placeholder="Permanent City"
              defaultValue={defaultValues && defaultValues.Emp_PermanentCity}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_PermanentCity ? "inputColorLine" : input_style
              }
            />

            {errors.Emp_PermanentCity && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Permanent City is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_PermanentCity"
              className={
                errors.Emp_PermanentCity
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's permanent city here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-2 mb-4">
            <input
              type="text"
              id="Emp_PermanentState"
              name="Emp_PermanentState"
              placeholder="Permanent State "
              defaultValue={defaultValues && defaultValues.Emp_PermanentState}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_PermanentState ? "inputColorLine" : input_style
              }
            />

            {errors.Emp_PermanentState && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Permanent State is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_PermanentState"
              className={
                errors.Emp_PermanentState
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's permanent state here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-2 mb-4">
            <input
              type="text"
              id="Emp_PermanentCountry"
              name="Emp_PermanentCountry"
              placeholder="Permanent Country"
              defaultValue={defaultValues && defaultValues.Emp_PermanentCountry}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.Emp_PermanentCountry ? "inputColorLine" : input_style
              }
            />
            {errors.Emp_PermanentCountry && (
              <div>
                <span className="inputTextError">
                  {" "}
                  Permanent Country is required.
                </span>
              </div>
            )}
            <label
              htmlFor="Emp_PermanentCountry"
              className={
                errors.Emp_PermanentCountry
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's permanent country here
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
class UploadPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = { file: null };
    this.onChange = this.onChange.bind(this);
    this.resetFile = this.resetFile.bind(this);
  }
  onChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  }

  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }
  render() {
    return (
      <div>
        <div>
          {this.state.file == null ? (
            <img
              className="image uploadDummyImageinset mt-3 mb-2"
              src={UploadEmpImg}
            />
          ) : (
            <img
              className="image uploadDummyImageinset mt-3 mb-2"
              src={this.state.file}
            />
          )}
        </div>
        {/*
        {this.state.file && (
          <div>
            <button onClick={this.resetFile}>Remove File</button>
          </div>
        )}
        */}
        <label
          htmlFor="fileupload"
          className="custom-file-uploadImage mt-2 ml-3"
        >
          Upload Image
        </label>
        <input
          type="file"
          id="fileupload"
          className="fileip form-control mt-4 ml-3 mr-3"
          placeholder="Update Excel here"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default EmpForm1;
