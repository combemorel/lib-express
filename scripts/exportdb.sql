-- --------------------------------------------------------
-- Hôte :                        localhost
-- Version du serveur:           5.7.24 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour lib_express
DROP DATABASE IF EXISTS `lib_express`;
CREATE DATABASE IF NOT EXISTS `lib_express` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `lib_express`;

-- Listage de la structure de la table lib_express. article
DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `content` text,
  `date` datetime DEFAULT NULL,
  `id_Author` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_author` (`id_Author`),
  CONSTRAINT `FK_author` FOREIGN KEY (`id_Author`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;

-- Listage des données de la table lib_express.article : ~68 rows (environ)
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`id`, `title`, `content`, `date`, `id_Author`) VALUES
	(4, 'Article%20', '%3Cp%3ELorem%20ipsum%20dolor%20sit%20amet%2C%20consectetur%20adipiscing%20elit%2C%20sed%20do%20eiusmod%20tempor%20incididunt%20ut%20labore%20et%20dolore%20magna%20aliqua.%20Dui%20accumsan%20sit%20amet%20nulla%20facilisi.%20A%20pellentesque%20sit%20amet%20porttitor%20eget.%20A%20condimentum%20vitae%20sapien%20pellentesque%20habitant.%20Neque%20convallis%20a%20cras%20semper%20auctor%20neque.%20Nam%20aliquam%20sem%20et%20tortor%20consequat.%20Egestas%20egestas%20fringilla%20phasellus%20faucibus%20scelerisque%20eleifend%20donec%20pretium%20vulputate.%20Feugiat%20nibh%20sed%20pulvinar%20proin%20gravida%20hendrerit.%20Amet%20tellus%20cras%20adipiscing%20enim.%20Non%20blandit%20massa%20enim%20nec%20dui%20nunc%20mattis%20enim%20ut.%20Molestie%20a%20iaculis%20at%20erat%20pellentesque%20adipiscing%20commodo%20elit%20at.%20Ut%20venenatis%20tellus%20in%20metus%20vulputate%20eu.%20Pharetra%20sit%20amet%20aliquam%20id%20diam%20maecenas%20ultricies%20mi.%20Varius%20quam%20quisque%20id%20diam%20vel%20quam.%20Tempus%20quam%20pellentesque%20nec%20nam%20aliquam%20sem%20et.%20Sem%20et%20tortor%20consequat%20id%20porta%20nibh%20venenatis%20cras.%3C/p%3E', '2020-01-30 11:17:06', 2),
	(5, 'Article 2', 'contenue article 2', '2020-01-30 11:17:17', 2),
	(6, 'Article 3', 'contenue article 3', '2020-01-30 11:17:17', 2),
	(7, 'Article 4', 'contenue article 4', '2020-01-30 13:15:35', 2),
	(8, 'Article 5', 'contenue article 5', '2020-01-30 13:15:35', 2),
	(9, 'Article 6', 'contenue article 6', '2020-01-30 13:15:35', 2),
	(10, 'Article 7', 'contenue article 7', '2020-01-30 13:15:35', 2),
	(11, 'Article 8', 'contenue article 8', '2020-01-30 13:15:35', 2),
	(12, 'Article 9', 'contenue article 9', '2020-01-30 13:15:35', 2),
	(14, 'Article 11', 'contenue article 11', '2020-01-30 13:24:44', 2),
	(15, 'Article 12', 'contenue article 12', '2020-01-30 13:24:44', 2),
	(16, 'Article 13', 'contenue article 13', '2020-01-30 13:24:44', 2),
	(17, 'Article 14', 'contenue article 14', '2020-01-30 13:24:44', 2),
	(18, 'Article 15', 'contenue article 15', '2020-01-30 13:24:44', 2),
	(20, 'Article 17', 'contenue article 17', '2020-01-30 13:24:44', 2),
	(21, 'Article 18', 'contenue article 19', '2020-01-30 13:24:44', 2),
	(22, 'Article 19', 'contenue article 23', '2020-01-30 13:24:44', 2),
	(23, 'Article 20', 'contenue article 20', '2020-01-30 13:24:44', 2),
	(24, 'Article 21', 'contenue article 21', '2020-01-30 13:24:44', 2),
	(25, 'Article 22', 'contenue article 22', '2020-01-30 13:24:44', 2),
	(26, 'Article 23', 'contenue article 23', '2020-01-30 13:24:44', 2),
	(27, 'Article 24', 'contenue article 24', '2020-01-30 13:24:44', 2),
	(28, 'Article 25', 'contenue article 25', '2020-01-30 13:24:44', 2),
	(29, 'Article 26', 'contenue article 26', '2020-01-30 13:24:44', 2),
	(30, 'Article 27', 'contenue article 27', '2020-01-30 13:24:44', 2),
	(31, 'Article 28', 'contenue article 28', '2020-01-30 13:24:44', 2),
	(32, 'Article 29', 'contenue article 29', '2020-01-30 13:24:44', 2),
	(33, 'Article 30', 'contenue article 30', '2020-01-30 13:24:44', 2),
	(34, 'Article 31', 'contenue article 31', '2020-01-30 13:24:44', 2),
	(35, 'Article 32', 'contenue article 32', '2020-01-30 13:24:44', 2),
	(36, 'Article 33', 'contenue article 33', '2020-01-30 13:24:44', 2),
	(37, 'Article 34', 'contenue article 34', '2020-01-30 13:24:44', 2),
	(38, 'Article 35', 'contenue article 35', '2020-01-30 13:24:44', 2),
	(39, 'Article 36', 'contenue article 36', '2020-01-30 13:24:45', 2),
	(40, 'Article 37', 'contenue article 37', '2020-01-30 13:24:45', 2),
	(41, 'Article 38', 'contenue article 38', '2020-01-30 13:24:45', 2),
	(42, 'Article 39', 'contenue article 38', '2020-01-30 13:24:45', 2),
	(43, 'Article 40', 'contenue article 40', '2020-01-30 13:24:45', 2),
	(44, 'Article 41', 'contenue article 41', '2020-01-30 13:24:45', 2),
	(45, 'Article 42', 'contenue article 42', '2020-01-30 13:24:45', 2),
	(46, 'Article 43', 'contenue article 43', '2020-01-30 13:24:45', 2),
	(47, 'Article 44', 'contenue article 44', '2020-01-30 13:24:45', 2),
	(48, 'Article 45', 'contenue article 45', '2020-01-30 13:24:45', 2),
	(49, 'Article 46', 'contenue article 46', '2020-01-30 13:24:45', 2),
	(50, 'Article 47', 'contenue article 47', '2020-01-30 13:24:45', 2),
	(51, 'Article 48', 'contenue article 48', '2020-01-30 13:24:45', 2),
	(52, 'Article 49', 'contenue article 49', '2020-01-30 13:24:45', 2),
	(53, 'Article 50', 'contenue article 50', '2020-01-30 13:24:45', 2),
	(54, 'Article 51', 'contenue article 51', '2020-01-30 13:24:45', 2),
	(55, 'Article 52', 'contenue article 52', '2020-01-30 13:24:45', 2),
	(59, 'Article 56', 'contenue article 56', '2020-01-30 13:24:45', 2),
	(60, 'Article 57', 'contenue article 57', '2020-01-30 13:24:45', 2),
	(61, 'Article 58', 'contenue article 58', '2020-01-30 13:24:45', 2),
	(62, 'Article 59', 'contenue article 59', '2020-01-30 13:24:45', 2),
	(63, 'Article 60', 'contenue article 60', '2020-01-30 13:24:45', 2),
	(64, 'Article 61', 'contenue article 61', '2020-01-30 13:24:45', 2),
	(65, 'Article 62', 'contenue article 62', '2020-01-30 13:24:45', 2),
	(66, 'Article 63', 'contenue article 63', '2020-01-30 13:24:45', 2),
	(67, 'Article 64', 'contenue article 64', '2020-01-30 13:24:45', 2),
	(68, 'Article 65', 'contenue article 65', '2020-01-30 13:24:45', 2),
	(69, 'Article 66', 'contenue article 66', '2020-01-30 13:24:45', 2),
	(71, 'Article 68', 'contenue article 68', '2020-01-30 13:24:45', 2),
	(73, 'Article%2069', '%3Cp%3Evnljdfsbvlsifnvmslbvjlsbvhs%3C/p%3E', '2020-01-31 08:53:50', 2),
	(75, 'test%20cat', '%3Cp%3Etest%20cat%3C/p%3E', '2020-01-31 11:51:33', 2),
	(76, 'test%20js', '%3Cp%3Etest%20js%3C/p%3E', '2020-02-04 12:40:30', 2),
	(77, 'test', '%3Cp%3Eteste%3C/p%3E', '2020-02-06 11:08:37', 2);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

-- Listage de la structure de la table lib_express. category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Listage des données de la table lib_express.category : ~6 rows (environ)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`id`, `tag`) VALUES
	(1, 'Categorie%201'),
	(2, 'Category 2'),
	(3, 'Category 3'),
	(4, 'Category 4'),
	(5, 'Cat%E9gorie%205'),
	(7, 'Categorie%206');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Listage de la structure de la table lib_express. r_art_cat
DROP TABLE IF EXISTS `r_art_cat`;
CREATE TABLE IF NOT EXISTS `r_art_cat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_article` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_article` (`id_article`),
  KEY `FK_category` (`id_category`),
  CONSTRAINT `FK_article` FOREIGN KEY (`id_article`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;

-- Listage des données de la table lib_express.r_art_cat : ~8 rows (environ)
/*!40000 ALTER TABLE `r_art_cat` DISABLE KEYS */;
INSERT INTO `r_art_cat` (`id`, `id_article`, `id_category`) VALUES
	(1, 75, 1),
	(2, 75, 2),
	(3, 75, 4),
	(57, 76, 4),
	(58, 76, 5),
	(62, 77, 2),
	(71, 4, 3),
	(72, 4, 5);
/*!40000 ALTER TABLE `r_art_cat` ENABLE KEYS */;

-- Listage de la structure de la table lib_express. user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Listage des données de la table lib_express.user : ~0 rows (environ)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `login`, `password`) VALUES
	(2, 'admin', '$2b$10$MCfnIENBOAxzk0aYhpcSI..yJk1QN4YYqbnK.8pCJIAMzVf1141TS');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
