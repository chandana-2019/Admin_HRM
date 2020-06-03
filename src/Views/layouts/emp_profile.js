import React,{useState} from 'react'
import Buttons from '../../components/employee.js/emp_profile_side_btn'
import EmpBasicInfo from '../../components/employee.js/employe_info/emp_basic_info'
import EmpPosition from '../../components/employee.js/employe_info/emp_position'
import Salary from '../../components/employee.js/employe_info/Salary'
import Id from '../../components/employee.js/employe_info/Id'
import Bank from '../../components/employee.js/employe_info/Bank'
import EducationalBackground from '../../components/employee.js/employe_info/EducationalBackground'
import ProffBackground from '../../components/employee.js/employe_info/ProffBackground'
import ExitInfo from '../../components/employee.js/employe_info/ExitInfo'
import Evaluation from '../../components/employee.js/employe_info/Evaluation'


const Emp_profile =(props)=> {
    
    const [activeTab, setActiveTab] = useState("BasicInfo");
    const [activeButton, setActiveButton] = useState("BasicInfo");
    const onSideBtnClick=(e)=>{
        setActiveTab(e.target.value)
        setActiveButton(e.target.value);
    } 
    return (
        <div className="container-fluid">
            <h5 className="headingEmploye">Employee Profile</h5>
            <hr />
            <div className="row">
            <div className="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2 mt-1">
            <Buttons
                activeButton={activeButton}
                trigerOnClickEmpSideBtn={onSideBtnClick}
            />
            </div>
                <div className="col-12 col-sm-12 col-md-9 col-lg-0 col-xl-10 mt-1">
                {activeTab === "BasicInfo" && <EmpBasicInfo type="BasicInfo" name="Basic Information"/>}
                {activeTab === "Emp_position" && <EmpPosition type="Emp_position"name="Designation"/>}
                {activeTab === "emp_salary" && <Salary type="emp_salary" name="Salary Information"/>}
                {activeTab === "emp_id" && <Id type ="emp_id" name="Identity Documents"/>}
                {activeTab === "bank" && <Bank type="bank" name="Bank Information"/>}
                {activeTab === "education" && <EducationalBackground type="education"name="Educational Background"/>}
                {activeTab === "probackground" && <ProffBackground type="probackground" name="Professional Background"/>}
                {activeTab === "exit_info" && <ExitInfo type="exit_info" name="Exit Information"/>}
                {activeTab === "evaluation" && <Evaluation type="evaluation" name="Evaluation"/>}

                </div>
            </div>
        </div>
    )
}
export default Emp_profile
