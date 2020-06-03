import React, { useEffect, useState } from "react";

function Form3({ register, errors, defaultValues }) {
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
    <div className="container-fluid mt-4 mb-4">
      <form autoComplete="on">
        <div className="row mt-2 mb-2 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mr-2 mb-4">
            <input
              type="text"
              name="comp_address"
              defaultValue={defaultValues && defaultValues.comp_address}
              placeholder="Address"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.comp_address ? "inputColorLine" : input_style}
            />
            {errors.comp_address && (
              <div>
                <span className="inputTextError">
                  Company's address is required
                </span>
              </div>
            )}
            <label
              htmlFor="comp_address"
              className={
                errors.comp_address
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter your company's address here.
            </label>
          </div>
        </div>

        {/* ----------------------------------------------- */}
        <div className="row mt-4 mb-4 ml-2 mr-2 ">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="text"
              id="comp_city"
              name="comp_city"
              placeholder="City"
              defaultValue={defaultValues && defaultValues.comp_city}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.comp_city ? "inputColorLine" : input_style}
            />

            {errors.comp_city && (
              <div>
                <span className="inputTextError">
                  City of company is required
                </span>
              </div>
            )}
            <label
              htmlFor="comp_city"
              className={
                errors.comp_city
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter the city your company's located here.
            </label>
          </div>

          <div className="comp form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 ml-4">
            <input
              type="text"
              id="comp_state"
              name="comp_state"
              placeholder="State"
              defaultValue={defaultValues && defaultValues.comp_state}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.comp_state ? "inputColorLine" : input_style}
            />
            {errors.comp_state && (
              <div>
                <span className="inputTextError">State is required.</span>
              </div>
            )}
            <label
              htmlFor="comp_state"
              className={
                errors.comp_state
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter the State your company's located here.
            </label>
          </div>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2 "></div>
        <div className="row mt-6 mb-6 ml-2 mr-2 ">
          <div className="form-group  col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="text"
              id="comp_country"
              name="comp_country"
              placeholder="Country"
              defaultValue={defaultValues && defaultValues.comp_country}
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.comp_country ? "inputColorLine" : input_style}
            />

            {errors.comp_country && (
              <div>
                <span className="inputTextError"> Country is required.</span>
              </div>
            )}
            <label
              htmlFor="comp_country"
              className={
                errors.comp_country
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter the Country your company's located here.
            </label>
          </div>

          <div className="form-group  col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 ml-4">
            <input
              type="number"
              pattern="[0-9]*"
              min="0"
              name="comp_pin"
              defaultValue={defaultValues && defaultValues.comp_pin}
              placeholder="PIN Code"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.comp_pin ? "inputColorLine" : input_style}
            />

            {/* errors will return when field validation fails  */}
            {errors.comp_pin && (
              <div>
                <span className="inputTextError">PIN code is required.</span>
              </div>
            )}
            <label
              htmlFor="comp_pin"
              className={
                errors.comp_pin
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter your PIN code here.
            </label>
          </div>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
      </form>
    </div>
  );
}

export default Form3;
