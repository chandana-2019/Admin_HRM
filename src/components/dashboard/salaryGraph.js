import React, { useState } from "react";
import "../../Styles/dashboard.css";
import SalaryDeptGraph from "../dashboard/salaryGraphDeptWise";
import SalaryCount from "../../components/dashboard/salaryuCount";
import { Chart } from "react-google-charts";
import Loader from "react-loader-spinner";
import { SALARY_GRAPH1 } from "../../queries";
import { useQuery } from "@apollo/react-hooks";
import OverboardSal1 from "./overboard_salary1";
import SalaryDeptMinMaxGraph from "../dashboard/salaryGraphMin_max";
import { SALARY_GRAPH2 } from "../../queries";

const options = {
  curveType: "function",
  seriesType: "line",
  enableInteractivity: true,
  colors: ['#e9ebf7',"#4e7fcc","#0a367a","#ffef4f","#c38d00","#fbbd05"],
  hAxis: { textStyle: { color: "#0d47a1", underline: true, bold: "1000"},title:"Months of Year",
  
},
  series: {
    3: { targetAxisIndex: 1, type: "bars", color: "#4e7fcc" },
      
  },
  vAxes: {
    // Adds titles to each axis.
    0: { title: "Sum of money" },
    1: { title: "Total employee" },
  },

  legend: { position: "top",alignment: 'end'},
};

