import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function Testadd() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) =>
    console.log("whole pay form data - ", JSON.stringify(data));
  var room = 1;

  //try this for add eval
  var i = 0;
  var original = document.getElementById("room_fileds");

  const add_fields = (DOMContentLoaded, event) => {
    room++;

    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "room_fileds" + ++i; // there can only be one element with an ID
    original.parentNode.appendChild(clone);
  };

  return (
    <div className="container-fluid mt-2 mb-2">
      {/*
      <input
        type="button"
        id="more_fields"
        onClick={add_fields}
        value="Add More"
      />

      */}

      {/* full form below for testing */}
      <div id="room_fileds">
        <div className="container-fluid mt-2 mb-2">
          <form autoComplete="on">
            <div className="eval row mt-4 mb-4 ml-2 mr-2">
              <div className="subhead row mt-2 ml-2 mb-2">
                <span className="ml-1">
                  <b>Evaluation </b>
                </span>
              </div>
            </div>
            <div className="row mt-4 mb-2 ml-2 mr-2">
              <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <input
                  type="text"
                  id="emp_evalNote"
                  name="emp_evalNote"
                  placeholder="Evaluation Note"
                  //defaultValue={defaultValues && defaultValues.emp_evalNote}
                  ref={register({ required: true })}
                  className="ideal_empty_input"
                />

                <label htmlFor="emp_evalNote" className="ideal_empty_input">
                  Enter employee's evaluation note here
                </label>
              </div>
            </div>
            <div className="row mt-4 mb-4 ml-2 mr-2">
              <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-inline mt-2">
                  <label
                    htmlFor="emp_eval"
                    className="ideal_label_on_empty_input  mr-2"
                  >
                    Evaluation
                  </label>
                  <select
                    className="btn empselect  mr-2 mx-sm-3 mb-2"
                    id="emp_eval"
                    name="emp_eval"
                    //defaultValue={defaultValues && defaultValues.emp_eval}
                    ref={register({ required: true })}
                  >
                    <option>Recommended</option>
                    <option>Blacklisted</option>
                    <option>Average</option>
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
                  //defaultValue={defaultValues && defaultValues.evaluator_name}
                  ref={register({ required: true })}
                  className="ideal_empty_input"
                />

                <label htmlFor="evaluator_name" className="ideal_empty_input">
                  Name of the evaluator
                </label>
              </div>
            </div>
            <div className="old_room_fileds">
              <div className="row mt-4 mb-4 ml-1 mr-2">
                <div className="form-group col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                  <button
                    type="button"
                    className="btn add_btn"
                    onClick={add_fields}
                    value="Add More"
                  >
                    <i className="fas fa-plus"></i> Add Evaluation
                  </button>
                </div>
                <div id="container">
                  <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Testadd;
