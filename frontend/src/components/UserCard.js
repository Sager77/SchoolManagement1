import React, { useState } from 'react';
import logo from '../logo/cguycgud (1).png'; // Adjust the path if necessary
import { Form } from 'react-bootstrap';

const UserCard = () => {
  const [userId, setUserId] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [issueDate, setIssueDate] = useState(''); // New state for issueDate
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUserData = async () => {
    try {
      const selectedCategory = category === 'Custom' ? customCategory : category;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}/${selectedCategory}?issueDate=${issueDate}`
      );

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setErrorMessage('');
      } else {
        setUserData(null);
        setErrorMessage('User not found or issue date mismatch');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage('An error occurred while fetching user data');
    }
  };

  return (
    <>
      <div className="my-md-5 d-flex flex-column align-items-center justify-content-center vh-100">
        <img
          src={logo}
          alt="Logo"
          className="mb-4"
          style={{ width: '200px' }}
        />
        <h2>Student Verification</h2>
        <div className="mb-4 w-50">
          <input
            type="text"
            placeholder="Student ID"
            className="form-control my-2"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

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
              <option value="NDT Testing Certificate">NDT Testing Certificate</option>
              <option value="ISO Certification Course">ISO Certification Course</option>
              <option value="Safety Professionals Course">Safety Professionals Course</option>
              <option value="Custom">Custom Category</option>
            </Form.Select>
          </Form.Group>

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

          {/* Issue Date Input */}
          <input
            type="date"
            placeholder="Enter Issue Date"
            className="form-control my-2"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
          />

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
                <p className="card-text"><strong>End Date:</strong> {new Date(userData.endDate).toLocaleDateString()}</p>
              </div>
              <div className="col-md-4 d-flex justify-content-center mt-4">
                {userData.userimage && (
                  <img
                    src={`https://dashboard.tuvnorth.com/uploads/${userData.userimage}`}
                    alt="User"
                    className="img-fluid"
                    style={{ maxWidth: '150px' }}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {userData && userData.certificate && (
          <div className="col d-flex justify-content-center mt-4">
            {userData.certificate.endsWith('.pdf') ? (
              <a
                href={`http://dashboard.tuvnorth.com/uploads/${userData.certificate}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                View Certificate (PDF)
              </a>
            ) : (
              <img
                src={`http://dashboard.tuvnorth.com/uploads/${userData.certificate}`}
                alt="Certificate"
                className="img-fluid"
                style={{ maxWidth: '150px' }}
              />
            )}
          </div>
        )}

      </div>

    </>
  );
};

export default UserCard;
