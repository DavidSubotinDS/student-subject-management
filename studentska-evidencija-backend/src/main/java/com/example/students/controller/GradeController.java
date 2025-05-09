package com.example.students.controller;

import com.example.students.model.Grade;
import com.example.students.model.GradeRequest;
import com.example.students.model.Student;
import com.example.students.model.Subject;
import com.example.students.repository.GradeRepository;
import com.example.students.repository.StudentRepository;
import com.example.students.repository.SubjectRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "http://localhost:3000")
public class GradeController {

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping("/subject/{subjectId}")
    public List<Grade> getGradesBySubject(@PathVariable Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Predmet sa ID " + subjectId + " nije pronađen"));
        return gradeRepository.findBySubject(subject);
    }

    @PostMapping
    public Grade createGrade(@Valid @RequestBody GradeRequest request) {
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student sa ID " + request.getStudentId() + " nije pronađen"));

        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Predmet sa ID " + request.getSubjectId() + " nije pronađen"));

        Grade grade = new Grade();
        grade.setVrednost(request.getVrednost());
        grade.setStudent(student);
        grade.setSubject(subject);

        return gradeRepository.save(grade);
    }

    @PutMapping("/{id}")
    public Grade updateGrade(@PathVariable Long id, @Valid @RequestBody GradeRequest request) {
        Grade existing = gradeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ocena sa ID " + id + " nije pronađena"));

        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student sa ID " + request.getStudentId() + " nije pronađen"));

        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Predmet sa ID " + request.getSubjectId() + " nije pronađen"));

        existing.setVrednost(request.getVrednost());
        existing.setStudent(student);
        existing.setSubject(subject);

        return gradeRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteGrade(@PathVariable Long id) {
        if (!gradeRepository.existsById(id)) {
            throw new RuntimeException("Ocena sa ID " + id + " ne postoji");
        }
        gradeRepository.deleteById(id);
    }
}
