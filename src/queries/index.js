import gql from "graphql-tag";

export const LOCATION_GRAPH = gql`
  query {
    getAllEmpLocation {
      emp_location
      emp_location_count
    }
  }
`;
export const RELEGION_GRAPH = gql`
  query {
    getAllEmpReligionGroup {
      emp_religion
      emp_religion_count
    }
  }
`;
export const GENDER_GRAPH = gql`
  query {
    getAllEmpGenderCount {
      emp_gender
      emp_gender_count
    }
  }
`;

export const AGE_GRAPH = gql`
  query {
    getAllEmpAgeRange {
      age
      total_emp
    }
  }
`;
export const DEPT_DESIG = gql`
  query {
    getAllDeptsAndDesignations {
      departments {
        id
        department
      }
      designations {
        id
        designation
      }
    }
  }
`;

export const MANPOWER_CURR_PREV_MONTH_COUNT = gql`
  query {
    getCurPrevMonthEmps {
      current_month {
        total_employes
        ariving
        exiting
        current_month
      }
      previous_month {
        total_employes
        arrived
        exited
        previous_month
      }
    }
  }
`;

export const MANPOWER_GRAPH_MONTH = gql`
  query {
    getDashboardManpowerActiveCount {
      total_count
      mon_year
    }
  }
`;

export const SALARY_GRAPH1 = gql`
  query {
    getDashboardSalaryActiveCount {
      total_count
      mon_year
      total_ctc
      total_gross_salary
      total_salary_variation
    }
  }
`;

export const MANPOWER_DEPT_VS_COUNT = gql`
  query getAllDeptOrPositions($month: String!, $year: Int!) {
    getAllActiveDeptEmpsByMonthYear(month: $month, year: $year) {
      dept_name
      total_emp_count
    }
  }
`;
export const MANPOWER_OVERBOARD_ON_DATE_CHANGE = gql`
  query getDynamicManpowerOverBoarddata($month1: String!, $year1: Int!) {
    getDynamicManpowerOverBoarddata(month: $month1, year: $year1) {
      current_mon {
        carrived
        cexited
        ctotal
        cmon_year
      }
      previous_mon {
        parrived
        pexited
        ptotal
        pmon_year
      }
    }
  }
`;

export const MANPOWER_OVERBOARD_ON_CLICK = gql`
  query getOverBoardEmpBasedOnMonthYearStatus(
    $month: String!
    $year: Int!
    $status: String!
  ) {
    getOverBoardEmpBasedOnMonthYearStatus(
      month: $month
      year: $year
      status: $status
    ) {
      emp_id
      emp_status
      emp_name
      emp_department
      emp_position
      emp_gender
      emp_tentative_doj
      emp_doj
      emp_tentative_doe
      emp_doe
    }
  }
`;

export const MANPOWER_DEPARTMENT_EMPLOYE = gql`
  query getOverBoardEmpBasedOnDeptMonthYearStatus(
    $month: String!
    $year: Int!
    $dept: String!
  ) {
    getOverBoardEmpBasedOnDeptMonthYearStatus(
      month: $month
      year: $year
      dept: $dept
    ) {
      emp_id
      emp_status
      emp_name
      emp_department
      emp_position
      emp_gender
      emp_tentative_doj
      emp_doj
      emp_tentative_doe
      emp_doe
    }
  }
`;

export const SALARY_OVERBOARD_FIRRST_LOAD = gql`
  query {
    getCurandPreMonthSalaryStatusOverBoard {
      current_month {
        gross
        ctc
        variation
        mon_year
      }
      previous_month {
        gross
        ctc
        variation
        mon_year
      }
    }
  }
`;
export const SALARY_GRAPH_ONCLICK_DEPARTMENT = gql`
  query getActiveDeptEmpAndSalaryDetailsBasedOnMonYear(
    $month: String!
    $year: Int!
  ) {
    getActiveDeptEmpAndSalaryDetailsBasedOnMonYear(month: $month, year: $year) {
      dept_name
      count
      ctc
      gross
      variation
    }
  }
`;

export const SALARY_GRAPH2 = gql`
  query {
    getDashSalaryGraphTwoActiveMinMaxAvgCount {
      min_salary
      max_salary
      avg_salary
      total_count
      mon_year
    }
  }
`;

export const SALARY_GRAPH2_DEPT = gql`
  query getDashSalaryGraphTwoByMonYear($month: String!, $year: Int!) {
    getDashSalaryGraphTwoByMonYear(month: $month, year: $year) {
      emp_department
      min_salary
      max_salary
      avg_salary
      total_count
    }
  }
`;

export const SALARY_GRAPH1_2_DEPT_WISE_POPUP = gql`
  query getSalaryGgraphPopUpByMonYearDept(
    $month: String!
    $year: Int!
    $dept: String!
  ) {
    getSalaryGgraphPopUpByMonYearDept(month: $month, year: $year, dept: $dept) {
      emp_id
      emp_status
      emp_name
      emp_department
      emp_position
      emp_ctc
      emp_gross_salary
    }
  }
`;

export const SALARY_GRAPG1_OVERBOARD_ON_CLICK_CHANGE = gql`
  query getDynamicSalaryOverBoardByMonthYear($month1: String!, $year1: Int!) {
    getDynamicSalaryOverBoardByMonthYear(month: $month1, year: $year1) {
      current_mon {
        cctc
        cgross
        cvariation
        cmon_year
      }
      previous_mon {
        pctc
        pgross
        pvariation
        pmon_year
      }
    }
  }
`;

//  -----------------------------------------------   Employee queries      --------------------------------------------

