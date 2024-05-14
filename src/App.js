import React, { useState } from 'react';
import './App.css';

// LoginForm component for user authentication
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming you have a function to handle login in the parent component
    onLogin({ username, password });
  };

  const handleGoogleLogin = () => {
    // Redirect to Google login page
    window.location.href = 'https://accounts.google.com/';
  };

  const handleTwitterLogin = () => {
    // Redirect to Twitter login page
    window.location.href = 'https://twitter.com/login';
  };

  const handleFacebookLogin = () => {
    // Redirect to Facebook login page
    window.location.href = 'https://www.facebook.com/';
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div className="social-login">
        <h3>Or login with:</h3>
        <button className="google-login" onClick={handleGoogleLogin}>Google</button>
        <button className="facebook-login" onClick={handleFacebookLogin}>Facebook</button>
        <button className="twitter-login" onClick={handleTwitterLogin}>Twitter</button>
      </div>
    </div>
  );
};

// Course component to display individual courses
const Course = ({ course, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsSelected(e.target.checked);
    onSelect(course, e.target.checked);
  };

  return (
    <tr>
      <td>{course.name}</td>
      <td>{course.description}</td>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          style={{ marginRight: '8px' }}
        />
      </td>
    </tr>
  );
};

// Registration form component
const RegistrationForm = ({ onSubmit }) => {
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    setRegistrationMessage('Registration successful!');
    setIsButtonClicked(true);
    setTimeout(() => {
      setRegistrationMessage('');
      setIsButtonClicked(false);
    }, 3000);
  };

  return (
    <div>
      {registrationMessage && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>{registrationMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          style={{
            backgroundColor: isButtonClicked ? '#4caf50' : '#2196f3',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '4px 2px',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

// Payment component
const Payment = () => {
  const handleGPayPayment = () => {
    window.location.href = 'https://pay.google.com/';
  };

  const handlePhonePePayment = () => {
    window.location.href = 'https://www.phonepe.com/';
  };

  const handlePaytmPayment = () => {
    window.location.href = 'https://paytm.com/';
  };

  return (
    <div className="payment-method">
      <h2>Payment Method</h2>
      <div>
        <p>Please select your preferred payment method:</p>
        <button onClick={handleGPayPayment}>GPay</button>
        <button onClick={handlePhonePePayment}>PhonePe</button>
        <button onClick={handlePaytmPayment}>Paytm</button>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'React Basics', description: 'Learn the basics of React' },
    { id: 2, name: 'React Hooks', description: 'Master React Hooks' },
    { id: 3, name: 'Node.js Fundamentals', description: 'Fundamental concepts of Node.js' },
    { id: 4, name: 'Python for Data Science', description: 'Introduction to Python for data analysis' },
    // Add more courses as needed
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleCourseSelect = (course, isChecked) => {
    if (isChecked) {
      setSelectedCourses([...selectedCourses, course]);
    } else {
      setSelectedCourses(selectedCourses.filter((c) => c.id !== course.id));
    }
  };

  const handleRegistrationSubmit = () => {
    // Handle registration submit logic here
    // For simplicity, this function is empty as we are not collecting any data
    setIsRegistered(true);
  };

  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    // You can add logic here to authenticate user with backend
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set isLoggedIn state to false to return to the login page
  };

  return (
    <div className="app" style={{ backgroundColor: '#f9f7f7', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        {isLoggedIn ? (
          <>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Online Course Registration</h1>
            <div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#f2f2f2' }}>Course Name</th>
                    <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#f2f2f2' }}>Description</th>
                    <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#f2f2f2' }}>Select</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <Course key={course.id} course={course} onSelect={handleCourseSelect} />
                  ))}
                </tbody>
              </table>
              <div className="registration">
                <h2>Register for Selected Courses</h2>
                {!isRegistered ? <RegistrationForm onSubmit={handleRegistrationSubmit} /> : <Payment />}
              </div>
              <div className="registered-courses">
                <h2>Selected Courses</h2>
                <ul>
                  {selectedCourses.map((course) => (
                    <li key={course.id}>
                      {course.name} - {course.description}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={handleLogout}>Logout</button> {/* Button to return to the login page */}
            </div>
          </>
        ) : (
          <div className="login">
            <LoginForm onLogin={handleLogin} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
