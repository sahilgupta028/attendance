"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

const TeacherPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const username = localStorage.getItem('username');
  const verificationSuccess = localStorage.getItem('verificationSuccess');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await fetch(`http://localhost:8080/api/v1/teacher/${username}`, {
          method: 'GET',
        });
        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          console.log(userData);
          setUser(userData);
        } else {
          throw new Error('Failed to fetch user data');
        }

        const studentsDataResponse = await fetch('http://localhost:8080/api/v1/students', {
          method: 'GET',
        });
        if (studentsDataResponse.ok) {
          const studentsData = await studentsDataResponse.json();
          const sortedStudent = studentsData.sort((a , b) => a.rollnumber-b.rollnumber);
          setStudents(sortedStudent);
        } else {
          throw new Error('Failed to fetch students data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [router]);

   const markPresent = async (studentId) => {
    try {
    const response = await fetch(`http://localhost:8080/api/v1/students/${studentId}/mark-present`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ present: true }),
    });
    if (response.ok) {
      const updatedStudents = students.map(student => {
        if (student.rollnumber === studentId) {
          return {
            ...student,
            totalPresent: student.totalPresent + 1,
            totalClasses: student.totalClasses + 1,
            lastSeen: new Date(student.lastAttendance).toLocaleString(),
          };
        }
        return student;
      });
      setStudents(updatedStudents);
    } else {
      throw new Error('Failed to mark student present');
    }
  } catch (error) {
    console.error('Error marking student present:', error);
  }
};


  const markAbsent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/students/${studentId}/mark-absent`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ present: false }),
      });
      if (response.ok) {
        const updatedStudents = students.map(student => {
          if (student.rollnumber === studentId) {
            return {
              ...student,
              totalClasses: student.totalClasses + 1,
            };
          }
          return student;
        });
        setStudents(updatedStudents);
      } else {
        throw new Error('Failed to mark student absent');
      }
    } catch (error) {
      console.error('Error marking student absent:', error);
    }
  };

  const calculatePercentage = (present, total) => {
    return total === 0 ? 0 : ((present / total) * 100).toFixed(2);
  };

  const calculateAbsent = (present, total) => {
    return total - present;
  };

  return (
    <div>
    <Navbar name={user ? user.name : ""} />
    <div className='bg-blue-500 min-h-screen p-3'>
      {console.log(verificationSuccess)}
      { verificationSuccess ?  (
      <div className="min-w-5xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Student Attendance Manager</h1>
        {user ? (
          <div className="mb-6">
            <p className="text-lg"><strong>Teacher's name:</strong> {user.name}</p>
            <p className="text-lg"><strong>Teacher's subject:</strong> {user.subject}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Roll No.</th>
              <th className="border border-gray-300 px-8 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Total Present</th>
              <th className="border border-gray-300 px-4 py-2">Total Absent</th>
              <th className="border border-gray-300 px-4 py-2">Total Classes</th>
              <th className="border border-gray-300 px-4 py-2">Percentage</th>
              <th className="border border-gray-300 px-4 py-2">Last Seen</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
              <th className="border border-gray-300 px-4 py-2">Detained</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-center">{student.rollnumber}</td>
                <td className="border border-gray-300 px-4 py-2 text-center min-w-52">{student.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{student.totalPresent}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{calculateAbsent(student.totalPresent, student.totalClasses)}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{student.totalClasses}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{calculatePercentage(student.totalPresent, student.totalClasses)}%</td>
                <td className="border border-gray-300 px-4 py-2 text-center min-w-64">{new Date(student.lastSeen).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2 flex items-center">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded m-2" onClick={() => markPresent(student.rollnumber)}>Present</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => markAbsent(student.rollnumber)}>Absent</button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">{calculatePercentage(student.totalPresent, student.totalClasses) < 75 ? <span className="text-green-500 mr-2 flex items-center justify-center text-xl">✔</span> : <span className="text-red-500 mr-2 flex items-center justify-center">❌</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex items-center text-center justify-center '>
        <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded m-6' onClick={() => router.push('/student/register')}>Add Student</button>
        <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded m-6' onClick={() => window.print()}>Print</button>
        </div>
      </div>
      ) : (
        router.push('/404')
      )}
    </div>
    </div>
  );
};

export default TeacherPage;

