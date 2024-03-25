import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='font-mono'>

      {/* Header */}
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">Attendance record</div>
          <div>
            <Link href="/teacher/register">
            <button className="px-4 py-2 rounded-md bg-white text-blue-500">Sign up as Teacher</button>
            </Link>
            <Link href="/student/register">
            <button className="px-4 py-2 rounded-md bg-white text-blue-500 ml-2">Sign up as Student</button>
            </Link>
          </div>
        </div>
      </header>

  <main className="container mx-auto flex flex-col items-center justify-center h-screen">
  <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Manage Your <span className="text-blue-500">Attendance</span></h1>
  <p className="text-lg text-gray-700 max-w-lg text-center mb-8">Attendance is not just a record; it's a commitment to being present, engaged, and accountable in the journey of learning and growth.</p>
  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
    <Link href="/student/login">
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg text-center block w-full md:w-auto transition duration-300 ease-in-out">Student's Login</button>
    </Link>
    <Link href="/teacher/login">
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg text-center block w-full md:w-auto transition duration-300 ease-in-out">Teacher's Login</button>
    </Link>
  </div>
  </main>


      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto flex justify-between">
          <div>© 2024 Attendance Record. All rights reserved.</div>
          <div>
            <button href="#" className="text-white hover:text-blue-500">Terms of Service</button>
            <span className="mx-2">|</span>
            <button href="#" className="text-white hover:text-blue-500">Privacy Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

