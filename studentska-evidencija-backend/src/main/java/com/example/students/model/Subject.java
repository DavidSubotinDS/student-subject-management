package com.example.students.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String naziv;
    private String profesor;

    @ElementCollection
    private List<Long> upisaniStudenti;

    // Getteri i setteri
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNaziv() { return naziv; }
    public void setNaziv(String naziv) { this.naziv = naziv; }

    public String getProfesor() { return profesor; }
    public void setProfesor(String profesor) { this.profesor = profesor; }

    public List<Long> getUpisaniStudenti() { return upisaniStudenti; }
    public void setUpisaniStudenti(List<Long> upisaniStudenti) { this.upisaniStudenti = upisaniStudenti; }
}
