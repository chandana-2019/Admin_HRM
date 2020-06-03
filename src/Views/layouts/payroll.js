import React, { useState, useEffect } from "react";
import "../../Styles/employee.css";
import {
  INI_STATDATA,
  INIT_DATA,
  PAY_DATA,
  STAT_DATA,
  LatestYear_DATA,
} from "../../queries";

import { useQuery } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

import "../../Styles/payroll.css";
import { Accordion, Card, useAccordionToggle } from "react-bootstrap"; // for card on sidebar
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const payroll_parameters = [
  "Number",
  "Name",
  "Department",
  "Designation",
  "Status",
  "Month",
  "No.of days",
  "Billable No.of days",
  "CTC",
  "Earned Fixed",
  "Earned Variable",
  "Gross salary",
  "Deductions",
  "Net salary",
  "Aadhar No.",
  "UAN",
];
const checkbox_parameters = ["Department", "Designation", "Status"];

const Payroll = () => {
  const filterBy = ["emp_department", "emp_position", "emp_status"]; // Read from API

  const [year, setYear] = useState(1); // this is initail year
  const [month, setMonth] = useState(""); // this is initail month

  const [filterGroups, setFilterGroups] = useState({});
  const [handelDateChange, sethandelDateChange] = useState(false);

  const [filters, setFilters] = useState({});
  const [initFilter, setInitFilter] = useState({});
  const [initGroups, setInitGroups] = useState({});
  const [searchStatus, setSearchState] = useState("");

  // using query  for getting latest   Paydata
  const { data: dataI, error: errorI, loading: loadingI } = useQuery(INIT_DATA);

  // using query  for getting latest  Stat data
  const { data: dataS, error: errorS, loading: loadingS } = useQuery(
    INI_STATDATA
  );

  // using query  for getting latest year having  data
  const { data: dataY, error: errorY, loading: loadingY } = useQuery(
    LatestYear_DATA
  );

  // fetch Pay data for selected month-year
  const { error, loading, data } = useQuery(PAY_DATA, {
    variables: { year, month },
  });
  // fetch stats data for selected month-year
  const { data: dataR, error: errorR, loading: loadingR } = useQuery(
    STAT_DATA,
    {
      variables: { year, month },
    }
  );

  useEffect(() => {
    if (dataI) {
      let id = 0;
      const unique = (prop) => {
        const res = [];

        dataI.getInitialPayroleLatestMonthAndYearData.forEach((v) => {
          if (res.findIndex((i) => i[prop] === v[prop]) === -1)
            if (v[prop])
              res.push({ id: id++, checked: false, [prop]: v[prop] });
        });
        return res;
      };

      let filterTmp = {};
      let groupTmp = {};
      filterBy.forEach((item) => {
        filterTmp[item] = [];
        groupTmp[item] = unique(item);
      });

      setInitFilter(filterTmp);
      setFilters(filterTmp);

      setInitGroups(groupTmp);
      setFilterGroups(groupTmp);
      if (handelDateChange === false) {
        let m = dataI.getInitialPayroleLatestMonthAndYearData[0].month_year.split(
          " "
        )[0];
        let yr = dataI.getInitialPayroleLatestMonthAndYearData[0].month_year.split(
          " "
        )[1];
        let y = parseInt(yr);
        console.log(m);
        setMonth(m);
        setYear(parseInt(y));
      }
    }
  }, [dataI]);

  if (loading || loadingR || loadingI || loadingS || loadingY)
    return (
      <Loader
        className="loaderCLassForGraph"
        type="ThreeDots"
        color="#0073e6"
      />
    );

  var Onload = (handler) => {
    return useEffect(() => {
      return handler();
    }, []);
  };

  const handleyear = (event) => {
    sethandelDateChange(true);

    let yearvalue = event.target.value;
    // console.log("picked year from dropdown is" + JSON.stringify(yearvalue));
    setYear(parseInt(yearvalue));
  };

  const handlemonth = (event) => {
    sethandelDateChange(true);

    let monthvalue = event.target.value;
    // console.log("picked  month from dropdown is" + JSON.stringify(monthvalue));

    setMonth(monthvalue);
  };

  if (error || errorR || errorI || errorS || errorY)
    return (
      <div className="alert alert-danger alert-dismissible">
        <button
          type="button"
          className="close"
          align="center"
          data-dismiss="alert"
        ></button>
        <div align="center">
          <strong>
            {errorR.message ||
              error.message ||
              errorI.message ||
              errorS.message ||
              errorY.message}
          </strong>{" "}
        </div>
      </div>
    );
  let result =
    dataI.getInitialPayroleLatestMonthAndYearData ||
    data.getEmpPayroleByMonthYear;
  const filterData = () => {
    Object.keys(filters).forEach((key) => {
      if (filters[key].length !== 0)
        result = result.filter(
          (item) => filters[key].indexOf(item[key]) !== -1
        );
    });
    return result;
  };

  const InitialPayTable = dataI.getInitialPayroleLatestMonthAndYearData;
  /*
  console.log("initial pay table  :" + JSON.stringify(InitialPayTable));
 const InitialStatData = dataS.getInitialTotalEmpCtcGrossSal;
  console.log("initial stats table  :" + JSON.stringify(InitialStatData));
  const PayTable = data.getEmpPayroleByMonthYear;
  console.log("pay value  :" + JSON.stringify(PayTable));
  const StatsData = dataR.getTotalEmpCtcGrossSal;
  console.log("stat table  :" + JSON.stringify(StatsData));
   */
  let defaultm = parseInt(InitialPayTable[0].month_year.split(" ")[1]);
  console.log("latest year   :" + JSON.stringify(defaultm));

  const LatestYear = dataY.getAllYears;
  //console.log("latest year   :" + JSON.stringify(LatestYear));

  const handleChange = (e) => {
    let id = e.target.id;
    let name = e.target.name;
    let filter = e.target.getAttribute("filter");
    let checked = e.target.checked;
    if (checked) {
      let newFilter = [...filters[filter]];
      newFilter.push(name);
      setFilters({ ...filters, [filter]: newFilter });
      console.log(filterData().length);
    } else {
      setFilters({
        ...filters,
        [filter]: filters[filter].filter((item) => item !== name),
      });
      console.log(filterData().length);
    }
    const tmp = filterGroups[filter];

    let updateGroup = [...tmp];
    const index = updateGroup.findIndex((i) => i.id.toString() === id);
    updateGroup[index].checked = checked;
    setFilterGroups({
      ...filterGroups,
      [filter]: updateGroup,
    });
  };
  //clear all
  const clearAll = () => {
    let tmp = { ...filterGroups };
    Object.keys(tmp).forEach((item) => {
      tmp[item].forEach((subItem) => {
        subItem.checked = false;
      });
    });
    setFilterGroups(tmp);
    setFilters(initFilter);
  };
  //search option
  const searchInput = (e) => {
    setSearchState(e.target.value);
  };
  const test = filterData().filter((item) => {
    return (
      item.emp_name.toLowerCase().indexOf(searchStatus.toLowerCase()) !== -1 ||
      item.emp_number.toLowerCase().indexOf(searchStatus.toLowerCase()) !==
        -1 ||
      item.emp_aadhar_no.indexOf(searchStatus) !== -1 ||
      item.emp_uan_no.toLowerCase().indexOf(searchStatus.toLowerCase()) !== -1
    );
  });
  // go back option
  const btnClick = () => {
    let defaultm = InitialPayTable[0].month_year.split(" ")[0];
    /* //alternate for default 
    let defaulty = parseInt(InitialPayTable[0].month_year.split(" ")[1]);
*/
    let defaulty = LatestYear[0].year;

    setMonth(defaultm);
    setYear(parseInt(defaulty));
  };

  function CustomToggle({ children, eventKey }) {
    const [txt, setTxt] = useState("+");
    Onload(() => {
      if (eventKey === 0) {
        setTxt("-");
      }
    });
    const decoratedOnClick = useAccordionToggle(eventKey, (e) => {
      txt === "+" ? setTxt("-") : setTxt("+");
    });

    return (
      <div className="card-header checkBoxHeader" onClick={decoratedOnClick}>
        {children}{" "}
        {txt === "+" ? (
          <i className="fas fa-angle-up float-right" />
        ) : (
          <i className="fas fa-angle-down float-right" />
        )}
      </div>
    );
  }
  //using latest month and year with data
  const defaultMonth = InitialPayTable[0].month_year.split(" ")[0];
  const defaultYear = LatestYear[0].year;
  //stat data
  const StatData = dataR.getTotalEmpCtcGrossSal;
  const IniStatData = dataS.getInitialTotalEmpCtcGrossSal;

  //console.log("the stat data is " + JSON.stringify(StatData));
  if (StatData.count === 0 || IniStatData.count === 0) {
    return (
      <div className="container-fluid emp_Container">
        <div className="row">
          <div className="col">
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mr-2">
              <h5 className="headingEmploye ml-3 mt-3">Payroll</h5>
            </div>
          </div>
          <div className="col">
            <div className="form-inline ">
              {/* Search Input */}
              <input
                type="text"
                className="srchtab form-control col-4 mr-2 "
                placeholder="Enter your search term here.."
                onChange={searchInput}
              ></input>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                table="table-to-xls"
                filename="Payroll"
                sheet="payrolltablexls"
                button
                className="xlconv btn  ml-4"
                buttonText=" Download Excel"
              />
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="sidecont col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2  mt-4">
            <div className="row checkBoxes ">
              <div className="container-fluid"></div>
              <div className="row checkBoxes table-responsive mt-3"></div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-10">
            <div className="container-fluid mt-2">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                <div className="row statbar col-lg-12">
                  <button
                    type="button"
                    className="statbt btn primary_light mr-2"
                  >
                    <label className="statLabel mr-2">
                      {" "}
                      Number of employees{" "}
                    </label>
                    <span className="statbadge badge-pill primary ml-2">
                      {StatData.count}
                    </span>
                  </button>
                  <button
                    type="button"
                    className=" statbt btn primary_light mr-2"
                  >
                    <label className="statLabel mr-2"> Cost to company</label>
                    <span className="statbadge badge-pill primary ml-2">
                      {StatData.emp_total_ctc}
                    </span>
                  </button>
                  <button
                    type="button"
                    className=" statbt btn primary_light mr-2"
                  >
                    <label className="statLabel mr-2">Gross salary</label>
                    <span className="statbadge badge-pill primary ml-2">
                      {StatData.emp_total_gross_salary}
                    </span>
                  </button>

                  <div className="form-inline mx-sm-2 m-2">
                    {/* year picker  */}

                    <label htmlFor="year" className="labelComp mx-sm-3 ">
                      Year
                      <select
                        value={year}
                        className="form-control mx-sm-1 "
                        name="year"
                        onChange={handleyear}
                      >
                        {LatestYear.map((item) => (
                          <option key={item.key} value={item.year}>
                            {item.year}
                          </option>
                        ))}
                      </select>
                    </label>

                    {/* month picker  */}

                    <select
                      value={month}
                      className="form-control "
                      name="month"
                      onChange={handlemonth}
                    >
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option className="text-capitalize" value="July">
                        July
                      </option>
                      <option className="text-capitalize" value="August">
                        August
                      </option>
                      <option className="text-capitalize" value="September">
                        September
                      </option>
                      <option className="text-capitalize" value="October">
                        October
                      </option>
                      <option className="text-capitalize" value="November">
                        November
                      </option>
                      <option className="text-capitalize" value="December">
                        December
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid mt-2">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 table-responsive">
                <table
                  className="table table-bordered table-hover"
                  id="table-to-xls"
                ></table>
                <div className="container-fluid">
                  <div className="alert alert-danger alert-dismissible">
                    <div>
                      <strong>
                        {" "}
                        No Data for Selected Year-Month : {year} {month} . Click
                        to go back :{" "}
                      </strong>
                      <button className=" btn" onClick={btnClick}>
                        <span>
                          <i
                            className="fa fa-arrow-left"
                            style={{ fontsize: "50px", color: "#0d47a1" }}
                          ></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid emp_Container">
        <div className="row">
          <div className="col">
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mr-2">
              <h5 className="headingEmploye ml-3 mt-3">Payroll</h5>
            </div>
          </div>
          <div className="col">
            <div className="form-inline ">
              {/* Search Input */}
              <input
                type="text"
                className="srchtab form-control col-4 mr-2 "
                placeholder="Enter your search term here.."
                onChange={searchInput}
              ></input>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                table="table-to-xls"
                filename="Payroll"
                sheet="payrolltablexls"
                button
                className="xlconv btn  ml-4"
                buttonText=" Download Excel"
              />
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="sidecont col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2  mt-4">
            <div className="row checkBoxes ">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div>
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
                align="center"
              >
                <label className="statLabel" onClick={clearAll}>
                  {" "}
                  Clear
                </label>
              </div>
              <div className="container-fluid"></div>
              <div className="row checkBoxes table-responsive mt-3">
                <Accordion defaultActiveKey={0}>
                  {filterBy.map((item, index) => (
                    <Card className="card">
                      <CustomToggle
                        as={Card.Header}
                        eventKey={index}
                        className="headLabel custom-control-label checkBoxHeader text-capitalize"
                      >
                        {item === "emp_department"
                          ? checkbox_parameters[0]
                          : item === "emp_position"
                          ? checkbox_parameters[1]
                          : checkbox_parameters[2]}
                      </CustomToggle>

                      {(filterGroups[item] || []).map((li) => (
                        <Accordion.Collapse
                          eventKey={index}
                          className="container-fluid"
                        >
                          <div
                            key={li.id}
                            className="custom-control custom-checkbox"
                          >
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={li.id}
                              filter={item}
                              name={li[item]}
                              checked={li.checked}
                              onChange={handleChange}
                            />
                            <label
                              className="custom-control-label text-capitalize"
                              htmlFor={li.id}
                            >
                              {li[item]}
                            </label>
                          </div>
                        </Accordion.Collapse>
                      ))}
                    </Card>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-10">
            <div className="container-fluid mt-2">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                <div className="row statbar col-lg-12">
                  <button
                    type="button"
                    className="statbt btn primary_light mr-2"
                  >
                    <label className="statLabel mr-2">
                      {" "}
                      Number of employees{" "}
                    </label>
                    <span className="statbadge badge-pill primary ml-2">
                      {StatData.count}
                    </span>
                  </button>
                  <button
                    type="button"
                    className=" statbt btn primary_light mr-2"
                  >
                    <label className="statLabel mr-2"> Cost to company</label>
                    <span className="statbadge badge-pill primary ml-2">
                      {StatData.emp_total_ctc}
                    </span>
                  </button>
                  <button
                    type="button"
                    className=" statbt btn primary_light mr-2"
                  >
                    <label className="statLabel mr-2">Gross salary</label>
                    <span className="statbadge badge-pill primary ml-2">
                      {StatData.emp_total_gross_salary}
                    </span>
                  </button>

                  <div className="form-inline mx-sm-2 m-2">
                    {/* year picker  */}

                    <label htmlFor="year" className="labelComp mx-sm-3 ">
                      Year
                      <select
                        value={defaultYear}
                        className="form-control mx-sm-1 "
                        name="year"
                        onChange={handleyear}
                      >
                        {LatestYear.map((item) => (
                          <option key={item.key} value={item.year}>
                            {item.year}
                          </option>
                        ))}
                      </select>
                    </label>

                    {/* month picker  */}

                    <select
                      value={defaultMonth}
                      className="form-control "
                      name="month"
                      onChange={handlemonth}
                    >
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option className="text-capitalize" value="July">
                        july
                      </option>
                      <option className="text-capitalize" value="August">
                        august
                      </option>
                      <option className="text-capitalize" value="September">
                        september
                      </option>
                      <option className="text-capitalize" value="October">
                        october
                      </option>
                      <option className="text-capitalize" value="November">
                        November
                      </option>
                      <option className="text-capitalize" value="December">
                        december
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid mt-2">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 table-responsive">
                <table
                  className="table table-bordered table-hover"
                  id="table-to-xls"
                >
                  <thead className="primary_light">
                    <tr>
                      {payroll_parameters.map((item, index) => (
                        <th key={index}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {test.map((item) => (
                      <tr>
                        <td>{item.emp_number}</td>
                        <td>{item.emp_name}</td>
                        <td>{item.emp_department}</td>
                        <td>{item.emp_position}</td>
                        <td>{item.emp_status}</td>
                        <td>{item.month_year}</td>
                        <td>{item.emp_actual_no_of_days} days</td>
                        <td>{item.emp_billable_no_of_days} days</td>
                        <td>
                          {"\u20B9"}
                          {item.emp_ctc.toLocaleString("en-IN")}
                        </td>
                        <td>
                          {" "}
                          {"\u20B9"}
                          {item.emp_earned_fixed.toLocaleString("en-IN")}
                        </td>
                        <td>
                          {"\u20B9"}
                          {item.emp_earned_variable.toLocaleString("en-IN")}
                        </td>
                        <td>
                          {" "}
                          {"\u20B9"}
                          {item.emp_gross_salary.toLocaleString("en-IN")}
                        </td>
                        <td>
                          {" "}
                          {"\u20B9"}
                          {item.emp_deduction.toLocaleString("en-IN")}
                        </td>
                        <td>
                          {" "}
                          {"\u20B9"}
                          {item.emp_net_salary.toLocaleString("en-IN")}
                        </td>
                        <td>{item.emp_aadhar_no}</td>
                        <td>{item.emp_uan_no}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Payroll;
