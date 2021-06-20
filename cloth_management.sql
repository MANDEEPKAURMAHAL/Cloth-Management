/*
SQLyog Ultimate v11.11 (32 bit)
MySQL - 5.5.5-10.4.6-MariaDB : Database - cloth_management
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cloth_management` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `cloth_management`;

/*Table structure for table `user_master` */

DROP TABLE IF EXISTS `user_master`;

CREATE TABLE `user_master` (
  `user_id` bigint(20) NOT NULL,
  `user_mobile_number` varchar(15) DEFAULT NULL,
  `user_password` varchar(250) DEFAULT NULL,
  `user_create_date` datetime DEFAULT NULL,
  `user_update_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_active_flag` tinyint(2) DEFAULT 1,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `user_master` */

insert  into `user_master`(`user_id`,`user_mobile_number`,`user_password`,`user_create_date`,`user_update_date`,`user_active_flag`) values (71624175551163,'7758095877','$2b$10$kfADboNk7f3Tp/727I.8G.Ek/mx9aBdPhlAhcmoLbzH00URfmPi2G','2021-06-20 13:22:31','2021-06-20 13:22:31',1);

/*Table structure for table `user_product_photo_mapping` */

DROP TABLE IF EXISTS `user_product_photo_mapping`;

CREATE TABLE `user_product_photo_mapping` (
  `user_id` bigint(20) NOT NULL,
  `product_photo_id` bigint(20) NOT NULL,
  `product_image` varchar(250) DEFAULT NULL,
  `product_name` varchar(250) DEFAULT NULL,
  `product_price` int(10) DEFAULT NULL,
  `product_quantity` int(250) DEFAULT NULL,
  `product_create_date` datetime DEFAULT NULL,
  `user_update_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_id`,`product_photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `user_product_photo_mapping` */

insert  into `user_product_photo_mapping`(`user_id`,`product_photo_id`,`product_image`,`product_name`,`product_price`,`product_quantity`,`product_create_date`,`user_update_date`) values (71624175551163,11624211068502,'1624211068498nike-mens-t-shirt-500x500.jpeg','nike',500,5,'2021-06-20 23:14:28','2021-06-20 23:14:28'),(71624175551163,71624211109276,'1624211109271product-jpeg-500x500.jpg','puma',1500,6,'2021-06-20 23:15:09','2021-06-20 23:15:09');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
