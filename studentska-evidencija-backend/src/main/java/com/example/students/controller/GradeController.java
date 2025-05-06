package com.example.students.controller;

import com.example.students.model.Grade;
import com.example.students.model.Student;
import com.example.students.model.Subject;
import com.example.students.repository.GradeRepository;
import com.example.students.repository.StudentRepository;
import com.example.students.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/grades")
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
                .orElseThrow(() -> new RuntimeException("Predmet nije pronađen"));
        return gradeRepository.findBySubject(subject);
    }

    @PostMapping
    public Grade createGrade(@RequestBody Grade grade) {
        if (grade.getVrednost() < 6 || grade.getVrednost() > 10) {
            throw new IllegalArgumentException("Ocena mora biti između 6 i 10.");
        }
        return gradeRepository.save(grade);
    }

    @PutMapping("/{id}")
    public Grade updateGrade(@PathVariable Long id, @RequestBody Grade updated) {
        Grade existing = gradeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ocena nije pronađena"));

        if (updated.getVrednost() < 6 || updated.getVrednost() > 10) {
            throw new IllegalArgumentException("Ocena mora biti između 6 i 10.");
        }

        existing.setVrednost(updated.getVrednost());
        existing.setStudent(updated.getStudent());
        existing.setSubject(updated.getSubject());

        return gradeRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteGrade(@PathVariable Long id) {
        gradeRepository.deleteById(id);
    }
}
