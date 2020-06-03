import React from "react";
import IfBackedOf from "./employe_basic_info_backedOff";
import Others from "./employe_basic_info_not_backedoff";

const Employee_basic_Info = (props) => {
  let status = localStorage.getItem("emp_status");
  console.log(status);
  if (status !== "Backedoff") {
    return <Others />;
  } else {
    return <IfBackedOf />;
  }
};
export default Employee_basic_Info;
