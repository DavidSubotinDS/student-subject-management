import React, { useEffect, useState } from 'react';
import StudentForm from '../components/StudentForm';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from '../services/StudentService';

function StudentsPage({ subjects, setSubjects }) {
  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);

  useEffect(() => {
    getAllStudents()
      .then(response => setStudents(response.data))
      .catch(err => console.error("Greška prilikom učitavanja studenata:", err));
  }, []);

  const handleAddStudent = (newStudent) => {
    createStudent(newStudent)
      .then(response => {
        setStudents(prev => [...prev, response.data]);
      })
      .catch(err => console.error("Greška prilikom dodavanja:", err));
  };

  const handleEditStudent = (updatedData) => {
    const id = editingStudentId;

    updateStudent(id, updatedData)
      .then(response => {
        setStudents(prev => prev.map(s =>
          s.id === id ? response.data : s
        ));

        setSubjects(prev =>
          prev.map(p => ({
            ...p,
            upisaniStudenti: p.upisaniStudenti.map(sid =>
              sid === id ? response.data.id : sid
            )
          }))
        );

        setEditingStudentId(null);
      })
      .catch(err => console.error("Greška prilikom izmene:", err));
  };

  const handleDeleteStudent = (id) => {
    const isEnrolled = subjects.some(p =>
      p.upisaniStudenti.includes(id)
    );

    if (isEnrolled) {
      alert("Ne možete obrisati studenta jer je upisan na neki predmet.");
      return;
    }

    deleteStudent(id)
      .then(() => {
        setStudents(prev => prev.filter(s => s.id !== id));
      })
      .catch(err => console.error("Greška prilikom brisanja:", err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Evidencija studenata</h2>

      {!editingStudentId && (
        <StudentForm onSubmit={handleAddStudent} />
      )}

      <h3>Uneseni studenti</h3>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {editingStudentId === student.id ? (
              <StudentForm
                initialData={student}
                onSubmit={handleEditStudent}
                onCancel={() => setEditingStudentId(null)}
              />
            ) : (
              <>
                {student.ime} {student.prezime}
                <button onClick={() => setEditingStudentId(student.id)} style={{ marginLeft: '10px' }}>Uredi</button>
                <button onClick={() => handleDeleteStudent(student.id)} style={{ marginLeft: '10px' }}>Obriši</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsPage;
