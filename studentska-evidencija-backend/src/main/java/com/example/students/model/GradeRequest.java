package com.example.students.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class GradeRequest {

    @NotNull(message = "ID studenta je obavezan")
    private Long studentId;

    @NotNull(message = "ID predmeta je obavezan")
    private Long subjectId;

    @NotNull(message = "Vrednost ocene je obavezna")
    @Min(value = 6, message = "Ocena ne može biti manja od 6")
    @Max(value = 10, message = "Ocena ne može biti veća od 10")
    private Integer vrednost;

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public Integer getVrednost() {
        return vrednost;
    }

    public void setVrednost(Integer vrednost) {
        this.vrednost = vrednost;
    }
}
