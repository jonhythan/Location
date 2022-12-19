
USE DBLocation;

INSERT INTO utilisateur (nom,prenom,courriel,telephone,password,num_rue,nom_rue,ville,province,codePostal) 
				 VALUES ('IMANI','AZI','AZI.i@GMAIL.COM',9999999999,'123123',101,'Maisonneuve','Montreal','QC','H3H2H1');
INSERT INTO utilisateur (nom,prenom,courriel,telephone,password,num_rue,nom_rue,ville,province,codePostal) 
				 VALUES ('Chavez','jonathan','jon.cha@GMAIL.COM',5412458722,'123123',103,'Saint Cathrine','Longuille','QC','H3H2H1');
INSERT INTO utilisateur (nom,prenom,courriel,telephone,password,num_rue,nom_rue,ville,province,codePostal) 
				 VALUES ('chang','liang','liang.ch@GMAIL.COM',5144321235,'123123',104,'Jean Mince','Brossard','QC','H3H2H1');
INSERT INTO utilisateur (nom,prenom,courriel,telephone,password,num_rue,nom_rue,ville,province,codePostal) 
				 VALUES ('nom1','prenom1','abc@GMAIL.COM',5144321235,'123123',104,'Jean Mince','Brossard','QC','H3H2H1');

INSERT INTO Administrateur(utilisateur_id,dateEmbauche) VALUES(1, '2020-02-20');	

/* status = 0 pour membre desactivé, status = 1 pour activé */
INSERT INTO
Membre(utilisateur_id,status,Administrateur_id_desactivateur,Administrateur_id_activateur) VALUES(1,1,null,1);
INSERT INTO
Membre(utilisateur_id,status,Administrateur_id_desactivateur,Administrateur_id_activateur) VALUES(2,0,1,null);
INSERT INTO
Membre(utilisateur_id,status,Administrateur_id_desactivateur,Administrateur_id_activateur) VALUES(3,1,null,1);

INSERT INTO MESSAGE(expediteur_id,recepteur_id,contenu,dateEnvol) VALUES(2,3,'text1',CURRENT_TIMESTAMP());
INSERT INTO MESSAGE(expediteur_id,recepteur_id,contenu,dateEnvol) VALUES(1,2,'text2',CURRENT_TIMESTAMP());
INSERT INTO MESSAGE(expediteur_id,recepteur_id,contenu,dateEnvol) VALUES(3,2,'text3',CURRENT_TIMESTAMP());
INSERT INTO MESSAGE(expediteur_id,recepteur_id,contenu,dateEnvol) VALUES(1,3,'text4',CURRENT_TIMESTAMP());

INSERT INTO Categorie(nom) VALUES('cat1');
INSERT INTO Categorie(nom) VALUES('cat2'); 
INSERT INTO Categorie(nom) VALUES('cat3'); 
INSERT INTO Categorie(nom) VALUES('cat4');  

/* Excellent, Bon, Moyen, Utilisable*/
INSERT INTO EtatOutil(titre) VALUES('Excellent');
INSERT INTO EtatOutil(titre) VALUES('Bon'); 
INSERT INTO EtatOutil(titre) VALUES('Moyen');
INSERT INTO EtatOutil(titre) VALUES('Utilisable');	
 
/*Membre desactivé => ses annonces seront desactivés;	
annonce désactivé != membre desactivé*/
INSERT INTO Annonce(utilisateur_proprietaire_id,categorie_id,etatOutil_id,Administrateur_id_activateur,Administrateur_id_desactivateur, titre ,description ,status ,date_creation, image)
			VALUES(2,1,2,null, 1, 'Titre Annonce 1','Description Annonce 1',0, CURRENT_TIMESTAMP(), 010101);
INSERT INTO Annonce(utilisateur_proprietaire_id,categorie_id,etatOutil_id,Administrateur_id_activateur, Administrateur_id_desactivateur,titre ,description ,status ,date_creation, image)
			VALUES(3,2,4,null, 1, 'Titre Annonce 2','Description Annonce 2',0,CURRENT_TIMESTAMP(), 010101);	
INSERT INTO Annonce(utilisateur_proprietaire_id,categorie_id,etatOutil_id,Administrateur_id_activateur,Administrateur_id_desactivateur,titre ,description ,status ,date_creation, image)            
			VALUES(3,3,1,1,null,'Titre Annonce 3','Description Annonce 3',1,CURRENT_TIMESTAMP(), 010101);	
INSERT INTO Annonce(utilisateur_proprietaire_id,categorie_id,etatOutil_id,Administrateur_id_activateur,Administrateur_id_desactivateur,titre ,description ,status ,date_creation, image)
			VALUES(1,4,3,1,null,'Titre Annonce 4','Description Annonce 4',1,CURRENT_TIMESTAMP(), 010101);		

INSERT INTO CategoriePeriode(titre,description) VALUES('Categorie Periode Titre 1','Categorie Periode Description 1');
INSERT INTO CategoriePeriode(titre,description) VALUES('Categorie Periode Titre 2','Categorie Periode Description 2');
INSERT INTO CategoriePeriode(titre,description) VALUES('Categorie Periode Titre 3','Categorie Periode Description 3');
INSERT INTO CategoriePeriode(titre,description) VALUES('Categorie Periode Titre 4','Categorie Periode Description 4');

