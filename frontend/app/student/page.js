"use client";
import { Bar } from "react-chartjs-2";
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";
import { Chart } from "chart.js/auto";
import Navbar from "../components/Navbar";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const rollnumber = localStorage.getItem('rollnumber');
  const [error, setError] = useState(null);

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
        setError(error);
      }
    };

    fetchUser();
  }, []);

  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    if (user) {
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


      const Attendance = (user.totalPresent / user.totalClasses).toFixed(2);

      setAttendanceData({ data, Attendance });
    }
  }, [user]);

  if (!localStorage.getItem('rollnumber')) {
    router.push('/404');
  }

  return (
    <div>
    <Navbar name={user ? user.name : ""} />
    <div className="flex justify-center items-center min-h-screen bg-blue-500 font-mono flex-col">
      {user ? (
        <div className="mb-6 text-center text-white">
          <div className="bg-gray-800 text-white p-4 rounded-lg flex flex-col justify-center items-center align-top">
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
                  data={attendanceData.data}
                  height={300}
                  width={500}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default Page;

