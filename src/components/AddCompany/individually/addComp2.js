import React, { useEffect, useState } from "react";

function Form2({ register, errors, defaultValues }) {
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
        <div className="row mt-2 mb-2 ml-2 mr-2 ">
          {" "}
          <br></br>
        </div>
        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="email"
              name="comp_email"
              defaultValue={defaultValues && defaultValues.comp_email}
              placeholder="Email"
              ref={register({
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              onBlur={lossFocus} // focus out
              className={errors.comp_email ? "inputColorLine" : input_style}
            />
            {errors.comp_email && (
              <div>
                <span className="inputTextError">Email is required</span>
              </div>
            )}
            <label
              htmlFor="comp_email"
              className={
                errors.comp_email
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter the official email address here .
            </label>
          </div>
          {/* ----------------------------------------------- */}

          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="number"
              min="0"
              name="comp_phone"
              defaultValue={defaultValues && defaultValues.comp_phone}
              placeholder="Phone"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.comp_phone ? "inputColorLine" : input_style}
            />
            {/* errors will return when field validation fails  */}
            {errors.comp_phone && (
              <div>
                <span className="inputTextError">Phone is required</span>
              </div>
            )}
            <label
              htmlFor="comp_phone"
              className={
                errors.comp_phone
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter office phone number here.
            </label>
          </div>

          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <input
              type="text"
              name="compWebsite"
              defaultValue={defaultValues && defaultValues.compWebsite}
              placeholder="Website"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.compWebsite ? "inputColorLine" : input_style}
            />
            {errors.compWebsite && (
              <div>
                <span className="inputTextError">Website is required</span>
              </div>
            )}
            <label
              htmlFor="compWebsite"
              className={
                errors.compWebsite
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter link to your company's website here.
            </label>
          </div>
        </div>

        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mr-1 mb-4">
            <input
              type="text"
              name="comp_about"
              defaultValue={defaultValues && defaultValues.comp_about}
              placeholder="About Company"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.comp_about ? "inputColorLine" : input_style}
            />
            {errors.comp_about && (
              <div>
                <span className="inputTextError">
                  Brief note about company is required
                </span>
              </div>
            )}
            <label
              htmlFor="comp_about"
              className={
                errors.comp_about
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter a brief note about your company here
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

export default Form2;
