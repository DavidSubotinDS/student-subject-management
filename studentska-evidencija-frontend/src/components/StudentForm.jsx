import React, { useState, useEffect } from 'react';

function StudentForm({ onSubmit, initialData = {}, onCancel }) {
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [brojIndeksa, setBrojIndeksa] = useState('');
  const [datumRodjenja, setDatumRodjenja] = useState('');
  const [mestoRodjenja, setMestoRodjenja] = useState('');

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setIme(initialData.ime || '');
      setPrezime(initialData.prezime || '');
      setBrojIndeksa(initialData.brojIndeksa || '');
      setDatumRodjenja(initialData.datumRodjenja || '');
      setMestoRodjenja(initialData.mestoRodjenja || '');
    }
  }, [initialData?.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ime || !prezime || !brojIndeksa || !datumRodjenja || !mestoRodjenja) {
      alert('Popunite sva polja!');
      return;
    }

    onSubmit({
      ime,
      prezime,
      brojIndeksa,
      datumRodjenja,
      mestoRodjenja
    });

    if (!initialData.id) {
      setIme('');
      setPrezime('');
      setBrojIndeksa('');
      setDatumRodjenja('');
      setMestoRodjenja('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ime"
        value={ime}
        onChange={e => setIme(e.target.value)}
        autoComplete="off"
      />
      <input
        type="text"
        placeholder="Prezime"
        value={prezime}
        onChange={e => setPrezime(e.target.value)}
        autoComplete="off"
      />
      <input
        type="text"
        placeholder="Broj indeksa"
        value={brojIndeksa}
        onChange={e => setBrojIndeksa(e.target.value)}
        autoComplete="off"
      />
      <input
        type="date"
        value={datumRodjenja}
        onChange={e => setDatumRodjenja(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mesto rođenja"
        value={mestoRodjenja}
        onChange={e => setMestoRodjenja(e.target.value)}
        autoComplete="off"
      />

      <button type="submit">
        {initialData.id ? 'Sačuvaj izmene' : 'Dodaj studenta'}
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Otkaži
        </button>
      )}
    </form>
  );
}

export default StudentForm;
