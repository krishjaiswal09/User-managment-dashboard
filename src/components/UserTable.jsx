import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { userService } from '../services/userService'; // Ensure this import is correct

const UserTable = ({ users, onEditClick, setUsers, setError, setSuccess }) => {
  const handleDeleteUser = async (id) => {
    // Clear any existing error or success messages before making the API call
    setError('');
    setSuccess('');

    try {
      await userService.deleteUser(id);
      // Update the users list by removing the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setSuccess("User deleted successfully");
    } catch (err) {
      // Handle errors appropriately
      setError("Failed to delete user. Please try again.");
      console.error("Error deleting user:", err);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "calc(100vh - 200px)", overflowX: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address.street}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.company.name}</TableCell>
              <TableCell align="center">
                <IconButton edge="end" onClick={() => onEditClick(user)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" color="error" onClick={() => handleDeleteUser(user.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable; // Ensure you export the component by default
