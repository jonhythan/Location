package com.godin.locationSpring.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Administrateur {

    @Id
    @Column(name = "utilisateur_id")
    private int utilisateurId;

    private LocalDate dateEmbauche;

    public int getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(int utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public LocalDate getDateEmbauche() {
        return dateEmbauche;
    }

    public void setDateEmbauche(LocalDate dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
    }
}
