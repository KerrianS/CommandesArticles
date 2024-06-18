-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: pnco
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `planning`
--

DROP TABLE IF EXISTS `planning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planning` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_tache` varchar(255) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `NumeroProjet` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_projet_numero` (`NumeroProjet`)
) ENGINE=MyISAM AUTO_INCREMENT=57;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planning`
--

LOCK TABLES `planning` WRITE;
/*!40000 ALTER TABLE `planning` DISABLE KEYS */;
INSERT INTO `planning` VALUES (2,'ADMIN','2024-03-05','2024-03-15',2),(3,'ETUDE','2024-03-15','2024-04-15',3),(4,'ETUDE','2024-03-15','2024-03-25',4),(5,'ADMIN','2024-03-20','2024-03-30',5),(56,'ADMIN','2024-04-15','2024-04-30',1),(39,'ETUDIE','2023-12-03','2023-12-11',18),(40,'ETUDE','2024-04-03','2024-04-10',5),(41,'TRAVAUX','2024-02-05','2024-02-15',2),(42,'TRAVAUX','2024-04-11','2024-04-20',1),(44,'ETUDE','2024-04-25','2024-06-19',6),(45,'ADMIN','2024-02-13','2024-02-24',6),(47,'ADMIN','2024-04-09','2024-04-25',39),(48,'TRAVAUX','2024-08-13','2025-01-16',39),(49,'ADMIN','2024-04-16','2024-05-31',40),(50,'ETUDIE','2024-04-26','2024-09-27',41),(51,'TRAVAUX','2024-04-27','2025-07-26',41),(52,'ETUDIE','2024-04-30','2026-02-28',41),(53,'ETUDE','2024-04-24','2024-04-30',40);
/*!40000 ALTER TABLE `planning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suivie`
--

DROP TABLE IF EXISTS `suivie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suivie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numeroProjet` int NOT NULL,
  `cout` varchar(100) DEFAULT NULL,
  `delai` varchar(100) DEFAULT NULL,
  `date_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_date_id` (`date_id`),
  CONSTRAINT `fk_date_id` FOREIGN KEY (`date_id`) REFERENCES `suivie_date` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=204;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suivie`
--

