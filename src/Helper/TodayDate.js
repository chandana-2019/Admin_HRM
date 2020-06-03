import React from 'react'

export default function TodayDate() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 6; //months from 1-12
    
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    let newdate = year + "-" + month + "-" + day
    
    return newdate
}
