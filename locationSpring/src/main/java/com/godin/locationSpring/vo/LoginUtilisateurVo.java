package com.godin.locationSpring.vo;

import lombok.Data;

import javax.persistence.Column;
import java.math.BigInteger;

@Data
public class LoginUtilisateurVo {

    private int id;
    private String nom;
    private String prenom;
    private String courriel;
    private BigInteger telephone;
    private String password;
    private int numRue;
    private String nomRue;
    private String ville;
    private String province;
    private String codePostal;
    private String token;
}
