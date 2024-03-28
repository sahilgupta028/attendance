"use client";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
const page = () => {

    const data = {
      labels: ["English", "Maths", "Physics", "Chemistry", "Computer", "Hindi", "Biology"],
      datasets: [
        {
          label: "Attendance in %",
          data: [76, 94, 57, 79, 80, 52, 74.9],
          backgroundColor: [],
          borderColor: "orange",
          borderWidth: 2
        }
      ]
    };

    const totalVulnerabilities = data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);

    data.datasets[0].data.forEach((value) => {
        if (value < 75) {
          data.datasets[0].backgroundColor.push("red");
        } else {
          data.datasets[0].backgroundColor.push("green");
        }
      });

      const averageAttendance = (totalVulnerabilities / data.labels.length).toFixed(2);

      const options = {
        scales: {
          y: {
            max: 100, 
          },
        },
        maintainAspectRatio: true,
      };

  
    return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500 font-sans">
  <div className="bg-white shadow-lg rounded-lg p-8">
    <h1 className="text-4xl font-bold text-center text-gray-900 mb-6 underline uppercase">Attendance Overview</h1>
    <p className="text-lg font-semibold text-center text-gray-700 mb-6">Overall Attendance: {averageAttendance}%</p>
    <div className="bg-gray-200 rounded-lg p-6">
      <Bar
        data={data}
        height={300}
        width={500}
        options={options}
      />
    </div>
  </div>
  </div>
      );
    };
    export default page;


