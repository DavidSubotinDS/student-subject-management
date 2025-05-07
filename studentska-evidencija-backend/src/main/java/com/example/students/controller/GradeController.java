package com.example.students.controller;

import com.example.students.model.Grade;
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
        return gradeRepository.findBySubject(
                subjectRepository.findById(subjectId)
                        .orElseThrow(() -> new RuntimeException("Predmet sa ID " + subjectId + " nije pronađen"))
        );
    }

    @PostMapping
    public Grade createGrade(@Valid @RequestBody Grade grade) {
        validateGrade(grade);
        return gradeRepository.save(grade);
    }

    @PutMapping("/{id}")
    public Grade updateGrade(@PathVariable Long id, @Valid @RequestBody Grade updatedGrade) {
        Grade existing = gradeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ocena sa ID " + id + " nije pronađena"));

        validateGrade(updatedGrade);
        existing.setVrednost(updatedGrade.getVrednost());
        existing.setStudent(updatedGrade.getStudent());
        existing.setSubject(updatedGrade.getSubject());

        return gradeRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteGrade(@PathVariable Long id) {
        if (!gradeRepository.existsById(id)) {
            throw new RuntimeException("Ocena sa ID " + id + " ne postoji");
        }
        gradeRepository.deleteById(id);
    }

    private void validateGrade(Grade grade) {
        if (!studentRepository.existsById(grade.getStudent().getId())) {
            throw new IllegalArgumentException("Student ne postoji u bazi");
        }
        if (!subjectRepository.existsById(grade.getSubject().getId())) {
            throw new IllegalArgumentException("Predmet ne postoji u bazi");
        }
    }
}
