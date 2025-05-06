package com.example.students.repository;

import com.example.students.model.Grade;
import com.example.students.model.Subject;
import com.example.students.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findBySubject(Subject subject);
    List<Grade> findByStudent(Student student);
}
