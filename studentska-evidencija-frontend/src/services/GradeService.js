import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/grades';

export const getGradesBySubject = (subjectId) =>
  axios.get(`${BASE_URL}/subject/${subjectId}`);

export const addGrade = (grade) =>
  axios.post(BASE_URL, grade);

export const updateGrade = (id, grade) =>
  axios.put(`${BASE_URL}/${id}`, grade);

export const deleteGrade = (id) =>
  axios.delete(`${BASE_URL}/${id}`);
