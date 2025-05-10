import React, { useEffect, useState } from 'react';
import SubjectForm from '../components/SubjectForm';
import {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject
} from '../services/SubjectService';

function SubjectsPage({ students, setStudents }) {
  const [subjects, setSubjects] = useState([]);
  const [editingSubjectId, setEditingSubjectId] = useState(null);

  useEffect(() => {
    getAllSubjects()
      .then(res => {
        const safeSubjects = res.data.map(s => ({
          ...s,
          upisaniStudenti: s.upisaniStudenti || []
        }));
        setSubjects(safeSubjects);
      })
      .catch(err => console.error('Greška pri dohvatanju predmeta:', err));
  }, []);

  const handleAddSubject = (newSubject) => {
    createSubject(newSubject)
      .then(res => {
        const novi = {
          ...res.data,
          upisaniStudenti: res.data.upisaniStudenti || []
        };
        setSubjects(prev => [...prev, novi]);

        setStudents(prev => prev.map(student => {
          const updatedPredmeti = Array.isArray(student.predmeti) ? student.predmeti : [];
          if (newSubject.upisaniStudenti.includes(student.id)) {
            return {
              ...student,
              predmeti: [...updatedPredmeti, {
                id: novi.id,
                naziv: novi.naziv,
                profesor: novi.profesor
              }]
            };
          }
          return student;
        }));
      })
      .catch(err => console.error('Greška pri dodavanju predmeta:', err));
  };

  const handleDeleteSubject = (subjectId) => {
    const isEnrolled = students.some(student => {
      const predmeti = Array.isArray(student.predmeti) ? student.predmeti : [];
      return predmeti.some(predmet => predmet.id === subjectId);
    });

    if (isEnrolled) {
      alert("Ne možete obrisati predmet jer je neki student upisan na njega.");
      return;
    }

    deleteSubject(subjectId)
      .then(() => {
        setSubjects(prev => prev.filter(p => p.id !== subjectId));
      })
      .catch(err => console.error('Greška pri brisanju predmeta:', err));
  };

  const handleEditClick = (id) => {
    setEditingSubjectId(id);
  };

  const handleEditSubmit = (updatedData) => {
    const subjectId = editingSubjectId;

    updateSubject(subjectId, updatedData)
      .then(() => {
        setSubjects(prev =>
          prev.map(sub =>
            sub.id === subjectId
              ? { ...sub, ...updatedData, upisaniStudenti: updatedData.upisaniStudenti || [] }
              : sub
          )
        );

        setStudents(prev =>
          prev.map(student => {
            const predmeti = Array.isArray(student.predmeti) ? student.predmeti : [];
            const wasEnrolled = predmeti.some(p => p.id === subjectId);
            const shouldBeEnrolled = updatedData.upisaniStudenti.includes(student.id);

            if (!wasEnrolled && shouldBeEnrolled) {
              return {
                ...student,
                predmeti: [...predmeti, {
                  id: subjectId,
                  naziv: updatedData.naziv,
                  profesor: updatedData.profesor
                }]
              };
            }

            if (wasEnrolled && !shouldBeEnrolled) {
              return {
                ...student,
                predmeti: predmeti.filter(p => p.id !== subjectId)
              };
            }

            if (wasEnrolled && shouldBeEnrolled) {
              return {
                ...student,
                predmeti: predmeti.map(p =>
                  p.id === subjectId ? { ...p, naziv: updatedData.naziv, profesor: updatedData.profesor } : p
                )
              };
            }

            return student;
          })
        );

        setEditingSubjectId(null);
      })
      .catch(err => console.error('Greška pri ažuriranju predmeta:', err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Evidencija predmeta</h2>

      {!editingSubjectId && (
        <SubjectForm
          students={students}
          onSubmit={handleAddSubject}
        />
      )}

      <h3>Uneseni predmeti</h3>
      <ul>
        {subjects.map(sub => (
          <li key={sub.id}>
            {editingSubjectId === sub.id ? (
              <SubjectForm
                initialData={sub}
                students={students}
                onSubmit={handleEditSubmit}
                onCancel={() => setEditingSubjectId(null)}
              />
            ) : (
              <>
                <strong>{sub.naziv}</strong> — {sub.profesor}
                <button onClick={() => handleEditClick(sub.id)} style={{ marginLeft: '10px' }}>Uredi</button>
              </>
            )}
            <br />
            Studenti:
            <ul>
              {(sub.upisaniStudenti?.length > 0) ? (
                sub.upisaniStudenti.map(sid => {
                  const student = students.find(s => s.id === sid);
                  return <li key={sid}>{student?.ime} {student?.prezime}</li>;
                })
              ) : (
                <li>nema upisanih studenata</li>
              )}
            </ul>
            {(sub.upisaniStudenti?.length === 0 && editingSubjectId !== sub.id) && (
              <button onClick={() => handleDeleteSubject(sub.id)}>Obriši predmet</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectsPage;
