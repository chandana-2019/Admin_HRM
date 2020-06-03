import React from 'react'
import ExcelUpload from '../UploadExcel/ExcelReader'
import excelTemp from '../../Files/EmployeeTemplete.csv'


function Addemployeebulk() {
    
    return (
        <div>
           <h5>Employee -> Bulk upload employee data</h5>
            <hr />
            <div className="container">
                 <div className="form-group">
                     Step 1.
                 </div>
                 <a className="btn primary_light"
                 href={excelTemp} download
                 >Download Excel Template</a>
                 <br />
                 <div className="form-group">
                     Step 2.
                 </div>
                 
                    <ExcelUpload />
                 <div>
                 </div>
            </div>
        </div>
    )
}

export default Addemployeebulk
