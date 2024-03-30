// "use client";
// import { Bar } from "react-chartjs-2";
// c
// import { useState , useEffect } from "react";
// import {useRouter} from "next/navigation";
// const page = () => {

//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const rollnumber = localStorage.getItem('rollnumber');

//     useEffect(() => {

//         const fetchUser = async () => {
//             try {
//                 const res = await fetch(`http://localhost:8080/api/v1/student/${rollnumber}`, {
//                     method: 'GET',
//                 });

//                 console.log(res);

//                 if (res.ok) {
//                     const data = await res.json();
//                     console.log("data:", data);
//                     setUser(data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUser();
//     }, []);

//     useEffect(() => {
//       if (user) {
//         // Assuming 'user' has properties totalPresent, totalAbsent, and totalClasses
//         const data = {
//           labels: ["Total Present", "Total Absent", "Total Class"],
//           datasets: [
//             {
//               label: "Attendance in %",
//               data: [user.totalPresent, user.totalAbsent, user.totalClasses],
//               backgroundColor: [],
//               borderColor: "orange",
//               borderWidth: 2
//             }
//           ]
//         }}});

//     const totalVulnerabilities = data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);

//     data.datasets[0].data.forEach((value) => {
//         if (value < 75) {
//           data.datasets[0].backgroundColor.push("red");
//         } else {
//           data.datasets[0].backgroundColor.push("green");
//         }
//       });

//       const averageAttendance = (totalVulnerabilities / data.labels.length).toFixed(2);

//       const options = {
//         scales: {
//           y: {
//             max: 100, 
//           },
//         },
//         maintainAspectRatio: true,
//       };

//       if(!localStorage.getItem('rollnumber')){
//         router.push('/404');
//       }

  
//     return (
//   <div className="flex justify-center items-center min-h-screen bg-blue-500 font-sans flex-col">
//   {user ? (
//     <div className="mb-6 text-center text-white">
//     <div className="bg-gray-800 text-white p-4 rounded-lg flex flex-col justify-center items-center align-top">
//       <p className="text-lg"><strong>Name:</strong> {user.name}</p>
//       <p className="text-lg"><strong>Roll Number:</strong> {user.rollnumber}</p>
//       <p className="text-lg"><strong>Class:</strong> {user.studentClass}</p>
//     </div>
//   </div>
//   ) : (
//     <div className="mb-6 text-center text-white">Loading...</div>
//   )}

//   <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
//     <h1 className="text-4xl font-bold text-center text-gray-900 mb-6 underline uppercase">Attendance Overview</h1>
//     <p className="text-lg font-semibold text-center text-gray-700 mb-6">Overall Attendance: {averageAttendance}%</p>
//     <div className="bg-gray-200 rounded-lg p-6">
//       <div className="aspect-w-16 aspect-h-9">
//         <Bar
//           data={data} // Assuming 'data' is defined elsewhere
//           height={300}
//           width={500}
//           options={options} // Assuming 'options' is defined elsewhere
//         />
//       </div>
//     </div>
//   </div>
// </div>

//       );
//     };


//     export default page;
"use client";
import { Bar } from "react-chartjs-2";
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";
import { Chart } from "chart.js/auto";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const rollnumber = localStorage.getItem('rollnumber');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/student/${rollnumber}`, {
          method: 'GET',
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    if (user) {
      // Assuming 'user' has properties totalPresent, totalAbsent, and totalClasses
      const data = {
        labels: ["Total Present", "Total Absent", "Total Class"],
        datasets: [
          {
            label: "Attendance",
            data: [user.totalPresent, user.totalClasses-user.totalPresent, user.totalClasses],
            backgroundColor: [],
            borderColor: "orange",
            borderWidth: 2,
            backgroundColor: [
              'green',
              'red',
              'blue'
            ],
          }
        ]
      };


      const Attendance = (user.totalPresent / user.totalClasses).toFixed(3);

      setAttendanceData({ data, Attendance });
    }
  }, [user]);

  if (!localStorage.getItem('rollnumber')) {
    router.push('/404');
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500 font-sans flex-col">
      {user ? (
        <div className="mb-6 text-center text-white">
          <div className="bg-gray-800 text-white p-4 rounded-lg flex flex-col justify-center items-center align-top">
            <p className="text-lg"><strong>Name:</strong> {user.name}</p>
            <p className="text-lg"><strong>Roll Number:</strong> {user.rollnumber}</p>
            <p className="text-lg"><strong>Class:</strong> {user.studentClass}</p>
          </div>
        </div>
      ) : (
        <div className="mb-6 text-center text-white">Loading...</div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6 underline uppercase">Attendance Overview</h1>
        {attendanceData && (
          <>
            <p className="text-lg font-semibold text-center text-gray-700 mb-6">Overall Attendance: {attendanceData.Attendance*100}%</p>
            <div className="bg-gray-200 rounded-lg p-6">
              <div className="aspect-w-16 aspect-h-9">
                <Bar
                  data={attendanceData.data} // Pass the updated data object
                  height={300}
                  width={500}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;

