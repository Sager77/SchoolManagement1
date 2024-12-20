import React, { useState } from 'react';
import logo from '../logo/cguycgud (1).png'; // Adjust the path if necessary
import { Form } from 'react-bootstrap'; // Import Form from React-Bootstrap

const UserCard = () => {
  const [userId, setUserId] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState(''); // New state for custom category
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUserData = async () => {
    try {
      const selectedCategory = category === 'Custom' ? customCategory : category; // Use customCategory if selected
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}/${selectedCategory}`
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setErrorMessage('');
      } else {
        setUserData(null);
        setErrorMessage('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage('An error occurred while fetching user data');
    }
  };

  return (
    <div className="my-md-5 d-flex flex-column align-items-center justify-content-center vh-100">
      <img
        src={logo}
        alt="Logo"
        className="mb-4"
        style={{ width: '200px' }} // Adjust logo size as needed
      />
      <h2>Student Verification</h2>
      <div className="mb-4 w-50"> {/* Adjust width for form container */}
        <input
          type="text"
          placeholder="Student ID"
          className="form-control my-2"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        {/* Category dropdown with Form.Label and Form.Select */}
        <Form.Group controlId="category" className="my-2">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Training Certificate">Training Certificate</option>
            <option value="Competency Assessment Card">Competency Assessment Card</option>
            <option value="Equipment Inspection Certificate">Equipment Inspection Certificate</option>
            <option value="Calibration Certificate">Calibration Certificate</option>
            <option value="Safety Professionals Course">Safety Professionals Course</option>
            <option value="Custom">Custom Category</option> {/* New option */}
          </Form.Select>
        </Form.Group>

        {/* Custom category input */}
        {category === 'Custom' && (
          <input
            type="text"
            placeholder="Enter Custom Category"
            className="form-control my-2"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            required
          />
        )}

        <button className="btn btn-primary w-100" onClick={fetchUserData}>
          Show Student Card
        </button>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {userData && (
        <div className="card shadow p-5 border-light-subtle w-lg-100">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h5 className="card-title">{userData.username}</h5>
              <p className="card-text"><strong>Card Number:</strong> {userData.cardno}</p>
              <p className="card-text"><strong>Student Number:</strong> {userData.StudenNO}</p>
              <p className="card-text"><strong>Category:</strong> {userData.category}</p>
              <p className="card-text"><strong>Issue Date:</strong> {new Date(userData.issueDate).toLocaleDateString()}</p>
            </div>
            <div className="col-md-4 d-flex justify-content-center mt-4">
              <img
                src={`http://dashboard.validate.com/uploads/${userData.userimage}`}
                alt="User"
                className="img-fluid"
                style={{ maxWidth: '150px' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
