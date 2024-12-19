import React, { useState } from 'react';

const EditUser = () => {
    const [searchId, setSearchId] = useState('');
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle searching for a user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // If category is custom, use the custom category value
            const selectedCategory = category === 'Custom' ? customCategory : category;

            // Make sure the API URL is correct
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/users/search?userid=${searchId}&category=${selectedCategory}`,
                { method: 'GET' }
            );

            // Check if the response is OK
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'User not found');
                return;
            }

            // If user found, set the user data
            const data = await response.json();
            setUserData(data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching user data:', error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    // Function to handle updates to each form field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to handle updating user data
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const selectedCategory = userData.category === 'Custom' ? customCategory : userData.category;
            const updatedData = { ...userData, category: selectedCategory };

            // Make sure the correct API endpoint is used for updating the user
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/users/${userData.userid}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (response.ok) {
                alert('User updated successfully!');
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div>
            {/* Search Form */}
            <form onSubmit={handleSubmit} className="d-md-flex justify-content-center align-items-center px-3 p-3 my-3 bg-light">
                <div className="mb-3 ms-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Student ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 ms-md-3">
                    <select
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Training Certificate">Training Certificate</option>
                        <option value="Competency Assessment Card">Competency Assessment Card</option>
                        <option value="Equipment Inspection Certificate">Equipment Inspection Certificate</option>
                        <option value="Calibration Certificate">Calibration Certificate</option>
                        <option value="NDT Testing Certificate">Training Certificate</option>
                        <option value="ISO Certification Course">Competency Certificate</option>
                        <option value="Safety Professionals Course">Safety Professionals Course</option>
                        <option value="Custom">Custom Category</option> {/* New option */}
                    </select>
                </div>
                {category === 'Custom' && (
                    <div className="mb-3 ms-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Custom Category"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit" className="btn btn-primary ms-md-3">Search</button>
            </form>

            {/* Display Error Message */}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            {/* Display and Edit User Data */}
            {userData && (
                <div className="mt-4">
                    <h3>Edit User Details</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Student Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={userData.username || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Student ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="userid"
                                    value={userData.userid || ''}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Card No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cardno"
                                    value={userData.cardno || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Student No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="studentno"
                                    value={userData.studentno || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Issue Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="issueDate"
                                    value={userData.issueDate ? new Date(userData.issueDate).toISOString().substring(0, 10) : ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>End Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="endDate"
                                    value={userData.endDate ? new Date(userData.endDate).toISOString().substring(0, 10) : ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>Category</label>
                            <select
                                className="form-control"
                                name="category"
                                value={userData.category || ''}
                                onChange={(e) => {
                                    if (e.target.value === 'Custom') setCustomCategory('');
                                    handleChange(e);
                                }}
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="Student">Student</option>
                                <option value="Admin">Admin</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Custom">Custom</option>
                            </select>
                            {userData.category === 'Custom' && (
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    placeholder="Enter Custom Category"
                                    value={customCategory}
                                    onChange={(e) => setCustomCategory(e.target.value)}
                                />
                            )}
                        </div>
                        <button type="submit" className="btn" style={{ backgroundColor: '#050c9c', color: 'white' }}>
                            Update
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditUser;
