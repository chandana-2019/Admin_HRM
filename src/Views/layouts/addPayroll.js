import React, { useState } from "react";
import Addpay1 from "../../components/AddPayroll/individually/addPay1";

import { useForm } from "react-hook-form";

function AddPayroll() {
  const { register, triggerValidation, errors, getValues } = useForm();
  const [defaultValues, setDefaultValues] = useState({});

  const forms = [
    {
      fields: [
        "paymonth",
        "emp_no",
        "emp_name",
        "EmployeeStatus",
        "ActualWorkDays",
        "BillableNodays",
        "payctc",
        "payEarnedFixed",
        "payEarnedVariables",
        "payGrossSalary",
        "payDeductions",
        "payNetSalary",
        "payAadhaarCard",
        "payUAN",
      ], //to support multiple fields form
      component: (register, errors, defaultValues) => (
        <Addpay1
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
  const nextButton = currentForm !== 1;
  const handleSubmit = (e) => {
    const wholeFormData = { ...defaultValues, [currentForm]: getValues() };
    console.log("whole form data - ", JSON.stringify(wholeFormData));
  };

  return (
    <div>
      {forms[currentForm].component(
        register,
        errors,
        defaultValues[currentForm]
      )}

      {prevButton && (
        <button
          className="btn btn-primary mt-2"
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

      {currentForm === 1 && (
        <button
          onClick={handleSubmit}
          className="formsubmit btn btn-primary mt-2"
          type="submit"
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default AddPayroll;
