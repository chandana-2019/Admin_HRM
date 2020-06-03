import React, { Component } from "react";
import XLSX from "xlsx";
import { make_cols } from "./MakeColumn";
import { SheetJSFT } from "./types";
import { ToastContainer, toast } from "react-toastify";

class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });

    let _validFileExtensions = [".xlsx", ".xlsm", ".xltx", ".xltm", ".csv"];

    if (e.target.type == "file") {
      let sFileName = e.target.value;
      if (sFileName.length > 0) {
        let blnValid = false;
        for (let j = 0; j < _validFileExtensions.length; j++) {
          let sCurExtension = _validFileExtensions[j];
          if (
            sFileName
              .substr(
                sFileName.length - sCurExtension.length,
                sCurExtension.length
              )
              .toLowerCase() == sCurExtension.toLowerCase()
          ) {
            blnValid = true;
            break;
          }
        }

        if (!blnValid) {
          toast.error(
            "Sorry, " +
              sFileName +
              " is invalid, allowed extensions are: " +
              _validFileExtensions.join(", "),
            {
              position: "top-right",
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
          e.target.value = "";
          return false;
        }
      }
    }
    return true;
  }

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]) }, () => {
        console.log(JSON.stringify(this.state.data, null, 2));
      });
    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }

  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />

        <input
          type="file"
          id="file"
          className="form-control"
          accept={SheetJSFT}
          onChange={this.handleChange}
        />

        <br />
        <button className="btn primary_light" onClick={this.handleFile}>
          Bulk Upload Employee
        </button>
      </div>
    );
  }
}

export default ExcelReader;
