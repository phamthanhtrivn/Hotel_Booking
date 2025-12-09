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

-- Dumping data for table hotelbooking.danh_gia: ~6 rows (approximately)
INSERT INTO `danh_gia` (`ma_danh_gia`, `binh_luan`, `diem_co_so_vat_chat`, `diem_dich_vu`, `diem_sach_se`, `thoi_gian_danh_gia`, `ma_loai_phong`, `tinh_trang`) VALUES
                                                                                                                                                                    ('DG001', 'Phòng sạch, giá tốt cho dịp đầu năm.', 8, 10, 10, '2024-01-04 14:00:00', 'LP1', b'1'),
                                                                                                                                                                    ('DG002', 'Ăn sáng ngon, nhân viên nhiệt tình.', 10, 10, 8, '2024-01-12 10:00:00', 'LP2', b'1'),
                                                                                                                                                                    ('DG003', 'Phòng cách âm chưa tốt lắm.', 6, 8, 8, '2024-01-20 12:00:00', 'LP3', b'1'),
                                                                                                                                                                    ('DG004', 'Tuyệt vời cho kỳ nghỉ Tết.', 10, 10, 10, '2024-02-14 09:00:00', 'LP6', b'1'),
                                                                                                                                                                    ('DG005', 'Gia đình rất thích phòng Family ở đây.', 10, 10, 10, '2024-02-28 15:00:00', 'LP8', b'1'),
                                                                                                                                                                    ('DG006', 'Wifi tầng 3 hơi yếu.', 8, 6, 10, '2024-03-05 08:30:00', 'LP2', b'1'),
                                                                                                                                                                    ('DG007', 'Bồn tắm Jacuzzi rất thư giãn.', 10, 10, 10, '2024-03-15 11:00:00', 'LP6', b'1'),
                                                                                                                                                                    ('DG008', 'Sẽ quay lại lần sau.', 8, 10, 10, '2024-03-22 13:00:00', 'LP1', b'1'),
                                                                                                                                                                    ('DG009', 'Dịp lễ 30/4 đông nhưng phục vụ tốt.', 10, 10, 8, '2024-05-02 10:00:00', 'LP5', b'1'),
                                                                                                                                                                    ('DG010', 'Phòng Deluxe view đẹp.', 10, 10, 10, '2024-05-15 14:00:00', 'LP4', b'1'),
                                                                                                                                                                    ('DG011', 'Giá hơi cao so với mặt bằng chung.', 8, 8, 10, '2024-05-20 09:00:00', 'LP2', b'1'),
                                                                                                                                                                    ('DG012', 'Mùa hè ở đây rất mát mẻ, điều hòa tốt.', 10, 8, 10, '2024-06-05 12:00:00', 'LP3', b'1'),
                                                                                                                                                                    ('DG013', 'Hồ bơi (nếu có) thì tuyệt hơn.', 8, 8, 8, '2024-06-12 16:00:00', 'LP7', b'1'),
                                                                                                                                                                    ('DG014', 'Rất phù hợp cho nhóm bạn.', 10, 10, 10, '2024-06-25 10:30:00', 'LP8', b'1'),
                                                                                                                                                                    ('DG015', 'Check-in hơi lâu.', 8, 6, 10, '2024-07-05 14:00:00', 'LP1', b'1'),
                                                                                                                                                                    ('DG016', 'Không gian sang trọng, đẳng cấp.', 10, 10, 10, '2024-07-20 09:00:00', 'LP6', b'1'),
                                                                                                                                                                    ('DG017', 'Đệm giường King rất êm.', 10, 10, 10, '2024-08-02 11:00:00', 'LP4', b'1'),
                                                                                                                                                                    ('DG018', 'Nhà vệ sinh sạch sẽ, thơm tho.', 10, 8, 10, '2024-08-15 13:00:00', 'LP2', b'1'),
                                                                                                                                                                    ('DG019', 'Lễ 2/9 khách sạn trang trí đẹp.', 10, 10, 10, '2024-09-04 10:00:00', 'LP5', b'1'),
                                                                                                                                                                    ('DG020', 'Đi công tác ở đây rất tiện.', 8, 10, 8, '2024-09-15 08:00:00', 'LP1', b'1'),
                                                                                                                                                                    ('DG021', 'Mùa thu view từ ban công rất chill.', 10, 10, 10, '2024-10-05 15:30:00', 'LP4', b'1'),
                                                                                                                                                                    ('DG022', 'Cần thêm đèn ngủ.', 8, 8, 8, '2024-10-12 20:00:00', 'LP3', b'1'),
                                                                                                                                                                    ('DG023', 'Sinh nhật đáng nhớ tại phòng Suite.', 10, 10, 10, '2024-10-25 11:00:00', 'LP6', b'1'),
                                                                                                                                                                    ('DG024', 'Nhân viên lễ tân tên Lan rất dễ thương.', 10, 10, 10, '2024-11-05 09:00:00', 'LP2', b'1'),
                                                                                                                                                                    ('DG025', 'Tạm ổn trong tầm giá.', 6, 8, 8, '2024-11-15 12:00:00', 'LP1', b'1'),
                                                                                                                                                                    ('DG026', 'Phòng Family rộng, trẻ con chơi thoải mái.', 10, 10, 10, '2024-12-05 10:00:00', 'LP8', b'1'),
                                                                                                                                                                    ('DG027', 'Giáng sinh ấm áp.', 10, 10, 10, '2024-12-26 14:00:00', 'LP5', b'1'),
                                                                                                                                                                    ('DG028', 'Năm mới vui vẻ, khách sạn đẹp.', 10, 10, 10, '2025-01-02 10:00:00', 'LP7', b'1'),
                                                                                                                                                                    ('DG029', 'Hơi ồn do công trình bên cạnh.', 6, 8, 10, '2025-01-10 12:00:00', 'LP2', b'1'),
                                                                                                                                                                    ('DG030', 'Phòng Standard nhưng đầy đủ tiện nghi.', 8, 10, 10, '2025-01-20 16:00:00', 'LP1', b'1'),
                                                                                                                                                                    ('DG031', 'Tết Ấm cúng bên gia đình.', 10, 10, 10, '2025-02-05 09:00:00', 'LP8', b'1'),
                                                                                                                                                                    ('DG032', 'Valentine lãng mạn.', 10, 10, 10, '2025-02-15 11:00:00', 'LP6', b'1'),
                                                                                                                                                                    ('DG033', 'Dịch vụ dọn phòng nhanh.', 8, 10, 10, '2025-03-05 13:00:00', 'LP3', b'1'),
                                                                                                                                                                    ('DG034', 'Sẽ giới thiệu cho bạn bè.', 10, 10, 8, '2025-03-15 15:00:00', 'LP4', b'1'),
                                                                                                                                                                    ('DG035', 'Thang máy hơi chậm.', 8, 8, 8, '2025-04-05 10:00:00', 'LP2', b'1'),
                                                                                                                                                                    ('DG036', 'Nghỉ lễ vui vẻ.', 10, 10, 10, '2025-05-02 12:00:00', 'LP5', b'1'),
                                                                                                                                                                    ('DG037', 'Tuyệt vời.', 10, 10, 10, '2025-05-10 14:00:00', 'LP6', b'1'),
                                                                                                                                                                    ('DG038', 'Phòng nhỏ gọn, tiện lợi.', 8, 8, 10, '2025-05-20 09:00:00', 'LP1', b'1'),
                                                                                                                                                                    ('DG039', 'Gối hơi cao so với mình.', 8, 8, 10, '2025-06-05 10:00:00', 'LP4', b'1'),
                                                                                                                                                                    ('DG040', 'Mùa hè tuyệt vời.', 10, 10, 10, '2025-06-15 11:00:00', 'LP7', b'1'),
                                                                                                                                                                    ('DG041', 'Đồ uống trong minibar hơi đắt.', 8, 8, 10, '2025-06-25 13:00:00', 'LP2', b'1'),
                                                                                                                                                                    ('DG042', 'Rất hài lòng.', 10, 10, 10, '2025-07-05 15:00:00', 'LP3', b'1'),
                                                                                                                                                                    ('DG043', 'View thành phố về đêm đẹp.', 10, 10, 10, '2025-07-15 19:00:00', 'LP5', b'1'),
                                                                                                                                                                    ('DG044', 'Nhân viên bảo vệ nhiệt tình dắt xe.', 10, 10, 10, '2025-08-05 08:00:00', 'LP1', b'1'),
                                                                                                                                                                    ('DG045', 'Phòng thoáng mát.', 8, 10, 10, '2025-08-15 10:00:00', 'LP2', b'1'),
                                                                                                                                                                    ('DG046', 'Trải nghiệm tốt.', 8, 8, 8, '2025-09-05 12:00:00', 'LP3', b'1'),
                                                                                                                                                                    ('DG047', 'Sạch sẽ là điểm cộng lớn nhất.', 10, 8, 10, '2025-09-15 14:00:00', 'LP4', b'1'),
                                                                                                                                                                    ('DG048', 'Phòng Suite rộng thênh thang.', 10, 10, 10, '2025-09-25 11:00:00', 'LP6', b'1'),
                                                                                                                                                                    ('DG049', 'Gia đình mình sẽ quay lại.', 10, 10, 10, '2025-10-05 09:00:00', 'LP7', b'1'),
                                                                                                                                                                    ('DG050', 'Khách sạn trung tâm, tiện đi lại.', 10, 10, 8, '2025-10-15 10:00:00', 'LP1', b'1');


