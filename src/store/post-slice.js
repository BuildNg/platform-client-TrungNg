import axios from 'axios';

const ROOT_URL = 'https://platform-api-buildng.onrender.com/api';
const API_KEY = '?key=Trung_Nguyen';

export default function createPostSlice(set, get) {
  return {
    all: [],
    current: {},
    fetchPost: async (id) => {
      try {
        const response = await axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
        set(({ postSlice }) => { postSlice.current = response.data; }, false, 'posts/fetchPost');
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    fetchAllPosts: async () => {
      try {
        const response = await axios.get(`${ROOT_URL}/posts/${API_KEY}`);
        set(({ postSlice }) => { postSlice.all = response.data; }, false, 'posts/fetchAllPosts');
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
    updatePost: async (fields, id) => {
      try {
        await axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields);
      } catch (error) {
        set().errorSlice.newError(error.message);
      }
    },
    createPost: async (post) => {
      try {
        await axios.post(`${ROOT_URL}/posts/${API_KEY}`, post);
      } catch (error) {
        set().errorSlice.newError(error.message);
      }
    },
    deletePost: async (id) => {
      try {
        await axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },
  };
}
