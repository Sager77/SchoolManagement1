import React, { useEffect, useState } from 'react';

function Allusers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 8;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/allusers`);
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate indices for current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Handle checkbox toggle
  const handleCheckboxChange = (userid) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userid)
        ? prevSelected.filter((id) => id !== userid)
        : [...prevSelected, userid]
    );
  };

  // Handle bulk delete action
  const handleDelete = async () => {
    if (selectedUsers.length === 0) {
      alert("No users selected for deletion");
      return;
    }

    try {
      await Promise.all(
        selectedUsers.map((userid) =>
          fetch(`${process.env.REACT_APP_API_URL}/users/${userid}`, {
            method: "DELETE",
          })
        )
      );

      // Update UI after deletion
      setUsers(users.filter((user) => !selectedUsers.includes(user.userid)));
      setSelectedUsers([]);
      alert("Selected users deleted successfully");
    } catch (error) {
      console.error("Error deleting users:", error);
      alert("Failed to delete selected users");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">All Students</h1>
      {/* Summary Row */}
      <div className="row mb-3">
        <div className="col-6 bg-light p-4">
          <h5>Total Entries: {users.length}</h5>
        </div>
        <div className="col-6 bg-light p-4">
          <form className="form-inline my-2 my-lg-0 d-flex">
            <input
              className="form-control mr-sm-2 w-75"
              type="search"
              placeholder="Search by name"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-3">
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={selectedUsers.length === 0}
        >
          Delete Selected ({selectedUsers.length})
        </button>
      </div>

      {/* Users Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setSelectedUsers(
                    isChecked ? currentUsers.map((user) => user.userid) : []
                  );
                }}
                checked={
                  selectedUsers.length === currentUsers.length &&
                  currentUsers.length > 0
                }
              />
            </th>
            <th>#</th>
            <th>Name</th>
            <th>Validation ID</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.userid}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.userid)}
                  onChange={() => handleCheckboxChange(user.userid)}
                />
              </td>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.username}</td>
              <td>{user.userid}</td>
              <td>{user.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages).keys()].map((page) => (
              <li
                key={page + 1}
                className={`page-item ${
                  currentPage === page + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Allusers;
