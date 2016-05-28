-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 16, 2015 at 01:10 PM
-- Server version: 5.5.44-0ubuntu0.14.04.1-log
-- PHP Version: 5.5.9-1ubuntu4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `BigHarvest`
--

-- --------------------------------------------------------

--
-- Table structure for table `companions`
--

CREATE TABLE IF NOT EXISTS `companions` (
  `id` int(30) unsigned NOT NULL,
  `companionName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `benefits` varchar(800) COLLATE utf8_unicode_ci NOT NULL,
  KEY `name` (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `companions`
--

INSERT INTO `companions` (`id`, `companionName`, `benefits`) VALUES
(49, 'Pumpkin', 'Help protect from larger pests ,  prevent weeds, and shade soil.'),
(50, 'Pumpkin', 'Deters larger pests with prickly vines, shades soil and prevents weeds.'),
(50, 'Bean', 'Help provide nitrogen to soil and to anchor corn into soil, preventing blow over in strong winds.'),
(51, 'Carrot', 'Help prevent weeds, retain moisture in soil, get air and water to roots of tomato.'),
(53, 'Carrot', 'Prevent weeds,  help retain soil moisture'),
(54, 'Carrot', 'Prevent weeds,  help retain soil moisture'),
(54, 'Tomato', 'Prevent soil nematodes,  and beetles'),
(56, 'Tomato', 'Repels flies and mosquitoes, and is said to improve growth and flavor of tomatoes.'),
(59, 'Tomato', 'Improve flavor and help control pests.'),
(60, 'Pumpkin', ''),
(60, 'Tomato', 'eats shit');

-- --------------------------------------------------------

--
-- Table structure for table `plants`
--

CREATE TABLE IF NOT EXISTS `plants` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `imgSrc` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `spacingStandard` int(10) unsigned NOT NULL DEFAULT '1',
  `spacingMetric` int(10) unsigned NOT NULL DEFAULT '1',
  `inStart` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `outStart` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fallStart` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dayCount` int(5) unsigned NOT NULL,
  `sun` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'FULL',
  `water` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `soil` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `notes` varchar(3000) COLLATE utf8_unicode_ci DEFAULT '""',
  `H1` tinyint(1) NOT NULL DEFAULT '0',
  `H2` tinyint(1) NOT NULL DEFAULT '0',
  `H3` tinyint(1) NOT NULL DEFAULT '0',
  `H4` tinyint(1) NOT NULL DEFAULT '0',
  `H5` tinyint(1) NOT NULL DEFAULT '0',
  `H6` tinyint(1) NOT NULL DEFAULT '0',
  `H7` tinyint(1) NOT NULL DEFAULT '0',
  `H8` tinyint(1) NOT NULL DEFAULT '0',
  `H9` tinyint(4) NOT NULL DEFAULT '0',
  `H10` tinyint(4) NOT NULL DEFAULT '0',
  `H11` tinyint(4) NOT NULL DEFAULT '0',
  `H12` tinyint(4) NOT NULL DEFAULT '0',
  `H13` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`name`),
  KEY `H8` (`H8`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=61 ;

--
-- Dumping data for table `plants`
--

INSERT INTO `plants` (`id`, `name`, `imgSrc`, `spacingStandard`, `spacingMetric`, `inStart`, `outStart`, `fallStart`, `dayCount`, `sun`, `water`, `soil`, `notes`, `H1`, `H2`, `H3`, `H4`, `H5`, `H6`, `H7`, `H8`, `H9`, `H10`, `H11`, `H12`, `H13`) VALUES
(47, 'Pumpkin', 'images/plants/pumpkin.png', 32, 70, '', '20', '-120', 90, 'Full Sun', '', '', '-Do best when planted directly in ground -Wait for soil to reach 70 degrees Fahrenheit to sow seeds -Planting in small mounds of earth helps soil to warm quickly, germinate faster, and to control drainage and pests', 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0),
(48, 'Carrot', 'images/plants/carrot.png', 2, 10, '', '-20', '', 75, 'Full Sun', '', '', '-Require loose, sandy soil. -Can be stored in tubs of moist sand during the winter. -Taste better after a few frosts. Cover with leaves after first frost for later harvest.', 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0),
(49, 'Bean', 'images/plants/bean.png', 3, 20, '', '10', '-90', 45, 'Full Sun', '', '', '-Pole beans require trellis to climb, bush beans are free standing. -Do not start indoors -Sow every two weeks for a full summer harvest.', 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0),
(50, 'Corn', 'images/plants/corn.png', 12, 30, '', '15', '', 80, 'Full Sun', '', '', '-Soil must be above 60 degrees Fahrenheit.n -Plant in rows in blocks of at least four to help pollination. -Sweet corn looses sweetness soon after harvesting.', 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0),
(51, 'Tomato', 'images/plants/tomato.png', 24, 60, '-45', '15', '', 80, 'Full Sun', '', '', '-Must have at least six hours of sun. -Install stakes or cages when planting to trellis vines. -Trim suckers persistently.', 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0),
(54, 'Bell Pepper', 'images/plants/bellpepper.png', 18, 40, '-50', '20', '', 80, 'Full Sun', '', '', '-Start three seeds together, then cut weakest seedling. Let remaining plants grow together as one. They will protect each other from sunscald and produce greater yields than if seperated. -Soil must be at least 65 degrees Fahrenheit.', 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0),
(55, 'Watermelon', 'images/plants/watermelon.png', 48, 120, '-15', '30', '', 100, 'Full Sun', '', '', '-Wait for soil to reach 70 degrees Fahrenheit. -Add compost to soil before planting. -Mulch with black plastic to warm soil and keep weeds back.', 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0),
(58, 'Banana', 'images/plants/banana.png', 60, 140, '-60', '', '', 220, 'Full Sun', '', '', '-Cooler climates can grow bananas but you must choose a fast fruiting variety and start well early indoors.', 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0),
(59, 'Basil', 'images/plants/basil.png', 12, 30, '-50', '10', '', 40, 'Full Sun', '', '', '-Ensure soil is moist\n-Picking leaves often will encourage growth\n-Snip center shoot before it flowers\n-Harvest before weather turns cold                       ', 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `userLists`
--

CREATE TABLE IF NOT EXISTS `userLists` (
  `UID` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `oPlantID` int(11) NOT NULL,
  `uPlantID` int(10) unsigned DEFAULT NULL,
  `imgSrc` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `daycount` int(11) DEFAULT NULL,
  `water` varchar(25) COLLATE utf8_unicode_ci NOT NULL DEFAULT '""',
  `soil` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `inStart` smallint(6) DEFAULT NULL,
  `outStart` smallint(6) DEFAULT NULL,
  `fallStart` smallint(6) DEFAULT NULL,
  `corners` decimal(10,0) DEFAULT NULL,
  `spacingMetric` int(10) unsigned DEFAULT NULL,
  `spacingStandard` int(10) unsigned DEFAULT NULL,
  `notes` varchar(3000) COLLATE utf8_unicode_ci NOT NULL DEFAULT '""',
  `sun` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '""'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='I hope this works';

--
-- Dumping data for table `userLists`
--

INSERT INTO `userLists` (`UID`, `name`, `oPlantID`, `uPlantID`, `imgSrc`, `daycount`, `water`, `soil`, `inStart`, `outStart`, `fallStart`, `corners`, `spacingMetric`, `spacingStandard`, `notes`, `sun`) VALUES
(1, 'Bell Pepper', 54, 0, 'images/plants/bellpepper.png', 80, '""', '', -50, 20, 0, NULL, 40, 18, '-Start three seeds together, then cut weakest seedling. Let remaining plants grow together as one. They will protect each other from sunscald and produce greater yields than if seperated. -Soil must be at least 65 degrees Fahrenheit.', 'Full Sun'),
(1, 'Tomato', 51, 1, 'images/plants/tomato.png', 80, '""', '', -45, 15, 0, NULL, 60, 24, '-Must have at least six hours of sun. -Install stakes or cages when planting to trellis vines. -Trim suckers persistently.', 'Full Sun'),
(1, 'Carrot', 48, 2, 'images/plants/carrot.png', 75, '""', '', 0, -20, 0, NULL, 10, 2, '-Require loose, sandy soil. -Can be stored in tubs of moist sand during the winter. -Taste better after a few frosts. Cover with leaves after first frost for later harvest.', 'Full Sun'),
(1, 'Banana', 58, 3, 'images/plants/banana.png', 220, '""', '', -60, 0, 0, NULL, 140, 60, '-Cooler climates can grow bananas but you must choose a fast fruiting variety and start well early indoors.', 'Full Sun'),
(1, 'Bean', 49, 4, 'images/plants/bean.png', 45, '""', '', 0, 10, -90, NULL, 20, 3, '-Pole beans require trellis to climb, bush beans are free standing. -Do not start indoors -Sow every two weeks for a full summer harvest.', 'Full Sun'),
(1, 'Bell Pepper', 54, 5, 'images/plants/bellpepper.png', 80, '""', '', -50, 20, 0, NULL, 40, 18, '-Start three seeds together, then cut weakest seedling. Let remaining plants grow together as one. They will protect each other from sunscald and produce greater yields than if seperated. -Soil must be at least 65 degrees Fahrenheit.', 'Full Sun'),
(1, 'Basil', 59, 6, 'images/plants/basil.png', 40, '""', '', -50, 10, 0, NULL, 30, 12, '-Ensure soil is moist\n-Picking leaves often will encourage growth\n-Snip center shoot before it flowers\n-Harvest before weather turns cold                       ', 'Full Sun'),
(1, 'Pumpkin', 47, 7, 'images/plants/pumpkin.png', 90, '""', '', 0, 20, -120, NULL, 70, 32, '-Do best when planted directly in ground -Wait for soil to reach 70 degrees Fahrenheit to sow seeds -Planting in small mounds of earth helps soil to warm quickly, germinate faster, and to control drainage and pests', 'Full Sun'),
(1, 'Corn', 50, 8, 'images/plants/corn.png', 80, '""', '', 0, 15, 0, NULL, 30, 12, '-Soil must be above 60 degrees Fahrenheit.n -Plant in rows in blocks of at least four to help pollination. -Sweet corn looses sweetness soon after harvesting.', 'Full Sun'),
(1, 'Watermelon', 55, 9, 'images/plants/watermelon.png', 100, '""', '', -15, 30, 0, NULL, 120, 48, '-Wait for soil to reach 70 degrees Fahrenheit. -Add compost to soil before planting. -Mulch with black plastic to warm soil and keep weeds back.', 'Full Sun'),
(1, 'Banana', 58, 10, 'images/plants/banana.png', 220, '""', '', -60, 0, 0, NULL, 140, 60, '-Cooler climates can grow bananas but you must choose a fast fruiting variety and start well early indoors.', 'Full Sun'),
(1, 'Tomato', 51, 11, 'images/plants/tomato.png', 80, '""', '', -45, 15, 0, NULL, 60, 24, '-Must have at least six hours of sun. -Install stakes or cages when planting to trellis vines. -Trim suckers persistently.', 'Full Sun'),
(1, 'Carrot', 48, 12, 'images/plants/carrot.png', 75, '""', '', 0, -20, 0, NULL, 10, 2, '-Require loose, sandy soil. -Can be stored in tubs of moist sand during the winter. -Taste better after a few frosts. Cover with leaves after first frost for later harvest.', 'Full Sun'),
(1, 'Bean', 49, 13, 'images/plants/bean.png', 45, '""', '', 0, 10, -90, NULL, 20, 3, '-Pole beans require trellis to climb, bush beans are free standing. -Do not start indoors -Sow every two weeks for a full summer harvest.', 'Full Sun'),
(1, 'Bell Pepper', 54, 14, 'images/plants/bellpepper.png', 80, '""', '', -50, 20, 0, NULL, 40, 18, '-Start three seeds together, then cut weakest seedling. Let remaining plants grow together as one. They will protect each other from sunscald and produce greater yields than if seperated. -Soil must be at least 65 degrees Fahrenheit.', 'Full Sun'),
(1, 'Basil', 59, 15, 'images/plants/basil.png', 40, '""', '', -50, 10, 0, NULL, 30, 12, '-Ensure soil is moist\n-Picking leaves often will encourage growth\n-Snip center shoot before it flowers\n-Harvest before weather turns cold                       ', 'Full Sun'),
(1, 'Carrot', 48, 0, 'images/plants/carrot.png', 75, '""', '', 0, -20, 0, NULL, 10, 2, '-Require loose, sandy soil. -Can be stored in tubs of moist sand during the winter. -Taste better after a few frosts. Cover with leaves after first frost for later harvest.', 'Full Sun'),
(1, 'Tomato', 51, 1, 'images/plants/tomato.png', 80, '""', '', -45, 15, 0, NULL, 60, 24, '-Must have at least six hours of sun. -Install stakes or cages when planting to trellis vines. -Trim suckers persistently.', 'Full Sun'),
(1, 'Pumpkin', 47, 2, 'images/plants/pumpkin.png', 90, '""', '', 0, 20, -120, NULL, 70, 32, '-Do best when planted directly in ground -Wait for soil to reach 70 degrees Fahrenheit to sow seeds -Planting in small mounds of earth helps soil to warm quickly, germinate faster, and to control drainage and pests', 'Full Sun'),
(1, 'Corn', 50, 3, 'images/plants/corn.png', 80, '""', '', 0, 15, 0, NULL, 30, 12, '-Soil must be above 60 degrees Fahrenheit.n -Plant in rows in blocks of at least four to help pollination. -Sweet corn looses sweetness soon after harvesting.', 'Full Sun'),
(1, 'Watermelon', 55, 4, 'images/plants/watermelon.png', 100, '""', '', -15, 30, 0, NULL, 120, 48, '-Wait for soil to reach 70 degrees Fahrenheit. -Add compost to soil before planting. -Mulch with black plastic to warm soil and keep weeds back.', 'Full Sun'),
(1, 'Basil', 59, 5, 'images/plants/basil.png', 40, '""', '', -50, 10, 0, NULL, 30, 12, '-Ensure soil is moist\n-Picking leaves often will encourage growth\n-Snip center shoot before it flowers\n-Harvest before weather turns cold                       ', 'Full Sun'),
(1, 'Bell Pepper', 54, 6, 'images/plants/bellpepper.png', 80, '""', '', -50, 20, 0, NULL, 40, 18, '-Start three seeds together, then cut weakest seedling. Let remaining plants grow together as one. They will protect each other from sunscald and produce greater yields than if seperated. -Soil must be at least 65 degrees Fahrenheit.', 'Full Sun'),
(1, 'Bean', 49, 7, 'images/plants/bean.png', 45, '""', '', 0, 10, -90, NULL, 20, 3, '-Pole beans require trellis to climb, bush beans are free standing. -Do not start indoors -Sow every two weeks for a full summer harvest.', 'Full Sun');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `hash` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `stage` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'new',
  `zone` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rom` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'metric',
  `metricX` int(10) unsigned NOT NULL,
  `metricY` int(10) unsigned NOT NULL,
  `standardX` int(10) unsigned NOT NULL,
  `standardY` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `hash`, `stage`, `zone`, `rom`, `metricX`, `metricY`, `standardX`, `standardY`) VALUES
(1, 'natjkern', 'natjkern@gmail.com', '$1$b1KlXe.L$J4PpxeqZAeDAGNVJNRO1g/', 'dimensionsSelected', 'h4', 'metric', 4, 4, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
