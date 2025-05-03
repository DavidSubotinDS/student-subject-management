import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/subjects';

const SubjectService = {
  getAll: () => axios.get(BASE_URL),
  create: (subject) => axios.post(BASE_URL, subject),
  update: (id, subject) => axios.put(`${BASE_URL}/${id}`, subject),
  delete: (id) => axios.delete(`${BASE_URL}/${id}`)
};

export default SubjectService;