const SalaryGraph = () => {
  const [childVisible, setchildVisible] = useState(false);
  const [deptVisible, setdeptVisible] = useState(false);
  const [overBoard, setOverboard] = useState(false);
  const [overBoard1, setOverboard1] = useState(false);
  const [deptVisible1, setdeptVisible1] = useState(false);
  const { error, loading, data } = useQuery(SALARY_GRAPH1);
  const result1 = useQuery(SALARY_GRAPH2);
 let go_back = "< Back to level 1"
  if (error)
    return (
      <div class="alert alert-danger alert-dismissible">
        <button type="button" class="close" data-dismiss="alert"></button>
        <div align="center">
          <strong>{error.message}</strong>{" "}
        </div>
      </div>
    );
  if (result1.error)
    return (
      <div class="alert alert-danger alert-dismissible">
        <button type="button" class="close" data-dismiss="alert"></button>
        <div align="center">
          <strong>{result1.error.message}</strong>{" "}
        </div>
      </div>
    );

  if (loading)
    return (
      <Loader
        className="loaderCLassForGraph"
        type="ThreeDots"
        color="#0073e6"
      />
    );
  if (result1.loading)
    return (
      <Loader
        className="loaderCLassForGraph"
        type="ThreeDots"
        color="#0073e6"
      />
    );

  const dataWIthoutType1 = result1.data.getDashSalaryGraphTwoActiveMinMaxAvgCount.map(
    (item) => {
      return {
        month_year: item.mon_year,
        min_salary: item.min_salary,
        max_salary: item.max_salary,
        avg_salary: item.avg_salary,
        total_count: item.total_count,
      };
    }
  );
  let header1 = [
    ["Month", "Min Salary", "Max Salary", "Avg Salary", "Total No of Employes"],
  ];
  const dataArr1 = dataWIthoutType1.map((obj) => Object.values(obj));
  const finalData1 = header1.concat(dataArr1);

  const dataWIthoutType = data.getDashboardSalaryActiveCount.map((item) => {
    return {
      mon_year: item.mon_year,
      total_ctc: item.total_ctc,
      total_gross_salary: item.total_gross_salary,
      total_salary_variation: item.total_salary_variation,
      total_count: item.total_count,
    };
  });
  const header = [
    [
      "Month",
      "CTC",
      "Gross Salary",
      "Variation of CTC",
      "Total no. of employees",
    ],
  ];
  const dataArr = dataWIthoutType.map((obj) => Object.values(obj));
  const finalData = header.concat(dataArr);

  const btnClick = () => {
    setdeptVisible(false);
    setOverboard(!overBoard);
  };
  const onChangeSalary = () => {
    setchildVisible(!childVisible);
  };
  const btnClick1 = () => {
    setdeptVisible1(false);
    setOverboard1(!overBoard1);
  };

  const chartEvents1 = [
    {
      eventName: "ready",
      callback: ({ chartWrapper, google }) => {
        let svg = document.querySelector("svg");
        let styles = 'text[text-anchor="middle"] { cursor: pointer; }';
        var css = document.createElement("style");
        if (css.styleSheet) {
          css.styleSheet.cssText = styles;
        } else {
          css.appendChild(document.createTextNode(styles));
        }
        svg.appendChild(css);

        var handler = function (e) {
          // console.log(e);
          var parts = e.targetID.split("#");
          if (parts.indexOf("label") >= 0) {
            let idx = parts[parts.indexOf("label") + 1];
            idx = parseInt(idx);
            var onClickData = finalData[idx + 1][0];

            localStorage.removeItem("Month_Dept_salary");
            localStorage.setItem("Month_Dept_salary", onClickData);

            setdeptVisible1(!deptVisible1);
            setOverboard1(true);
            
          }
        };
        google.visualization.events.addListener(
          chartWrapper.getChart(),
          "click",
          handler
        );
      },
    },
  ];

  const chartEvents = [
    {
      eventName: "ready",
      callback: ({ chartWrapper, google }) => {
        let svg = document.querySelector("svg");
        let styles = 'text[text-anchor="middle"] { cursor: pointer; }';
        var css = document.createElement("style");
        if (css.styleSheet) {
          css.styleSheet.cssText = styles;
        } else {
          css.appendChild(document.createTextNode(styles));
        }
        svg.appendChild(css);

        var handler = function (e) {
          // console.log(e);
          var parts = e.targetID.split("#");
          if (parts.indexOf("label") >= 0) {
            let idx = parts[parts.indexOf("label") + 1];
            idx = parseInt(idx);
            var onClickData = finalData[idx + 1][0];

            localStorage.removeItem("Month_Dept_salary");
            localStorage.setItem("Month_Dept_salary", onClickData);
            setdeptVisible(!deptVisible);

            setOverboard(true);
          }
        };
        google.visualization.events.addListener(
          chartWrapper.getChart(),
          "click",
          handler
        );
      },
    },
  ];

  if (childVisible) {
    return (
      <div>
        <div className="row graphHeading">
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <select
              onChange={onChangeSalary}
              className="form-control salaryOption"
            >
              <option>Salary Graph1</option>
              <option>Salary Graph2</option>
            </select>
          </div>
          
        </div>
        <hr />
        <div>
          {overBoard1 === true && <OverboardSal1 />}
          {overBoard1 === false && <SalaryCount />}
          <div className="salaryGraph">
            <div></div>
            <div>
              {deptVisible1 ? (
                <div>
                  <button onClick={btnClick1}
                  className="btn white_color_btn"
                  >
                       {go_back}
                  </button>
                  <SalaryDeptMinMaxGraph />
                </div>
              ) : (
                <div className="salaryGraph">
                  <Chart
                    chartType="LineChart"
                    width="105%"
                    height="350px"
                    data={finalData1}
                    options={options}
                    chartEvents={chartEvents1}
                    legendToggle
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="row graphHeading">
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <select
              onChange={onChangeSalary}
              className="form-control salaryOption"
            >
              <option>Salary Graph1</option>
              <option>Salary Graph2</option>
            </select>
          </div>
        </div>
        <hr />
        <div>
          {overBoard === true && <OverboardSal1 />}
          {overBoard === false && <SalaryCount />}

          <div className="salaryGraph">
            {deptVisible ? (
              <div>
                <button onClick={btnClick}
                className="btn white_color_btn"
                >
                {go_back}
                </button>      
                <SalaryDeptGraph />
              </div>
            ) : (
              <Chart
                chartType="LineChart"
                width="105%"
                height="350px"
                data={finalData}
                options={options}
                chartEvents={chartEvents}
                legendToggle
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};
export default SalaryGraph;
