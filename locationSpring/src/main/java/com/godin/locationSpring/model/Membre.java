package com.godin.locationSpring.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Membre implements Serializable {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "utilisateur_id", referencedColumnName = "id")
    @Id
    private Utilisateur utilisateurId;
    private boolean status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "administrateur_id_desactivateur", referencedColumnName = "utilisateur_id")
    private Administrateur administrateurDesactivateur;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "administrateur_id_activateur", referencedColumnName = "utilisateur_id")
    private Administrateur administrateurActivateur;

    public Membre() {
    }

    public Utilisateur getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(Utilisateur utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Administrateur getAdministrateurDesactivateur() {
        return administrateurDesactivateur;
    }

    public void setAdministrateurDesactivateur(Administrateur administrateurDesactivateur) {
        this.administrateurDesactivateur = administrateurDesactivateur;
    }

    public Administrateur getAdministrateurActivateur() {
        return administrateurActivateur;
    }

    public void setAdministrateurActivateur(Administrateur administrateurActivateur) {
        this.administrateurActivateur = administrateurActivateur;
    }
}
