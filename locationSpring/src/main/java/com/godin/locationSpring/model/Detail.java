package com.godin.locationSpring.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


import com.godin.locationSpring.model.idClass.DetailId;

@Entity
@IdClass(DetailId.class)
public class Detail{
	
	@Id
	@Column(name="categorieperiodeid")
	private int CategoriePeriodeId;
	
	@Id
	@Column(name="annonceid")
	private int AnnonceId;
	
	private double prix;

	@ManyToOne
	@JoinColumn(name = "categorieperiodeid", referencedColumnName = "id", insertable = false, updatable = false)
    private CategoriePeriode categoriePeriode;
	
	public Detail() {
		super();
	}

	public int getCategoriePeriodeId() {
		return CategoriePeriodeId;
	}

	public void setCategoriePeriodeId(int categoriePeriodeId) {
		CategoriePeriodeId = categoriePeriodeId;
	}

	public int getAnnonceId() {
		return AnnonceId;
	}

	public void setAnnonceId(int annonceId) {
		AnnonceId = annonceId;
	}

	public double getPrix() {
		return prix;
	}

	public void setPrix(double prix) {
		this.prix = prix;
	}

	public CategoriePeriode getCategoriePeriodes() {
		return categoriePeriode;
	}

	public void setCategoriePeriode(CategoriePeriode categoriePeriode) {
		this.categoriePeriode = categoriePeriode;
	}
	
	
	
	
}