LOCK TABLES `suivie` WRITE;
/*!40000 ALTER TABLE `suivie` DISABLE KEYS */;
INSERT INTO `suivie` VALUES (133,1,'OK','OK',29),(134,2,'OK','OK',29),(135,3,'OK','OK',29),(136,4,'OK','OK',29),(137,5,'DERIVE NON ACTEE','DERIVE ACTEE PAR AVENANT OU VALIDATION',29),(138,6,'OK','OK',29),(139,1,'OK','DERIVE NON ACTEE',30),(140,2,'OK','OK',30),(141,3,'DERIVE ACTEE PAR AVENANT OU VALIDATION','OK',30),(142,4,'OK','OK',30),(143,5,'OK','OK',30),(144,6,'OK','OK',30),(145,1,'OK','OK',31),(146,2,'OK','OK',31),(147,3,'DERIVE ACTEE PAR AVENANT OU VALIDATION','DERIVE ACTEE PAR AVENANT OU VALIDATION',31),(148,4,'OK','OK',31),(149,5,'OK','OK',31),(150,6,'OK','OK',31),(151,1,'OK','OK',32),(152,2,'OK','OK',32),(153,3,'OK','OK',32),(154,4,'DERIVE NON ACTEE','OK',32),(155,5,'OK','OK',32),(156,6,'OK','OK',32),(157,1,'OK','OK',33),(158,2,'OK','OK',33),(159,3,'OK','OK',33),(160,4,'OK','OK',33),(161,5,'DERIVE NON ACTEE','DERIVE NON ACTEE',33),(162,6,'OK','OK',33),(163,1,'OK','OK',34),(164,2,'OK','OK',34),(165,3,'OK','OK',34),(166,4,'OK','OK',34),(167,5,'OK','OK',34),(168,6,'OK','OK',34),(169,1,'DERIVE ACTEE PAR AVENANT OU VALIDATION','OK',35),(170,2,'OK','OK',35),(171,3,'OK','OK',35),(172,4,'OK','OK',35),(173,5,'OK','OK',35),(174,6,'OK','OK',35),(175,39,'OK','OK',35),(176,1,'DERIVE NON ACTEE','OK',36),(177,2,'OK','OK',36),(178,3,'OK','OK',36),(179,4,'OK','OK',36),(180,5,'OK','OK',36),(181,6,'OK','OK',36),(182,39,'OK','OK',36),(183,1,'DERIVE NON ACTEE','OK',37),(184,2,'OK','OK',37),(185,3,'OK','OK',37),(186,4,'OK','OK',37),(187,5,'OK','OK',37),(188,6,'OK','OK',37),(189,39,'OK','OK',37),(190,1,'DERIVE NON ACTEE','OK',38),(191,2,'OK','OK',38),(192,3,'OK','OK',38),(193,4,'OK','OK',38),(194,5,'OK','OK',38),(195,6,'OK','OK',38),(196,39,'OK','OK',38),(197,1,'DERIVE NON ACTEE','OK',39),(198,3,'OK','OK',39),(199,4,'OK','OK',39),(200,5,'OK','OK',39),(201,6,'OK','OK',39),(202,39,'OK','OK',39),(203,40,'OK','OK',39);
/*!40000 ALTER TABLE `suivie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (36,'ks','$2y$10$C/SBu0SQvoiFGwb.pRctJOGFOTxvHZwOorcoBBT.WGttm8YNiy1J.','ks@mobaitec.fr','SALAUN','Kerrian','admin'),(37,'ryg','$2y$10$cjWKpq1S3o/w.xy3yIQ4s.vrguCJvmo4.ZQuA1wqNlPeV2YKeQONC','ryg@mobaitec.fr','GUEMAR','Rayan','admin'),(38,'sam','$2y$10$lAM4eCiNz7zGoojN8uKx8.z9B7wnff.E9k8KdDwHMYREYvWTTgdrK','samuel.malhautier@alesagglo.fr','Sam','Sam','admin'),(40,'admin','$2y$10$HtiQT/.QnL9azf0t8GfXke2f2U5UGEcYvANZg/bm/IKhZ2YdZdbKu','admin@mairie.fr','admin','admin','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projets`
--

DROP TABLE IF EXISTS `projets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projets` (
  `Numero` int NOT NULL AUTO_INCREMENT,
  `NomProjet` varchar(255) DEFAULT NULL,
  `PPI_REC` varchar(10) DEFAULT NULL,
  `Referent` varchar(255) DEFAULT NULL,
  `VilleAgglo` varchar(255) DEFAULT NULL,
  `Pole` varchar(255) DEFAULT NULL,
  `Service` varchar(255) DEFAULT NULL,
  `Pilote` varchar(255) DEFAULT NULL,
  `Statut` varchar(255) DEFAULT NULL,
  `Subv_ON` varchar(3) DEFAULT NULL,
  `Budget` varchar(20) DEFAULT NULL,
  `CoutReel` varchar(20) DEFAULT NULL,
  `DateLivraison` varchar(10) DEFAULT NULL,
  `DateLivraisonReelle` varchar(10) DEFAULT NULL,
  `Cout` varchar(20) DEFAULT NULL,
  `Delais` varchar(20) DEFAULT NULL,
  `DateDemande` varchar(10) DEFAULT NULL,
  `Localisation` varchar(255) DEFAULT NULL,
  `Cadastre` varchar(255) DEFAULT NULL,
  `Proprietaire` varchar(255) DEFAULT NULL,
  `EntiteProjet` varchar(255) DEFAULT NULL,
  `DerniereComSecurite` varchar(255) DEFAULT NULL,
  `Categorie` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `BudgetInitialEstime` varchar(20) DEFAULT NULL,
  `EstimationSIB` varchar(20) DEFAULT NULL,
  `DemandeBudgetPrevisionnel` varchar(20) DEFAULT NULL,
  `Subvention` varchar(20) DEFAULT NULL,
  `Reunion1` varchar(10) DEFAULT NULL,
  `Programme` varchar(255) DEFAULT NULL,
  `Esquisse` varchar(255) DEFAULT NULL,
  `APS` varchar(255) DEFAULT NULL,
  `APD` varchar(255) DEFAULT NULL,
  `AutorisationUrbanisme` varchar(255) DEFAULT NULL,
  `DCE` varchar(255) DEFAULT NULL,
  `ConsultationDRLO` varchar(255) DEFAULT NULL,
  `Chantier` varchar(255) DEFAULT NULL,
  `DateLivraisonPrevu` varchar(10) DEFAULT NULL,
  `ReferentSIB` varchar(255) DEFAULT NULL,
  `AdminDate` date DEFAULT NULL,
  `AdminDelai` varchar(255) DEFAULT NULL,
  `AdminCout` varchar(255) DEFAULT NULL,
  `actif` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Numero`)
) ENGINE=MyISAM AUTO_INCREMENT=42;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projets`
--

LOCK TABLES `projets` WRITE;
/*!40000 ALTER TABLE `projets` DISABLE KEYS */;
INSERT INTO `projets` VALUES (1,'Pôle National cirque de Rochebelle - travaux de rénovation et extension Phase 1 et 2','PPI','D. DELORME','VILLE','POLE TEMPS LIBRE','PCR','C. SESTINI','TRAVAUX','Oui','5000','','2031-08-24',NULL,NULL,NULL,'2024-01-01','Rochebelle','C123','Proprio1','Entite1','Derniere Com','Catégorie1','Type1','1100000','900000','1100000','300000','01/02/24','Programme1','Esquisse1','APS1','APD1','AU1','DCE1','Consultation1','Chantier1','2031-08-24','RefSIB1','2024-03-14','OK','OK',1),(3,'Police municipale – travaux réhabilitation bâtiment','PPI','F. MALZAC','VILLE','DIRECTION COMMANDE PUBLIQUE – SERVICE INGÉNIERIE DU BÂTIMENT','SIB','C. BARRES','TRAVAUX','Oui','2 040 000,00','1 596 992,00','2031-03-24',NULL,NULL,NULL,'15/12/23','Police','C125','Proprio3','Entite3','Derniere Com3','Catégorie3','Type3','1500000','1400000','1600000','400000','03/01/24','Programme3','Esquisse3','APS3','APD3','AU3','DCE3','Consultation3','Chantier3','31/03/24','RefSIB3','2024-03-30','DERIVE NON ACTEE \r\n','DERIVE NON ACTEE \r\n',1),(4,'Marché provisoire – travaux d’Aménagement','PPI','F. MALZAC','VILLE','DIRECTION COMMANDE PUBLIQUE – SERVICE INGÉNIERIE DU BÂTIMENT','SIB','O. LEGAL','TRAVAUX','Non','500 000,00','635 000,00','2015-09-23','2015-09-23',NULL,NULL,'18/02/24','Marche','C126','Proprio4','Entite4','Derniere Com4','Catégorie4','Type4','800000','700000','900000','200000','04/02/24','Programme4','Esquisse4','APS4','APD4','AU4','DCE4','Consultation4','Chantier4','15/09/23','RefSIB4',NULL,NULL,'',1),(5,'Temple d’Anduze – travaux de rénovation','PPI','D. DELORME','AGGLO','DIRECTION COMMANDE PUBLIQUE – SERVICE INGÉNIERIE DU BÂTIMENT','SIB','F. MALZAC','TRAVAUX','Oui','1 320 000,00',NULL,'2019-10-23',NULL,NULL,NULL,'21/02/24','Anduze','C127','Proprio5','Entite5','Derniere Com5','Catégorie5','Type5','1100000','1000000','1200000','300000','05/03/24','Programme5','Esquisse5','APS5','APD5','AU5','DCE5','Consultation5','Chantier5','19/10/23','RefSIB5',NULL,NULL,'',1),(6,'Maison de la Justice et du Droit – travaux d’aménagement de locaux','PPI','S. MALHAUTIER','AGGLO','DIRECTION DES RELATIONS AVEC LES USAGERS ET LES CITOYENS','MDJ','C. BARRES','TRAVAUX','Oui',NULL,'213 562,50','2018-11-23','0008-12-23',NULL,NULL,'24/02/24','MaisonJD','C128','Proprio6','Entite6','Derniere Com6','Catégorie6','Type6','200000','180000','220000','50000','06/04/24','Programme6','Esquisse6','APS6','APD6','AU6','DCE6','Consultation6','Chantier6','18/11/23','RefSIB6',NULL,NULL,'',1),(39,'trrtg','',NULL,'','','','','gzrrrg',NULL,'','','','',NULL,NULL,'','','','','','','','','','','','','','','','','','','','','',NULL,'',NULL,NULL,NULL,1),(40,'TESTT','',NULL,'','','','','',NULL,'','','','',NULL,NULL,'','','','','','','','','','','','','','','','','','','','','',NULL,'',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `projets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suivie_date`
--

DROP TABLE IF EXISTS `suivie_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suivie_date` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `sujet` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `fait_par` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suivie_date`
--

LOCK TABLES `suivie_date` WRITE;
/*!40000 ALTER TABLE `suivie_date` DISABLE KEYS */;
INSERT INTO `suivie_date` VALUES (29,'2024-04-10','Sujet','description1','moi'),(30,'2024-04-10','Sujet2','description2','lui'),(31,'2024-04-11','aaaa','test','moi'),(32,'2024-04-11','aaaa','a','aaaa'),(33,'2024-04-25','','',''),(34,'2024-04-25','test','ee','ed'),(35,'2024-04-25','rgr','rerez','re'),(36,'2024-04-25','rfer','refr','rer'),(37,'2024-04-26','','',''),(38,'2024-04-26','edze','ezdzdez','dze'),(39,'2024-04-27','test','test','test');
/*!40000 ALTER TABLE `suivie_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journal`
--

DROP TABLE IF EXISTS `journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `entree_journal` varchar(255) DEFAULT NULL,
  `numeroProjet` int NOT NULL,
  `etape_projet` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_projet_numero` (`numeroProjet`)
) ENGINE=MyISAM AUTO_INCREMENT=45;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journal`
--

LOCK TABLES `journal` WRITE;
/*!40000 ALTER TABLE `journal` DISABLE KEYS */;
INSERT INTO `journal` VALUES (1,'2006-02-24','Dépôt PC 2 – Programmation réunion le 13/02 avant lancement des consultations',1,'0'),(2,'2015-01-24','Rencontre avec ENEDIS pour déplacement Tarif jaune',1,'0'),(3,'2019-12-23','En attente PC2, prévision décembre pour dépôt.',1,'0'),(4,'2019-12-23','Fondation et dallage et réseau accueil',1,'0'),(5,'2019-12-23','Démolition des intérieurs',1,'0'),(6,'2014-11-23','En attente PC2, prévision décembre pour dépôt.',1,'0'),(7,'2014-11-23','En attente PC2, prévision décembre pour dépôt.',1,'0'),(8,'2014-11-23','Terrassement en cours. Modifications des réseaux. Démolitions',1,'0'),(9,'2012-10-23','Commencement des travaux Tr1.',1,'0'),(10,'2012-09-23','Réunion de démarrage Tr1, mois de préparations, signature des OS.',1,'0'),(11,'2024-01-31','Réception des OS signés / Réunion de chantier les mercredi à 14 h',2,'0'),(12,'2024-01-29','Visite d’inspection commune le 2024/02/14 démarrage le 2024/02/27',2,'0'),(13,'2024-01-25','Retour des marchés notifiés à l’exception du lot revêtement et espace vert',2,'0'),(14,'2024-01-15','Notification des marchés en cours',2,'0'),(15,'2023-11-19','Analyse des offres : budget supérieur de 20 %',2,'0'),(16,'2023-12-19','Report du commencement des travaux : Non attribution du lot gros œuvre',2,'0'),(17,'2023-11-14','Consultation en arbitrage à ce jour - lot 1 Supérieur à l’estimation – Lot 6 et 10 Infructueux',2,'0'),(26,'2023-10-19','Consultation en cours des lots infructueux DLRO 2023/10/20 - Maçonnerie – Revêtements – Espaces vert Démarrage travaux prévu 2024/01/15',2,'0'),(35,'2024-04-27','ZOLA',5,'t'),(36,'2024-04-26','rggrgr',5,'rgrgge'),(37,'2024-04-25','ttt',1,'fzefe'),(38,'2024-04-26','edzaeaeda',1,NULL),(39,'2024-04-26','test',1,NULL),(40,'2024-04-26','test',1,'Projet'),(41,'2024-04-27','RYANAIR',1,'Projet'),(42,'2024-04-28','dedezdz',1,'Projet'),(43,'2024-04-27','',1,'Projet'),(44,'2024-04-27','dez',1,'Projet');
/*!40000 ALTER TABLE `journal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etape_projet`
--

DROP TABLE IF EXISTS `etape_projet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etape_projet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numeroProjet` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `cout` float DEFAULT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_etape_projet` (`numeroProjet`)
) ENGINE=MyISAM AUTO_INCREMENT=30;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etape_projet`
--

LOCK TABLES `etape_projet` WRITE;
/*!40000 ALTER TABLE `etape_projet` DISABLE KEYS */;
INSERT INTO `etape_projet` VALUES (1,1,'FPPI21 – Mission AMO coordination SSI désenfumage',10562,NULL),(2,1,'FPPI21 – Mission étude désenfumage',15540,NULL),(3,1,'FPPI21 – Mission contrôle technique',5940,NULL),(4,1,'FPPI21 – Création accès',105713,NULL),(5,1,'FPPI21 – Mission CSPS',2587.2,NULL),(6,1,'FPPI21 – Travaux de préparation et dégagement',63600,NULL),(7,1,'FPPI21 – Panneau signalisation',4248,NULL),(8,1,'FPPI21 – Mise en place d’une plate-forme élévatrice',27792.9,NULL),(9,1,'FPPI21 – travaux de serrurerie aménagement intérieur',59583.6,NULL),(10,1,'FPPI21 – Travaux de peinture et résine sol',22992,NULL),(11,1,'FPPI21 – Divers travaux de maçonnerie',119576,NULL),(12,1,'FPPI21 – Travaux de plomberie',59867.8,NULL),(13,1,'FPPI21 – Travaux électriques installation étaliers',106416,NULL),(14,1,'FPPI21 – Fourniture et pose d’un système de comptage des étaliers',11460,NULL),(15,1,'FPPI21 – Travaux de déplacement de bornes liées au marché provisoire',7873.68,NULL),(16,1,'FPPI21 – travaux de serrurerie',3096,NULL),(17,1,'FPPI21 – Travaux canalisation EU',4800,NULL),(18,1,'FFPI21 – Fourniture et pose d’un BTP MAT',2550,NULL),(19,1,'FFPNNN',3333330,NULL),(24,1,'etape',12,NULL),(25,5,'toto',200000,NULL),(26,1,'test',12345,NULL),(27,1,'test',1234,NULL),(28,1,'doublek',130000,NULL),(29,1,'ezfeez',2,NULL);
/*!40000 ALTER TABLE `etape_projet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-30 11:13:07
