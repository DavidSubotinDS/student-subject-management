import React, { useEffect, useState } from 'react';
import {
  getGradesBySubject,
  addGrade,
  updateGrade,
  deleteGrade
} from '../services/GradeService';

import { getAllSubjects } from '../services/SubjectService';
import { getAllStudents } from '../services/StudentService';

import GradeForm from '../components/GradeForm';

function GradesPage() {
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [editingGrade, setEditingGrade] = useState(null);

  useEffect(() => {
    getAllSubjects()
      .then(res => setSubjects(res.data))
      .catch(err => console.error('Greška pri dohvatanju predmeta:', err));

    getAllStudents()
      .then(res => setStudents(res.data))
      .catch(err => console.error('Greška pri dohvatanju studenata:', err));
  }, []);

  useEffect(() => {
    if (selectedSubjectId) {
      getGradesBySubject(selectedSubjectId)
        .then(res => {
          console.log('Ocene:', res.data);
          setGrades(res.data);
        })
        .catch(err => console.error('Greška pri dohvatanju ocena:', err));
    } else {
      setGrades([]);
    }
  }, [selectedSubjectId]);

  const handleAddGrade = (gradeData) => {
    addGrade({
      vrednost: gradeData.vrednost,
      studentId: gradeData.studentId,
      subjectId: gradeData.subjectId
    })
      .then(() => getGradesBySubject(gradeData.subjectId))
      .then(res => setGrades(res.data))
      .catch(err => console.error('Greška pri dodavanju ocene:', err));
  };

  const handleUpdateGrade = (gradeId, gradeData) => {
    updateGrade(gradeId, {
      vrednost: gradeData.vrednost,
      studentId: gradeData.studentId,
      subjectId: gradeData.subjectId
    })
      .then(() => {
        setEditingGrade(null);
        return getGradesBySubject(gradeData.subjectId);
      })
      .then(res => setGrades(res.data))
      .catch(err => console.error('Greška pri izmeni ocene:', err));
  };

  const handleDeleteGrade = (gradeId) => {
    deleteGrade(gradeId)
      .then(() => getGradesBySubject(selectedSubjectId))
      .then(res => setGrades(res.data))
      .catch(err => console.error('Greška pri brisanju ocene:', err));
  };

  const getStudentName = (student) => {
    return student
      ? `${student.ime} ${student.prezime} (${student.brojIndeksa})`
      : 'Nepoznat student';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ocene</h2>

      <label>Izaberi predmet:</label>
      <select value={selectedSubjectId} onChange={e => setSelectedSubjectId(e.target.value)}>
        <option value="">-- Izaberi --</option>
        {subjects.map(s => (
          <option key={s.id} value={s.id}>{s.naziv}</option>
        ))}
      </select>

      {selectedSubjectId && (
        <GradeForm
          subjectId={selectedSubjectId}
          students={students}
          initialData={
            editingGrade
              ? {
                  id: editingGrade.id,
                  studentId: editingGrade.student?.id,
                  subjectId: selectedSubjectId,
                  vrednost: editingGrade.vrednost
                }
              : null
          }
          onSubmit={editingGrade ? (data) => handleUpdateGrade(editingGrade.id, data) : handleAddGrade}
          onCancel={() => setEditingGrade(null)}
        />
      )}

      <h3>Unete ocene</h3>
      <ul>
        {grades.map(g => (
          <li key={g.id}>
            {getStudentName(g.student)} — Ocena: {g.vrednost}
            <button onClick={() => setEditingGrade(g)} style={{ marginLeft: '10px' }}>Izmeni</button>
            <button onClick={() => handleDeleteGrade(g.id)} style={{ marginLeft: '10px' }}>Obriši</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GradesPage;
