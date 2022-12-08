package com.godin.locationSpring.model;

import javax.persistence.*;
import java.time.LocalDate;
@Entity
public class Annonce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "utilisateur_proprietaire_id", referencedColumnName = "utilisateur_id")
    private Membre utilisateurProprietaire;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "categorie_id", referencedColumnName = "id")
    private Categorie categorie;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "etatOutil_id", referencedColumnName = "id")
    private EtatOutil etatOutil;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Administrateur_id_activateur", referencedColumnName = "utilisateur_id")
    private Administrateur administrateurActivateur;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Administrateur_id_desactivateur", referencedColumnName = "utilisateur_id")
    private Administrateur administrateurDesactivateur;

    private String titre ;

    private String description;

    private byte[] image;

    private int status;

    @Column(name="date_creation")
    private LocalDate dateCreation;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Membre getUtilisateurProprietaire() {
        return utilisateurProprietaire;
    }

    public void setUtilisateurProprietaire(Membre utilisateurProprietaire) {
        this.utilisateurProprietaire = utilisateurProprietaire;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public EtatOutil getEtatOutil() {
        return etatOutil;
    }

    public void setEtatOutil(EtatOutil etatOutil) {
        this.etatOutil = etatOutil;
    }

    public Administrateur getAdministrateurActivateur() {
        return administrateurActivateur;
    }

    public void setAdministrateurActivateur(Administrateur administrateurActivateur) {
        this.administrateurActivateur = administrateurActivateur;
    }

    public Administrateur getAdministrateurDesactivateur() {
        return administrateurDesactivateur;
    }

    public void setAdministrateurDesactivateur(Administrateur administrateurDesactivateur) {
        this.administrateurDesactivateur = administrateurDesactivateur;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }
}
