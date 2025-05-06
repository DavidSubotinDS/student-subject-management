import React, { useState, useEffect } from 'react';

function GradeForm({ subjectId, students, initialData, onSubmit, onCancel }) {
  const [studentId, setStudentId] = useState('');
  const [vrednost, setVrednost] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setStudentId(initialData.studentId.toString());
      setVrednost(initialData.vrednost.toString());
    } else {
      setStudentId('');
      setVrednost('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedGrade = parseInt(vrednost, 10);
    const parsedStudentId = parseInt(studentId, 10);

    if (isNaN(parsedGrade) || parsedGrade < 6 || parsedGrade > 10) {
      setError('Ocena mora biti broj između 6 i 10.');
      return;
    }

    if (isNaN(parsedStudentId)) {
      setError('Morate izabrati studenta.');
      return;
    }

    setError('');
    onSubmit({ studentId: parsedStudentId, subjectId, vrednost: parsedGrade });

    if (!initialData) {
      setStudentId('');
      setVrednost('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h3>{initialData ? 'Izmeni ocenu' : 'Dodaj ocenu'}</h3>

      <label>Student:</label>
      <select value={studentId} onChange={e => setStudentId(e.target.value)} required>
        <option value="">-- Izaberi studenta --</option>
        {students.map(s => (
          <option key={s.id} value={s.id}>
            {s.ime} {s.prezime}
          </option>
        ))}
      </select>

      <br />

      <label>Ocena (6–10):</label>
      <input
        type="number"
        value={vrednost}
        onChange={e => setVrednost(e.target.value)}
        min="6"
        max="10"
        required
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <br />
      <button type="submit">{initialData ? 'Sačuvaj izmene' : 'Dodaj ocenu'}</button>
      {initialData && (
        <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
          Otkaži
        </button>
      )}
    </form>
  );
}

export default GradeForm;


