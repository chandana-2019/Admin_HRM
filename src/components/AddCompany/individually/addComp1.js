import React, { useEffect, useState } from "react";
import Uploadimg from "../individually/upload.jpg";
import csc from "country-state-city";
// Import Interfaces`
import { ICountry, IState, ICity } from "country-state-city";

function Form1({ register, errors, defaultValues }) {
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
              type="text"
              name="companyname"
              defaultValue={defaultValues && defaultValues.companyname}
              placeholder="Company Name"
              ref={register({ required: true })}
              onBlur={lossFocus} // focus out
              className={errors.companyname ? "inputColorLine" : input_style}
            />
            {errors.companyname && (
              <div>
                <span className="inputTextError">Company name is required</span>
              </div>
            )}

            <label
              htmlFor="companyname"
              className={
                errors.companyname
                  ? "inputColorLine input_label_on_error"
                  : label_style
              }
            >
              Enter the name of company here.
            </label>
          </div>

          <div className="indus form-group form-inline col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <label
              htmlFor="industry"
              className={
                errors.industry
                  ? "inputColorLine sidelabel_on_error ml-2"
                  : "sidelabel mr-1"
              }
            >
              Industry
            </label>

            <select
              name="industry"
              className="btn empselect ml-4"
              defaultValue={defaultValues && defaultValues.industry}
              ref={register({ required: true })}
            >
              <option value="Industry1">Industry 1</option>
              <option value="Industry2">Industry 2</option>
              <option value="Industry3">Industry 3</option>
            </select>
            {errors.industry && (
              <div>
                <span className="inputTextError">Industry is required</span>
              </div>
            )}
          </div>

          {/* ----------------------------------------------- */}

          <div className="comp form-group form-inline col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <label
              htmlFor="status_comp"
              className={
                errors.status_comp
                  ? "inputColorLine  sidelabel_on_error"
                  : "sidelabel mr-1"
              }
            >
              Company Status
            </label>
            <select
              name="status_comp"
              className="btn empselect ml-4"
              defaultValue={defaultValues && defaultValues.status_comp}
              ref={register({ required: true })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status_comp && (
              <div>
                <span className="inputTextError">
                  Company Status is required
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="row mt-4 mb-4 ml-2 mr-2">
          <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <label htmlFor="comp_logo" className="sidelabel mt-4 mb-4">
              Upload Company Logo
            </label>
            <div className="uploadbox">
              <UploadPreview />
            </div>
          </div>
        </div>
        <div className="row mt-2 mb-2 ml-2 mr-2 ">
          {" "}
          <br></br>
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
            <img className="image mt-3 mb-2" src={Uploadimg} />
          ) : (
            <img className="image mt-3 mb-2" src={this.state.file} />
          )}
        </div>
        {/*
        {this.state.file && (
          <div>
            
            <button onClick={this.resetFile}>Remove File</button>
            
            <i class="fas fa-times" onClick={this.resetFile}>
              Remove
            </i>
          </div>
        )}
*/}
        <label htmlFor="fileupload" className="custom-file-upload mt-3 ml-3">
          Update Logo
        </label>
        <input
          type="file"
          id="fileupload"
          name="fileupload"
          className="fileip form-control mt-4 ml-3 mr-3"
          onChange={this.onChange}
          defaultValue={this.state.file}
        />
      </div>
    );
  }
}

export default Form1;
