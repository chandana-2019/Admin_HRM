import React from 'react'

function emp_profile_side_btn(props) {
    const button_Data = [{"name":"Basic Information","value":"BasicInfo"},
    {"name":"Designation","value":"Emp_position"},
    {"name":"Salary Information","value":"emp_salary"},
    {"name":"Identity Documents","value":"emp_id"},
    {"name":"Bank Information","value":"bank"},
    {"name":"Educational Background","value":"education"},
    {"name":"Professional Background","value":"probackground"},
    {"name":"Exit Information","value":"exit_info"},
    {"name":"Evaluation","value":"evaluation"},]
    return (
        <div>
                {button_Data.map(item => {
                    const className = props.activeButton === item.value ? "primaryDarkColor_emp_prof" : "white_color_btn_emp_prof";
                    return (
                    <div key={item.value}>
                        <button
                        className={`btn text-left ${className}
                        col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-1"
                        `}
                        value={item.value}
                        
                        onClick={props.trigerOnClickEmpSideBtn}
                        >
                        {item.name}
                        </button>
          </div>
        );
      })}
                
                </div>
      
    )
}

export default emp_profile_side_btn
