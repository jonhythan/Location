DROP DATABASE if EXISTS DBLocation; 

CREATE DATABASE DBLocation;

USE DBLocation;

-- Création des tables

CREATE TABLE Utilisateur(
	id int AUTO_INCREMENT,
	nom varchar(30) NOT NULL,
	prenom varchar(30) NOT NULL,
	courriel varchar(60) NOT NULL,
	telephone bigint NOT NULL,
	password varchar(20) NOT NULL,
	num_rue int NOT NULL,
	nom_rue varchar(50) NOT NULL,
	ville varchar(20) NOT NULL,
	province varchar(30) NOT NULL,
	codePostal char(7) NOT NULL, 
	CONSTRAINT pk_Utilisateur PRIMARY KEY (id),
	CONSTRAINT unique_courrielUtilisateur UNIQUE (courriel),
	CONSTRAINT chk_telephone CHECK (telephone >= 1000000000 AND telephone <= 9999999999)
);

CREATE TABLE Administrateur(
	utilisateur_id int,
	dateEmbauche timestamp NOT NULL,
	CONSTRAINT pk_Administrateur PRIMARY KEY (utilisateur_id),
	CONSTRAINT fk_administrateur FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(id)
);

CREATE TABLE Membre(
	utilisateur_id int,
	status bit NOT NULL DEFAULT 1,
	Administrateur_id_desactivateur int NULL,
	Administrateur_id_activateur int NULL,
	CONSTRAINT pk_Membre PRIMARY KEY (utilisateur_id),
	CONSTRAINT fk_Membre_utilisateur_id FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(id),
	CONSTRAINT fk_Membre_desactivateur FOREIGN KEY (Administrateur_id_desactivateur) REFERENCES Administrateur(utilisateur_id),
	CONSTRAINT fk_Membre_activateur FOREIGN KEY (Administrateur_id_activateur) REFERENCES Administrateur(utilisateur_id),
	CONSTRAINT chk_statusMembre CHECK (status=0 OR status=1)
);


CREATE TABLE Categorie(
	id int AUTO_INCREMENT,
	nom varchar(50) NOT NULL, 
	CONSTRAINT pk_Categorie PRIMARY KEY (id)
);


CREATE TABLE EtatOutil(
	id int AUTO_INCREMENT,
	titre varchar(50) NOT NULL,
	CONSTRAINT pk_EtatOutil PRIMARY KEY (id)
);

CREATE TABLE Message(
	idMessage int AUTO_INCREMENT,
	expediteur_id int NOT NULL,
	recepteur_id int NOT NULL,
	contenu text NOT NULL,
	dateEnvol timestamp NOT NULL, 
	CONSTRAINT pk_Message PRIMARY KEY (idMessage),
	CONSTRAINT fk_Message_expediteur_id FOREIGN KEY (expediteur_id) REFERENCES membre(utilisateur_id),
	CONSTRAINT fk_Message_recepteur_id FOREIGN KEY (recepteur_id) REFERENCES membre(utilisateur_id)
);

CREATE TABLE Annonce(
	id int AUTO_INCREMENT,
	utilisateur_proprietaire_id int NOT NULL,	
	categorie_id int NOT NULL,
	etatOutil_id int NOT NULL,
	Administrateur_id_activateur int ,
	Administrateur_id_desactivateur int ,
	titre varchar(100) NOT NULL,
	description text NOT NULL,
	image MEDIUMBLOB NOT NULL,
	status smallint(1) NOT NULL,
	date_creation timestamp NOT NULL, 
	CONSTRAINT pk_Annonce PRIMARY KEY (id),
	CONSTRAINT fk_Annonce_proprietaire FOREIGN KEY (utilisateur_proprietaire_id) REFERENCES Membre(utilisateur_id),
	CONSTRAINT fk_Annonce_categorie FOREIGN KEY (categorie_id) REFERENCES Categorie(id),
	CONSTRAINT fk_Annonce_etatOutil FOREIGN KEY (etatOutil_id) REFERENCES EtatOutil(id),
	CONSTRAINT fk_Annonce_activateur FOREIGN KEY (Administrateur_id_activateur) REFERENCES Administrateur(utilisateur_id),
	CONSTRAINT fk_Annonce_desactivateur FOREIGN KEY (Administrateur_id_desactivateur) REFERENCES Administrateur(utilisateur_id),
	CONSTRAINT chk_statusAnnonce CHECK(status=0 OR status=1 OR status=2)
);

CREATE TABLE CategoriePeriode(
	id int  AUTO_INCREMENT,
	titre varchar(255) NOT NULL,
	description text NOT NULL,
	CONSTRAINT pk_CategoriePeriode PRIMARY KEY (id)
);

CREATE TABLE Detail(
	CategoriePeriodeId int ,
	AnnonceId int ,
	prix decimal(10, 2) NOT NULL,
	CONSTRAINT pk_Detail PRIMARY KEY(CategoriePeriodeId, AnnonceId),
	CONSTRAINT fk_Detail_categorie FOREIGN KEY (CategoriePeriodeId) REFERENCES CategoriePeriode(id),
	CONSTRAINT fk_Detail_annonce FOREIGN KEY (AnnonceId) REFERENCES Annonce(id)
);

CREATE TABLE Evaluation(
	Annonce_id int ,
	Membre_id int ,
	note int(1) NOT NULL,
	commentaire varchar(255) NOT NULL,
	dateEvaluation timestamp NOT NULL,
	CONSTRAINT pk_Evaluation PRIMARY KEY(Annonce_id, Membre_id),
	CONSTRAINT fk_Evaluation_annonce FOREIGN KEY (Annonce_id) REFERENCES Annonce(id),
	CONSTRAINT fk_Evaluation_membre FOREIGN KEY (Membre_id) REFERENCES Membre(utilisateur_id),
	CONSTRAINT chk_note CHECK (note>0 AND note<=10)
);

CREATE TABLE Signalement(
	idSignalement int  AUTO_INCREMENT,
	MembreUtilisateur_id int  NOT NULL,
	AnnonceId int  NOT NULL,
	Administrateur_id int  NULL,
	raison varchar(50) NOT NULL,
	dateSignalement timestamp NOT NULL,
	CONSTRAINT pk_Signalement PRIMARY KEY (idSignalement),
	CONSTRAINT fk_Signalement_utilisateur FOREIGN KEY (MembreUtilisateur_id) REFERENCES Membre(utilisateur_id),
	CONSTRAINT fk_Signalement_annonce FOREIGN KEY (AnnonceId) REFERENCES Annonce(id),
	CONSTRAINT fk_Signalement_administrateur FOREIGN KEY (Administrateur_id) REFERENCES Administrateur(utilisateur_id)
);

