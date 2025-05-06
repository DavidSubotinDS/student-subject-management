import React, { useState, useEffect } from 'react';

function StudentForm({ initialData, onSubmit, onCancel }) {
  const isEditMode = Boolean(initialData);

  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    predmeti: []
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ime: initialData.ime,
        prezime: initialData.prezime,
        predmeti: initialData.predmeti || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ ime: '', prezime: '', predmeti: [] });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        name="ime"
        placeholder="Ime"
        value={formData.ime}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="prezime"
        placeholder="Prezime"
        value={formData.prezime}
        onChange={handleChange}
        required
      />

      <button type="submit">{isEditMode ? 'Sačuvaj izmene' : 'Dodaj studenta'}</button>
      {isEditMode && <button type="button" onClick={onCancel}>Otkaži</button>}
    </form>
  );
}

export default StudentForm;