-- Dumping structure for table hotelbooking.don_dat_phong
CREATE TABLE IF NOT EXISTS `don_dat_phong` (
  `ma_dat_phong` varchar(255) NOT NULL,
  `vat` double NOT NULL,
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
  `phu_thu_tre_em` double DEFAULT NULL,
  PRIMARY KEY (`ma_dat_phong`),
  UNIQUE KEY `UKipxmhku7rgbv70o63oeg3eqt8` (`ma_danh_gia`),
  KEY `FK31kww3fnehujkecraaf12t7uo` (`ma_khach_hang`),
  KEY `FKiwe3j9tstd4okh7carw4b6imb` (`ma_phong`),
  CONSTRAINT `FK31kww3fnehujkecraaf12t7uo` FOREIGN KEY (`ma_khach_hang`) REFERENCES `khach_hang` (`ma_khach_hang`),
  CONSTRAINT `FKiwe3j9tstd4okh7carw4b6imb` FOREIGN KEY (`ma_phong`) REFERENCES `phong` (`ma_phong`),
  CONSTRAINT `FKoofpaiwyvbalhesqbxlfsp2gq` FOREIGN KEY (`ma_danh_gia`) REFERENCES `danh_gia` (`ma_danh_gia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.don_dat_phong: ~19 rows (approximately)
INSERT INTO `don_dat_phong` (`ma_dat_phong`, `vat`, `check_in`, `check_out`, `email`, `ghi_chu`, `giam_gia_diem_tich_luy`, `ho_ten_khach_hang`, `giam_gia_lan_dau`, `so_dien_thoai`, `tong_tien`, `tong_tien_tt`, `trang_thai`, `ma_danh_gia`, `ma_khach_hang`, `ma_phong`, `ngay_tao`, `phu_thu_tre_em`) VALUES
/* === NĂM 2024 (QUÁ KHỨ - 45 Đơn) === */
-- 1. LP1 (500k) x 2 đêm = 1tr. VAT 80k.
('DDP001', 80000, '2024-01-02 13:00:00', '2024-01-04 12:30:00', 'nguyenvanan@gmail.com', NULL, 0, 'Nguyễn Văn An', 0, '0987123456', 1000000, 1080000, 'DA_THANH_TOAN', 'DG001', 'KH001', 'P101', '2023-12-25 08:00:00', 0),
-- 2. LP2 (600k) x 1 đêm = 600k. VAT 48k.
('DDP002', 48000, '2024-01-11 13:00:00', '2024-01-12 12:30:00', 'tranthibinh@gmail.com', NULL, 0, 'Trần Thị Bình', 0, '0978123456', 600000, 648000, 'DA_THANH_TOAN', 'DG002', 'KH002', 'P201', '2024-01-05 09:00:00', 0),
-- 3. LP3 (700k) x 2 đêm = 1.4tr. VAT 112k.
('DDP003', 112000, '2024-01-18 13:00:00', '2024-01-20 12:30:00', 'lequockhanh@gmail.com', NULL, 0, 'Lê Quốc Khánh', 0, '0965123456', 1400000, 1512000, 'DA_THANH_TOAN', 'DG003', 'KH003', 'P301', '2024-01-10 10:00:00', 0),
-- 4. LP6 (2.2tr) x 3 đêm = 6.6tr. VAT 528k. (Tết Âm)
('DDP004', 528000, '2024-02-11 13:00:00', '2024-02-14 12:30:00', 'phamminhtam@gmail.com', 'Tết Âm Lịch', 0, 'Phạm Minh Tâm', 0, '0912345678', 6600000, 7128000, 'DA_THANH_TOAN', 'DG004', 'KH004', 'P701', '2024-01-20 11:00:00', 0),
-- 5. LP8 (2.1tr) x 2 đêm = 4.2tr. VAT 336k.
('DDP005', 336000, '2024-02-26 13:00:00', '2024-02-28 12:30:00', 'hoangthithu@gmail.com', NULL, 0, 'Hoàng Thị Thu', 0, '0933456677', 4200000, 4536000, 'DA_THANH_TOAN', 'DG005', 'KH005', 'P601', '2024-02-15 14:00:00', 0),
-- 6. LP2 (600k) x 1 đêm = 600k. VAT 48k.
('DDP006', 48000, '2024-03-04 13:00:00', '2024-03-05 12:30:00', 'doananhkiet@gmail.com', NULL, 0, 'Đoàn Anh Kiệt', 0, '0905123987', 600000, 648000, 'DA_THANH_TOAN', 'DG006', 'KH006', 'P202', '2024-03-01 08:00:00', 0),
-- 7. LP6 (2.2tr) x 1 đêm = 2.2tr. VAT 176k.
('DDP007', 176000, '2024-03-14 13:00:00', '2024-03-15 12:30:00', 'voduclong@gmail.com', 'Kỷ niệm', 0, 'Võ Đức Long', 0, '0923456678', 2200000, 2376000, 'DA_THANH_TOAN', 'DG007', 'KH007', 'P702', '2024-03-10 15:00:00', 0),
-- 8. LP1 (500k) x 1 đêm = 500k. VAT 40k.
('DDP008', 40000, '2024-03-21 13:00:00', '2024-03-22 12:30:00', 'nguyenthaovy@gmail.com', NULL, 0, 'Nguyễn Thảo Vy', 0, '0942123478', 500000, 540000, 'DA_THANH_TOAN', 'DG008', 'KH008', 'P102', '2024-03-20 09:00:00', 0),
-- 9. LP5 (1.1tr) x 2 đêm = 2.2tr. VAT 176k. (Lễ 30/4)
('DDP009', 176000, '2024-04-30 13:00:00', '2024-05-02 12:30:00', 'buiminhchau@gmail.com', 'Lễ 30/4', 0, 'Bùi Minh Châu', 0, '0958789456', 2200000, 2376000, 'DA_THANH_TOAN', 'DG009', 'KH009', 'P501', '2024-04-10 10:00:00', 0),
-- 10. LP4 (900k) x 2 đêm = 1.8tr. VAT 144k.
('DDP010', 144000, '2024-05-13 13:00:00', '2024-05-15 12:30:00', 'danggiahuy@gmail.com', NULL, 0, 'Đặng Gia Huy', 0, '0939988776', 1800000, 1944000, 'DA_THANH_TOAN', 'DG010', 'KH010', 'P501', '2024-05-01 11:00:00', 0),
-- 11. LP2 (600k) x 2 đêm = 1.2tr. VAT 96k.
('DDP011', 96000, '2024-05-18 13:00:00', '2024-05-20 12:30:00', 'camtu@gmail.com', NULL, 0, 'Đỗ Thị Cẩm Tú', 0, '0911223344', 1200000, 1296000, 'DA_THANH_TOAN', 'DG011', 'KH011', 'P203', '2024-05-10 12:00:00', 0),
-- 12. LP3 (700k) x 3 đêm = 2.1tr. VAT 168k.
('DDP012', 168000, '2024-06-02 13:00:00', '2024-06-05 12:30:00', 'ngohung@gmail.com', NULL, 0, 'Ngô Văn Hùng', 0, '0922334455', 2100000, 2268000, 'DA_THANH_TOAN', 'DG012', 'KH012', 'P302', '2024-05-20 14:00:00', 0),
-- 13. LP7 (1.9tr) x 2 đêm = 3.8tr. VAT 304k.
('DDP013', 304000, '2024-06-10 13:00:00', '2024-06-12 12:30:00', 'lylan@gmail.com', NULL, 0, 'Lý Thị Lan', 0, '0933445566', 3800000, 4104000, 'DA_THANH_TOAN', 'DG013', 'KH013', 'P604', '2024-06-01 08:00:00', 0),
-- 14. LP8 (2.1tr) x 3 đêm = 6.3tr. VAT 504k.
('DDP014', 504000, '2024-06-22 13:00:00', '2024-06-25 12:30:00', 'tansang@gmail.com', 'Đoàn đông', 0, 'Trương Tấn Sang', 0, '0944556677', 6300000, 6804000, 'DA_THANH_TOAN', 'DG014', 'KH014', 'P602', '2024-06-10 09:00:00', 0),
-- 15. LP1 (500k) x 1 đêm. HỦY. VAT 40k.
('DDP015', 40000, '2024-07-04 13:00:00', '2024-07-05 12:30:00', 'ngocmai@gmail.com', 'Hủy do bận', 0, 'Đinh Ngọc Mai', 0, '0955667788', 500000, 540000, 'DA_HUY', NULL, 'KH015', 'P103', '2024-06-25 10:00:00', 0),
-- 16. LP1 (500k) x 1 đêm. Thành công. (Bù lại đơn trên)
('DDP016', 40000, '2024-07-04 13:00:00', '2024-07-05 12:30:00', 'vuthanh@gmail.com', NULL, 0, 'Vũ Văn Thanh', 0, '0966778899', 500000, 540000, 'DA_THANH_TOAN', 'DG015', 'KH016', 'P103', '2024-06-26 11:00:00', 0),
-- 17. LP6 (2.2tr) x 2 đêm = 4.4tr. VAT 352k.
('DDP017', 352000, '2024-07-18 13:00:00', '2024-07-20 12:30:00', 'thuhuong@gmail.com', NULL, 0, 'Hà Thị Thu Hương', 0, '0977889900', 4400000, 4752000, 'DA_THANH_TOAN', 'DG016', 'KH017', 'P703', '2024-07-05 13:00:00', 0),
-- 18. LP4 (900k) x 2 đêm = 1.8tr. VAT 144k.
('DDP018', 144000, '2024-07-31 13:00:00', '2024-08-02 12:30:00', 'minhtuan@gmail.com', NULL, 0, 'Phan Minh Tuấn', 0, '0988990011', 1800000, 1944000, 'DA_THANH_TOAN', 'DG017', 'KH018', 'P502', '2024-07-20 09:00:00', 0),
-- 19. LP2 (600k) x 1 đêm = 600k. VAT 48k.
('DDP019', 48000, '2024-08-14 13:00:00', '2024-08-15 12:30:00', 'thaison@gmail.com', NULL, 0, 'Cao Thái Sơn', 0, '0999001122', 600000, 648000, 'DA_THANH_TOAN', 'DG018', 'KH019', 'P204', '2024-08-10 10:00:00', 0),
-- 20. LP5 (1.1tr) x 2 đêm = 2.2tr. VAT 176k. (Lễ 2/9)
('DDP020', 176000, '2024-09-02 13:00:00', '2024-09-04 12:30:00', 'thuyvi@gmail.com', 'Lễ 2/9', 0, 'Dương Thúy Vi', 0, '0901122334', 2200000, 2376000, 'DA_THANH_TOAN', 'DG019', 'KH020', 'P503', '2024-08-25 15:00:00', 0),
-- 21. LP1 (500k) x 1 đêm. VAT 40k.
('DDP021', 40000, '2024-09-14 13:00:00', '2024-09-15 12:30:00', 'thevinh@gmail.com', NULL, 0, 'Lương Thế Vinh', 0, '0912233445', 500000, 540000, 'DA_THANH_TOAN', 'DG020', 'KH021', 'P104', '2024-09-10 09:00:00', 0),
-- 22. LP4 (900k) x 2 đêm = 1.8tr. VAT 144k.
('DDP022', 144000, '2024-10-03 13:00:00', '2024-10-05 12:30:00', 'mackhoa@gmail.com', NULL, 0, 'Mạc Văn Khoa', 0, '0923344556', 1800000, 1944000, 'DA_THANH_TOAN', 'DG021', 'KH022', 'P504', '2024-09-25 11:00:00', 0),
-- 23. LP3 (700k) x 1 đêm. VAT 56k.
('DDP023', 56000, '2024-10-11 13:00:00', '2024-10-12 12:30:00', 'chuhuyen@gmail.com', NULL, 0, 'Chu Thị Huyền', 0, '0934455667', 700000, 756000, 'DA_THANH_TOAN', 'DG022', 'KH023', 'P303', '2024-10-05 14:00:00', 0),
-- 24. LP6 (2.2tr) x 1 đêm. VAT 176k.
('DDP024', 176000, '2024-10-24 13:00:00', '2024-10-25 12:30:00', 'bichloan@gmail.com', NULL, 0, 'Tạ Bích Loan', 0, '0945566778', 2200000, 2376000, 'DA_THANH_TOAN', 'DG023', 'KH024', 'P704', '2024-10-15 10:00:00', 0),
-- 25. LP2 (600k) x 2 đêm = 1.2tr. VAT 96k.
('DDP025', 96000, '2024-11-03 13:00:00', '2024-11-05 12:30:00', 'lathanh@gmail.com', NULL, 0, 'La Thành', 0, '0956677889', 1200000, 1296000, 'DA_THANH_TOAN', 'DG024', 'KH025', 'P205', '2024-11-01 08:00:00', 0),
-- 26. LP1 (500k) x 1 đêm. VAT 40k.
('DDP026', 40000, '2024-11-14 13:00:00', '2024-11-15 12:30:00', 'dieplamanh@gmail.com', NULL, 0, 'Diệp Lâm Anh', 0, '0967788990', 500000, 540000, 'DA_THANH_TOAN', 'DG025', 'KH026', 'P105', '2024-11-10 09:00:00', 0),
-- 27. LP8 (2.1tr) x 2 đêm = 4.2tr. VAT 336k.
('DDP027', 336000, '2024-12-03 13:00:00', '2024-12-05 12:30:00', 'ngocngoan@gmail.com', NULL, 0, 'Quách Ngọc Ngoan', 0, '0978899001', 4200000, 4536000, 'DA_THANH_TOAN', 'DG026', 'KH027', 'P603', '2024-11-25 13:00:00', 0),
-- 28. LP5 (1.1tr) x 2 đêm = 2.2tr. VAT 176k. (Noel)
('DDP028', 176000, '2024-12-24 13:00:00', '2024-12-26 12:30:00', 'maihuong@gmail.com', 'Noel', 0, 'Văn Mai Hương', 0, '0989900112', 2200000, 2376000, 'DA_THANH_TOAN', 'DG027', 'KH028', 'P504', '2024-12-10 10:00:00', 0),
-- 29. LP2 (600k) x 1 đêm. Hủy.
('DDP029', 48000, '2024-12-28 13:00:00', '2024-12-29 12:30:00', 'thangbinh@gmail.com', 'Bận đột xuất', 0, 'Trịnh Thăng Bình', 0, '0990011223', 600000, 648000, 'DA_HUY', NULL, 'KH029', 'P206', '2024-12-25 11:00:00', 0),
-- Các đơn phụ 2024 (Không review, lấp đầy)
('DDP030', 80000, '2024-02-05 13:00:00', '2024-02-07 12:30:00', 'sontung@gmail.com', NULL, 0, 'Sơn Tùng MTP', 0, '0901122335', 1000000, 1080000, 'DA_THANH_TOAN', NULL, 'KH030', 'P106', '2024-01-30 09:00:00', 0),
('DDP031', 144000, '2024-03-20 13:00:00', '2024-03-22 12:30:00', 'nguyenvanan@gmail.com', NULL, 0, 'Nguyễn Văn An', 0, '0987123456', 1800000, 1944000, 'DA_THANH_TOAN', NULL, 'KH001', 'P505', '2024-03-10 14:00:00', 0),
('DDP032', 96000, '2024-04-10 13:00:00', '2024-04-12 12:30:00', 'tranthibinh@gmail.com', NULL, 0, 'Trần Thị Bình', 0, '0978123456', 1200000, 1296000, 'DA_THANH_TOAN', NULL, 'KH002', 'P207', '2024-04-01 10:00:00', 0),
('DDP033', 304000, '2024-05-25 13:00:00', '2024-05-27 12:30:00', 'lequockhanh@gmail.com', NULL, 0, 'Lê Quốc Khánh', 0, '0965123456', 3800000, 4104000, 'DA_THANH_TOAN', NULL, 'KH003', 'P605', '2024-05-15 15:00:00', 0),
('DDP034', 88000, '2024-06-15 13:00:00', '2024-06-16 12:30:00', 'phamminhtam@gmail.com', NULL, 0, 'Phạm Minh Tâm', 0, '0912345678', 1100000, 1188000, 'DA_THANH_TOAN', NULL, 'KH004', 'P506', '2024-06-10 09:00:00', 0),
('DDP035', 40000, '2024-07-10 13:00:00', '2024-07-11 12:30:00', 'hoangthithu@gmail.com', NULL, 0, 'Hoàng Thị Thu', 0, '0933456677', 500000, 540000, 'DA_THANH_TOAN', NULL, 'KH005', 'P107', '2024-07-01 11:00:00', 0),
('DDP036', 176000, '2024-08-20 13:00:00', '2024-08-21 12:30:00', 'doananhkiet@gmail.com', NULL, 0, 'Đoàn Anh Kiệt', 0, '0905123987', 2200000, 2376000, 'DA_THANH_TOAN', NULL, 'KH006', 'P701', '2024-08-10 13:00:00', 0),
('DDP037', 56000, '2024-09-10 13:00:00', '2024-09-11 12:30:00', 'voduclong@gmail.com', NULL, 0, 'Võ Đức Long', 0, '0923456678', 700000, 756000, 'DA_THANH_TOAN', NULL, 'KH007', 'P304', '2024-09-01 14:00:00', 0),
('DDP038', 144000, '2024-10-15 13:00:00', '2024-10-17 12:30:00', 'nguyenthaovy@gmail.com', NULL, 0, 'Nguyễn Thảo Vy', 0, '0942123478', 1800000, 1944000, 'DA_THANH_TOAN', NULL, 'KH008', 'P507', '2024-10-05 10:00:00', 0),
('DDP039', 96000, '2024-11-20 13:00:00', '2024-11-22 12:30:00', 'buiminhchau@gmail.com', NULL, 0, 'Bùi Minh Châu', 0, '0958789456', 1200000, 1296000, 'DA_THANH_TOAN', NULL, 'KH009', 'P208', '2024-11-10 08:00:00', 0),
('DDP040', 200000, '2024-12-05 13:00:00', '2024-12-10 12:30:00', 'danggiahuy@gmail.com', NULL, 0, 'Đặng Gia Huy', 0, '0939988776', 2500000, 2700000, 'DA_THANH_TOAN', NULL, 'KH010', 'P108', '2024-11-25 15:00:00', 0),
('DDP041', 48000, '2024-01-25 13:00:00', '2024-01-26 12:30:00', 'camtu@gmail.com', NULL, 0, 'Đỗ Thị Cẩm Tú', 0, '0911223344', 600000, 648000, 'DA_THANH_TOAN', NULL, 'KH011', 'P209', '2024-01-15 12:00:00', 0),
('DDP042', 88000, '2024-04-15 13:00:00', '2024-04-16 12:30:00', 'ngohung@gmail.com', NULL, 0, 'Ngô Văn Hùng', 0, '0922334455', 1100000, 1188000, 'DA_HUY', NULL, 'KH012', 'P508', '2024-04-05 09:00:00', 0),
('DDP043', 176000, '2024-07-25 13:00:00', '2024-07-26 12:30:00', 'lylan@gmail.com', NULL, 0, 'Lý Thị Lan', 0, '0933445566', 2200000, 2376000, 'DA_THANH_TOAN', NULL, 'KH013', 'P702', '2024-07-15 10:00:00', 0),
('DDP044', 336000, '2024-10-28 13:00:00', '2024-10-30 12:30:00', 'tansang@gmail.com', NULL, 0, 'Trương Tấn Sang', 0, '0944556677', 4200000, 4536000, 'DA_THANH_TOAN', NULL, 'KH014', 'P604', '2024-10-15 11:00:00', 0),
('DDP045', 40000, '2024-12-20 13:00:00', '2024-12-21 12:30:00', 'ngocmai@gmail.com', NULL, 0, 'Đinh Ngọc Mai', 0, '0955667788', 500000, 540000, 'DA_THANH_TOAN', NULL, 'KH015', 'P109', '2024-12-10 13:00:00', 0),

/* === NĂM 2025 (HIỆN TẠI & TƯƠNG LAI - 45 Đơn) === */

-- 46. LP7 (1.9tr) x 3 đêm = 5.7tr. VAT 456k. (Tết Dương)
('DDP046', 456000, '2024-12-30 13:00:00', '2025-01-02 12:30:00', 'sontung@gmail.com', 'Năm mới', 0, 'Sơn Tùng MTP', 0, '0901122335', 5700000, 6156000, 'DA_THANH_TOAN', 'DG028', 'KH030', 'P606', '2024-12-15 10:00:00', 0),
-- 47. LP2 (600k) x 2 đêm = 1.2tr. VAT 96k.
('DDP047', 96000, '2025-01-08 13:00:00', '2025-01-10 12:30:00', 'nguyenvanan@gmail.com', NULL, 0, 'Nguyễn Văn An', 0, '0987123456', 1200000, 1296000, 'DA_THANH_TOAN', 'DG029', 'KH001', 'P210', '2025-01-01 09:00:00', 0),
-- 48. LP1 (500k) x 4 đêm = 2tr. VAT 160k.
('DDP048', 160000, '2025-01-16 13:00:00', '2025-01-20 12:30:00', 'tranthibinh@gmail.com', NULL, 0, 'Trần Thị Bình', 0, '0978123456', 2000000, 2160000, 'DA_THANH_TOAN', 'DG030', 'KH002', 'P110', '2025-01-10 08:00:00', 0),
-- 49. LP8 (2.1tr) x 3 đêm = 6.3tr. VAT 504k. (Tết Âm)
('DDP049', 504000, '2025-02-02 13:00:00', '2025-02-05 12:30:00', 'lequockhanh@gmail.com', 'Tết Âm Lịch', 0, 'Lê Quốc Khánh', 0, '0965123456', 6300000, 6804000, 'DA_THANH_TOAN', 'DG031', 'KH003', 'P601', '2025-01-15 10:00:00', 0),
-- 50. LP6 (2.2tr) x 1 đêm = 2.2tr. VAT 176k. (Valentine)
('DDP050', 176000, '2025-02-14 13:00:00', '2025-02-15 12:30:00', 'phamminhtam@gmail.com', 'Valentine', 0, 'Phạm Minh Tâm', 0, '0912345678', 2200000, 2376000, 'DA_THANH_TOAN', 'DG032', 'KH004', 'P703', '2025-02-01 11:00:00', 0),
-- 51. LP3 (700k) x 2 đêm = 1.4tr. VAT 112k.
('DDP051', 112000, '2025-03-03 13:00:00', '2025-03-05 12:30:00', 'hoangthithu@gmail.com', NULL, 0, 'Hoàng Thị Thu', 0, '0933456677', 1400000, 1512000, 'DA_THANH_TOAN', 'DG033', 'KH005', 'P305', '2025-02-20 14:00:00', 0),
-- 52. LP4 (900k) x 2 đêm = 1.8tr. VAT 144k.
('DDP052', 144000, '2025-03-13 13:00:00', '2025-03-15 12:30:00', 'doananhkiet@gmail.com', NULL, 0, 'Đoàn Anh Kiệt', 0, '0905123987', 1800000, 1944000, 'DA_THANH_TOAN', 'DG034', 'KH006', 'P509', '2025-03-01 09:00:00', 0),
-- 53. LP2 (600k) x 1 đêm = 600k. VAT 48k.
('DDP053', 48000, '2025-04-04 13:00:00', '2025-04-05 12:30:00', 'voduclong@gmail.com', NULL, 0, 'Võ Đức Long', 0, '0923456678', 600000, 648000, 'DA_THANH_TOAN', 'DG035', 'KH007', 'P202', '2025-03-25 15:00:00', 0),
-- 54. LP5 (1.1tr) x 2 đêm = 2.2tr. VAT 176k. (Lễ 30/4)
('DDP054', 176000, '2025-04-30 13:00:00', '2025-05-02 12:30:00', 'nguyenthaovy@gmail.com', 'Lễ 30/4', 0, 'Nguyễn Thảo Vy', 0, '0942123478', 2200000, 2376000, 'DA_THANH_TOAN', 'DG036', 'KH008', 'P502', '2025-04-10 10:00:00', 0),
-- 55. LP6 (2.2tr) x 2 đêm = 4.4tr. VAT 352k.
('DDP055', 352000, '2025-05-08 13:00:00', '2025-05-10 12:30:00', 'buiminhchau@gmail.com', NULL, 0, 'Bùi Minh Châu', 0, '0958789456', 4400000, 4752000, 'DA_THANH_TOAN', 'DG037', 'KH009', 'P704', '2025-04-25 08:00:00', 0),
-- 56. LP1 (500k) x 2 đêm = 1tr. VAT 80k.
('DDP056', 80000, '2025-05-18 13:00:00', '2025-05-20 12:30:00', 'danggiahuy@gmail.com', NULL, 0, 'Đặng Gia Huy', 0, '0939988776', 1000000, 1080000, 'DA_THANH_TOAN', 'DG038', 'KH010', 'P103', '2025-05-10 11:00:00', 0),
-- 57. LP4 (900k) x 1 đêm. VAT 72k.
('DDP057', 72000, '2025-06-04 13:00:00', '2025-06-05 12:30:00', 'camtu@gmail.com', NULL, 0, 'Đỗ Thị Cẩm Tú', 0, '0911223344', 900000, 972000, 'DA_THANH_TOAN', 'DG039', 'KH011', 'P510', '2025-05-25 12:00:00', 0),
-- 58. LP7 (1.9tr) x 3 đêm = 5.7tr. VAT 456k. (Hè)
('DDP058', 456000, '2025-06-12 13:00:00', '2025-06-15 12:30:00', 'ngohung@gmail.com', NULL, 0, 'Ngô Văn Hùng', 0, '0922334455', 5700000, 6156000, 'DA_THANH_TOAN', 'DG040', 'KH012', 'P606', '2025-06-01 09:00:00', 0),
-- 59. LP2 (600k) x 2 đêm = 1.2tr. VAT 96k.
('DDP059', 96000, '2025-06-23 13:00:00', '2025-06-25 12:30:00', 'lylan@gmail.com', NULL, 0, 'Lý Thị Lan', 0, '0933445566', 1200000, 1296000, 'DA_THANH_TOAN', 'DG041', 'KH013', 'P203', '2025-06-15 08:00:00', 0),
-- 60. LP3 (700k) x 2 đêm = 1.4tr. VAT 112k.
('DDP060', 112000, '2025-07-03 13:00:00', '2025-07-05 12:30:00', 'tansang@gmail.com', NULL, 0, 'Trương Tấn Sang', 0, '0944556677', 1400000, 1512000, 'DA_THANH_TOAN', 'DG042', 'KH014', 'P306', '2025-06-25 10:00:00', 0),
-- 61. LP5 (1.1tr) x 2 đêm = 2.2tr. VAT 176k.
('DDP061', 176000, '2025-07-13 13:00:00', '2025-07-15 12:30:00', 'ngocmai@gmail.com', NULL, 0, 'Đinh Ngọc Mai', 0, '0955667788', 2200000, 2376000, 'DA_THANH_TOAN', 'DG043', 'KH015', 'P503', '2025-07-01 13:00:00', 0),
-- 62. LP1 (500k) x 2 đêm = 1tr. VAT 80k.
('DDP062', 80000, '2025-08-03 13:00:00', '2025-08-05 12:30:00', 'vuthanh@gmail.com', NULL, 0, 'Vũ Văn Thanh', 0, '0966778899', 1000000, 1080000, 'DA_THANH_TOAN', 'DG044', 'KH016', 'P104', '2025-07-25 09:00:00', 0),
-- 63. LP2 (600k) x 2 đêm = 1.2tr. VAT 96k.
('DDP063', 96000, '2025-08-13 13:00:00', '2025-08-15 12:30:00', 'thuhuong@gmail.com', NULL, 0, 'Hà Thị Thu Hương', 0, '0977889900', 1200000, 1296000, 'DA_THANH_TOAN', 'DG045', 'KH017', 'P204', '2025-08-05 11:00:00', 0),
-- 64. LP3 (700k) x 1 đêm. VAT 56k.
('DDP064', 56000, '2025-09-04 13:00:00', '2025-09-05 12:30:00', 'minhtuan@gmail.com', NULL, 0, 'Phan Minh Tuấn', 0, '0988990011', 700000, 756000, 'DA_THANH_TOAN', 'DG046', 'KH018', 'P307', '2025-08-25 14:00:00', 0),
-- 65. LP4 (900k) x 2 đêm = 1.8tr. VAT 144k.
('DDP065', 144000, '2025-09-13 13:00:00', '2025-09-15 12:30:00', 'thaison@gmail.com', NULL, 0, 'Cao Thái Sơn', 0, '0999001122', 1800000, 1944000, 'DA_THANH_TOAN', 'DG047', 'KH019', 'P504', '2025-09-05 08:00:00', 0),
-- 66. LP6 (2.2tr) x 2 đêm = 4.4tr. VAT 352k.
('DDP066', 352000, '2025-09-23 13:00:00', '2025-09-25 12:30:00', 'thuyvi@gmail.com', NULL, 0, 'Dương Thúy Vi', 0, '0901122334', 4400000, 4752000, 'DA_THANH_TOAN', 'DG048', 'KH020', 'P701', '2025-09-10 10:00:00', 0),
-- 67. LP7 (1.9tr) x 2 đêm = 3.8tr. VAT 304k.
('DDP067', 304000, '2025-10-03 13:00:00', '2025-10-05 12:30:00', 'thevinh@gmail.com', NULL, 0, 'Lương Thế Vinh', 0, '0912233445', 3800000, 4104000, 'DA_THANH_TOAN', 'DG049', 'KH021', 'P604', '2025-09-20 12:00:00', 0),
-- 68. LP1 (500k) x 3 đêm = 1.5tr. VAT 120k.
('DDP068', 120000, '2025-10-12 13:00:00', '2025-10-15 12:30:00', 'mackhoa@gmail.com', NULL, 0, 'Mạc Văn Khoa', 0, '0923344556', 1500000, 1620000, 'DA_THANH_TOAN', 'DG050', 'KH022', 'P105', '2025-10-01 15:00:00', 0),
-- Các đơn 2025 (Chưa thanh toán/Tương lai/Không review)
('DDP069', 96000, '2025-10-20 13:00:00', '2025-10-22 12:30:00', 'chuhuyen@gmail.com', NULL, 0, 'Chu Thị Huyền', 0, '0934455667', 1200000, 1296000, 'CHUA_THANH_TOAN', NULL, 'KH023', 'P205', '2025-10-05 13:00:00', 0),
('DDP070', 336000, '2025-11-05 13:00:00', '2025-11-07 12:30:00', 'bichloan@gmail.com', NULL, 0, 'Tạ Bích Loan', 0, '0945566778', 4200000, 4536000, 'CHUA_THANH_TOAN', NULL, 'KH024', 'P602', '2025-10-25 09:00:00', 0),
('DDP071', 88000, '2025-11-15 13:00:00', '2025-11-16 12:30:00', 'lathanh@gmail.com', NULL, 0, 'La Thành', 0, '0956677889', 1100000, 1188000, 'CHUA_THANH_TOAN', NULL, 'KH025', 'P505', '2025-11-01 10:00:00', 0),
('DDP072', 144000, '2025-11-25 13:00:00', '2025-11-27 12:30:00', 'dieplamanh@gmail.com', NULL, 0, 'Diệp Lâm Anh', 0, '0967788990', 1800000, 1944000, 'CHUA_THANH_TOAN', NULL, 'KH026', 'P501', '2025-11-10 14:00:00', 0),
('DDP073', 40000, '2025-12-05 13:00:00', '2025-12-06 12:30:00', 'ngocngoan@gmail.com', NULL, 0, 'Quách Ngọc Ngoan', 0, '0978899001', 500000, 540000, 'CHUA_THANH_TOAN', NULL, 'KH027', 'P106', '2025-11-20 08:00:00', 0),
('DDP074', 176000, '2025-12-15 13:00:00', '2025-12-17 12:30:00', 'maihuong@gmail.com', NULL, 0, 'Văn Mai Hương', 0, '0989900112', 2200000, 2376000, 'CHUA_THANH_TOAN', NULL, 'KH028', 'P506', '2025-12-01 10:00:00', 0),
('DDP075', 96000, '2025-12-24 13:00:00', '2025-12-26 12:30:00', 'thangbinh@gmail.com', 'Noel', 0, 'Trịnh Thăng Bình', 0, '0990011223', 1200000, 1296000, 'CHUA_THANH_TOAN', NULL, 'KH029', 'P206', '2025-12-10 11:00:00', 0),
-- Lấp đầy 2025
('DDP076', 80000, '2025-02-10 13:00:00', '2025-02-12 12:30:00', 'sontung@gmail.com', NULL, 0, 'Sơn Tùng MTP', 0, '0901122335', 1000000, 1080000, 'DA_THANH_TOAN', NULL, 'KH030', 'P107', '2025-01-30 09:00:00', 0),
('DDP077', 304000, '2025-03-20 13:00:00', '2025-03-22 12:30:00', 'nguyenvanan@gmail.com', NULL, 0, 'Nguyễn Văn An', 0, '0987123456', 3800000, 4104000, 'DA_THANH_TOAN', NULL, 'KH001', 'P605', '2025-03-10 12:00:00', 0),
('DDP078', 56000, '2025-04-15 13:00:00', '2025-04-16 12:30:00', 'tranthibinh@gmail.com', NULL, 0, 'Trần Thị Bình', 0, '0978123456', 700000, 756000, 'DA_THANH_TOAN', NULL, 'KH002', 'P308', '2025-04-05 13:00:00', 0),
('DDP079', 176000, '2025-05-25 13:00:00', '2025-05-26 12:30:00', 'lequockhanh@gmail.com', NULL, 0, 'Lê Quốc Khánh', 0, '0965123456', 2200000, 2376000, 'DA_THANH_TOAN', NULL, 'KH003', 'P702', '2025-05-15 15:00:00', 0),
('DDP080', 48000, '2025-06-10 13:00:00', '2025-06-11 12:30:00', 'phamminhtam@gmail.com', NULL, 0, 'Phạm Minh Tâm', 0, '0912345678', 600000, 648000, 'DA_THANH_TOAN', NULL, 'KH004', 'P207', '2025-06-01 08:00:00', 0),
('DDP081', 144000, '2025-07-20 13:00:00', '2025-07-22 12:30:00', 'hoangthithu@gmail.com', NULL, 0, 'Hoàng Thị Thu', 0, '0933456677', 1800000, 1944000, 'DA_THANH_TOAN', NULL, 'KH005', 'P507', '2025-07-10 09:00:00', 0),
('DDP082', 504000, '2025-08-10 13:00:00', '2025-08-13 12:30:00', 'doananhkiet@gmail.com', NULL, 0, 'Đoàn Anh Kiệt', 0, '0905123987', 6300000, 6804000, 'DA_THANH_TOAN', NULL, 'KH006', 'P603', '2025-08-01 10:00:00', 0),
('DDP083', 40000, '2025-09-05 13:00:00', '2025-09-06 12:30:00', 'voduclong@gmail.com', NULL, 0, 'Võ Đức Long', 0, '0923456678', 500000, 540000, 'DA_THANH_TOAN', NULL, 'KH007', 'P108', '2025-08-25 11:00:00', 0),
('DDP084', 96000, '2025-10-15 13:00:00', '2025-10-17 12:30:00', 'nguyenthaovy@gmail.com', NULL, 0, 'Nguyễn Thảo Vy', 0, '0942123478', 1200000, 1296000, 'DA_THANH_TOAN', NULL, 'KH008', 'P208', '2025-10-05 12:00:00', 0),
('DDP085', 112000, '2025-11-10 13:00:00', '2025-11-12 12:30:00', 'buiminhchau@gmail.com', NULL, 0, 'Bùi Minh Châu', 0, '0958789456', 1400000, 1512000, 'DA_THANH_TOAN', NULL, 'KH009', 'P309', '2025-11-01 13:00:00', 0),
('DDP086', 176000, '2025-11-20 13:00:00', '2025-11-21 12:30:00', 'danggiahuy@gmail.com', NULL, 0, 'Đặng Gia Huy', 0, '0939988776', 2200000, 2376000, 'DA_THANH_TOAN', NULL, 'KH010', 'P703', '2025-11-10 14:00:00', 0),
('DDP087', 88000, '2025-12-05 13:00:00', '2025-12-06 12:30:00', 'camtu@gmail.com', NULL, 0, 'Đỗ Thị Cẩm Tú', 0, '0911223344', 1100000, 1188000, 'DA_THANH_TOAN', NULL, 'KH011', 'P508', '2025-11-25 15:00:00', 0),
('DDP088', 80000, '2025-12-12 13:00:00', '2025-12-14 12:30:00', 'ngohung@gmail.com', NULL, 0, 'Ngô Văn Hùng', 0, '0922334455', 1000000, 1080000, 'DA_THANH_TOAN', NULL, 'KH012', 'P109', '2025-12-01 09:00:00', 0),
('DDP089', 304000, '2025-05-15 13:00:00', '2025-05-17 12:30:00', 'lylan@gmail.com', NULL, 0, 'Lý Thị Lan', 0, '0933445566', 3800000, 4104000, 'DA_THANH_TOAN', NULL, 'KH013', 'P606', '2025-05-05 10:00:00', 0),
('DDP090', 48000, '2025-09-20 13:00:00', '2025-09-21 12:30:00', 'tansang@gmail.com', NULL, 0, 'Trương Tấn Sang', 0, '0944556677', 600000, 648000, 'DA_THANH_TOAN', NULL, 'KH014', 'P209', '2025-09-10 11:00:00', 0),

/* === NĂM 2026 (THÁNG 1 & 2 - TƯƠNG LAI - 10 Đơn) === */

-- 91. LP8 (2.1tr) x 3 đêm = 6.3tr. VAT 504k. (Tết Dương)
('DDP091', 504000, '2026-01-01 13:00:00', '2026-01-04 12:30:00', 'ngocmai@gmail.com', 'Năm mới', 0, 'Đinh Ngọc Mai', 0, '0955667788', 6300000, 6804000, 'CHUA_THANH_TOAN', NULL, 'KH015', 'P601', '2025-12-15 08:00:00', 0),
-- 92. LP2 (600k) x 2 đêm = 1.2tr. VAT 96k.
('DDP092', 96000, '2026-01-10 13:00:00', '2026-01-12 12:30:00', 'vuthanh@gmail.com', NULL, 0, 'Vũ Văn Thanh', 0, '0966778899', 1200000, 1296000, 'CHUA_THANH_TOAN', NULL, 'KH016', 'P201', '2025-12-20 09:00:00', 0),
-- 93. LP1 (500k) x 3 đêm = 1.5tr. VAT 120k.
('DDP093', 120000, '2026-01-15 13:00:00', '2026-01-18 12:30:00', 'thuhuong@gmail.com', NULL, 0, 'Hà Thị Thu Hương', 0, '0977889900', 1500000, 1620000, 'CHUA_THANH_TOAN', NULL, 'KH017', 'P101', '2025-12-25 10:00:00', 0),
-- 94. LP6 (2.2tr) x 2 đêm = 4.4tr. VAT 352k.
('DDP094', 352000, '2026-01-20 13:00:00', '2026-01-22 12:30:00', 'minhtuan@gmail.com', NULL, 0, 'Phan Minh Tuấn', 0, '0988990011', 4400000, 4752000, 'CHUA_THANH_TOAN', NULL, 'KH018', 'P701', '2025-12-30 11:00:00', 0),
-- 95. LP7 (1.9tr) x 4 đêm = 7.6tr. Phụ thu 500k = 8.1tr. VAT 648k. (Tết Âm)
('DDP095', 648000, '2026-01-28 13:00:00', '2026-02-01 12:30:00', 'thaison@gmail.com', 'Tết Âm Lịch', 0, 'Cao Thái Sơn', 0, '0999001122', 7600000, 8748000, 'CHUA_THANH_TOAN', NULL, 'KH019', 'P604', '2026-01-05 08:00:00', 500000),
-- 96. LP5 (1.1tr) x 2 đêm = 2.2tr. VAT 176k.
('DDP096', 176000, '2026-02-05 13:00:00', '2026-02-07 12:30:00', 'thuyvi@gmail.com', NULL, 0, 'Dương Thúy Vi', 0, '0901122334', 2200000, 2376000, 'CHUA_THANH_TOAN', NULL, 'KH020', 'P501', '2026-01-15 09:00:00', 0),
-- 97. LP4 (900k) x 1 đêm = 900k. VAT 72k. (Valentine)
('DDP097', 72000, '2026-02-14 13:00:00', '2026-02-15 12:30:00', 'thevinh@gmail.com', 'Valentine', 0, 'Lương Thế Vinh', 0, '0912233445', 900000, 972000, 'CHUA_THANH_TOAN', NULL, 'KH021', 'P502', '2026-01-20 14:00:00', 0),
-- 98. LP6 (2.2tr) x 1 đêm = 2.2tr. VAT 176k. (Valentine)
('DDP098', 176000, '2026-02-14 13:00:00', '2026-02-15 12:30:00', 'mackhoa@gmail.com', 'Valentine', 0, 'Mạc Văn Khoa', 0, '0923344556', 2200000, 2376000, 'CHUA_THANH_TOAN', NULL, 'KH022', 'P702', '2026-02-01 10:00:00', 0),
-- 99. LP2 (600k) x 2 đêm = 1.2tr. VAT 96k.
('DDP099', 96000, '2026-02-20 13:00:00', '2026-02-22 12:30:00', 'chuhuyen@gmail.com', NULL, 0, 'Chu Thị Huyền', 0, '0934455667', 1200000, 1296000, 'CHUA_THANH_TOAN', NULL, 'KH023', 'P202', '2026-02-10 11:00:00', 0),
-- 100. LP3 (700k) x 2 đêm = 1.4tr. VAT 112k.
('DDP100', 112000, '2026-02-25 13:00:00', '2026-02-27 12:30:00', 'bichloan@gmail.com', NULL, 0, 'Tạ Bích Loan', 0, '0945566778', 1400000, 1512000, 'CHUA_THANH_TOAN', NULL, 'KH024', 'P301', '2026-02-15 12:00:00', 0),
/* === TUẦN 2 THÁNG 12 (10/12 - 15/12): 7 Đơn === */

-- 101. KH001 - LP1 (500k) - 2 đêm
-- Giá: 1tr. VAT: 80k.
('DDP101', 80000, '2025-12-10 13:00:00', '2025-12-12 12:30:00', 'nguyenvanan@gmail.com', NULL, 0, 'Nguyễn Văn An', 0, '0987123456', 1000000, 1080000, 'DA_THANH_TOAN', NULL, 'KH001', 'P101', '2025-12-05 08:00:00', 0),

-- 102. KH005 - LP2 (600k) - 1 đêm
-- Giá: 600k. VAT: 48k.
('DDP102', 48000, '2025-12-11 13:00:00', '2025-12-12 12:30:00', 'hoangthithu@gmail.com', NULL, 0, 'Hoàng Thị Thu', 0, '0933456677', 600000, 648000, 'CHUA_THANH_TOAN', NULL, 'KH005', 'P201', '2025-12-08 09:00:00', 0),

-- 103. KH008 - LP4 (900k) - 2 đêm
-- Giá: 1.8tr. VAT: 144k.
('DDP103', 144000, '2025-12-12 13:00:00', '2025-12-14 12:30:00', 'nguyenthaovy@gmail.com', NULL, 0, 'Nguyễn Thảo Vy', 0, '0942123478', 1800000, 1944000, 'CHUA_THANH_TOAN', NULL, 'KH008', 'P501', '2025-12-09 10:00:00', 0),

-- 104. KH012 - LP8 (2.1tr) - 3 đêm
-- Giá: 6.3tr. VAT: 504k.
('DDP104', 504000, '2025-12-12 13:00:00', '2025-12-15 12:30:00', 'ngohung@gmail.com', 'Đoàn công tác', 0, 'Ngô Văn Hùng', 0, '0922334455', 6300000, 6804000, 'CHUA_THANH_TOAN', NULL, 'KH012', 'P601', '2025-12-01 11:00:00', 0),

-- 105. KH020 - LP3 (700k) - 1 đêm
-- Giá: 700k. VAT: 56k.
('DDP105', 56000, '2025-12-13 13:00:00', '2025-12-14 12:30:00', 'thuyvi@gmail.com', NULL, 0, 'Dương Thúy Vi', 0, '0901122334', 700000, 756000, 'CHUA_THANH_TOAN', NULL, 'KH020', 'P301', '2025-12-10 14:00:00', 0),

-- 106. KH025 - LP6 (2.2tr) - 2 đêm
-- Giá: 4.4tr. VAT: 352k.
('DDP106', 352000, '2025-12-14 13:00:00', '2025-12-16 12:30:00', 'lathanh@gmail.com', NULL, 0, 'La Thành', 0, '0956677889', 4400000, 4752000, 'CHUA_THANH_TOAN', NULL, 'KH025', 'P701', '2025-12-05 15:00:00', 0),

-- 107. KH003 - LP1 (500k) - 1 đêm
-- Giá: 500k. VAT: 40k.
('DDP107', 40000, '2025-12-15 13:00:00', '2025-12-16 12:30:00', 'lequockhanh@gmail.com', NULL, 0, 'Lê Quốc Khánh', 0, '0965123456', 500000, 540000, 'CHUA_THANH_TOAN', NULL, 'KH003', 'P102', '2025-12-12 16:00:00', 0),


/* === TUẦN 3 THÁNG 12 (16/12 - 22/12): 8 Đơn === */

-- 108. KH015 - LP2 (600k) - 2 đêm
-- Giá: 1.2tr. VAT: 96k.
('DDP108', 96000, '2025-12-16 13:00:00', '2025-12-18 12:30:00', 'ngocmai@gmail.com', NULL, 0, 'Đinh Ngọc Mai', 0, '0955667788', 1200000, 1296000, 'CHUA_THANH_TOAN', NULL, 'KH015', 'P202', '2025-12-10 09:00:00', 0),

-- 109. KH018 - LP5 (1.1tr) - 3 đêm
-- Giá: 3.3tr. VAT: 264k.
('DDP109', 264000, '2025-12-17 13:00:00', '2025-12-20 12:30:00', 'minhtuan@gmail.com', NULL, 0, 'Phan Minh Tuấn', 0, '0988990011', 3300000, 3564000, 'CHUA_THANH_TOAN', NULL, 'KH018', 'P502', '2025-12-15 10:00:00', 0),

-- 110. KH030 - LP7 (1.9tr) - 1 đêm
-- Giá: 1.9tr. VAT: 152k.
('DDP110', 152000, '2025-12-18 13:00:00', '2025-12-19 12:30:00', 'sontung@gmail.com', NULL, 0, 'Sơn Tùng MTP', 0, '0901122335', 1900000, 2052000, 'CHUA_THANH_TOAN', NULL, 'KH030', 'P604', '2025-12-10 11:00:00', 0),

-- 111. KH002 - LP1 (500k) - 2 đêm
-- Giá: 1tr. VAT: 80k.
('DDP111', 80000, '2025-12-19 13:00:00', '2025-12-21 12:30:00', 'tranthibinh@gmail.com', NULL, 0, 'Trần Thị Bình', 0, '0978123456', 1000000, 1080000, 'CHUA_THANH_TOAN', NULL, 'KH002', 'P103', '2025-12-15 13:00:00', 0),

-- 112. KH009 - LP3 (700k) - 2 đêm
-- Giá: 1.4tr. VAT: 112k.
('DDP112', 112000, '2025-12-20 13:00:00', '2025-12-22 12:30:00', 'buiminhchau@gmail.com', NULL, 0, 'Bùi Minh Châu', 0, '0958789456', 1400000, 1512000, 'CHUA_THANH_TOAN', NULL, 'KH009', 'P302', '2025-12-18 08:00:00', 0),

-- 113. KH022 - LP4 (900k) - 1 đêm
-- Giá: 900k. VAT: 72k.
('DDP113', 72000, '2025-12-21 13:00:00', '2025-12-22 12:30:00', 'mackhoa@gmail.com', NULL, 0, 'Mạc Văn Khoa', 0, '0923344556', 900000, 972000, 'CHUA_THANH_TOAN', NULL, 'KH022', 'P503', '2025-12-20 09:00:00', 0),

-- 114. KH010 - LP2 (600k) - 2 đêm
-- Giá: 1.2tr. VAT: 96k.
('DDP114', 96000, '2025-12-22 13:00:00', '2025-12-24 12:30:00', 'danggiahuy@gmail.com', NULL, 0, 'Đặng Gia Huy', 0, '0939988776', 1200000, 1296000, 'CHUA_THANH_TOAN', NULL, 'KH010', 'P203', '2025-12-18 10:00:00', 0),

-- 115. KH027 - LP6 (2.2tr) - 3 đêm (Chuẩn bị Noel)
-- Giá: 6.6tr. VAT: 528k.
('DDP115', 528000, '2025-12-22 13:00:00', '2025-12-25 12:30:00', 'ngocngoan@gmail.com', 'Trang trí Giáng sinh', 0, 'Quách Ngọc Ngoan', 0, '0978899001', 6600000, 7128000, 'CHUA_THANH_TOAN', NULL, 'KH027', 'P702', '2025-12-10 14:00:00', 0),


/* === TUẦN LỄ GIÁNG SINH (23/12 - 27/12): 8 Đơn === */

-- 116. KH014 - LP8 (2.1tr) - 2 đêm
-- Giá: 4.2tr. VAT: 336k.
('DDP116', 336000, '2025-12-23 13:00:00', '2025-12-25 12:30:00', 'tansang@gmail.com', 'Gia đình đi Noel', 0, 'Trương Tấn Sang', 0, '0944556677', 4200000, 4536000, 'CHUA_THANH_TOAN', NULL, 'KH014', 'P602', '2025-12-15 15:00:00', 0),

-- 117. KH024 - LP1 (500k) - 1 đêm
-- Giá: 500k. VAT: 40k.
('DDP117', 40000, '2025-12-24 13:00:00', '2025-12-25 12:30:00', 'bichloan@gmail.com', NULL, 0, 'Tạ Bích Loan', 0, '0945566778', 500000, 540000, 'CHUA_THANH_TOAN', NULL, 'KH024', 'P104', '2025-12-20 08:00:00', 0),

-- 118. KH006 - LP5 (1.1tr) - 2 đêm
-- Giá: 2.2tr. VAT: 176k.
('DDP118', 176000, '2025-12-24 13:00:00', '2025-12-26 12:30:00', 'doananhkiet@gmail.com', 'View đẹp', 0, 'Đoàn Anh Kiệt', 0, '0905123987', 2200000, 2376000, 'CHUA_THANH_TOAN', NULL, 'KH006', 'P504', '2025-12-18 09:00:00', 0),

-- 119. KH019 - LP2 (600k) - 1 đêm
-- Giá: 600k. VAT: 48k.
('DDP119', 48000, '2025-12-24 13:00:00', '2025-12-25 12:30:00', 'thaison@gmail.com', NULL, 0, 'Cao Thái Sơn', 0, '0999001122', 600000, 648000, 'CHUA_THANH_TOAN', NULL, 'KH019', 'P204', '2025-12-22 10:00:00', 0),

-- 120. KH004 - LP7 (1.9tr) - 3 đêm
-- Giá: 5.7tr. VAT: 456k.
('DDP120', 456000, '2025-12-25 13:00:00', '2025-12-28 12:30:00', 'phamminhtam@gmail.com', NULL, 0, 'Phạm Minh Tâm', 0, '0912345678', 5700000, 6156000, 'CHUA_THANH_TOAN', NULL, 'KH004', 'P605', '2025-12-20 11:00:00', 0),

-- 121. KH021 - LP4 (900k) - 2 đêm
-- Giá: 1.8tr. VAT: 144k.
('DDP121', 144000, '2025-12-26 13:00:00', '2025-12-28 12:30:00', 'thevinh@gmail.com', NULL, 0, 'Lương Thế Vinh', 0, '0912233445', 1800000, 1944000, 'CHUA_THANH_TOAN', NULL, 'KH021', 'P505', '2025-12-22 13:00:00', 0),

-- 122. KH028 - LP3 (700k) - 2 đêm
-- Giá: 1.4tr. VAT: 112k.
('DDP122', 112000, '2025-12-27 13:00:00', '2025-12-29 12:30:00', 'maihuong@gmail.com', NULL, 0, 'Văn Mai Hương', 0, '0989900112', 1400000, 1512000, 'CHUA_THANH_TOAN', NULL, 'KH028', 'P303', '2025-12-25 09:00:00', 0),

-- 123. KH007 - LP1 (500k) - 1 đêm
-- Giá: 500k. VAT: 40k.
('DDP123', 40000, '2025-12-27 13:00:00', '2025-12-28 12:30:00', 'voduclong@gmail.com', NULL, 0, 'Võ Đức Long', 0, '0923456678', 500000, 540000, 'CHUA_THANH_TOAN', NULL, 'KH007', 'P105', '2025-12-26 08:00:00', 0),


/* === CUỐI NĂM & TẾT DƯƠNG (28/12 - 31/12): 7 Đơn === */

-- 124. KH013 - LP2 (600k) - 2 đêm
-- Giá: 1.2tr. VAT: 96k.
('DDP124', 96000, '2025-12-28 13:00:00', '2025-12-30 12:30:00', 'lylan@gmail.com', NULL, 0, 'Lý Thị Lan', 0, '0933445566', 1200000, 1296000, 'CHUA_THANH_TOAN', NULL, 'KH013', 'P205', '2025-12-25 10:00:00', 0),

-- 125. KH016 - LP6 (2.2tr) - 2 đêm (Nghỉ lễ sớm)
-- Giá: 4.4tr. VAT: 352k.
('DDP125', 352000, '2025-12-29 13:00:00', '2025-12-31 12:30:00', 'vuthanh@gmail.com', NULL, 0, 'Vũ Văn Thanh', 0, '0966778899', 4400000, 4752000, 'CHUA_THANH_TOAN', NULL, 'KH016', 'P703', '2025-12-20 15:00:00', 0),

-- 126. KH026 - LP5 (1.1tr) - 3 đêm (Xuyên giao thừa)
-- Giá: 3.3tr. Phụ thu lễ: 300k. Base: 3.6tr. VAT: 288k.
('DDP126', 288000, '2025-12-29 13:00:00', '2026-01-01 12:30:00', 'dieplamanh@gmail.com', 'Countdown', 0, 'Diệp Lâm Anh', 0, '0967788990', 3600000, 3888000, 'CHUA_THANH_TOAN', NULL, 'KH026', 'P506', '2025-12-15 11:00:00', 300000),

-- 127. KH011 - LP8 (2.1tr) - 2 đêm (Xuyên giao thừa)
-- Giá: 4.2tr. Phụ thu lễ: 500k. Base: 4.7tr. VAT: 376k.
('DDP127', 376000, '2025-12-30 13:00:00', '2026-01-01 12:30:00', 'camtu@gmail.com', 'Tiệc tất niên', 0, 'Đỗ Thị Cẩm Tú', 0, '0911223344', 4700000, 5076000, 'CHUA_THANH_TOAN', NULL, 'KH011', 'P603', '2025-12-20 12:00:00', 500000),

-- 128. KH029 - LP4 (900k) - 2 đêm (Xuyên giao thừa)
-- Giá: 1.8tr. Phụ thu lễ: 200k. Base: 2tr. VAT: 160k.
('DDP128', 160000, '2025-12-30 13:00:00', '2026-01-01 12:30:00', 'thangbinh@gmail.com', NULL, 0, 'Trịnh Thăng Bình', 0, '0990011223', 2000000, 2160000, 'CHUA_THANH_TOAN', NULL, 'KH029', 'P507', '2025-12-25 09:00:00', 200000),

-- 129. KH017 - LP2 (600k) - 1 đêm (Đêm giao thừa)
-- Giá: 600k. Phụ thu: 100k. Base: 700k. VAT: 56k.
('DDP129', 56000, '2025-12-31 13:00:00', '2026-01-01 12:30:00', 'thuhuong@gmail.com', NULL, 0, 'Hà Thị Thu Hương', 0, '0977889900', 700000, 756000, 'CHUA_THANH_TOAN', NULL, 'KH017', 'P205', '2025-12-28 14:00:00', 100000),

-- 130. KH023 - LP6 (2.2tr) - 1 đêm (Đêm giao thừa)
-- Giá: 2.2tr. Phụ thu: 500k. Base: 2.7tr. VAT: 216k.
('DDP130', 216000, '2025-12-31 13:00:00', '2026-01-01 12:30:00', 'chuhuyen@gmail.com', 'Champagne', 0, 'Chu Thị Huyền', 0, '0934455667', 2700000, 2916000, 'CHUA_THANH_TOAN', NULL, 'KH023', 'P704', '2025-12-25 10:00:00', 500000),

/* === TẬP TRUNG NGÀY 09/12 (HÔM NAY) - 9 ĐƠN === */

-- 131. Check-in NGAY HÔM NAY (09/12): LP1 - 1 đêm - Khách lẻ
('DDP131', 40000, '2025-12-09 14:00:00', '2025-12-10 12:00:00', 'nguyenvanan@gmail.com', 'Check-in trễ', 0, 'Nguyễn Văn An', 0, '0987123456', 500000, 540000, 'DA_THANH_TOAN', NULL, 'KH001', 'P101', '2025-12-09 10:00:00', 0),

-- 132. Check-in HÔM NAY: LP2 - 2 đêm - Cặp đôi
('DDP132', 96000, '2025-12-09 13:30:00', '2025-12-11 12:30:00', 'tranthibinh@gmail.com', NULL, 0, 'Trần Thị Bình', 0, '0978123456', 1200000, 1296000, 'DA_THANH_TOAN', NULL, 'KH002', 'P201', '2025-12-08 15:00:00', 0),

-- 133. Check-in HÔM NAY: LP4 (Deluxe King) - 1 đêm - Doanh nhân
('DDP133', 72000, '2025-12-09 18:00:00', '2025-12-10 12:00:00', 'lequockhanh@gmail.com', 'Cần yên tĩnh', 0, 'Lê Quốc Khánh', 0, '0965123456', 900000, 972000, 'CHUA_THANH_TOAN', NULL, 'KH003', 'P501', '2025-12-09 12:00:00', 0),

-- 134. Check-in HÔM NAY: LP3 - 3 đêm - Nhóm bạn
('DDP134', 168000, '2025-12-09 13:00:00', '2025-12-12 12:30:00', 'phamminhtam@gmail.com', NULL, 0, 'Phạm Minh Tâm', 0, '0912345678', 2100000, 2268000, 'DA_THANH_TOAN', NULL, 'KH004', 'P301', '2025-12-05 09:00:00', 0),

-- 135. Check-in HÔM NAY: LP2 - 1 đêm
('DDP135', 48000, '2025-12-09 14:00:00', '2025-12-10 12:30:00', 'hoangthithu@gmail.com', NULL, 0, 'Hoàng Thị Thu', 0, '0933456677', 600000, 648000, 'CHUA_THANH_TOAN', NULL, 'KH005', 'P202', '2025-12-09 08:00:00', 0),

-- 136. Check-in HÔM NAY: LP6 (Suite) - 2 đêm - Khách VIP
('DDP136', 352000, '2025-12-09 15:00:00', '2025-12-11 12:00:00', 'doananhkiet@gmail.com', 'Rượu vang chào mừng', 0, 'Đoàn Anh Kiệt', 0, '0905123987', 4400000, 4752000, 'DA_THANH_TOAN', NULL, 'KH006', 'P701', '2025-12-01 10:00:00', 0),

-- 137. Check-in HÔM NAY: LP1 - 2 đêm
('DDP137', 80000, '2025-12-09 13:00:00', '2025-12-11 12:30:00', 'voduclong@gmail.com', NULL, 0, 'Võ Đức Long', 0, '0923456678', 1000000, 1080000, 'CHUA_THANH_TOAN', NULL, 'KH007', 'P102', '2025-12-08 20:00:00', 0),

-- 138. Check-in HÔM NAY: LP8 (Family) - 1 đêm
('DDP138', 168000, '2025-12-09 14:00:00', '2025-12-10 12:00:00', 'nguyenthaovy@gmail.com', 'Thêm chăn', 0, 'Nguyễn Thảo Vy', 0, '0942123478', 2100000, 2268000, 'DA_THANH_TOAN', NULL, 'KH008', 'P601', '2025-12-07 14:00:00', 0),

-- 139. Check-in HÔM NAY: LP5 - 1 đêm
('DDP139', 88000, '2025-12-09 19:00:00', '2025-12-10 12:00:00', 'buiminhchau@gmail.com', 'Checkin muộn', 0, 'Bùi Minh Châu', 0, '0958789456', 1100000, 1188000, 'CHUA_THANH_TOAN', NULL, 'KH009', 'P502', '2025-12-09 16:00:00', 0),


/* === TẬP TRUNG NGÀY 10/12 (NGÀY MAI) - 8 ĐƠN === */

-- 140. Check-in NGÀY MAI: LP1 - 3 đêm - Công tác
('DDP140', 120000, '2025-12-10 13:00:00', '2025-12-13 12:00:00', 'danggiahuy@gmail.com', NULL, 0, 'Đặng Gia Huy', 0, '0939988776', 1500000, 1620000, 'DA_THANH_TOAN', NULL, 'KH010', 'P103', '2025-12-05 11:00:00', 0),

-- 141. Check-in NGÀY MAI: LP2 - 1 đêm
('DDP141', 48000, '2025-12-10 14:00:00', '2025-12-11 12:00:00', 'camtu@gmail.com', NULL, 0, 'Đỗ Thị Cẩm Tú', 0, '0911223344', 600000, 648000, 'CHUA_THANH_TOAN', NULL, 'KH011', 'P203', '2025-12-09 09:00:00', 0),

-- 142. Check-in NGÀY MAI: LP4 - 2 đêm
('DDP142', 144000, '2025-12-10 13:00:00', '2025-12-12 12:00:00', 'ngohung@gmail.com', NULL, 0, 'Ngô Văn Hùng', 0, '0922334455', 1800000, 1944000, 'CHUA_THANH_TOAN', NULL, 'KH012', 'P503', '2025-12-08 10:00:00', 0),

-- 143. Check-in NGÀY MAI: LP7 (Family) - 2 đêm
('DDP143', 304000, '2025-12-10 14:00:00', '2025-12-12 12:00:00', 'lylan@gmail.com', 'Gia đình 4 người', 0, 'Lý Thị Lan', 0, '0933445566', 3800000, 4104000, 'DA_THANH_TOAN', NULL, 'KH013', 'P604', '2025-12-06 15:00:00', 0),

-- 144. Check-in NGÀY MAI: LP3 - 1 đêm
('DDP144', 56000, '2025-12-10 13:00:00', '2025-12-11 12:00:00', 'tansang@gmail.com', NULL, 0, 'Trương Tấn Sang', 0, '0944556677', 700000, 756000, 'CHUA_THANH_TOAN', NULL, 'KH014', 'P302', '2025-12-09 14:00:00', 0),

-- 145. Check-in NGÀY MAI: LP6 (Suite) - 1 đêm
('DDP145', 176000, '2025-12-10 14:00:00', '2025-12-11 12:00:00', 'ngocmai@gmail.com', NULL, 0, 'Đinh Ngọc Mai', 0, '0955667788', 2200000, 2376000, 'DA_THANH_TOAN', NULL, 'KH015', 'P702', '2025-12-08 11:00:00', 0),

-- 146. Check-in NGÀY MAI: LP1 - 2 đêm
('DDP146', 80000, '2025-12-10 13:00:00', '2025-12-12 12:00:00', 'vuthanh@gmail.com', NULL, 0, 'Vũ Văn Thanh', 0, '0966778899', 1000000, 1080000, 'CHUA_THANH_TOAN', NULL, 'KH016', 'P104', '2025-12-09 15:00:00', 0),

-- 147. Check-in NGÀY MAI: LP2 - 1 đêm
('DDP147', 48000, '2025-12-10 18:00:00', '2025-12-11 12:00:00', 'thuhuong@gmail.com', 'Checkin trễ', 0, 'Hà Thị Thu Hương', 0, '0977889900', 600000, 648000, 'CHUA_THANH_TOAN', NULL, 'KH017', 'P204', '2025-12-10 09:00:00', 0),


/* === RẢI RÁC TỪ 11/12 ĐẾN 14/12 - 6 ĐƠN === */

-- 148. Ngày 11/12: LP5 - 2 đêm
('DDP148', 176000, '2025-12-11 13:00:00', '2025-12-13 12:00:00', 'minhtuan@gmail.com', NULL, 0, 'Phan Minh Tuấn', 0, '0988990011', 2200000, 2376000, 'CHUA_THANH_TOAN', NULL, 'KH018', 'P504', '2025-12-08 14:00:00', 0),

-- 149. Ngày 12/12: LP1 - 1 đêm
('DDP149', 40000, '2025-12-12 13:00:00', '2025-12-13 12:00:00', 'thaison@gmail.com', NULL, 0, 'Cao Thái Sơn', 0, '0999001122', 500000, 540000, 'CHUA_THANH_TOAN', NULL, 'KH019', 'P105', '2025-12-10 10:00:00', 0),

-- 150. Ngày 12/12: LP3 - 2 đêm
('DDP150', 112000, '2025-12-12 14:00:00', '2025-12-14 12:00:00', 'thuyvi@gmail.com', NULL, 0, 'Dương Thúy Vi', 0, '0901122334', 1400000, 1512000, 'CHUA_THANH_TOAN', NULL, 'KH020', 'P303', '2025-12-11 09:00:00', 0),

-- 151. Ngày 13/12: LP8 (Cuối tuần) - 2 đêm
('DDP151', 336000, '2025-12-13 13:00:00', '2025-12-15 12:00:00', 'thevinh@gmail.com', 'Nghỉ cuối tuần', 0, 'Lương Thế Vinh', 0, '0912233445', 4200000, 4536000, 'DA_THANH_TOAN', NULL, 'KH021', 'P603', '2025-12-05 16:00:00', 0),

-- 152. Ngày 13/12: LP4 (Cuối tuần) - 1 đêm
('DDP152', 72000, '2025-12-13 14:00:00', '2025-12-14 12:00:00', 'mackhoa@gmail.com', NULL, 0, 'Mạc Văn Khoa', 0, '0923344556', 900000, 972000, 'CHUA_THANH_TOAN', NULL, 'KH022', 'P505', '2025-12-12 11:00:00', 0),

-- 153. Ngày 14/12: LP2 - 1 đêm
('DDP153', 48000, '2025-12-14 13:00:00', '2025-12-15 12:00:00', 'chuhuyen@gmail.com', NULL, 0, 'Chu Thị Huyền', 0, '0934455667', 600000, 648000, 'CHUA_THANH_TOAN', NULL, 'KH023', 'P205', '2025-12-13 10:00:00', 0);

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

-- Dumping data for table hotelbooking.khach_hang: ~10 rows (approximately)
INSERT INTO `khach_hang` (`ma_khach_hang`, `diem_tich_luy`, `ho_ten_khach_hang`, `so_dien_thoai`) VALUES
    ('KH001', 0, 'Nguyễn Văn An', '0987123456'),
    ('KH002', 0, 'Trần Thị Bình', '0978123456'),
    ('KH003', 0, 'Lê Quốc Khánh', '0965123456'),
    ('KH004', 0, 'Phạm Minh Tâm', '0912345678'),
    ('KH005', 0, 'Hoàng Thị Thu', '0933456677'),
    ('KH006', 0, 'Đoàn Anh Kiệt', '0905123987'),
    ('KH007', 0, 'Võ Đức Long', '0923456678'),
    ('KH008', 0, 'Nguyễn Thảo Vy', '0942123478'),
    ('KH009', 0, 'Bùi Minh Châu', '0958789456'),
    ('KH010', 0, 'Đặng Gia Huy', '0939988776'),
    ('KH011', 150, 'Đỗ Thị Cẩm Tú', '0911223344'),
    ('KH012', 0, 'Ngô Văn Hùng', '0922334455'),
    ('KH013', 50, 'Lý Thị Lan', '0933445566'),
    ('KH014', 200, 'Trương Tấn Sang', '0944556677'),
    ('KH015', 0, 'Đinh Ngọc Mai', '0955667788'),
    ('KH016', 0, 'Vũ Văn Thanh', '0966778899'),
    ('KH017', 100, 'Hà Thị Thu Hương', '0977889900'),
    ('KH018', 0, 'Phan Minh Tuấn', '0988990011'),
    ('KH019', 300, 'Cao Thái Sơn', '0999001122'),
    ('KH020', 0, 'Dương Thúy Vi', '0901122334'),
    ('KH021', 0, 'Lương Thế Vinh', '0912233445'),
    ('KH022', 0, 'Mạc Văn Khoa', '0923344556'),
    ('KH023', 0, 'Chu Thị Huyền', '0934455667'),
    ('KH024', 0, 'Tạ Bích Loan', '0945566778'),
    ('KH025', 0, 'La Thành', '0956677889'),
    ('KH026', 0, 'Diệp Lâm Anh', '0967788990'),
    ('KH027', 0, 'Quách Ngọc Ngoan', '0978899001'),
    ('KH028', 0, 'Văn Mai Hương', '0989900112'),
    ('KH029', 0, 'Trịnh Thăng Bình', '0990011223'),
    ('KH030', 0, 'Sơn Tùng MTP', '0901122335');

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
  `so_khach` int(11) NOT NULL,
  `so_tre_em` int(11) NOT NULL,
  `ten_loai_phong` varchar(255) NOT NULL,
  `tinh_trang` bit(1) DEFAULT b'1',
  PRIMARY KEY (`ma_loai_phong`),
  UNIQUE KEY `UK69ws9ijpn3ywvy883h3bbawj1` (`ten_loai_phong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hotelbooking.loai_phong: ~8 rows (approximately)
INSERT INTO `loai_phong` (`ma_loai_phong`, `dien_tich`, `gia`, `mo_ta`, `so_khach`, `so_tre_em`, `ten_loai_phong`, `tinh_trang`) VALUES
	('LP1', 25, 500000, 'Phòng tiêu chuẩn với 1 giường đơn, diện tích 20m2, thiết kế tối giản nhưng đầy đủ tiện nghi, bao gồm TV, minibar, điều hòa, bàn làm việc và phòng tắm hiện đại. Phù hợp cho 1 khách, mang đến không gian nghỉ ngơi thoải mái và tiện lợi.', 1, 1, 'Standard Single', b'1'),
	('LP2', 25, 600000, 'Phòng tiêu chuẩn với 1 giường đôi, diện tích 20m2, trang bị đầy đủ tiện nghi như TV, minibar, điều hòa, bàn làm việc và phòng tắm hiện đại. Phù hợp cho 2 khách, lý tưởng cho cặp đôi hoặc bạn bè muốn nghỉ ngơi trong không gian vừa đủ thoải mái.', 2, 2, 'Standard Double', b'1'),
	('LP3', 30, 700000, 'Phòng tiêu chuẩn với 2 giường đơn, diện tích 20m2, được trang bị TV, minibar, điều hòa, bàn làm việc và phòng tắm hiện đại. Phù hợp cho 2 khách, mang lại sự tiện nghi và linh hoạt cho những ai muốn nghỉ ngơi riêng tư trong cùng một phòng.', 2, 2, 'Standard 2 Single', b'1'),
	('LP4', 30, 900000, 'Phòng cao cấp Deluxe với 1 giường siêu lớn King, diện tích 30m2, thiết kế tinh tế và sang trọng. Phòng có cửa sổ hoặc ban công, trang bị đầy đủ tiện nghi như TV, minibar, điều hòa, sofa, bàn trà và phòng tắm có bồn tắm.', 2, 2, 'Deluxe King', b'1'),
	('LP5', 35, 1100000, 'Phòng cao cấp Deluxe với 2 giường đôi lớn Queen, diện tích 30m2, thiết kế rộng rãi, trang bị TV, minibar, điều hòa, sofa, bàn trà, phòng tắm sang trọng với bồn tắm và ban công. Phù hợp cho 2–4 khách, lý tưởng cho gia đình hoặc nhóm bạn.', 4, 3, 'Deluxe 2 Queen', b'1'),
	('LP6', 60, 2200000, 'Phòng Suite hạng sang với giường King và phòng khách riêng, diện tích 60m2, gồm phòng ngủ và phòng khách riêng biệt. Trang bị đầy đủ tiện nghi cao cấp: TV, minibar, điều hòa, sofa, bàn làm việc, phòng tắm có bồn tắm và ban công rộng.', 3, 1, 'Suite King', b'1'),
	('LP7', 40, 1900000, 'Phòng Family rộng 40m2 với 2 giường đôi, thiết kế tiện lợi cho gia đình hoặc nhóm bạn 4 khách. Có TV, minibar, điều hòa, bàn làm việc, bàn ăn nhỏ và bếp tiện dụng.', 4, 3, 'Family 2 Double', b'1'),
	('LP8', 40, 2100000, 'Phòng Family rộng 40m2 với 3 giường đôi, dành cho nhóm 4–6 khách. Có đầy đủ tiện nghi: TV, minibar, điều hòa, bàn làm việc, bàn ăn/bếp nhỏ. Lý tưởng cho gia đình hoặc nhóm bạn muốn nghỉ dưỡng cùng nhau.', 6, 5, 'Family 3 Double', b'1');

-- Dumping structure for table hotelbooking.phong
CREATE TABLE IF NOT EXISTS `phong` (
  `ma_phong` varchar(255) NOT NULL,
  `ten_phong` varchar(255) NOT NULL,
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

-- Dumping data for table hotelbooking.tai_khoan: ~6 rows (approximately)
INSERT INTO `tai_khoan` (`ma_tai_khoan`, `email`, `mat_khau`, `vai_tro`, `ma_khach_hang`, `tinh_trang`) VALUES
('TKR58FHNSJXOR', 'twanhotel@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'ADMIN', NULL, b'1'),
('TK001', 'nguyenvanan@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH001', b'1'),
('TK002', 'tranthibinh@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH002', b'1'),
('TK003', 'lequockhanh@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH003', b'1'),
('TK004', 'phamminhtam@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH004', b'1'),
('TK005', 'hoangthithu@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH005', b'1'),
('TK006', 'doananhkiet@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH006', b'1'),
('TK007', 'voduclong@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH007', b'1'),
('TK008', 'nguyenthaovy@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH008', b'1'),
('TK009', 'buiminhchau@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH009', b'1'),
('TK010', 'danggiahuy@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH010', b'1'),
('TK011', 'camtu@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH011', b'1'),
('TK012', 'ngohung@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH012', b'1'),
('TK013', 'lylan@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH013', b'1'),
('TK014', 'tansang@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH014', b'1'),
('TK015', 'ngocmai@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH015', b'1'),
('TK016', 'vuthanh@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH016', b'1'),
('TK017', 'thuhuong@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH017', b'1'),
('TK018', 'minhtuan@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH018', b'1'),
('TK019', 'thaison@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH019', b'1'),
('TK020', 'thuyvi@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH020', b'1'),
('TK021', 'thevinh@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH021', b'1'),
('TK022', 'mackhoa@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH022', b'1'),
('TK023', 'chuhuyen@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH023', b'1'),
('TK024', 'bichloan@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH024', b'1'),
('TK025', 'lathanh@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH025', b'1'),
('TK026', 'dieplamanh@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH026', b'1'),
('TK027', 'ngocngoan@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH027', b'1'),
('TK028', 'maihuong@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH028', b'1'),
('TK029', 'thangbinh@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH029', b'1'),
('TK030', 'sontung@gmail.com', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH030', b'1');
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
	('TN11', 'Mini bar cao cấp', 'Khác', 'Khác', b'1'),
	('TN12', 'Bồn tắm jacuzzi', 'jacuzzi', 'Nhà tắm', b'1'),
	('TN13', 'Sofa thư giãn', 'sofa', 'Đồ nội thất', b'1'),
	('TN14', 'Két an toàn', 'shield', 'Đồ nội thất', b'1'),
	('TN15', 'Bàn ăn / Bếp nhỏ', 'utensils', 'Đồ nội thất', b'1'),
	('TN16', 'Phòng tắm vòi sen', 'shower', 'Nhà tắm', b'1'),
	('TN17', 'Móc quần áo', 'hang', 'Đồ nội thất', b'1'),
	('TN18', 'Điện thoại', 'phone', 'Mạng Internet và điện thoại', b'1'),
	('TN19', 'Tủ lạnh', '', 'Đồ nội thất', b'1'),
	('TN2', 'TV màn hình phẳng', 'tv', 'Hình ảnh/âm thanh', b'1'),
	('TN20', 'Máy sấy tóc', 'hair-dryer', 'Đồ điện tử', b'1'),
	('TN21', 'Phòng cách âm', 'mute', 'Khác', b'1'),
	('TN3', 'Minibar', '', 'Khác', b'1'),
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


