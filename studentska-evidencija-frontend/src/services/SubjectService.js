import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/subjects';

export const getAllSubjects = () => axios.get(BASE_URL);

export const createSubject = (subject) => axios.post(BASE_URL, subject);

export const updateSubject = (id, subject) => axios.put(`${BASE_URL}/${id}`, subject);

export const deleteSubject = (id) => axios.delete(`${BASE_URL}/${id}`);
