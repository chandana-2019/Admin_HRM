import React, { useEffect, useState } from "react";

function EmpForm2({ register, errors, defaultValues }) {
  const [input_style, set_input_style] = useState("ideal_empty_input"); // initial state for input
  const [label_style, set_label_style] = useState("ideal_label_on_empty_input"); // initial state for label
  const [emp_style, set_emp_style] = useState("ideal_test_input"); // custom for Employee input
  useEffect(() => {
    console.log("hi", defaultValues);
  }, []);

  const onInputFocus = () => {
    // on focus In
    set_input_style("on_focus_input_style");
    set_label_style("on_focus_input_label_style");
    set_emp_style("on_focus_testInput_style");
  };

  const lossFocus = (e) => {
    // on focus out
    const v = e.target.value;
    console.log(v);
    if (v !== "") {
      set_input_style("on_loss_focus_input_style");
      set_label_style("on_loss_focus_input_label_style");
      set_emp_style("on_loss_focus_testInput_style");
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
              <b>Employee Position</b>
            </span>
          </div>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <select
              id="emp_Designation"
              name="emp_Designation"
              defaultValue={defaultValues && defaultValues.emp_Designation}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.emp_Designation ? "inputColorLine" : input_style
              }
            >
              <option value="JuniorDesigner">Junior Designer</option>
              <option value="Developer">Developer</option>
              <option value="HR">HR</option>
            </select>
            {errors.emp_Designation && (
              <div>
                <span className="inputTextError">Designation is required</span>
              </div>
            )}
            <label
              htmlFor="emp_Designation"
              className={
                errors.emp_Designation
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's designation here
            </label>
          </div>

          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <select
              id="emp_Dept"
              name="emp_Dept"
              defaultValue={defaultValues && defaultValues.emp_Dept}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_Dept ? "inputColorLine" : input_style}
            >
              <option value="PublicRelations">Public Relations</option>
              <option value="IT">IT</option>
              <option value="Support">Support</option>
            </select>
            <br />
            {errors.emp_Dept && (
              <div>
                <span className="inputTextError">
                  Employee Department is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_Dept"
              className={
                errors.emp_Dept
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's department here
            </label>
          </div>
        </div>
        <div className="row mt-2 mb-2 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-2 ml-3 mr-2">
          <span className="emphead ml-1">
            <b>Employee Salary</b>
          </span>
        </div>

        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group form-inline col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 ">
            {/* insert cureency dropdown here */}

            <select
              className={
                errors.bloodGroup
                  ? "inputColorLine form-control mx-sm-3 mb-2"
                  : "btn empselect mx-sm-3 mb-2"
              }
              name="bloodGroup"
              //defaultValue={defaultValues && defaultValues.bloodGroup}
              ref={register({ required: true })}
            >
              <option value="indian-rupee">{"\u20B9"}</option>
              <option value="DOLLAR SIGN"> {"\u0024"}</option>
              <option value="CENT SIGN">{"\u00A2"}</option>
              <option value="POUND SIGN"> {"\u00A3"}</option>
              <option value="YEN SIGN"> {"\u00A5"}</option>
              <option value="ARMENIAN DRAM SIGN "> {"\u058F"}</option>
              <option value="AFGHANI SIGN"> {"\u060B"}</option>
              <option value="BENGALI RUPEE MARK"> {"\u09F2"}</option>
              <option value="BENGALI RUPEE SIGN -- "> {"\u09F3"}</option>
              <option value=" BENGALI GANDA MARK --"> {"\u09FB"}</option>
              <option value=" GUJARATI RUPEE SIGN -- ">{"\u0AF1"}</option>
              <option value="TAMIL RUPEE SIGN -- "> {"\u0BF9"}</option>
              <option value=" THAI CURRENCY SYMBOL BAHT ">{"\u0E3F"}</option>
              <option value="KHMER CURRENCY SYMBOL RIEL">{"\u17DB"}</option>
              <option value="EURO-CURRENCY SIGN">{"\u20A0"}</option>
              <option value="COLON SIGN">{"\u20A1"}</option>
              <option value="CRUZEIRO SIGN">{"\u20A2"}</option>
              <option value="FRENCH FRANC SIGN">{"\u20A3"}</option>
              <option value="LIRA SIGN ">{"\u20A4"}</option>
              <option value="MILL SIGN">{"\u20A5"}</option>
              <option value=" NAIRA SIGN">{"\u20A6"}</option>
              <option value="PESETA SIGN">{"\u20A7"}</option>
              <option value="RUPEE SIGN">{"\u20A8"}</option>
              <option value=" WON SIGN">{"\u20A9"}</option>
              <option value="NEW SHEQEL SIGN">{"\u20AA"}</option>
              <option value="DONG SIGN">{"\u20AB"}</option>
              <option value="EURO SIGN">{"\u20AC"}</option>
              <option value="KIP SIGN">{"\u20AD"}</option>
              <option value="TUGRIK SIGN">{"\u20AE"}</option>
              <option value="DRACHMA SIGN">{"\u20AF"}</option>
              <option value="GERMAN PENNY SIGN">{"\u20B0"}</option>
              <option value="PESO SIGN"> {"\u20B1"}</option>
              <option value="GUARANI SIGN"> {"\u20B2"}</option>
              <option value="AUSTRAL SIGN">{"\u20B3"}</option>
              <option value="HRYVNIA SIGN ">{"\u20B4"}</option>
              <option value="CEDI SIGN">{"\u20B5"}</option>
              <option value="LIVRE TOURNOIS SIGN">{"\u20B6"}</option>
              <option value="SPESMILO SIGN">{"\u20B7"}</option>
              <option value=" TENGE SIGN ">{"\u20B8"}</option>
              <option value="INDIAN RUPEE SIGN ">{"\u20B9"}</option>
              <option value="TURKISH LIRA SIGN">{"\u20BA"}</option>
              <option value="NORDIC MARK SIGN">{"\u20BB"}</option>
              <option value="MANAT SIGN">{"\u20BC"}</option>
              <option value="RUBLE SIGN">{"\u20BD"}</option>
              <option value="LARI SIGN">{"\u20BE"}</option>
              <option value="BITCOIN SIGN"> {"\u20BF"}</option>
              <option value="NORTH INDIC RUPEE MARK"> {"\uA838"}</option>
              <option value="RIAL SIGN">{"\uFDFC"}</option>
              <option value="SMALL DOLLAR SIGN">{"\uFE69"}</option>
              <option value=" FULLWIDTH DOLLAR SIGN">{"\uFF04"}</option>
              <option value="FULLWIDTH CENT SIGN">{"\uFFE0"}</option>
              <option value="FULLWIDTH POUND SIGN">{"\uFFE1"}</option>
              <option value="FULLWIDTH YEN SIGN">{"\uFFE5"}</option>
              <option value="FULLWIDTH WON SIGN">{"\uFFE6"}</option>
            </select>

            <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
              <input
                type="number"
                min="0"
                id="emp_ctc"
                name="emp_ctc"
                placeholder="70,000"
                defaultValue={defaultValues && defaultValues.emp_ctc}
                ref={register({ required: true })}
                onBlur={lossFocus} // focus out
                className={errors.emp_ctc ? "inputColorLine" : input_style}
              />
              {errors.emp_ctc && (
                <div>
                  <span className="inputTextError">
                    employee monthly ctc is required
                  </span>
                </div>
              )}
            </div>
            <label
              htmlFor="emp_ctc"
              className={
                errors.emp_ctc
                  ? "inputColorLine input_label_on_error mr-2"
                  : label_style
              }
            >
              Enter employee's monthly current cost to company here
            </label>
          </div>
        </div>
        <div className="row mt-1 mb-1 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="subhead row mt-4 mb-4 ml-3 mr-2">
          <span className="emphead ml-1">
            <b>Employee ID</b>
          </span>
        </div>

        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="text"
              id="emp_PAN"
              name="emp_PAN"
              placeholder="PAN"
              defaultValue={defaultValues && defaultValues.emp_PAN}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_PAN ? "inputColorLine" : input_style}
            />
            <br />
            {errors.emp_PAN && (
              <div>
                <span className="inputTextError">PAN is required.</span>
              </div>
            )}
            <label
              htmlFor="emp_PAN"
              className={
                errors.emp_PAN
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's PAN here
            </label>
          </div>

          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              id="emp_UAN"
              name="emp_UAN"
              placeholder="UAN"
              defaultValue={defaultValues && defaultValues.emp_UAN}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_UAN ? "inputColorLine" : input_style}
            />
            {errors.emp_UAN && (
              <div>
                <span className="inputTextError">UAN is required.</span>
              </div>
            )}
            <label
              htmlFor="emp_UAN"
              className={
                errors.emp_UAN
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter the employee's UAN here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="text"
              id="emp_PF"
              name="emp_PF"
              placeholder="PF Number"
              defaultValue={defaultValues && defaultValues.emp_PF}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_PF ? "inputColorLine" : input_style}
            />
            {errors.emp_PF && (
              <div>
                <span className="inputTextError">PF number is required.</span>
              </div>
            )}
            <label
              htmlFor="emp_PF"
              className={
                errors.emp_PF
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter the employee's PF number here
            </label>
          </div>
        </div>

        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="text"
              id="emp_ESI"
              name="emp_ESI"
              placeholder="ESI No"
              defaultValue={defaultValues && defaultValues.emp_ESI}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_ESI ? "inputColorLine" : input_style}
            />
            {errors.emp_ESI && (
              <div>
                <span className="inputTextError">ESI is required.</span>
              </div>
            )}
            <label
              htmlFor="emp_ESI"
              className={
                errors.emp_ESI
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's ESI No here
            </label>
          </div>

          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              id="emp_Aadhaar"
              name="emp_Aadhaar"
              placeholder="Aadhaar Number"
              defaultValue={defaultValues && defaultValues.emp_Aadhaar}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_Aadhaar ? "inputColorLine" : input_style}
            />
            <br />
            {errors.emp_Aadhaar && (
              <div>
                <span className="inputTextError">
                  Aadhaar Number is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_Aadhaar"
              className={
                errors.emp_Aadhaar
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter the employee's Aadhaar Number here
            </label>
          </div>
        </div>

        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="text"
              id="emp_passport"
              name="emp_passport"
              placeholder="Passport Number"
              defaultValue={defaultValues && defaultValues.emp_passport}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_passport ? "inputColorLine" : input_style}
            />
            <br />
            {errors.emp_passport && (
              <div>
                <span className="inputTextError">
                  Passport Number is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_passport"
              className={
                errors.emp_passport
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's passport number here
            </label>
          </div>

          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="date"
              className="text"
              id="emp_Pvalidity"
              name="emp_Pvalidity"
              placeholder="dd-mm-yyyy"
              defaultValue={defaultValues && defaultValues.emp_Pvalidity}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_Pvalidity ? "inputColorLine" : input_style}
            />

            {errors.emp_Pvalidity && (
              <div>
                <span className="inputTextError">
                  Passport validity period is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_Pvalidity"
              className={
                errors.emp_Pvalidity
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Select employee's Passport validity
            </label>
          </div>
        </div>
        <div className="row mt-1 mb-1 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="subhead row mt-4 mb-4 ml-2 mr-2">
            <span className="emphead ml-1">
              <b>Bank Details</b>
            </span>
          </div>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
            <input
              type="text"
              id="emp_BankName"
              name="emp_BankName"
              placeholder="Bank Name"
              defaultValue={defaultValues && defaultValues.emp_BankName}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_BankName ? "inputColorLine" : input_style}
            />
            <br />
            {errors.emp_BankName && (
              <div>
                <span className="inputTextError">Bank Name is required.</span>
              </div>
            )}
            <label
              htmlFor="emp_BankName"
              className={
                errors.emp_BankName
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's Bank here
            </label>
          </div>

          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
            <input
              type="text"
              id="emp_BankBranch"
              name="emp_BankBranch"
              placeholder="Branch Name"
              defaultValue={defaultValues && defaultValues.emp_BankBranch}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.emp_BankBranch ? "inputColorLine" : input_style}
            />
            <br />
            {errors.emp_BankBranch && (
              <div>
                <span className="inputTextError">
                  Bank branch name is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_BankBranch"
              className={
                errors.emp_BankBranch
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's Bank branch here
            </label>
          </div>
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
            <input
              type="number"
              min="0"
              id="emp_BankAccount"
              name="emp_BankAccount"
              placeholder="Bank Account Number"
              defaultValue={defaultValues && defaultValues.emp_BankAccount}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={
                errors.emp_BankAccount ? "inputColorLine" : input_style
              }
            />
            <br />
            {errors.emp_BankAccount && (
              <div>
                <span className="inputTextError">
                  Bank Account Number is required.
                </span>
              </div>
            )}
            <label
              htmlFor="emp_BankAccount"
              className={
                errors.emp_BankAccount
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter employee's Bank Account Number here
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

export default EmpForm2;
