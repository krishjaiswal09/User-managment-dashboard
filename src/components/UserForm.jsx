import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { userService } from "../services/userService";

const UserForm = ({
  formData,
  setFormData,
  isEditing,
  setIsEditing,
  setUsers,
  setSuccess,
  setError,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ id: null, name: "", email: "", address: "", phone: "", company: "" });
    setIsEditing(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = await userService.addUser(formData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
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
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === formData.id ? { ...user, ...updatedUser } : user))
      );
      resetForm();
      setSuccess("User updated successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
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
  );
};

export default UserForm;
