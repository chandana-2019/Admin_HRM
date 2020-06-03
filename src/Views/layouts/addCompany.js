import React, { useState, useEffect } from "react";

import AddComp1 from "../../components/AddCompany/individually/addComp1";
import AddComp2 from "../../components/AddCompany/individually/addComp2";
import AddComp3 from "../../components/AddCompany/individually/addComp3";
import { useForm } from "react-hook-form";

function AddCompanyMain() {
  const { register, triggerValidation, errors, getValues } = useForm();
  const [defaultValues, setDefaultValues] = useState({});

  const forms = [
    {
      fields: ["companyname", "industry", "status_comp"], //to support multiple fields form
      component: (register, errors, defaultValues) => (
        <AddComp1
          register={register}
          errors={errors}
          defaultValues={defaultValues}
        />
      ),
    },
    {
      fields: ["comp_email", "comp_phone", "compWebsite", "comp_about"],
      component: (register, errors, defaultValues) => (
        <AddComp2
          register={register}
          errors={errors}
          defaultValues={defaultValues}
        />
      ),
    },
    {
      fields: [
        "comp_address",
        "comp_city",
        "comp_state",
        "comp_country",
        "comp_pin",
      ],
      component: (register, errors, defaultValues) => (
        <AddComp3
          register={register}
          errors={errors}
          defaultValues={defaultValues}
        />
      ),
    },
  ];

  const [currentForm, setCurrentForm] = useState(0);

  const moveToPrevious = () => {
    setDefaultValues((prev) => ({ ...prev, [currentForm]: getValues() }));

    triggerValidation(forms[currentForm].fields).then((valid) => {
      if (valid) setCurrentForm(currentForm - 1);
    });
  };

  const moveToNext = () => {
    console.log(getValues());
    setDefaultValues((prev) => ({ ...prev, [currentForm]: getValues() }));
    triggerValidation(forms[currentForm].fields).then((valid) => {
      if (valid) setCurrentForm(currentForm + 1);
    });
  };

  const prevButton = currentForm !== 0;
  const nextButton = currentForm !== 2;
  const handleSubmit = (e) => {
    const wholeFormData = { ...defaultValues, [currentForm]: getValues() };
    console.log("whole form data - ", JSON.stringify(wholeFormData));
  };
  const updateProgressBar = () => {
    return (100 / 3) * (currentForm + 1);
  };
  console.log(updateProgressBar());
  return (
    <div className="container-fluid ">
      <div className="row mt-4 mb-4 ml-2 mr-2">
        <h5 className="hearder ml-3">Add Company</h5>
      </div>
      <div className="admin_form container-fluid mt-4 mb-4 ">
        <div className="progress mt-4 mb-4 ml-4 mr-4 ">
          <div
            className="progress-bar "
            style={{ width: updateProgressBar() + "%" }}
          >
            {updateProgressBar().toFixed() + "%"}
          </div>
        </div>

        {forms[currentForm].component(
          register,
          errors,
          defaultValues[currentForm]
        )}

        {prevButton && (
          <button
            className="backbt btn mt-2"
            type="button"
            onClick={moveToPrevious}
          >
            Back
          </button>
        )}
        {nextButton && (
          <button
            className="formsubmit btn btn-primary mt-2"
            type="button"
            onClick={moveToNext}
          >
            Next
          </button>
        )}

        {currentForm === 2 && (
          <button
            onClick={handleSubmit}
            className="formsubmit btn btn-primary mt-2"
            type="submit"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default AddCompanyMain;
