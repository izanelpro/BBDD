-- phpMyAdmin SQL Dump
-- version 5.2.1deb1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Xerado en: 13 de Maio de 2025 ás 11:02
-- Versión do servidor: 10.11.11-MariaDB-0+deb12u1
-- Versión do PHP: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bbdd2`
--

-- --------------------------------------------------------

--
-- Estrutura da táboa `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `tipo` varchar(20) DEFAULT 'admin',
  `fechaAlta` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A extraer os datos da táboa `administradores`
--

INSERT INTO `administradores` (`id`, `nombre`, `contrasena`, `tipo`, `fechaAlta`) VALUES
(1, 'admin', '$2b$10$VxLkqv34OVzmArtNsntlduhd1iyGL8ic5f.Uk1sDeQjqasPr9DGoG', 'admin', '2025-04-28 11:43:26'),
(2, 'alumno2526', '$2b$10$39XTNepBtrMtqJAGvaAX5uSURCGZ3wvUiaf/xUrC6A5kIfcoP4lVe', 'admin', '2025-04-28 11:59:27');

-- --------------------------------------------------------

--
-- Estrutura da táboa `contraIndicaciones`
--

CREATE TABLE `contraIndicaciones` (
  `id` int(11) NOT NULL,
  `ceraTibia` text DEFAULT NULL,
  `ceraCaliente` text DEFAULT NULL,
  `depilacionElectrica` text DEFAULT NULL,
  `fotoDepilacion` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da táboa `datosClinicos`
--

CREATE TABLE `datosClinicos` (
  `id` int(11) NOT NULL,
  `infecciones` tinyint(1) DEFAULT NULL,
  `alteracionesVasculares` tinyint(1) DEFAULT NULL,
  `diabetes` tinyint(1) DEFAULT NULL,
  `oncologicos` tinyint(1) DEFAULT NULL,
  `alergias` tinyint(1) DEFAULT NULL,
  `problemasRespiratorios` tinyint(1) DEFAULT NULL,
  `alteracionesHormonales` tinyint(1) DEFAULT NULL,
  `medicacion` tinyint(1) DEFAULT NULL,
  `operacionesRecientes` tinyint(1) DEFAULT NULL,
  `problemasCicatrizacion` tinyint(1) DEFAULT NULL,
  `embarazo` tinyint(1) DEFAULT NULL,
  `menopausia` tinyint(1) DEFAULT NULL,
  `ovarioPoliquistico` tinyint(1) DEFAULT NULL,
  `alteracionesMenstruales` tinyint(1) DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A extraer os datos da táboa `datosClinicos`
--

INSERT INTO `datosClinicos` (`id`, `infecciones`, `alteracionesVasculares`, `diabetes`, `oncologicos`, `alergias`, `problemasRespiratorios`, `alteracionesHormonales`, `medicacion`, `operacionesRecientes`, `problemasCicatrizacion`, `embarazo`, `menopausia`, `ovarioPoliquistico`, `alteracionesMenstruales`, `observaciones`) VALUES
(11, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, ''),
(17, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '');

-- --------------------------------------------------------

--
-- Estrutura da táboa `datosEsteticos`
--

CREATE TABLE `datosEsteticos` (
  `id` int(11) NOT NULL,
  `hidratantesFaciales` varchar(255) DEFAULT NULL,
  `hidratantesCorporales` varchar(255) DEFAULT NULL,
  `aceites` varchar(255) DEFAULT NULL,
  `proteccionSolar` varchar(255) DEFAULT NULL,
  `otraCosmetica` varchar(255) DEFAULT NULL,
  `alergiaCosmetica` varchar(255) DEFAULT NULL,
  `tratamientosRealizados` varchar(255) DEFAULT NULL,
  `cirugiaEstetica` varchar(255) DEFAULT NULL,
  `preocupacionesEsteticas` text DEFAULT NULL,
  `metodosDepilacion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A extraer os datos da táboa `datosEsteticos`
--

INSERT INTO `datosEsteticos` (`id`, `hidratantesFaciales`, `hidratantesCorporales`, `aceites`, `proteccionSolar`, `otraCosmetica`, `alergiaCosmetica`, `tratamientosRealizados`, `cirugiaEstetica`, `preocupacionesEsteticas`, `metodosDepilacion`) VALUES
(11, 'Si', 'Si', '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Estrutura da táboa `datosPiel`
--

CREATE TABLE `datosPiel` (
  `id` int(11) NOT NULL,
  `tipoPiel` varchar(32) DEFAULT NULL,
  `alteracionesCutaneas` text DEFAULT NULL,
  `alteracionesPigmentarias` text DEFAULT NULL,
  `alteracionesVasculares` text DEFAULT NULL,
  `alteracionesPilosas` text DEFAULT NULL,
  `grosorPelo` varchar(32) DEFAULT NULL,
  `colorPelo` varchar(32) DEFAULT NULL,
  `colorOjos` varchar(32) DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A extraer os datos da táboa `datosPiel`
--

INSERT INTO `datosPiel` (`id`, `tipoPiel`, `alteracionesCutaneas`, `alteracionesPigmentarias`, `alteracionesVasculares`, `alteracionesPilosas`, `grosorPelo`, `colorPelo`, `colorOjos`, `observaciones`) VALUES
(17, 'Grasa', 'Dermatitis,Psoriasis', 'Vitíligo', 'Varices', 'Hipertricosis', 'Muy Fino', 'Pelirrojo', 'Verde', 'Test');

-- --------------------------------------------------------

--
-- Estrutura da táboa `habitosVida`
--

CREATE TABLE `habitosVida` (
  `id` int(11) NOT NULL,
  `comidas` varchar(255) DEFAULT NULL,
  `horasDormir` varchar(255) DEFAULT NULL,
  `ejercicio` varchar(255) DEFAULT NULL,
  `alcohol` varchar(255) DEFAULT NULL,
  `tabaco` varchar(255) DEFAULT NULL,
  `hidratacion` varchar(255) DEFAULT NULL,
  `horasSol` varchar(255) DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A extraer os datos da táboa `habitosVida`
--

INSERT INTO `habitosVida` (`id`, `comidas`, `horasDormir`, `ejercicio`, `alcohol`, `tabaco`, `hidratacion`, `horasSol`, `observaciones`) VALUES
(11, '3', '8', '', '', 'No', '', '', '');

-- --------------------------------------------------------

--
-- Estrutura da táboa `tablaUsuarios`
--

CREATE TABLE `tablaUsuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `profesion` varchar(100) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `movil` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A extraer os datos da táboa `tablaUsuarios`
--

INSERT INTO `tablaUsuarios` (`id`, `nombre`, `apellidos`, `direccion`, `profesion`, `edad`, `movil`, `email`) VALUES
(11, 'Pedro', 'RodríGuez FernáNdez', '', '', 23, '623564345', ''),
(17, 'PIPA', 'Aaa', '', '', 14, '675894567', '');

-- --------------------------------------------------------

--
-- Estrutura da táboa `Tratamientos`
--

CREATE TABLE `Tratamientos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fecha_tratamiento` date NOT NULL,
  `tecnica_tratamiento` varchar(255) NOT NULL,
  `observaciones` text DEFAULT NULL,
  `asesoramiento` text DEFAULT NULL,
  `cosmeticosUsados` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A extraer os datos da táboa `Tratamientos`
--

INSERT INTO `Tratamientos` (`id`, `usuario_id`, `fecha_tratamiento`, `tecnica_tratamiento`, `observaciones`, `asesoramiento`, `cosmeticosUsados`) VALUES
(3, 11, '2025-05-13', 'Cera Baja Fusión', '', '', '');

-- --------------------------------------------------------

--
-- Estrutura da táboa `ZonaTratamientos`
--

CREATE TABLE `ZonaTratamientos` (
  `id` int(11) NOT NULL,
  `tratamiento_id` int(11) NOT NULL,
  `zona` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A extraer os datos da táboa `ZonaTratamientos`
--

INSERT INTO `ZonaTratamientos` (`id`, `tratamiento_id`, `zona`) VALUES
(3, 3, 'Extremidades Superiores'),
(4, 3, 'Brasileña');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contraIndicaciones`
--
ALTER TABLE `contraIndicaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `datosClinicos`
--
ALTER TABLE `datosClinicos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `datosEsteticos`
--
ALTER TABLE `datosEsteticos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `datosPiel`
--
ALTER TABLE `datosPiel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `habitosVida`
--
ALTER TABLE `habitosVida`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tablaUsuarios`
--
ALTER TABLE `tablaUsuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Tratamientos`
--
ALTER TABLE `Tratamientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indexes for table `ZonaTratamientos`
--
ALTER TABLE `ZonaTratamientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tratamiento_id` (`tratamiento_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `contraIndicaciones`
--
ALTER TABLE `contraIndicaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tablaUsuarios`
--
ALTER TABLE `tablaUsuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `Tratamientos`
--
ALTER TABLE `Tratamientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ZonaTratamientos`
--
ALTER TABLE `ZonaTratamientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricións para os envorcados das táboas
--

--
-- Restricións para a táboa `datosClinicos`
--
ALTER TABLE `datosClinicos`
  ADD CONSTRAINT `datosClinicos_ibfk_1` FOREIGN KEY (`id`) REFERENCES `tablaUsuarios` (`id`) ON DELETE CASCADE;

--
-- Restricións para a táboa `datosEsteticos`
--
ALTER TABLE `datosEsteticos`
  ADD CONSTRAINT `datosEsteticos_ibfk_1` FOREIGN KEY (`id`) REFERENCES `tablaUsuarios` (`id`) ON DELETE CASCADE;

--
-- Restricións para a táboa `datosPiel`
--
ALTER TABLE `datosPiel`
  ADD CONSTRAINT `datosPiel_ibfk_1` FOREIGN KEY (`id`) REFERENCES `tablaUsuarios` (`id`) ON DELETE CASCADE;

--
-- Restricións para a táboa `habitosVida`
--
ALTER TABLE `habitosVida`
  ADD CONSTRAINT `habitosVida_ibfk_1` FOREIGN KEY (`id`) REFERENCES `tablaUsuarios` (`id`) ON DELETE CASCADE;

--
-- Restricións para a táboa `Tratamientos`
--
ALTER TABLE `Tratamientos`
  ADD CONSTRAINT `Tratamientos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `tablaUsuarios` (`id`) ON DELETE CASCADE;

--
-- Restricións para a táboa `ZonaTratamientos`
--
ALTER TABLE `ZonaTratamientos`
  ADD CONSTRAINT `ZonaTratamientos_ibfk_1` FOREIGN KEY (`tratamiento_id`) REFERENCES `Tratamientos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
