import React, { useState } from 'react';

const EditUser = () => {
    const [searchId, setSearchId] = useState('');
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showCustomCategory, setShowCustomCategory] = useState(false);
    const [categories, setCategories] = useState([
        "Training Certificate", "Competency Assessment Card", "Equipment Inspection Certificate", 
        "Calibration Certificate", "NDT Testing Certificate", "ISO Certification Course", 
        "Safety Professionals Course", "Custom"
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedCategory = category === 'Custom' ? customCategory : category;
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/users/${searchId}/${selectedCategory}`,
                { method: 'GET' }
            );
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const selectedCategory = userData.category === 'Custom' ? customCategory : userData.category;
            const updatedData = { ...userData, category: selectedCategory };

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/users/${userData.userid}/${selectedCategory}`,
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

    const handleAddCategory = () => {
        if (customCategory && !categories.includes(customCategory)) {
            setCategories([...categories, customCategory]);
            setCategory(customCategory);
            setCustomCategory('');
            setShowCustomCategory(false);
        }
    };

    return (
        <div>
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
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {category === 'Custom' && (
                    <div className="mb-3 ms-md-3">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => setShowCustomCategory(!showCustomCategory)}
                        >
                            {showCustomCategory ? 'Hide Custom Category' : 'Add Custom Category'}
                        </button>
                    </div>
                )}

                {showCustomCategory && category === 'Custom' && (
                    <div className="mb-3 ms-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Custom Category"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            required
                        />
                        <button 
                            type="button" 
                            className="btn btn-primary mt-2" 
                            onClick={handleAddCategory}
                        >
                            Add
                        </button>
                    </div>
                )}

                <button type="submit" className="btn btn-primary ms-md-3">Search</button>
            </form>

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

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
                                    disabled
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
                                    name="StudenNO"
                                    value={userData.StudenNO || ''}
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
                                <option value="">Select Category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
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
                        <button type="submit" className="btn btn-success">Update</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditUser;
