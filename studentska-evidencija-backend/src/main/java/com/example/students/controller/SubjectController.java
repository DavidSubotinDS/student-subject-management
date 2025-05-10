package com.example.students.controller;

import com.example.students.model.Subject;
import com.example.students.repository.SubjectRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://localhost:3000")
public class SubjectController {

    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @PostMapping
    public Subject createSubject(@Valid @RequestBody Subject subject) {
        if (subject.getUpisaniStudenti() == null) {
            subject.setUpisaniStudenti(List.of());
        }
        return subjectRepository.save(subject);
    }

    @PutMapping("/{id}")
    public Subject updateSubject(@PathVariable Long id, @Valid @RequestBody Subject updatedSubject) {
        if (!subjectRepository.existsById(id)) {
            throw new RuntimeException("Predmet sa ID " + id + " ne postoji");
        }

        if (updatedSubject.getUpisaniStudenti() == null) {
            updatedSubject.setUpisaniStudenti(List.of());
        }

        updatedSubject.setId(id);
        return subjectRepository.save(updatedSubject);
    }

    @DeleteMapping("/{id}")
    public void deleteSubject(@PathVariable Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Predmet sa ID " + id + " nije pronađen"));

        if (subject.getUpisaniStudenti() != null && !subject.getUpisaniStudenti().isEmpty()) {
            throw new RuntimeException("Predmet ima aktivne studente. Prvo ih uklonite.");
        }

        subjectRepository.deleteById(id);
    }
}
