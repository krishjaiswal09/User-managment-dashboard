import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const userService = {
  fetchUsers: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  addUser: async (userData) => {
    try {
      const response = await axios.post(API_URL, {
        name: userData.name,
        email: userData.email,
        address: { street: userData.address },
        phone: userData.phone,
        company: { name: userData.company },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add user');
    }
  },

  updateUser: async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/${userData.id}`, {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        address: { street: userData.address },
        phone: userData.phone,
        company: { name: userData.company },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  },

  deleteUser: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
};
