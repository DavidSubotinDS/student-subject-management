package com.example.students.controller;

import com.example.students.model.Student;
import com.example.students.repository.StudentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping
    public Student createStudent(@Valid @RequestBody Student student) {
        return studentRepository.save(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @Valid @RequestBody Student updatedStudent) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student sa ID " + id + " nije pronađen"));

        existingStudent.setIme(updatedStudent.getIme());
        existingStudent.setPrezime(updatedStudent.getPrezime());
        existingStudent.setBrojIndeksa(updatedStudent.getBrojIndeksa());
        existingStudent.setMestoRodjenja(updatedStudent.getMestoRodjenja());
        existingStudent.setDatumRodjenja(updatedStudent.getDatumRodjenja());

        return studentRepository.save(existingStudent);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student sa ID " + id + " ne postoji"));

        // Ovde bi se inače proverilo da nije upisan na predmet
        // primer: if (!student.getSubjects().isEmpty()) throw new ...

        studentRepository.deleteById(id);
    }
}

