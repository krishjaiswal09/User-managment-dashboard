import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Alert,
  Pagination,
} from "@mui/material";
import { userService } from '../services/userService';
import UserTable from './UserTable'; 

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    address: "",
    phone: "",
    company: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await userService.fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = await userService.addUser(formData);
      setUsers([...users, newUser]);
      resetForm();
      setSuccess("User added successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await userService.updateUser(formData);
      const updatedUsers = users.map((user) =>
        user.id === formData.id ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsers);
      resetForm();
      setSuccess("User updated successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await userService.deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      setSuccess("User deleted successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({ id: null, name: "", email: "", address: "", phone: "", company: "" });
    setIsEditing(false);
  };

  const handleEditClick = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address.street,
      phone: user.phone,
      company: user.company.name,
    });
    setIsEditing(true);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Pagination logic
  const paginatedUsers = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        px: 4,
        py: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        User Management Dashboard
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <form onSubmit={isEditing ? handleEditUser : handleAddUser} style={{ marginBottom: "20px" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            {isEditing ? "Update User" : "Add User"}
          </Button>
        </Box>
      </form>

      <UserTable
        users={paginatedUsers} // Pass only the paginated users
        onEditClick={handleEditClick}
        setUsers={setUsers}
        setError={setError}
        setSuccess={setSuccess}
      />

      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(users.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default UserManagement;
