import gql from 'graphql-tag' 

export const ADD_EVALUATION =gql`
mutation
    addEmployeeEvaluationInfo($id:String!,$evaluaterName:String!,$evaluationNote:String!,$evaluationType:String!){
    addEmployeeEvaluationInfo(emp_id:$id,
        Name_of_the_evaluator:$evaluaterName,
        Enter_employee_note_here:$evaluationNote,
        Evaluation:$evaluationType)
        {
      Name_of_the_evaluator
      Enter_employee_note_here
      Evaluation
    }
  }`

  export const SET_EMPLOYEE_STATUS= gql`
  mutation
    updateEmployeeSectionEmployeeBasicInfoStatus($id:String!,$status:String!){
    updateEmployeeSectionEmployeeBasicInfoStatus(emp_id:$id,status:$status)
    }`


    // ________________________________________  Adddept desig delete ________________________________________


    export const ADD_DEPARTMENTS= gql`
      mutation
      addDepartments($dept_name:String!){
      addDepartments(dept_name:$dept_name)
      {
      id
      department
      }
    }`

    export const ADD_DESIGNATION= gql`
    mutation 
        addDesignations($designation:String!){
        addDesignations(designation:$designation)
        {
        id
        designation
      }
    }`

    export const DELETE_DEPARTMENT = gql`
        mutation 
        deleteDepartment($dept_name:String!){
        deleteDepartment(dept_name:$dept_name)
        {
          id
          department
      }
    }
    `

    export const DELETE_DESIGNATION = gql`
        mutation 
        deleteDesignation($designation:String!){
          deleteDesignation(designation:$designation)
        {
          id
          designation
        }
      }
    `
    