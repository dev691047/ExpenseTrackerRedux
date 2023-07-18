import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

const PieChart = () => {
  const data = [["Task", "Hours per Day"]];
  const [val, setVal] = useState(data);
  const [amount, totalAmount] = useState(0);
  const ExpItems = useSelector((state) => state.items);

  useEffect(() => {
    let chartVal = ExpItems.items;
    var newVar = [...data];
    let obj = {};
    let totalMoney = 0;
    for (let i = 0; i < chartVal.length; i++) {
      // console.log({ ch: chartVal[i] });
      if (obj[chartVal[i].type]) {
        obj[chartVal[i].type] += chartVal[i].money;
        totalMoney += chartVal[i].money;
      } else {
        obj[chartVal[i].type] = chartVal[i].money;
        totalMoney += chartVal[i].money;
      }
    }
    // console.log({ obj });
    let newArr = [];
    let keys = Object.keys(obj);
    for (let x of keys) {
      newVar.push([x, obj[x]]);
    }
    setVal(newVar);
    totalAmount(totalMoney);
    // if (chartVal.type && chartVal.money) {
    //   let updatedCost = amount + chartVal.money;
    //   console.log(updatedCost, chartVal.money, amount);
    //   totalAmount(updatedCost);
    // }
  }, [ExpItems.items.length]);

  const options = {
    pieHole: 0.9,
    is3D: true,

    legend: {
      position: "bottom", // Position can be 'bottom', 'top', 'left', 'right', 'none'
      alignment: "center", // Alignment can be 'start', 'center', 'end'
    },
    tooltip: {
      trigger: "hover", // Trigger can be 'focus', 'none', or 'hover'
    },
  };

  return (
    <>
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={val}
        options={options}
      />
      <h2 style={{ marginLeft: "180px" }}>${amount}</h2>
    </>
  );
};
export default PieChart;
