import React, { useState } from "react";
import Addemp1 from "../../components/AddEmployee/individually/addEmp1";
import Addemp2 from "../../components/AddEmployee/individually/addEmp2";
import Addemp3 from "../../components/AddEmployee/individually/addEmp3";
import Addemp4 from "../../components/AddEmployee/individually/addEmp4";
import Addemp5 from "../../components/AddEmployee/individually/addEmp5";
import { useForm } from "react-hook-form";

function AddEmployee() {
  const { register, triggerValidation, errors, getValues } = useForm();
  const [defaultValues, setDefaultValues] = useState({});

  const forms = [
    {
      fields: [
        "Employee_Name",
        "Employee_DOB",
        "marital_status",
        "Employee_nationality",
        "EmpReligion",

        "emp_no",
        "bloodGroup",
        "emp_gender",
        "Residential_status",
        "backedOffStatus",
        "emp_toj",
        "emp_doj",
        "emp_probation",
        "emp_confDate",
        "Emp_personal_mobNo",
        "Emp_personal_email_ID",
        "Emp_ofl_emailID",
        "Emp_ofl_mobNo",
        "emergency_contactNo",
        "EmergencyContactName",
        "EmergencyContactRelation",
        "EmergencyContactAddress",
        "Emp_fatherName",
        "Emp_SpouseName",
        "Emp_ResidentAddress",
        "Emp_ResidentPIN",
        "Emp_ResidentCity",
        "Emp_ResidentState",
        "Emp_ResidentCountry",
        "Emp_PermanentAddress",
        "Emp_PermanentPIN",
        "Emp_PermanentCity",
        "Emp_PermanentState",
        "Emp_PermanentCountry",
      ], //to support multiple fields form
      component: (register, errors, defaultValues) => (
        <Addemp1
          register={register}
          errors={errors}
          defaultValues={defaultValues}
        />
      ),
    },
    {
      fields: [
        "emp_Designation",
        "emp_Dept",
        "emp_ctc",
        "emp_PAN",
        "emp_UAN",
        "emp_PF",
        "emp_ESI",
        "emp_Aadhaar",
        "emp_passport",
        "emp_Pvalidity",
        "emp_BankName",
        "emp_BankBranch",
        "emp_BankAccount",
      ],
      component: (register, errors, defaultValues) => (
        <Addemp2
          register={register}
          errors={errors}
          defaultValues={defaultValues}
        />
      ),
    },
    {
      fields: [
        "Emp_Qualification",
        "emp_Specialisation",
        "emp_institute",
        "emp_EdustartDate",
        "emp_EdufinDate",
        "emp_CGPA",
        "emp_CGPAselect",
        "emp_companyName",
        "emp_designation",
        "emp_location",
        "emp_profstartDate",
        "emp_profEndDate",
      ],
      component: (register, errors, defaultValues) => (
        <Addemp3
          register={register}
          errors={errors}
          defaultValues={defaultValues}
        />
      ),
    },
    {
      fields: ["emp_tDOE", "emp_DOE", "emp_ExitReason"],
      component: (register, errors, defaultValues) => (
        <Addemp4
          register={register}
          errors={errors}
          defaultValues={defaultValues}
        />
      ),
    },
    {
      fields: ["emp_evalNote", "emp_eval", "evaluator_name"],
      component: (register, errors, defaultValues) => (
        <Addemp5
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
  const nextButton = currentForm !== 4;
  const handleSubmit = (e) => {
    const wholeFormData = { ...defaultValues, [currentForm]: getValues() };
    console.log("whole form data - ", JSON.stringify(wholeFormData));
  };
  const updateProgressBar = () => {
    return (100 / 5) * (currentForm + 1);
  };
  console.log(updateProgressBar());
  return (
    <div className="admin_form container-fluid  ml-2 mr-4 mt-4 mb-4 ">
      <div className="progress ml-4 mr-4 mt-4 mb-6 ">
        <div
          className="progress-bar"
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
          className="backbt btn  mt-2"
          type="button"
          onClick={moveToPrevious}
        >
          Back
        </button>
      )}
      {nextButton && (
        <button
          className="formsubmit btn  mt-2"
          type="button"
          onClick={moveToNext}
        >
          Next
        </button>
      )}

      {currentForm === 4 && (
        <button
          onClick={handleSubmit}
          className="formsubmit btn  mt-2"
          type="submit"
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default AddEmployee;
