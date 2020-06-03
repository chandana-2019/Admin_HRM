import React, { useState, useEffect } from "react";
import "../../Styles/employee.css";
import { GET_EMPLOYEE_DATA } from "../../queries";
import StatusBtn from "./statusBtn";
import ProfilePic from "../../Images/profile.png";
import { useQuery } from "@apollo/react-hooks";
import { Dropdown } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { useHistory, Link } from "react-router-dom";
import json from "../../Test.json";
import { CSVLink } from "react-csv";
import { Accordion, Card, useAccordionToggle } from "react-bootstrap";

const camelCase = (str) => {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
};

const EmpStatus = () => {
  const history = useHistory();
  const filterBy = [
    "Department",
    "Position",
    "Religion",
    "Gender",
    "Evaluation",
  ]; // Read from API
  const [filterGroups, setFilterGroups] = useState({});
  const [open, setOpen] = useState(0);
  const [filters, setFilters] = useState({});
  const [initFilter, setInitFilter] = useState({});
  const [initGroups, setInitGroups] = useState({});
  const [status, setStatus] = useState("Active");
  const [input_style, set_input_style] = useState("ideal_empty_input");
  const [activeButton, setActiveButton] = useState("Active");
  const [searchStatus, setSearchState] = useState("");
  const { error, loading, data } = useQuery(GET_EMPLOYEE_DATA, {
    variables: { status },
  });

  useEffect(() => {
    if (!data) return;
    let id = 0;
    const unique = (prop) => {
      const res = [];
      data.getEmpDetailsByEmpStatus.forEach((v) => {
        if (res.findIndex((i) => i[prop] === v[prop]) === -1)
          if (v[prop]) res.push({ id: id++, checked: false, [prop]: v[prop] });
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
  }, [data]);
  var Onload = (handler) => {
    return useEffect(() => {
      return handler();
    }, []);
  };

  if (loading)
    return (
      <Loader
        className="loaderCLassForGraph"
        type="ThreeDots"
        color="#0073e6"
      />
    );

  if (error)
    return (
      <div className="alert alert-danger alert-dismissible">
        <button type="button" className="close" data-dismiss="alert"></button>
        <div align="center">
          <strong>{error.message}</strong>{" "}
        </div>
      </div>
    );

  const filterData = () => {
    let result = data.getEmpDetailsByEmpStatus;
    Object.keys(filters).forEach((key) => {
      if (filters[key].length !== 0)
        result = result.filter(
          (item) => filters[key].indexOf(item[key]) !== -1
        );
    });
    return result;
  };

  const handleChange = (e) => {
    let id = e.target.id;
    let name = e.target.name;
    let filter = e.target.getAttribute("filter");
    let checked = e.target.checked;
    if (checked) {
      let newFilter = [...filters[filter]];
      newFilter.push(name);
      setFilters({ ...filters, [filter]: newFilter });
    } else {
      setFilters({
        ...filters,
        [filter]: filters[filter].filter((item) => item !== name),
      });
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
  const onInputFocus = () => {
    console.log("in");
    set_input_style("on_focus_input_style");
  };
  const lossFocus = (e) => {
    console.log("out");
    const v = e.target.value;
    console.log(v);
    if (v !== "") {
      set_input_style("on_loss_focus_input_style");
    }
  };
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

  const empNameOnClick = (emp) => {
    localStorage.removeItem("emp_Id");
    localStorage.removeItem("emp_status");
    localStorage.removeItem("status_for_toggle");
    if (emp.emp_status === "Backedoff") {
      localStorage.removeItem("status_for_toggle");
      localStorage.setItem("status_for_toggle", "Arriving");
    } else {
      localStorage.removeItem("status_for_toggle");
      localStorage.setItem("status_for_toggle", emp.emp_status);
    }
    localStorage.setItem("emp_Id", emp.emp_id);
    localStorage.setItem("emp_status", emp.emp_status);

    history.push("/employee/employee_profile");
  };

  const StatusBtnOnClick = (e) => {
    setStatus(e.target.value || e.target.attributes[1].value);
    setActiveButton(e.target.value || e.target.attributes[1].value);
  };

  const searchInput = (e) => {
    setSearchState(e.target.value);
  };
  const tableFilterData = filterData().filter((item) => {
    return (
      item.emp_name.toLowerCase().indexOf(searchStatus.toLowerCase()) !== -1
    );
  });

  // const filterColumns = tableFilterData => {
  //   const columns = Object.keys(tableFilterData[0]);
  //   let headers = [];
  //   columns.forEach((col, idx) => {
  //     if (col !== "__typename" && col !== "emp_photo" && col !== "emp_id") {
  //       // OR if (idx !== 0)
  //       headers.push({ label: camelCase(col), key: col });
  //     }
  //   });

  //   return headers;
  // };
  const addIndividualEmp = () => {
    history.push("/employee/addemployee");
  };

  const addbulkEmp = () => {
    history.push("/employee/addemployeebulk");
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

  return (
    <div className="container-fluid emp_Container">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
          {json.userType !== "admin" && (
            <h5 className="headingEmploye">Employee List</h5>
          )}
          {json.userType === "admin" && (
            <Dropdown>
              <Dropdown.Toggle className="primaryDarkColor" id="dropdown-basic">
                Add Employee
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={addIndividualEmp}>
                  Add individually
                </Dropdown.Item>
                <Dropdown.Item onClick={addbulkEmp}>Add bulk</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 form-group">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-1">
              <select className="form-control">
                <option disabled selected>
                  Sort By
                </option>
                <option>Newest added</option>
                <option>SOmething1</option>
                <option>SOmething2</option>
              </select>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mt-2">
              <input
                type="text"
                onFocus={onInputFocus}
                onBlur={lossFocus}
                className={input_style}
                placeholder="Search By Name.."
                onChange={searchInput}
              ></input>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
              <CSVLink
                data={tableFilterData}
                filename={"Employee.csv"}
                className="btn white_color_btn col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
              >
                Export
              </CSVLink>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2 emp_sideLeft">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div>
            <div
              className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
              align="right"
            >
              <p onClick={clearAll} className="clear">
                Clear
              </p>
            </div>
            <div className="container-fluid">
              <div className="row checkBoxes table-responsive">
                <Accordion defaultActiveKey={0}>
                  {filterBy.map((item, index) => (
                    <Card class="card">
                      <CustomToggle
                        as={Card.Header}
                        eventKey={index}
                        className="custom-label checkBoxHeader text-capitalize"
                      >
                        {item}
                      </CustomToggle>

                      {(filterGroups[item] || []).map((li) => (
                        <Accordion.Collapse
                          eventKey={index}
                          className="container-fluid"
                        >
                          <div
                            key={li.id}
                            className="custom-control custom-checkbox "
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
        </div>
        <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-10">
          {/* --------------------------------------------------------- */}
          <StatusBtn
            trigerOnStatusBtnClick={StatusBtnOnClick}
            activeButton={activeButton}
          />
          <div className="container-fluid">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 table-responsive">
              <table className="table table-bordered table-hover" id="empTable">
                <thead className="primary_light">
                  <tr>
                    <th></th>
                    <th>Employee Number</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>DOJ</th>
                    <th>TDOJ</th>
                    <th>TDOE</th>
                    <th>DOE</th>
                    <th>Official mail id</th>
                    <th>Official Mob. No.</th>
                    <th>CTC</th>
                    <th>Age</th>
                    <th>State (Permanent Address)</th>
                    <th>Religion</th>
                    <th>Gender</th>
                    <th>Aadhar No</th>
                    <th>Status</th>
                    <th>Evaluation</th>
                  </tr>
                </thead>
                <tbody>
                  {tableFilterData.map((item) => (
                    <tr>
                      <td>
                        <img
                          src={ProfilePic}
                          width="40px"
                          height="40px"
                          className="empImage"
                          alt="Image"
                        ></img>
                      </td>
                      <td>{item.emp_number}</td>
                      <td>
                        <span
                          className="empNameTable text-capitalize"
                          onClick={() => empNameOnClick(item)}
                        >
                          {item.emp_name}
                        </span>
                      </td>
                      <td className="text-capitalize">{item.Department}</td>
                      <td id="empNo" className="text-capitalize">
                        {item.Position}
                      </td>
                      <td className="text-capitalize">{item.emp_doj}</td>
                      <td>{item.emp_tentative_doj}</td>
                      <td>{item.emp_tentative_doe}</td>
                      <td>{item.emp_doe}</td>
                      <td>{item.emp_official_email}</td>
                      <td>{item.emp_official_mobile}</td>
                      <td>{item.emp_ctc}</td>
                      <td>{item.emp_age}</td>
                      <td>{item.emp_permanent_state}</td>
                      <td className="text-capitalize">{item.Religion}</td>
                      <td className="text-capitalize">{item.Gender}</td>
                      <td>{item.emp_aadhar_no}</td>
                      <td className="text-capitalize">{item.emp_status}</td>
                      <td className="text-capitalize">{item.Evaluation}</td>
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
};
export default EmpStatus;
