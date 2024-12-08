import React, { useState } from 'react';

const EditUser = () => {
    const [searchId, setSearchId] = useState('');
    const [searchCategory, setSearchCategory] = useState('Safety Professional');
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle searching for a user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.API_URL}/users/${searchId}/${searchCategory}`, {
                method: 'GET'
            });
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'User not found');
                return;
            }
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
            const response = await fetch(`${process.env.API_URL}/users/${userData.userid}/${userData.category}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
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
                        className="form-select"
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        required
                    >
                        <option>Safety Professional</option>
                        <option>Inspection Certificate</option>
                        <option>NDT Certificate</option>
                        <option>Calibration Certificate</option>
                        <option>Training Certificate</option>
                        <option>Competency Certificate</option>
                    </select>
                </div>
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
                                <label>Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    value={userData.category || ''}
                                    onChange={handleChange}
                                />
                            </div>
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
                        </div>
                        <div className="row">
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
                        <button type="submit" className="btn btn-success">Update</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditUser;
