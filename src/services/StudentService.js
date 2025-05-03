import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/students';

const StudentService = {
  getAll: () => axios.get(BASE_URL),
  create: (student) => axios.post(BASE_URL, student),
  update: (id, student) => axios.put(`${BASE_URL}/${id}`, student),
  delete: (id) => axios.delete(`${BASE_URL}/${id}`)
};

export default StudentService;
