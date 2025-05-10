import React, { useState, useEffect } from 'react';

function SubjectForm({ initialData, students, onSubmit, onCancel }) {
  const isEditMode = Boolean(initialData);

  const [formData, setFormData] = useState({
    naziv: '',
    profesor: '',
    upisaniStudenti: []
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        naziv: initialData.naziv,
        profesor: initialData.profesor,
        upisaniStudenti: initialData.upisaniStudenti || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStudentCheckbox = (id) => {
    const isChecked = formData.upisaniStudenti.includes(id);
    setFormData({
      ...formData,
      upisaniStudenti: isChecked
        ? formData.upisaniStudenti.filter(sid => sid !== id)
        : [...formData.upisaniStudenti, id]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validForm = {
      ...formData,
      upisaniStudenti: formData.upisaniStudenti || [] // sigurnost da nije null
    };
    onSubmit(validForm);
    setFormData({ naziv: '', profesor: '', upisaniStudenti: [] });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        name="naziv"
        placeholder="Naziv predmeta"
        value={formData.naziv}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="profesor"
        placeholder="Ime profesora"
        value={formData.profesor}
        onChange={handleChange}
        required
      />

      <div>
        <strong>Izaberi studente:</strong>
        {students.map(s => (
          <div key={s.id}>
            <label>
              <input
                type="checkbox"
                checked={formData.upisaniStudenti.includes(s.id)}
                onChange={() => handleStudentCheckbox(s.id)}
              />
              {s.ime} {s.prezime}
            </label>
          </div>
        ))}
      </div>

      <button type="submit">{isEditMode ? 'Sačuvaj izmene' : 'Dodaj predmet'}</button>
      {isEditMode && <button type="button" onClick={onCancel}>Otkaži</button>}
    </form>
  );
}

export default SubjectForm;
