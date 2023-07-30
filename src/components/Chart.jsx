import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ array = [], currency, days }) => {
  const prices = [];
  const date = [];

  console.log(array);

  for (let i = 0; i < array.length; i++) {
    if (days === "24h") date.push(new Date(array[i][0]).toLocaleTimeString());
    else date.push(new Date(array[i][0]).toLocaleDateString());
    prices.push(array[i][1]);
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: `Price in ${currency}`,
        data: prices,
        borderColor: "rgb(255,99,132",
        backgroundColor: "rgba(255,99,132,0.5",
      },
    ],
  };

  return (
    <>
      <Line options={{ responsive: true }} data={data} />
    </>
  );
};

export default Chart;
