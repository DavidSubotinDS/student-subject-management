import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentsPage from './pages/StudentsPage';
import SubjectsPage from './pages/SubjectsPage';
import GradesPage from './pages/GradesPage'; // <- dodat import

function App() {
  const [students, setStudents] = useState([
    { id: 1, ime: 'Ana', prezime: 'Anić', brojIndeksa: 'IT1/2021', predmeti: [] },
    { id: 2, ime: 'Milan', prezime: 'Milić', brojIndeksa: 'IT2/2021', predmeti: [] },
    { id: 3, ime: 'Jovana', prezime: 'Jović', brojIndeksa: 'IT3/2021', predmeti: [] },
  ]);

  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]); // <- dodat state za ocene

  return (
    <Router>
      <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Studenti</Link>
        <Link to="/subjects" style={{ marginRight: '10px' }}>Predmeti</Link>
        <Link to="/grades">Ocene</Link> {/* <- dodat link */}
      </div>

      <Routes>
        <Route path="/" element={
          <StudentsPage students={students} setStudents={setStudents} />
        } />
        <Route path="/subjects" element={
          <SubjectsPage
            students={students}
            setStudents={setStudents}
            subjects={subjects}
            setSubjects={setSubjects}
          />
        } />
        <Route path="/grades" element={
          <GradesPage
            students={students}
            subjects={subjects}
            grades={grades}
            setGrades={setGrades}
          />
        } />
      </Routes>
    </Router>
  );
}

export default App;

