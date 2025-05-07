package com.example.students.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Naziv predmeta je obavezan")
    private String naziv;

    @NotBlank(message = "Ime profesora je obavezno")
    private String profesor;

    @ElementCollection
    private List<Long> upisaniStudenti;
}