INSERT INTO Detail(CategoriePeriodeId,AnnonceId,prix) VALUES(1,1,10.10);
INSERT INTO Detail(CategoriePeriodeId,AnnonceId,prix) VALUES(2,2,20.10);
INSERT INTO Detail(CategoriePeriodeId,AnnonceId,prix) VALUES(3,3,30.10);
INSERT INTO Detail(CategoriePeriodeId,AnnonceId,prix) VALUES(4,4,40.10);
	
INSERT INTO Evaluation(Annonce_id,Membre_id,Note,commentaire,dateEvaluation) VALUES(1,2,5,'commentaire 1',CURRENT_TIMESTAMP());
INSERT INTO Evaluation(Annonce_id,Membre_id,Note,commentaire,dateEvaluation) VALUES(2,2,6,'commentaire 2',CURRENT_TIMESTAMP());
INSERT INTO Evaluation(Annonce_id,Membre_id,Note,commentaire,dateEvaluation) VALUES(3,3,7,'commentaire 3',CURRENT_TIMESTAMP());
INSERT INTO Evaluation(Annonce_id,Membre_id,Note,commentaire,dateEvaluation) VALUES(4,1,8,'commentaire 4',CURRENT_TIMESTAMP());

INSERT INTO Signalement(MembreUtilisateur_id,AnnonceId,Administrateur_id,raison,dateSignalement) VALUES(3,4,null,'Raison 1',CURRENT_TIMESTAMP());
INSERT INTO Signalement(MembreUtilisateur_id,AnnonceId,Administrateur_id,raison,dateSignalement) VALUES(2,2,1,'Raison 2',CURRENT_TIMESTAMP());
INSERT INTO Signalement(MembreUtilisateur_id,AnnonceId,Administrateur_id,raison,dateSignalement) VALUES(3,3,null,'Raison 3',CURRENT_TIMESTAMP());
INSERT INTO Signalement(MembreUtilisateur_id,AnnonceId,Administrateur_id,raison,dateSignalement) VALUES(1,1,1,'Raison 4',CURRENT_TIMESTAMP());
/*VERIFICATION DES CONTRAINTES qui produissent des erreurs*/
/*telephone de longueur != 10 */
INSERT INTO utilisateur (nom,prenom,courriel,telephone,password,num_rue,nom_rue,ville,province,codePostal) 
				 VALUES ('chang','liang','abcliang.ch@GMAIL.COM',514432,'123123',104,'Jean Mince','Brossard','QC','H3H2H1');
INSERT INTO utilisateur (nom,prenom,courriel,telephone,password,num_rue,nom_rue,ville,province,codePostal) 
				 VALUES ('chang','liang','abcliang.ch@GMAIL.COM',514432123566,'123123',104,'Jean Mince','Brossard','QC','H3H2H1');
				 
/*administrateur et membre avec foreign key de mauvaise référence*/
INSERT INTO Administrateur(utilisateur_id,dateEmbauche) VALUES(10,GETDATE());	
INSERT INTO Membre(utilisateur_id,status,Administrateur_id_desactivateur,Administrateur_id_activateur) VALUES(10,1,null,1); 

/*status invalide pour membre */
INSERT INTO Membre(utilisateur_id,status,Administrateur_id_desactivateur,Administrateur_id_activateur) VALUES(4,01,null,1); 

/*annonce*/
--mauvaise référence de propriétaire
INSERT INTO Annonce(utilisateur_proprietaire_id,categorie_id,etatOutil_id,Administrateur_id_activateur,Administrateur_id_desactivateur,titre ,description ,status ,date_creation)
			VALUES(10,4,3,1,null,'Titre Annonce 5','Description Annonce 5',1,GETDATE());	

--mauvaise référence de catégorie
INSERT INTO Annonce(utilisateur_proprietaire_id,categorie_id,etatOutil_id,Administrateur_id_activateur,Administrateur_id_desactivateur,titre ,description ,status ,date_creation)
			VALUES(1,10,3,1,null,'Titre Annonce 4','Description Annonce 4',1,GETDATE());	

--mauvaise référence d'étatOutil
INSERT INTO Annonce(utilisateur_proprietaire_id,categorie_id,etatOutil_id,Administrateur_id_activateur,Administrateur_id_desactivateur,titre ,description ,status ,date_creation)
			VALUES(1,4,10,1,null,'Titre Annonce 4','Description Annonce 4',1,GETDATE());	
			
--mauvais status 
INSERT INTO Annonce(utilisateur_proprietaire_id,categorie_id,etatOutil_id,Administrateur_id_activateur,Administrateur_id_desactivateur,titre ,description ,status ,date_creation)
			VALUES(1,4,3,1,null,'Titre Annonce 4','Description Annonce 4',3,GETDATE());	
			
/*Évaluation*/
--note>10 ou note<1
INSERT INTO Evaluation(Annonce_id,Membre_id,Note,commentaire,dateEvaluation) VALUES(5,2,11,'commentaire 1',GETDATE());

INSERT INTO Evaluation(Annonce_id,Membre_id,Note,commentaire,dateEvaluation) VALUES(5,2,0,'commentaire 1',GETDATE());



