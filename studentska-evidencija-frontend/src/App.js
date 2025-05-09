import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentsPage from './pages/StudentsPage';
import SubjectsPage from './pages/SubjectsPage';
import GradesPage from './pages/GradesPage';

function App() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);

  return (
    <Router>
      <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Studenti</Link>
        <Link to="/subjects" style={{ marginRight: '10px' }}>Predmeti</Link>
        <Link to="/grades">Ocene</Link>
      </div>

      <Routes>
        <Route path="/" element={
          <StudentsPage
            students={students}
            setStudents={setStudents}
            subjects={subjects}
            setSubjects={setSubjects}
          />
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
