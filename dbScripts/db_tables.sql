CREATE DATABASE `FMB` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE FMB;

CREATE TABLE `THAALI_DATA_TBL` (
  `THAALI_DATE` date NOT NULL,
  `THAALI_DAY` varchar(12) DEFAULT NULL,
  `MENU` varchar(45) NOT NULL,
  `COOKNAME` varchar(45) DEFAULT NULL,
  `INSTRUCTIONS` varchar(250) DEFAULT NULL,
  `ADMIN_NAME` varchar(45) NOT NULL,
  `CREATION_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `THAALI_STATUS` varchar(20) NOT NULL,
  `VISIBLE_TO_USERS` varchar(10) NOT NULL,
  PRIMARY KEY (`THAALI_DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This table will store the data for thaali for every day.';


CREATE TABLE `THAALI_FEEDBACK` (
  `THAALI_DATE` date DEFAULT NULL,
  `EJAMAAT_ID` varchar(12) NOT NULL,
  `FIRST_NAME` varchar(45) NOT NULL,
  `FAMILY_NAME` varchar(45) NOT NULL,
  `FAMILY_GROUP_ID` int(11) NOT NULL,
  `THAALI_CATEGORY` varchar(12) NOT NULL,
  `THAALI_FEEDBACK` varchar(250) NOT NULL,
  `THAALI_FEEDBACK_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `THAALI_MENU` varchar(45) DEFAULT NULL,
  `THAALI_QUALITY` varchar(45) DEFAULT NULL,
  `THAALI_QUANTITY` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `THAALI_PAKAWNAAR_TBL` (
  `COOKNAME` varchar(150) NOT NULL,
  PRIMARY KEY (`COOKNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `THAALI_MENU_TBL` (
  `MENU` varchar(100) NOT NULL,
  `USERNAME` varchar(45) NOT NULL,
  PRIMARY KEY (`MENU`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `THAALI_COOK_TBL` (
  `COOK` varchar(250) NOT NULL,
  PRIMARY KEY (`COOK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `THAALI_REGION` (
  `REGION_NAME` varchar(45) NOT NULL,
  `REGION_DESC` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`REGION_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE `USER_PROFILE_TBL` (
  `EJAMAAT_ID` varchar(12) NOT NULL,
  `PASSWORD` varchar(12) NOT NULL,
  `HOF_EJAMAAT_ID` varchar(12) NOT NULL,
  `FAMILY_NAME` varchar(45) NOT NULL,
  `FIRST_NAME` varchar(45) NOT NULL,
  `USER_ROLE` varchar(12) NOT NULL,
  `THAALI_CATEGORY` varchar(12) NOT NULL,
  `FAMILY_GROUP_ID` int(11) NOT NULL,
  `USER_LOCATION` varchar(45) NOT NULL,
  PRIMARY KEY (`EJAMAAT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This table will hold the profile information of the user.';



CREATE TABLE `USER_THAALI_DATA_TBL` (
  `THAALI_DATE` date NOT NULL,
  `FAMILY_GROUP_ID` int(11) NOT NULL,
  `FIRST_NAME` varchar(45) NOT NULL,
  `FAMILY_NAME` varchar(45) NOT NULL,
  `THAALI_CATEGORY` varchar(20) NOT NULL,
  `USER_THAALI_STATUS` varchar(20) NOT NULL,
  `INSTRUCTIONS` varchar(250) DEFAULT NULL,
  `USER_LOCATION` varchar(45) NOT NULL,
  PRIMARY KEY (`THAALI_DATE`,`FAMILY_GROUP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

