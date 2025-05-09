package com.example.students.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Ime je obavezno")
    private String ime;

    @NotBlank(message = "Prezime je obavezno")
    private String prezime;

    @NotBlank(message = "Broj indeksa je obavezan")
    private String brojIndeksa;

    @NotBlank(message = "Mesto rođenja je obavezno")
    private String mestoRodjenja;

    @NotBlank(message = "Datum rođenja je obavezan")
    private String datumRodjenja;
}
