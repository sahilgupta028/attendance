"use client";
import { useState, useEffect } from 'react';

const TeacherPage = () => {
  const teacherName = "Ajay, The Tiktoker";
  const teacherSubject = "Discrete Structures and Theory of Logics";

  const [students, setStudents] = useState(() => {
    const storedStudents = localStorage.getItem('students');
    return storedStudents ? JSON.parse(storedStudents) : [
      { rollNo: 1, name: "Alice", totalPresent: 0, totalClasses: 0 },
      { rollNo: 2, name: "Bob", totalPresent: 0, totalClasses: 0 },
      // Add more students as needed
    ];
  });

  // Function to update localStorage with updated student data
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // Function to mark a student present
  const markPresent = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].totalPresent += 1;
    updatedStudents[index].totalClasses += 1; // Increment total classes
    setStudents(updatedStudents);
  };

  // Function to mark a student absent
  const markAbsent = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].totalClasses += 1; // Increment total classes
    // Here, you can implement logic to handle absent students if needed
    setStudents(updatedStudents);
  };

  // Function to add a new student
  const addStudent = () => {
    const newStudent = {
      rollNo: students.length + 1,
      name: `New Student ${students.length + 1}`,
      totalPresent: 0,
      totalClasses: 0
    };
    setStudents([...students, newStudent]);
  };

  const calculatePercentage = (present, total) => {
    return total === 0 ? 0 : ((present / total) * 100).toFixed(2);
  };

  const calculateAbsent = (present, total) => {
    return total-present;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Teacher's Page</h1>
      <div className="mb-6">
        <p className="text-lg"><strong>Name:</strong> {teacherName}</p>
        <p className="text-lg"><strong>Email:</strong> {teacherSubject}</p>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Roll No.</th>
            <th className="border border-gray-300 px-8 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Total Present</th>
            <th className="border border-gray-300 px-4 py-2">Total Absent</th>
            <th className="border border-gray-300 px-4 py-2">Total Classes</th>
            <th className="border border-gray-300 px-4 py-2">Percentage</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
            <th className="border border-gray-300 px-4 py-2">Detained</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{student.rollNo}</td>
              <td className="border border-gray-300 px-4 py-2">{student.name}</td>
              <td className="border border-gray-300 px-4 py-2">{student.totalPresent}</td>
              <td className="border border-gray-300 px-4 py-2">{calculateAbsent(student.totalPresent, student.totalClasses)}</td>
              <td className="border border-gray-300 px-4 py-2">{student.totalClasses}</td>
              <td className="border border-gray-300 px-4 py-2">{calculatePercentage(student.totalPresent, student.totalClasses)}%</td>
              <td className="border border-gray-300 px-4 py-2 flex items-center">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded m-2" onClick={() => markPresent(index)}>Present</button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => markAbsent(index)}>Absent</button>
              </td>
              <td className="border border-gray-300 px-4 py-2">{calculatePercentage(student.totalPresent, student.totalClasses) < 75 ?  <span className="text-green-500 mr-2 flex items-center justify-center text-xl">✔</span> : <span className="text-red-500 mr-2 flex items-center justify-center">❌</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={addStudent}>Add a Student</button>
    </div>
  );
};

export default TeacherPage;
