-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.4.4-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for hotelbooking
CREATE DATABASE IF NOT EXISTS `hotelbooking` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `hotelbooking`;

ALTER DATABASE hotelbooking
    CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;

-- Dumping structure for table hotelbooking.chi_tiet_loai_giuong
CREATE TABLE IF NOT EXISTS `chi_tiet_loai_giuong` (
  `so_giuong` int(11) DEFAULT NULL,
  `ma_giuong` varchar(255) NOT NULL,
  `ma_loai_phong` varchar(255) NOT NULL,
  PRIMARY KEY (`ma_giuong`,`ma_loai_phong`),
  KEY `FKai1qp0y0h8jqmyid2x05yprbo` (`ma_loai_phong`),
  CONSTRAINT `FKai1qp0y0h8jqmyid2x05yprbo` FOREIGN KEY (`ma_loai_phong`) REFERENCES `loai_phong` (`ma_loai_phong`),
  CONSTRAINT `FKb4rfmyb06o3njjdjmevnqf52k` FOREIGN KEY (`ma_giuong`) REFERENCES `loai_giuong` (`ma_giuong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.chi_tiet_loai_giuong: ~8 rows (approximately)
INSERT INTO `chi_tiet_loai_giuong` (`so_giuong`, `ma_giuong`, `ma_loai_phong`) VALUES
	(1, 'G1', 'LP1'),
	(2, 'G1', 'LP3'),
	(1, 'G2', 'LP2'),
	(2, 'G2', 'LP7'),
	(3, 'G2', 'LP8'),
	(2, 'G3', 'LP5'),
	(1, 'G4', 'LP4'),
	(1, 'G4', 'LP6');

-- Dumping structure for table hotelbooking.chi_tiet_tien_nghi
CREATE TABLE IF NOT EXISTS `chi_tiet_tien_nghi` (
  `ma_loai_phong` varchar(255) NOT NULL,
  `ma_tien_nghi` varchar(255) NOT NULL,
  PRIMARY KEY (`ma_loai_phong`,`ma_tien_nghi`),
  KEY `FKqsv5nl7a6f3rsfxpgqykj2q2j` (`ma_tien_nghi`),
  CONSTRAINT `FKl0w8jxjdq9mpok2rhgypmjqd8` FOREIGN KEY (`ma_loai_phong`) REFERENCES `loai_phong` (`ma_loai_phong`),
  CONSTRAINT `FKqsv5nl7a6f3rsfxpgqykj2q2j` FOREIGN KEY (`ma_tien_nghi`) REFERENCES `tien_nghi` (`ma_tien_nghi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.chi_tiet_tien_nghi: ~119 rows (approximately)
INSERT INTO `chi_tiet_tien_nghi` (`ma_loai_phong`, `ma_tien_nghi`) VALUES
	('LP1', 'TN1'),
	('LP2', 'TN1'),
	('LP3', 'TN1'),
	('LP4', 'TN1'),
	('LP5', 'TN1'),
	('LP6', 'TN1'),
	('LP7', 'TN1'),
	('LP8', 'TN1'),
	('LP1', 'TN10'),
	('LP2', 'TN10'),
	('LP3', 'TN10'),
	('LP4', 'TN10'),
	('LP5', 'TN10'),
	('LP6', 'TN10'),
	('LP7', 'TN10'),
	('LP8', 'TN10'),
	('LP6', 'TN11'),
	('LP6', 'TN12'),
	('LP4', 'TN13'),
	('LP5', 'TN13'),
	('LP6', 'TN13'),
	('LP7', 'TN13'),
	('LP8', 'TN13'),
	('LP4', 'TN14'),
	('LP5', 'TN14'),
	('LP6', 'TN14'),
	('LP8', 'TN14'),
	('LP5', 'TN15'),
	('LP6', 'TN15'),
	('LP7', 'TN15'),
	('LP8', 'TN15'),
	('LP2', 'TN16'),
	('LP3', 'TN16'),
	('LP4', 'TN16'),
	('LP5', 'TN16'),
	('LP6', 'TN16'),
	('LP7', 'TN16'),
	('LP8', 'TN16'),
	('LP1', 'TN17'),
	('LP2', 'TN17'),
	('LP3', 'TN17'),
	('LP7', 'TN17'),
	('LP8', 'TN17'),
	('LP1', 'TN18'),
	('LP2', 'TN18'),
	('LP3', 'TN18'),
	('LP1', 'TN19'),
	('LP2', 'TN19'),
	('LP3', 'TN19'),
	('LP4', 'TN19'),
	('LP5', 'TN19'),
	('LP6', 'TN19'),
	('LP7', 'TN19'),
	('LP8', 'TN19'),
	('LP1', 'TN2'),
	('LP2', 'TN2'),
	('LP3', 'TN2'),
	('LP4', 'TN2'),
	('LP5', 'TN2'),
	('LP6', 'TN2'),
	('LP7', 'TN2'),
	('LP8', 'TN2'),
	('LP1', 'TN20'),
	('LP2', 'TN20'),
	('LP3', 'TN20'),
	('LP4', 'TN20'),
	('LP5', 'TN20'),
	('LP6', 'TN20'),
	('LP7', 'TN20'),
	('LP8', 'TN20'),
	('LP1', 'TN21'),
	('LP2', 'TN21'),
	('LP3', 'TN21'),
	('LP4', 'TN21'),
	('LP5', 'TN21'),
	('LP6', 'TN21'),
	('LP7', 'TN21'),
	('LP8', 'TN21'),
	('LP1', 'TN3'),
	('LP2', 'TN3'),
	('LP3', 'TN3'),
	('LP4', 'TN3'),
	('LP5', 'TN3'),
	('LP6', 'TN3'),
	('LP7', 'TN3'),
	('LP8', 'TN3'),
	('LP1', 'TN4'),
	('LP2', 'TN4'),
	('LP3', 'TN4'),
	('LP4', 'TN4'),
	('LP5', 'TN4'),
	('LP6', 'TN4'),
	('LP7', 'TN4'),
	('LP8', 'TN4'),
	('LP4', 'TN5'),
	('LP5', 'TN5'),
	('LP6', 'TN5'),
	('LP4', 'TN6'),
	('LP5', 'TN6'),
	('LP6', 'TN6'),
	('LP1', 'TN7'),
	('LP2', 'TN7'),
	('LP3', 'TN7'),
	('LP4', 'TN7'),
	('LP5', 'TN7'),
	('LP6', 'TN7'),
	('LP7', 'TN7'),
	('LP8', 'TN7'),
	('LP3', 'TN8'),
	('LP7', 'TN8'),
	('LP8', 'TN8'),
	('LP1', 'TN9'),
	('LP2', 'TN9'),
	('LP3', 'TN9'),
	('LP4', 'TN9'),
	('LP5', 'TN9'),
	('LP6', 'TN9'),
	('LP7', 'TN9'),
	('LP8', 'TN9');

-- Dumping structure for table hotelbooking.danh_gia
CREATE TABLE IF NOT EXISTS `danh_gia` (
  `ma_danh_gia` varchar(255) NOT NULL,
  `binh_luan` varchar(255) DEFAULT NULL,
  `diem_co_so_vat_chat` int(11) DEFAULT NULL,
  `diem_dich_vu` int(11) DEFAULT NULL,
  `diem_sach_se` int(11) DEFAULT NULL,
  `thoi_gian_danh_gia` datetime(6) DEFAULT NULL,
  `ma_loai_phong` varchar(255) NOT NULL,
  `tinh_trang` bit(1) DEFAULT b'1',
  PRIMARY KEY (`ma_danh_gia`),
  KEY `FK5l9noa6ee16y7twqcfqdalytn` (`ma_loai_phong`),
  CONSTRAINT `FK5l9noa6ee16y7twqcfqdalytn` FOREIGN KEY (`ma_loai_phong`) REFERENCES `loai_phong` (`ma_loai_phong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.danh_gia: ~5 rows (approximately)
INSERT INTO `danh_gia` (`ma_danh_gia`, `binh_luan`, `diem_co_so_vat_chat`, `diem_dich_vu`, `diem_sach_se`, `thoi_gian_danh_gia`, `ma_loai_phong`, `tinh_trang`) VALUES
	('DG001', 'Phòng rất đẹp và sạch sẽ, nhân viên thân thiện', 9, 8, 10, '2024-11-25 10:00:00.000000', 'LP1', b'1'),
	('DG002', 'View ban công tuyệt vời, không gian yên tĩnh', 8, 9, 9, '2024-11-26 14:30:00.000000', 'LP2', b'1'),
	('DG003', 'Phòng suite rộng rãi, đầy đủ tiện nghi cao cấp', 10, 9, 10, '2024-11-27 16:45:00.000000', 'LP6', b'1'),
	('DG004', 'Phòng family rất tiện lợi cho gia đình có trẻ nhỏ', 8, 8, 9, '2024-11-28 11:20:00.000000', 'LP7', b'1'),
	('DG005', 'Giá cả hợp lý, dịch vụ tốt, sẽ quay lại', 7, 8, 8, '2024-11-29 09:15:00.000000', 'LP3', b'1');

-- Dumping structure for table hotelbooking.don_dat_phong
CREATE TABLE IF NOT EXISTS `don_dat_phong` (
  `ma_dat_phong` varchar(255) NOT NULL,
  `vat` int(11) NOT NULL,
  `check_in` datetime(6) DEFAULT NULL,
  `check_out` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `giam_gia_diem_tich_luy` double DEFAULT NULL,
  `ho_ten_khach_hang` varchar(255) DEFAULT NULL,
  `giam_gia_lan_dau` double DEFAULT NULL,
  `so_dien_thoai` varchar(255) DEFAULT NULL,
  `tong_tien` double DEFAULT NULL,
  `tong_tien_tt` double DEFAULT NULL,
  `trang_thai` enum('CHUA_THANH_TOAN','DA_THANH_TOAN','DA_HUY') DEFAULT NULL,
  `ma_danh_gia` varchar(255) DEFAULT NULL,
  `ma_khach_hang` varchar(255) DEFAULT NULL,
  `ma_phong` varchar(255) DEFAULT NULL,
  `ngay_tao` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`ma_dat_phong`),
  UNIQUE KEY `UKipxmhku7rgbv70o63oeg3eqt8` (`ma_danh_gia`),
  KEY `FK31kww3fnehujkecraaf12t7uo` (`ma_khach_hang`),
  KEY `FKiwe3j9tstd4okh7carw4b6imb` (`ma_phong`),
  CONSTRAINT `FK31kww3fnehujkecraaf12t7uo` FOREIGN KEY (`ma_khach_hang`) REFERENCES `khach_hang` (`ma_khach_hang`),
  CONSTRAINT `FKiwe3j9tstd4okh7carw4b6imb` FOREIGN KEY (`ma_phong`) REFERENCES `phong` (`ma_phong`),
  CONSTRAINT `FKoofpaiwyvbalhesqbxlfsp2gq` FOREIGN KEY (`ma_danh_gia`) REFERENCES `danh_gia` (`ma_danh_gia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.don_dat_phong: ~11 rows (approximately)
INSERT INTO `don_dat_phong` (`ma_dat_phong`, `vat`, `check_in`, `check_out`, `email`, `ghi_chu`, `giam_gia_diem_tich_luy`, `ho_ten_khach_hang`, `lan_dau`, `so_dien_thoai`, `tong_tien`, `tong_tien_tt`, `trang_thai`, `ma_danh_gia`, `ma_khach_hang`, `ma_phong`, `ngay_tao`) VALUES
	('DP_PENDING_001', 8, '2024-12-15 14:00:00.000000', '2024-12-17 12:00:00.000000', 'vana@gmail.com', 'Chưa có yêu cầu đặc biệt', 0, 'Nguyễn Văn A', b'0', '0901234567', 900000, 972000, 'DA_HUY', NULL, 'KH1', 'P102', '2024-11-29 11:00:00.000000'),
	('DP_PENDING_002', 8, '2024-12-20 14:00:00.000000', '2024-12-22 12:00:00.000000', 'hthanhtuan.2307@gmail.com', 'Tổ chức sinh nhật', 20000, 'Hà Thanh Tuấn', b'0', '0367155132', 1800000, 1926400, 'DA_HUY', NULL, 'KH2', 'P501', '2024-11-30 14:20:00.000000'),
	('DP_SUCCESS_001', 8, '2024-11-20 14:00:00.000000', '2024-11-22 12:00:00.000000', 'vana@gmail.com', 'Yêu cầu phòng tầng cao, view đẹp', 0, 'Nguyễn Văn A', b'1', '0901234567', 1000000, 1080000, 'DA_THANH_TOAN', 'DG001', 'KH1', 'P101', '2024-11-15 10:30:00.000000'),
	('DP_SUCCESS_002', 8, '2024-11-25 14:00:00.000000', '2024-11-27 12:00:00.000000', 'hthanhtuan.2307@gmail.com', 'Kỷ niệm 1 năm ngày cưới', 50000, 'Hà Thanh Tuấn', b'0', '0367155132', 1200000, 1246000, 'DA_THANH_TOAN', 'DG002', 'KH2', 'P201', '2024-11-18 15:45:00.000000'),
	('DP_SUCCESS_003', 8, '2024-12-01 14:00:00.000000', '2024-12-03 12:00:00.000000', 'vanb@gmail.com', 'Công tác kết hợp nghỉ dưỡng', 0, 'Nguyễn Văn B', b'1', '0912345678', 4400000, 4752000, 'DA_THANH_TOAN', 'DG003', 'KH3', 'P701', '2024-11-22 09:20:00.000000'),
	('DP_SUCCESS_004', 8, '2024-12-05 14:00:00.000000', '2024-12-07 12:00:00.000000', 'vanc@gmail.com', 'Du lịch gia đình cuối tuần', 100000, 'Nguyễn Văn C', b'0', '0923456789', 3800000, 4004000, 'DA_THANH_TOAN', 'DG004', 'KH4', 'P601', '2024-11-25 14:15:00.000000'),
	('DP_SUCCESS_005', 8, '2024-12-10 14:00:00.000000', '2024-12-12 12:00:00.000000', 'vana@gmail.com', 'Đi công tác', 0, 'Nguyễn Văn A', b'0', '0901234567', 1400000, 1512000, 'DA_THANH_TOAN', 'DG005', 'KH1', 'P301', '2024-11-28 16:30:00.000000'),
	('DP0XDTV1D3ZO', 8, '2025-11-25 12:30:00.000000', '2025-11-28 13:00:00.000000', 'hthanhtuan.2307@gmail.com', '', 0, 'Hà Thanh Tuấn', b'0', '0367155132', 1800000, 1944000.0000000002, 'DA_HUY', NULL, 'KHXN768S7ZH5', 'P110', '2025-11-25 22:32:55.252920'),
	('DP2TKQTH8JF6', 8, '2025-11-25 12:30:00.000000', '2025-11-28 13:00:00.000000', 'hthanhtuan.2307@gmail.com', '', 0, 'Hà Thanh Tuấn', b'0', '0367155132', 1800000, 1944000.0000000002, 'DA_THANH_TOAN', NULL, 'KH0X07NXEF7G', 'P110', '2025-11-25 22:32:58.686746'),
	('DP4V72X2JKG1', 8, '2025-11-24 12:30:00.000000', '2025-11-25 13:00:00.000000', 'hthanhtuan.2307@gmail.com', '', 0, 'Hà Thanh Tuấn', b'0', '0367155132', 1100000, 1188000, 'DA_HUY', NULL, 'KHT4ZJ524GG2', 'P502', '2025-11-24 15:34:20.883010'),
	('DP4WEQ6C206E', 8, '2025-11-26 12:30:00.000000', '2025-11-28 13:00:00.000000', 'hthanhtuan.2307@gmail.com', 'Không cần gì hết', 0, 'Hà Thanh Tuấn', b'0', '0367155132', 1200000, 1296000, 'DA_HUY', NULL, 'KH5B58BRLYL3', 'P110', '2025-11-24 15:25:34.088575'),
	('DPT1M90YGSN4', 8, '2025-11-24 12:30:00.000000', '2025-11-25 13:00:00.000000', 'hthanhtuan.2307@gmail.com', '', 0, 'Hà Thanh Tuấn', b'0', '0367155132', 1100000, 1188000, 'DA_HUY', NULL, 'KH308EUY9C2F', 'P502', '2025-11-24 15:40:10.674430');

-- Dumping structure for table hotelbooking.hinh_anh
CREATE TABLE IF NOT EXISTS `hinh_anh` (
  `ma_loai_phong` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  KEY `FKdb9nyfdtytcn97nx5i6n3ka7i` (`ma_loai_phong`),
  CONSTRAINT `FKdb9nyfdtytcn97nx5i6n3ka7i` FOREIGN KEY (`ma_loai_phong`) REFERENCES `loai_phong` (`ma_loai_phong`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.hinh_anh: ~37 rows (approximately)
INSERT INTO `hinh_anh` (`ma_loai_phong`, `url`) VALUES
	('LP2', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731346/StandardDouble_cduqku.webp'),
	('LP2', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731344/StandardDouble2_kji0gh.webp'),
	('LP2', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763732209/StandardDouble3_tgc5o4.jpg'),
	('LP3', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731347/StandardDoubleDouble3_agvn52.jpg'),
	('LP3', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731346/StandardDoubleDouble_biyvxc.jpg'),
	('LP3', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731346/StandardDoubleDouble2_zvljfn.jpg'),
	('LP3', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731349/StandardDoubleDouble4_nco2f8.jpg'),
	('LP4', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731345/StandardOne1_z93s0j.jpg'),
	('LP4', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731346/StandardOne2_ed0ebs.webp'),
	('LP4', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731893/cac-loai-giuong-khach-san-2_goljtq.jpg'),
	('LP4', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731919/StandardOne3_yqsdlj.jpg'),
	('LP5', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731345/StandardOne1_z93s0j.jpg'),
	('LP5', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731346/StandardOne2_ed0ebs.webp'),
	('LP5', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731893/cac-loai-giuong-khach-san-2_goljtq.jpg'),
	('LP5', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731919/StandardOne3_yqsdlj.jpg'),
	('LP6', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731347/Suite2_j4bhxm.avif'),
	('LP6', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731348/Suite1_sb40m5.avif'),
	('LP6', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731350/Suite3_rv4tx2.avif'),
	('LP6', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763732724/suite4webp_zc1gkg.webp'),
	('LP7', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731349/Family1_h153rl.avif'),
	('LP7', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731347/Family2_ve1was.avif'),
	('LP7', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763732954/family2double_oqtxji.jpg'),
	('LP7', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763732958/Family2Double2_boldkh.jpg'),
	('LP8', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763733270/p3-7_ih6l4y.jpg'),
	('LP8', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763733271/p3-6_pmdy4j.jpg'),
	('LP8', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763733268/Family3Doubble_ciapa8.jpg'),
	('LP8', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763733273/p3-19_tdmch1.jpg'),
	('LP1', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731345/StandardOne1_z93s0j.jpg'),
	('LP1', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731346/StandardOne2_ed0ebs.webp'),
	('LP1', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731893/cac-loai-giuong-khach-san-2_goljtq.jpg'),
	('LP1', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763731919/StandardOne3_yqsdlj.jpg'),
	('LP7B03VQOL2D', 'https://res.cloudinary.com/dude7j76s/image/upload/v1764076926/loai_phong/frfbz8abyurnkqpfkrpo.jpg'),
	('LP7B03VQOL2D', 'https://res.cloudinary.com/dude7j76s/image/upload/v1764076928/loai_phong/s8nfgqqpeol8etgh0spy.jpg'),
	('LP7B03VQOL2D', 'https://res.cloudinary.com/dude7j76s/image/upload/v1764076930/loai_phong/mflmigsxxdxltwhljxs2.webp'),
	('LP7B03VQOL2D', 'https://res.cloudinary.com/dude7j76s/image/upload/v1764076932/loai_phong/ksjsoxwghm2c0u8qprlb.jpg'),
	('LPSLA25VA404', 'https://res.cloudinary.com/dude7j76s/image/upload/v1764077289/loai_phong/dt7agi7v08dtorbcb6tl.jpg'),
	('LPJM9VTT40EE', 'https://res.cloudinary.com/dude7j76s/image/upload/v1764077456/loai_phong/mefor0g1h7o7ne8bwej8.webp');

-- Dumping structure for table hotelbooking.khach_hang
CREATE TABLE IF NOT EXISTS `khach_hang` (
  `ma_khach_hang` varchar(255) NOT NULL,
  `diem_tich_luy` int(11) DEFAULT 0,
  `ho_ten_khach_hang` varchar(255) DEFAULT NULL,
  `so_dien_thoai` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_khach_hang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.khach_hang: ~9 rows (approximately)
INSERT INTO `khach_hang` (`ma_khach_hang`, `diem_tich_luy`, `ho_ten_khach_hang`, `so_dien_thoai`) VALUES
	('KH0X07NXEF7G', 0, 'Hà Thanh Tuấn', '0367155132'),
	('KH1', 5, 'Nguyễn Văn A', '0901234567'),
	('KH2', 3, 'Hà Thanh Tuấn', '0367155132'),
	('KH3', 8, 'Nguyễn Văn B', '0912345678'),
	('KH308EUY9C2F', 0, 'Hà Thanh Tuấn', '0367155132'),
	('KH4', 6, 'Nguyễn Văn C', '0923456789'),
	('KH5B58BRLYL3', 0, 'Hà Thanh Tuấn', '0367155132'),
	('KHT4ZJ524GG2', 0, 'Hà Thanh Tuấn', '0367155132'),
	('KHXN768S7ZH5', 0, 'Hà Thanh Tuấn', '0367155132');

-- Dumping structure for table hotelbooking.loai_giuong
CREATE TABLE IF NOT EXISTS `loai_giuong` (
  `ma_giuong` varchar(255) NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `ten_giuong` varchar(255) NOT NULL,
  `tinh_trang` bit(1) DEFAULT b'1',
  PRIMARY KEY (`ma_giuong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.loai_giuong: ~4 rows (approximately)
INSERT INTO `loai_giuong` (`ma_giuong`, `mo_ta`, `ten_giuong`, `tinh_trang`) VALUES
	('G1', 'Giường đơn dành cho 1 khách', 'Single', b'1'),
	('G2', 'Giường đôi dành cho 2 khách', 'Double', b'1'),
	('G3', 'Giường đôi lớn, thoải mái cho 2 khách', 'Queen', b'1'),
	('G4', 'Giường siêu lớn, cao cấp cho khách sang trọng', 'King', b'1');

-- Dumping structure for table hotelbooking.loai_phong
CREATE TABLE IF NOT EXISTS `loai_phong` (
  `ma_loai_phong` varchar(255) NOT NULL,
  `dien_tich` double DEFAULT NULL,
  `gia` double DEFAULT NULL,
  `mo_ta` text DEFAULT NULL,
  `so_khach` int(11) DEFAULT NULL,
  `ten_loai_phong` varchar(255) NOT NULL,
  `tinh_trang` bit(1) DEFAULT b'1',
  PRIMARY KEY (`ma_loai_phong`),
  UNIQUE KEY `UK69ws9ijpn3ywvy883h3bbawj1` (`ten_loai_phong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.loai_phong: ~11 rows (approximately)
INSERT INTO `loai_phong` (`ma_loai_phong`, `dien_tich`, `gia`, `mo_ta`, `so_khach`, `ten_loai_phong`, `tinh_trang`) VALUES
	('LP1', 25, 500000, 'Phòng tiêu chuẩn với 1 giường đơn, diện tích 20m2, thiết kế tối giản nhưng đầy đủ tiện nghi, bao gồm TV, minibar, điều hòa, bàn làm việc và phòng tắm hiện đại. Phù hợp cho 1 khách, mang đến không gian nghỉ ngơi thoải mái và tiện lợi.', 1, 'Standard Single', b'1'),
	('LP2', 25, 600000, 'Phòng tiêu chuẩn với 1 giường đôi, diện tích 20m2, trang bị đầy đủ tiện nghi như TV, minibar, điều hòa, bàn làm việc và phòng tắm hiện đại. Phù hợp cho 2 khách, lý tưởng cho cặp đôi hoặc bạn bè muốn nghỉ ngơi trong không gian vừa đủ thoải mái.', 2, 'Standard Double', b'1'),
	('LP3', 30, 700000, 'Phòng tiêu chuẩn với 2 giường đơn, diện tích 20m2, được trang bị TV, minibar, điều hòa, bàn làm việc và phòng tắm hiện đại. Phù hợp cho 2 khách, mang lại sự tiện nghi và linh hoạt cho những ai muốn nghỉ ngơi riêng tư trong cùng một phòng.', 2, 'Standard 2 Single', b'1'),
	('LP4', 30, 900000, 'Phòng cao cấp Deluxe với 1 giường siêu lớn King, diện tích 30m2, thiết kế tinh tế và sang trọng. Phòng có cửa sổ hoặc ban công, trang bị đầy đủ tiện nghi như TV, minibar, điều hòa, sofa, bàn trà và phòng tắm có bồn tắm.', 2, 'Deluxe King', b'1'),
	('LP5', 35, 1100000, 'Phòng cao cấp Deluxe với 2 giường đôi lớn Queen, diện tích 30m2, thiết kế rộng rãi, trang bị TV, minibar, điều hòa, sofa, bàn trà, phòng tắm sang trọng với bồn tắm và ban công. Phù hợp cho 2–4 khách, lý tưởng cho gia đình hoặc nhóm bạn.', 4, 'Deluxe 2 Queen', b'1'),
	('LP6', 60, 2200000, 'Phòng Suite hạng sang với giường King và phòng khách riêng, diện tích 60m2, gồm phòng ngủ và phòng khách riêng biệt. Trang bị đầy đủ tiện nghi cao cấp: TV, minibar, điều hòa, sofa, bàn làm việc, phòng tắm có bồn tắm và ban công rộng.', 3, 'Suite King', b'1'),
	('LP7', 40, 1900000, 'Phòng Family rộng 40m2 với 2 giường đôi, thiết kế tiện lợi cho gia đình hoặc nhóm bạn 4 khách. Có TV, minibar, điều hòa, bàn làm việc, bàn ăn nhỏ và bếp tiện dụng.', 4, 'Family 2 Double', b'1'),
	('LP7B03VQOL2D', 30, 600000, '', 2, 'Standard Single 2', b'1'),
	('LP8', 40, 2100000, 'Phòng Family rộng 40m2 với 3 giường đôi, dành cho nhóm 4–6 khách. Có đầy đủ tiện nghi: TV, minibar, điều hòa, bàn làm việc, bàn ăn/bếp nhỏ. Lý tưởng cho gia đình hoặc nhóm bạn muốn nghỉ dưỡng cùng nhau.', 6, 'Family 3 Double', b'1'),
	('LPJM9VTT40EE', 30, 700000, 'cxvxcvxcvxzcxcv', 2, 'Standard Single 4', b'1'),
	('LPSLA25VA404', 30, 700000, '', 2, 'Standard Single 3', b'1');

-- Dumping structure for table hotelbooking.phong
CREATE TABLE IF NOT EXISTS `phong` (
  `ma_phong` varchar(255) NOT NULL,
  `ten_phong` VARCHAR(50) NOT NULL,
  `trang_thai` enum('TRONG','PHUC_VU','BAO_TRI') DEFAULT 'TRONG',
  `vi_tri` varchar(255) DEFAULT NULL,
  `ma_loai_phong` varchar(255) NOT NULL,
  `tinh_trang` bit(1) DEFAULT b'1',
  PRIMARY KEY (`ma_phong`),
  KEY `FK378h0h60ooky42egxi2ckdqu` (`ma_loai_phong`),
  CONSTRAINT `FK378h0h60ooky42egxi2ckdqu` FOREIGN KEY (`ma_loai_phong`) REFERENCES `loai_phong` (`ma_loai_phong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.phong: ~60 rows (approximately)
INSERT INTO `phong` (`ma_phong`, `ten_phong`, `trang_thai`, `vi_tri`, `ma_loai_phong`, `tinh_trang`) VALUES
	('P101', 'P101', 'TRONG', 'Tầng 1', 'LP1', b'1'),
	('P102', 'P102', 'TRONG', 'Tầng 1', 'LP1', b'1'),
	('P103', 'P103', 'TRONG', 'Tầng 1', 'LP1', b'1'),
	('P104', 'P104', 'TRONG', 'Tầng 1', 'LP1', b'1'),
	('P105', 'P105', 'TRONG', 'Tầng 1', 'LP1', b'1'),
	('P106', 'P106', 'TRONG', 'Tầng 1', 'LP1', b'1'),
	('P107', 'P107', 'TRONG', 'Tầng 1', 'LP1', b'1'),
	('P108', 'P108', 'TRONG', 'Tầng 1', 'LP1', b'1'),
	('P109', 'P109', 'TRONG', 'Tầng 1', 'LP1', b'1'),
	('P110', 'P110', 'TRONG', 'Tầng 1', 'LP2', b'1'),
	('P201', 'P201', 'TRONG', 'Tầng 2', 'LP2', b'1'),
	('P202', 'P202', 'TRONG', 'Tầng 2', 'LP2', b'1'),
	('P203', 'P203', 'TRONG', 'Tầng 2', 'LP2', b'1'),
	('P204', 'P204', 'TRONG', 'Tầng 2', 'LP2', b'1'),
	('P205', 'P205', 'TRONG', 'Tầng 2', 'LP2', b'1'),
	('P206', 'P206', 'TRONG', 'Tầng 2', 'LP2', b'1'),
	('P207', 'P207', 'TRONG', 'Tầng 2', 'LP1', b'1'),
	('P208', 'P208', 'TRONG', 'Tầng 2', 'LP2', b'1'),
	('P209', 'P209', 'TRONG', 'Tầng 2', 'LP1', b'1'),
	('P210', 'P210', 'TRONG', 'Tầng 2', 'LP2', b'1'),
	('P301', 'P301', 'TRONG', 'Tầng 3', 'LP3', b'1'),
	('P302', 'P302', 'TRONG', 'Tầng 3', 'LP3', b'1'),
	('P303', 'P303', 'TRONG', 'Tầng 3', 'LP3', b'1'),
	('P304', 'P304', 'TRONG', 'Tầng 3', 'LP3', b'1'),
	('P305', 'P305', 'TRONG', 'Tầng 3', 'LP3', b'1'),
	('P306', 'P306', 'TRONG', 'Tầng 3', 'LP3', b'1'),
	('P307', 'P307', 'TRONG', 'Tầng 3', 'LP2', b'1'),
	('P308', 'P308', 'TRONG', 'Tầng 3', 'LP2', b'1'),
	('P309', 'P309', 'TRONG', 'Tầng 3', 'LP2', b'1'),
	('P310', 'P310', 'TRONG', 'Tầng 3', 'LP2', b'1'),
	('P401', 'P401', 'TRONG', 'Tầng 4', 'LP3', b'1'),
	('P402', 'P402', 'TRONG', 'Tầng 4', 'LP3', b'1'),
	('P403', 'P403', 'TRONG', 'Tầng 4', 'LP3', b'1'),
	('P404', 'P404', 'TRONG', 'Tầng 4', 'LP3', b'1'),
	('P405', 'P405', 'TRONG', 'Tầng 4', 'LP3', b'1'),
	('P406', 'P406', 'TRONG', 'Tầng 4', 'LP3', b'1'),
	('P407', 'P407', 'TRONG', 'Tầng 4', 'LP2', b'1'),
	('P408', 'P408', 'TRONG', 'Tầng 4', 'LP2', b'1'),
	('P409', 'P409', 'TRONG', 'Tầng 4', 'LP2', b'1'),
	('P410', 'P410', 'TRONG', 'Tầng 4', 'LP2', b'1'),
	('P501', 'P501', 'TRONG', 'Tầng 5', 'LP4', b'1'),
	('P502', 'P502', 'TRONG', 'Tầng 5', 'LP5', b'1'),
	('P503', 'P503', 'TRONG', 'Tầng 5', 'LP4', b'1'),
	('P504', 'P504', 'TRONG', 'Tầng 5', 'LP5', b'1'),
	('P505', 'P505', 'TRONG', 'Tầng 5', 'LP4', b'1'),
	('P506', 'P506', 'TRONG', 'Tầng 5', 'LP5', b'1'),
	('P507', 'P507', 'TRONG', 'Tầng 5', 'LP4', b'1'),
	('P508', 'P508', 'TRONG', 'Tầng 5', 'LP5', b'1'),
	('P509', 'P509', 'TRONG', 'Tầng 5', 'LP4', b'1'),
	('P510', 'P510', 'TRONG', 'Tầng 5', 'LP5', b'1'),
	('P601', 'P601', 'TRONG', 'Tầng 6', 'LP8', b'1'),
	('P602', 'P602', 'TRONG', 'Tầng 6', 'LP8', b'1'),
	('P603', 'P603', 'TRONG', 'Tầng 6', 'LP8', b'1'),
	('P604', 'P604', 'TRONG', 'Tầng 6', 'LP7', b'1'),
	('P605', 'P605', 'TRONG', 'Tầng 6', 'LP7', b'1'),
	('P606', 'P606', 'TRONG', 'Tầng 6', 'LP7', b'1'),
	('P701', 'P701', 'TRONG', 'Tầng 7', 'LP6', b'1'),
	('P702', 'P702', 'TRONG', 'Tầng 7', 'LP6', b'1'),
	('P703', 'P703', 'TRONG', 'Tầng 7', 'LP6', b'1'),
	('P704', 'P704', 'TRONG', 'Tầng 7', 'LP6', b'1');

-- Dumping structure for table hotelbooking.tai_khoan
CREATE TABLE IF NOT EXISTS `tai_khoan` (
  `ma_tai_khoan` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `vai_tro` enum('ADMIN','MEMBER') DEFAULT 'MEMBER',
  `ma_khach_hang` varchar(255) DEFAULT NULL,
  `tinh_trang` bit(1) DEFAULT b'1',
  PRIMARY KEY (`ma_tai_khoan`),
  UNIQUE KEY `UKd0golrlr34gkql6so1i4gbuw5` (`email`),
  UNIQUE KEY `UKpfxkkprixt2p7mhm82db4lyhu` (`ma_khach_hang`),
  CONSTRAINT `FK5i1pbvg3w3w28px50xa67aho3` FOREIGN KEY (`ma_khach_hang`) REFERENCES `khach_hang` (`ma_khach_hang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.tai_khoan: ~5 rows (approximately)
INSERT INTO `tai_khoan` (`ma_tai_khoan`, `email`, `mat_khau`, `vai_tro`, `ma_khach_hang`, `tinh_trang`) VALUES
	('TK1', 'twanhotel@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'ADMIN', NULL, b'1'),
	('TK2', 'hthanhtuan.2307@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH2', b'1'),
	('TK3', 'vana@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH1', b'1'),
	('TK4', 'vanb@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH3', b'1'),
	('TK5', 'vanc@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH4', b'1');

-- Dumping structure for table hotelbooking.tien_nghi
CREATE TABLE IF NOT EXISTS `tien_nghi` (
  `ma_tien_nghi` varchar(255) NOT NULL,
  `ten_tien_nghi` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `loai_tien_nghi` varchar(255) DEFAULT NULL,
  `tinh_trang` bit(1) DEFAULT b'1',
  PRIMARY KEY (`ma_tien_nghi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.tien_nghi: ~21 rows (approximately)
INSERT INTO `tien_nghi` (`ma_tien_nghi`, `ten_tien_nghi`, `icon`, `loai_tien_nghi`, `tinh_trang`) VALUES
	('TN1', 'Wifi miễn phí', 'wifi', 'Mạng Internet và điện thoại', b'1'),
	('TN10', 'Máy sấy tóc', 'wind', 'Đồ điện tử', b'1'),
	('TN11', 'Mini bar cao cấp', 'Khác', 'martini', b'1'),
	('TN12', 'Bồn tắm jacuzzi', 'jacuzzi', 'Nhà tắm', b'1'),
	('TN13', 'Sofa thư giãn', 'sofa', 'Đồ nội thất', b'1'),
	('TN14', 'Két an toàn', 'shield', 'Đồ nội thất', b'1'),
	('TN15', 'Bàn ăn / Bếp nhỏ', 'utensils', 'Đồ nội thất', b'1'),
	('TN16', 'Phòng tắm vòi sen', 'shower', 'Nhà tắm', b'1'),
	('TN17', 'Móc quần áo', 'hang', 'Đồ nội thất', b'1'),
	('TN18', 'Điện thoại', 'phone', 'Mạng Internet và điện thoại', b'1'),
	('TN19', 'Tủ lạnh', NULL, NULL, b'1'),
	('TN2', 'TV màn hình phẳng', 'tv', 'Hình ảnh/âm thanh', b'1'),
	('TN20', 'Máy sấy tóc', 'hair-dryer', 'Đồ điện tử', b'1'),
	('TN21', 'Phòng cách âm', 'mute', 'Khác', b'1'),
	('TN3', 'Minibar', NULL, NULL, b'1'),
	('TN4', 'Điều hòa', 'snowflake', 'Đồ điện tử', b'1'),
	('TN5', 'Bồn tắm', 'bath-tub', 'Nhà tắm', b'1'),
	('TN6', 'Ban công', 'balcony', 'Khu vực ngoài trời', b'1'),
	('TN7', 'Bàn làm việc', 'table', 'Đồ nội thất', b'1'),
	('TN8', 'Dịch vụ phòng 24/7', 'bell', 'Khác', b'1'),
	('TN9', 'Tủ quần áo lớn', 'shirt', 'Đồ nội thất', b'1');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