export const GET_EMPLOYEE_DATA = gql`
  query getEmpDetailsByEmpStatus($status: String!) {
    getEmpDetailsByEmpStatus(status: $status) {
      emp_id
      emp_status
      Evaluation
      emp_photo
      emp_name
      emp_number
      Department
      Position
      emp_tentative_doj
      emp_doj
      emp_tentative_doe
      emp_doe
      emp_official_email
      emp_official_mobile
      emp_ctc
      emp_age
      emp_permanent_state
      Religion
      Gender
      emp_aadhar_no
    }
  }
`;

export const GET_ALL_EMP_STATUS_COUNT = gql`
  query {
    getEmployeeAllStatusCount {
      emp_status
      total_count
    }
  }
`;

export const GET_EMP_BASIC_INFO = gql`
  query getEmpBasicInfo($type: String!, $id: String!) {
    getEmpBasicInfo(type: $type, id: $id) {
      emp_id
      Employee_Name
      Empployee_Number
      DOB
      Blood_Group
      Employee_Nationality
      Employee_father_name
      Employee_spouse_name
      Marital_status
      Gender
      Religion
      Tentative_date_of_joining
      Date_of_joining
      Probation_period_in_days
      confiramation_date
      Employee_personal_email_ID
      Employee_personal_mobile_number
      Employee_official_emil_ID
      Employee_official_mobile_number
      Employee_emergency_contact_name
      Employee_emergency_contact_relation
      Employee_emergency_contact_number
      Employee_emergency_contat_address
      Residential_status
      Employee_resident_address
      Employee_resident_PIN
      Employee_permanent_address
      Employee_permanent_PIN
    }
  }
`;
export const GET_EMP_POSITION = gql`
  query getEmployeePositionDept($type: String!, $id: String!) {
    getEmployeePositionDept(type: $type, id: $id) {
      Employee_designation
      Employee_department
    }
  }
`;

export const GET_EMP_SALARY = gql`
  query getEmployeeSalaryCtc($type: String!, $id: String!) {
    getEmployeeSalaryCtc(type: $type, id: $id) {
      Employee_monthly_current_cost_to_company
    }
  }
`;

export const GET_EMP_ID = gql`
  query getEmployeeIdProofInfo($type: String!, $id: String!) {
    getEmployeeIdProofInfo(type: $type, id: $id) {
      Employee_pan
      Emploeyee_UAN
      Employee_PF_number
      Employee_ESI_no
      Employee_Aadhar_number
      Employee_passport_number
      Employee_passport_validity
    }
  }
`;

export const GET_EMP_BANK_DETAILS = gql`
  query getEmployeeBankInfo($type: String!, $id: String!) {
    getEmployeeBankInfo(type: $type, id: $id) {
      Employee_Bank
      Employee_bank_branch
      Employee_bank_account_number
    }
  }
`;

export const GET_EMP_EDUCATION = gql`
  query getEmployeeEducationInfo($type: String!, $id: String!) {
    getEmployeeEducationInfo(type: $type, id: $id) {
      Employee_qualification
      Employee_specification
      Institute_name
      Start_date
      End_date
      Percentage
      CGPA
    }
  }
`;

export const GET_EMP_PROF_BACKGROUND = gql`
  query getEmployeeProfessionalInfo($type: String!, $id: String!) {
    getEmployeeProfessionalInfo(type: $type, id: $id) {
      Name_of_the_company
      Designation
      Company_location
      Start_date
      End_date
    }
  }
`;

export const GET_EMP_EXIT_STATUS = gql`
  query getEmployeeExitInfo($type: String!, $id: String!) {
    getEmployeeExitInfo(type: $type, id: $id) {
      Employee_tentative_date_of_exit
      Employee_date_of_exit
      Emp_exit_reason
    }
  }
`;

export const GET_EMP_Evaluation = gql`
  query getEmployeeEvaluationInfo($type: String!, $id: String!) {
    getEmployeeEvaluationInfo(type: $type, id: $id) {
      Name_of_the_evaluator
      Enter_employee_note_here
      Evaluation
    }
  }
`;

// ______________________________________________________________ payroll______________________________________

export const LatestYear_DATA = gql`
  query {
    getAllYears {
      year
    }
  }
`;

export const INI_STATDATA = gql`
  query {
    getInitialTotalEmpCtcGrossSal {
      count
      emp_total_ctc
      emp_total_gross_salary
    }
  }
`;

export const INIT_DATA = gql`
  query {
    getInitialPayroleLatestMonthAndYearData {
      emp_id
      emp_number
      emp_name
      emp_department
      emp_position
      emp_actual_no_of_days
      emp_billable_no_of_days
      emp_ctc
      emp_earned_fixed
      emp_earned_variable
      emp_gross_salary
      emp_deduction
      emp_net_salary
      emp_aadhar_no
      emp_uan_no
      emp_status
      month_year
    }
  }
`;

export const STAT_DATA = gql`
  query getTotalEmpCtcGrossSal($year: Int!, $month: String!) {
    getTotalEmpCtcGrossSal(year: $year, month: $month) {
      count
      emp_total_ctc
      emp_total_gross_salary
    }
  }
`;
export const PAY_DATA = gql`
  query getEmpPayroleByMonthYear($year: Int!, $month: String!) {
    getEmpPayroleByMonthYear(year: $year, month: $month) {
      emp_id
      emp_status
      emp_number
      emp_name
      emp_department
      emp_position
      emp_position
      emp_actual_no_of_days
      emp_billable_no_of_days
      emp_ctc
      emp_earned_fixed
      emp_earned_variable
      emp_gross_salary
      emp_deduction
      emp_net_salary
      emp_aadhar_no
      emp_uan_no
      month_year
    }
  }
`;
