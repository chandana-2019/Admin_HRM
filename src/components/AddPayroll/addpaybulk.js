import React from "react";
import ExcelUpload from "../UploadExcel/ExcelReaderForPay";
import excelTemp from "../../Files/PayrollTest.csv";
//import Uploadimg from "../upload.jpg";

function AddPaybulk() {
  const handleBulkpaymonth = (event) => {
    let bulkpaymonthvalue = event.target.value;
    console.log(
      "picked value from dropdown is" + JSON.stringify(bulkpaymonthvalue)
    );
    //picked valueformat is"2023-07"
  };

  return (
    <div className="payadmin_form container-fluid mt-2 mb-2">
      <form className="payadmin ml-4 mr-4">
        <div className="row mt-2 mb-4">
          {/*
          <h5>Payroll > Bulk upload payroll</h5>
          <hr />
            */}
          <div className="row mt-4 mb-4 ml-1">
            <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mr-2 mb-4">
              <label className="on_loss_focus_input_style">Payroll Month</label>

              <div className="form-inline">
                <label className="on_loss_focus_input_label_style mr-2">
                  Select the payroll month you want to update
                </label>
                <input
                  type="month"
                  id="paymonth"
                  name="paymonth"
                  className="btn monthdropdn mx-sm-3"
                  defaultValue="2020-05"
                  onChange={handleBulkpaymonth}
                />
              </div>
            </div>
          </div>
          <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mr-2 mb-4">
            <div className="form-group">Step 1.</div>
            <a
              className="btn primary_light"
              type="button"
              href={excelTemp}
              download
            >
              Download Excel Template
            </a>
          </div>
        </div>

        <div className="form-group">Step 2.</div>
        <ExcelUpload />
        <div>
          <br />
        </div>
      </form>
    </div>
  );
}

export default AddPaybulk;
