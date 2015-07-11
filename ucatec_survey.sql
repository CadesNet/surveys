-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2015 a las 17:48:34
-- Versión del servidor: 5.5.27
-- Versión de PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `ucatec_survey`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answers`
--

CREATE TABLE IF NOT EXISTS `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answers_details_id` int(11) NOT NULL,
  `answer` text NOT NULL,
  `question_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answers_details`
--

CREATE TABLE IF NOT EXISTS `answers_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher` varchar(300) NOT NULL,
  `matter` varchar(300) NOT NULL,
  `schedule` varchar(300) NOT NULL,
  `survey_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `options`
--

CREATE TABLE IF NOT EXISTS `options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `option` varchar(300) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=60 ;

--
-- Volcado de datos para la tabla `options`
--

INSERT INTO `options` (`id`, `question_id`, `option`, `createdAt`, `updatedAt`) VALUES
(4, 2, 'Teléfono', '2015-07-07 20:45:14', '2015-07-07 21:00:25'),
(5, 2, 'Whatsapp', '2015-07-07 20:45:14', '2015-07-07 21:00:24'),
(6, 2, 'Facebook', '2015-07-07 20:45:14', '2015-07-07 21:00:24'),
(7, 2, 'Skype', '2015-07-07 20:45:14', '2015-07-07 21:00:23'),
(8, 2, 'Plataforma ucatec', '2015-07-07 20:45:14', '2015-07-07 21:00:23'),
(9, 2, 'Otros', '2015-07-07 20:45:14', '2015-07-07 21:00:23'),
(10, 2, 'Ninguno', '2015-07-07 20:45:14', '2015-07-07 21:00:20'),
(12, 1, 'si', '2015-07-07 20:48:41', '2015-07-10 20:38:16'),
(14, 3, 'Si', '2015-07-07 20:50:30', '2015-07-07 20:51:22'),
(15, 3, 'a veces', '2015-07-07 20:50:30', '2015-07-10 20:41:00'),
(16, 3, 'no', '2015-07-07 20:50:30', '2015-07-10 20:41:04'),
(19, 4, 'si', '2015-07-07 20:52:53', '2015-07-10 20:40:13'),
(20, 4, 'no', '2015-07-07 20:52:56', '2015-07-10 20:40:15'),
(21, 4, 'a veces', '2015-07-07 20:52:58', '2015-07-10 20:40:18'),
(22, 4, 'No es materia presencial', '2015-07-07 20:55:04', '2015-07-10 20:40:32'),
(23, 6, 'si', '2015-07-10 19:56:42', '2015-07-10 19:56:42'),
(24, 6, 'a veces', '2015-07-10 19:56:42', '2015-07-10 19:56:42'),
(26, 7, 'si', '2015-07-10 19:57:27', '2015-07-10 20:07:48'),
(27, 7, 'a veces', '2015-07-10 19:57:27', '2015-07-10 19:57:27'),
(28, 7, 'no', '2015-07-10 19:57:27', '2015-07-10 19:57:27'),
(29, 8, 'si', '2015-07-10 19:58:02', '2015-07-10 19:58:02'),
(30, 8, 'a veces', '2015-07-10 19:58:02', '2015-07-10 19:58:02'),
(31, 8, 'no', '2015-07-10 19:58:02', '2015-07-10 19:58:02'),
(32, 9, 'si', '2015-07-10 19:58:24', '2015-07-10 19:58:24'),
(33, 9, 'a veces', '2015-07-10 19:58:24', '2015-07-10 19:58:24'),
(34, 9, 'no', '2015-07-10 19:58:24', '2015-07-10 19:58:24'),
(35, 10, 'si', '2015-07-10 19:58:52', '2015-07-10 19:58:52'),
(36, 10, 'a veces', '2015-07-10 19:58:52', '2015-07-10 19:58:52'),
(37, 10, 'no', '2015-07-10 19:58:52', '2015-07-10 19:58:52'),
(38, 11, 'si', '2015-07-10 19:59:49', '2015-07-10 19:59:49'),
(39, 11, 'a veces', '2015-07-10 19:59:49', '2015-07-10 19:59:49'),
(40, 11, 'no', '2015-07-10 19:59:49', '2015-07-10 19:59:49'),
(41, 12, 'si', '2015-07-10 20:00:23', '2015-07-10 20:00:23'),
(42, 12, 'a veces', '2015-07-10 20:00:23', '2015-07-10 20:00:23'),
(43, 12, 'no', '2015-07-10 20:00:23', '2015-07-10 20:00:23'),
(44, 13, 'si', '2015-07-10 20:00:58', '2015-07-10 20:00:58'),
(45, 13, 'a veces', '2015-07-10 20:00:58', '2015-07-10 20:00:58'),
(46, 13, 'no', '2015-07-10 20:00:58', '2015-07-10 20:00:58'),
(47, 14, 'si', '2015-07-10 20:01:30', '2015-07-10 20:01:30'),
(48, 14, 'a veces', '2015-07-10 20:01:30', '2015-07-10 20:01:30'),
(49, 14, 'no', '2015-07-10 20:01:30', '2015-07-10 20:01:30'),
(50, 15, 'si', '2015-07-10 20:01:58', '2015-07-10 20:01:58'),
(51, 15, 'a veces', '2015-07-10 20:01:58', '2015-07-10 20:01:58'),
(52, 15, 'no', '2015-07-10 20:01:58', '2015-07-10 20:01:58'),
(54, 16, 'si', '2015-07-10 20:02:28', '2015-07-10 20:07:32'),
(55, 16, 'a veces', '2015-07-10 20:02:28', '2015-07-10 20:07:37'),
(56, 6, 'no', '2015-07-10 20:07:14', '2015-07-10 20:07:14'),
(57, 16, 'no', '2015-07-10 20:07:40', '2015-07-10 20:07:40'),
(58, 1, 'a veces', '2015-07-10 20:11:35', '2015-07-10 20:38:20'),
(59, 1, 'no', '2015-07-10 20:20:03', '2015-07-10 20:38:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `alias` varchar(300) NOT NULL,
  `type` char(1) NOT NULL,
  `number_of_options` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `survey_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Volcado de datos para la tabla `questions`
