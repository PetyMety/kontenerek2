-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 25. 08:42
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `train`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `trains`
--

CREATE TABLE `trains` (
  `TrainID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `TrainType` varchar(50) DEFAULT NULL,
  `TrainName` varchar(100) DEFAULT NULL,
  `Operator` varchar(100) DEFAULT 'MÁV',
  `Route` varchar(255) DEFAULT NULL,
  `DepartureTime` datetime DEFAULT NULL,
  `ArrivalTime` datetime DEFAULT NULL,
  `Status` varchar(50) DEFAULT 'Active',
  `Capacity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `trains`
--

INSERT INTO `trains` (`TrainID`, `TrainType`, `TrainName`, `Operator`, `Route`, `DepartureTime`, `ArrivalTime`, `Status`, `Capacity`) VALUES
(1, 'InterCity', 'IC 101', 'MÁV', 'Budapest - Szeged', '2024-11-26 08:00:00', '2024-11-26 10:00:00', 'Active', 350),
(2, 'Regional', 'R 405', 'MÁV', 'Budapest - Kecskemét', '2024-11-26 09:15:00', '2024-11-26 10:30:00', 'Active', 200),
(3, 'Freight', 'F 123', 'MÁV', 'Budapest - Pécs', '2024-11-26 12:00:00', '2024-11-26 16:00:00', 'Active', 500),
(4, 'InterCity', 'IC 202', 'MÁV', 'Debrecen - Budapest', '2024-11-26 07:30:00', '2024-11-26 09:45:00', 'Active', 350),
(5, 'Regional', 'R 307', 'MÁV', 'Székesfehérvár - Budapest', '2024-11-26 10:15:00', '2024-11-26 11:00:00', 'Active', 180),
(6, 'InterCity', 'IC 150', 'MÁV', 'Pécs - Budapest', '2024-11-26 15:00:00', '2024-11-26 17:30:00', 'Active', 320),
(7, 'Freight', 'F 999', 'MÁV', 'Miskolc - Budapest', '2024-11-26 18:00:00', '2024-11-26 22:30:00', 'Active', 600),
(8, 'InterCity', 'IC 303', 'MÁV', 'Budapest - Nyíregyháza', '2024-11-26 06:30:00', '2024-11-26 09:00:00', 'Active', 280),
(9, 'Regional', 'R 412', 'MÁV', 'Szeged - Budapest', '2024-11-26 11:00:00', '2024-11-26 13:00:00', 'Active', 220),
(10, 'InterCity', 'IC 404', 'MÁV', 'Sopron - Budapest', '2024-11-26 12:00:00', '2024-11-26 14:30:00', 'Active', 350),
(11, 'Regional', 'R 502', 'MÁV', 'Kecskemét - Szeged', '2024-11-26 08:00:00', '2024-11-26 09:15:00', 'Active', 180),
(12, 'Freight', 'F 555', 'MÁV', 'Budapest - Győr', '2024-11-26 16:00:00', '2024-11-26 20:00:00', 'Active', 550),
(13, 'InterCity', 'IC 707', 'MÁV', 'Szombathely - Budapest', '2024-11-26 14:15:00', '2024-11-26 16:45:00', 'Active', 320),
(14, 'Regional', 'R 320', 'MÁV', 'Nyíregyháza - Budapest', '2024-11-26 10:30:00', '2024-11-26 13:00:00', 'Active', 200),
(15, 'Freight', 'F 876', 'MÁV', 'Pécs - Miskolc', '2024-11-26 17:00:00', '2024-11-26 21:30:00', 'Active', 650),
(16, 'InterCity', 'IC 505', 'MÁV', 'Budapest - Veszprém', '2024-11-26 09:45:00', '2024-11-26 11:30:00', 'Active', 300),
(17, 'Regional', 'R 800', 'MÁV', 'Veszprém - Győr', '2024-11-26 07:00:00', '2024-11-26 08:30:00', 'Active', 160),
(18, 'Freight', 'F 333', 'MÁV', 'Debrecen - Pécs', '2024-11-26 13:00:00', '2024-11-26 17:30:00', 'Active', 700),
(19, 'InterCity', 'IC 100', 'MÁV', 'Budapest - Szombathely', '2024-11-26 08:30:00', '2024-11-26 11:00:00', 'Active', 330),
(20, 'Regional', 'R 210', 'MÁV', 'Szeged - Kecskemét', '2024-11-26 09:45:00', '2024-11-26 11:00:00', 'Active', 210);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `trains`
--
ALTER TABLE `trains`
  ADD PRIMARY KEY (`TrainID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