--

INSERT INTO `questions` (`id`, `question`, `alias`, `type`, `number_of_options`, `order`, `value`, `survey_id`, `createdAt`, `updatedAt`) VALUES
(1, '¿El docente motiva tus aptitudes emprendedoras, dándote ejemplos prácticos aplicables a la realidad de nuestro medio??', 'Motivación', '1', 1, 1, 5, 1, '2015-07-07 20:42:51', '2015-07-10 20:39:50'),
(2, 'Cual es el medio de comunicación de tu preferencia para mantener una comunicación fluida con tu docente', 'Canal de comunicación', '2', 1, 1, 1, 1, '2015-07-07 20:45:14', '2015-07-07 21:10:53'),
(3, '¿El docente llega puntual al salón de clases?', 'Puntualidad', '1', 1, 1, 5, 1, '2015-07-07 20:50:30', '2015-07-07 20:55:20'),
(4, '¿El docente promueve las actividades fuera de aula para una mejor comprensión de los ejemplos de la materia?', 'Actividades', '2', 1, 1, 5, 1, '2015-07-07 20:52:48', '2015-07-10 20:40:37'),
(5, 'Caja de sugerencias', 'Sugerencia', '3', 1, 1, 1, 1, '2015-07-08 21:30:41', '2015-07-10 19:22:00'),
(6, '¿El docente conoce la temática de la materia?', 'Temática', '1', 1, 1, 5, 2, '2015-07-10 19:56:42', '2015-07-10 20:07:14'),
(7, 'La explicación del docente es fácil de comprender', 'Eexplicación', '1', 1, 1, 5, 2, '2015-07-10 19:57:27', '2015-07-10 19:57:27'),
(8, 'El docente relaciona el tema de la materia con contenidos anteriores de otras materias', 'Contenidos anteriores', '1', 1, 1, 5, 2, '2015-07-10 19:58:01', '2015-07-10 19:58:01'),
(9, 'Aplica ejemplos reales en el desarrollo de las clases', 'Ejemplos', '1', 1, 1, 5, 2, '2015-07-10 19:58:24', '2015-07-10 19:58:24'),
(10, 'El docente utiliza adecuadamente los conceptos de la materia', 'Conceptos', '1', 1, 1, 5, 2, '2015-07-10 19:58:52', '2015-07-10 19:58:52'),
(11, 'El docente organiza los materiales que facilitan el aprendizaje en el desarrollo de las clases', 'Organización de materiales', '1', 1, 1, 5, 2, '2015-07-10 19:59:49', '2015-07-10 19:59:49'),
(12, 'El docente utiliza la plataforma virtual para: dar y recibir trabajos, y plantear en el foro temas relacionados con la materia', 'Utilización de la plataforma', '1', 1, 1, 5, 2, '2015-07-10 20:00:23', '2015-07-10 20:00:23'),
(13, 'El docente fomenta el trabajo en equipo', 'Fomentar trabajo en equipo', '1', 1, 1, 5, 2, '2015-07-10 20:00:57', '2015-07-10 20:00:57'),
(14, 'El docente respeta las ideas de los estudiantes, hace críticas constructivas y oportunas', 'Empatia', '1', 1, 1, 5, 2, '2015-07-10 20:01:30', '2015-07-10 20:01:30'),
(15, 'El docente revisa y devuelve exámenes y trabajos calificados', 'Puntualidad con los estudiantes', '1', 1, 1, 5, 2, '2015-07-10 20:01:58', '2015-07-10 20:01:58'),
(16, 'El docente está cumpliendo con el avance de temas de acuerdo al Plan Curricular de la materia', 'Cumplimiento del avance', '1', 1, 1, 5, 2, '2015-07-10 20:02:28', '2015-07-10 20:07:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `surveys`
--

CREATE TABLE IF NOT EXISTS `surveys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `description` text NOT NULL,
  `title` text NOT NULL,
  `code` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `state` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `surveys`
--

INSERT INTO `surveys` (`id`, `name`, `description`, `title`, `code`, `createdAt`, `updatedAt`, `state`) VALUES
(1, 'Encuesta Semestre II - Módulo I', 'Mejorar es importante y tu opinión es crucial para que juntos logremos eso, por eso te invitamos a llenar la encuesta correspondiente  al segundo modulo', 'Encuesta módulo I', 2147483647, '2015-07-07 20:40:25', '2015-07-10 21:48:38', '1'),
(2, 'Encuesta Semestre II - Módulo II', 'Esta es la encuesta del segundo módulo del segundo semestre de la gestión 2015', 'Encuesta Módulo II', 2147483647, '2015-07-10 19:54:31', '2015-07-10 21:19:11', '1');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
