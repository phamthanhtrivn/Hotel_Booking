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
CREATE DATABASE IF NOT EXISTS `hotelbooking` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `hotelbooking`;

-- Dumping structure for table hotelbooking.chi_tiet_loai_giuong
CREATE TABLE IF NOT EXISTS `chi_tiet_loai_giuong` (
                                                      `so_giuong` int(11) DEFAULT NULL,
                                                      `ma_giuong` varchar(255) NOT NULL,
                                                      `ma_loai_phong` varchar(255) NOT NULL,
                                                      PRIMARY KEY (`ma_giuong`,`ma_loai_phong`),
                                                      KEY `FKai1qp0y0h8jqmyid2x05yprbo` (`ma_loai_phong`),
                                                      CONSTRAINT `FKai1qp0y0h8jqmyid2x05yprbo` FOREIGN KEY (`ma_loai_phong`) REFERENCES `loai_phong` (`ma_loai_phong`),
                                                      CONSTRAINT `FKb4rfmyb06o3njjdjmevnqf52k` FOREIGN KEY (`ma_giuong`) REFERENCES `loai_giuong` (`ma_giuong`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table hotelbooking.chi_tiet_tien_nghi: ~57 rows (approximately)
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
                                                                       ('LP6', 'TN12'),
                                                                       ('LP4', 'TN13'),
                                                                       ('LP5', 'TN13'),
                                                                       ('LP6', 'TN13'),
                                                                       ('LP4', 'TN14'),
                                                                       ('LP5', 'TN14'),
                                                                       ('LP6', 'TN14'),
                                                                       ('LP6', 'TN15'),
                                                                       ('LP7', 'TN15'),
                                                                       ('LP8', 'TN15'),
                                                                       ('LP1', 'TN2'),
                                                                       ('LP2', 'TN2'),
                                                                       ('LP3', 'TN2'),
                                                                       ('LP4', 'TN2'),
                                                                       ('LP5', 'TN2'),
                                                                       ('LP6', 'TN2'),
                                                                       ('LP7', 'TN2'),
                                                                       ('LP8', 'TN2'),
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
                                                                       ('LP6', 'TN7'),
                                                                       ('LP7', 'TN7'),
                                                                       ('LP8', 'TN7'),
                                                                       ('LP1', 'TN9'),
                                                                       ('LP2', 'TN9'),
                                                                       ('LP3', 'TN9');

-- Dumping structure for table hotelbooking.danh_gia
CREATE TABLE IF NOT EXISTS `danh_gia` (
                                          `ma_danh_gia` varchar(255) NOT NULL,
                                          `binh_luan` varchar(255) DEFAULT NULL,
                                          `diem_co_so_vat_chat` int(11) DEFAULT NULL,
                                          `diem_dich_vu` int(11) DEFAULT NULL,
                                          `diem_sach_se` int(11) DEFAULT NULL,
                                          `thoi_gian_danh_gia` datetime(6) DEFAULT NULL,
                                          `ma_loai_phong` varchar(255) NOT NULL,
                                          PRIMARY KEY (`ma_danh_gia`),
                                          KEY `FK5l9noa6ee16y7twqcfqdalytn` (`ma_loai_phong`),
                                          CONSTRAINT `FK5l9noa6ee16y7twqcfqdalytn` FOREIGN KEY (`ma_loai_phong`) REFERENCES `loai_phong` (`ma_loai_phong`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table hotelbooking.danh_gia: ~0 rows (approximately)

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
                                               `lan_dau` bit(1) DEFAULT NULL,
                                               `so_dien_thoai` varchar(255) DEFAULT NULL,
                                               `tong_tien` double DEFAULT NULL,
                                               `tong_tien_tt` double DEFAULT NULL,
                                               `trang_thai` enum('CHUA_THANH_TOAN','DA_HUY','DA_THANH_TOAN') DEFAULT NULL,
                                               `ma_danh_gia` varchar(255) DEFAULT NULL,
                                               `ma_khach_hang` varchar(255) NOT NULL,
                                               `ma_phong` varchar(255) DEFAULT NULL,
                                               PRIMARY KEY (`ma_dat_phong`),
                                               UNIQUE KEY `UKipxmhku7rgbv70o63oeg3eqt8` (`ma_danh_gia`),
                                               KEY `FK31kww3fnehujkecraaf12t7uo` (`ma_khach_hang`),
                                               KEY `FKiwe3j9tstd4okh7carw4b6imb` (`ma_phong`),
                                               CONSTRAINT `FK31kww3fnehujkecraaf12t7uo` FOREIGN KEY (`ma_khach_hang`) REFERENCES `khach_hang` (`ma_khach_hang`),
                                               CONSTRAINT `FKiwe3j9tstd4okh7carw4b6imb` FOREIGN KEY (`ma_phong`) REFERENCES `phong` (`ma_phong`),
                                               CONSTRAINT `FKoofpaiwyvbalhesqbxlfsp2gq` FOREIGN KEY (`ma_danh_gia`) REFERENCES `danh_gia` (`ma_danh_gia`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table hotelbooking.don_dat_phong: ~0 rows (approximately)

-- Dumping structure for table hotelbooking.hinh_anh
CREATE TABLE IF NOT EXISTS `hinh_anh` (
                                          `ma_loai_phong` varchar(255) NOT NULL,
                                          `url` varchar(255) DEFAULT NULL,
                                          KEY `FKdb9nyfdtytcn97nx5i6n3ka7i` (`ma_loai_phong`),
                                          CONSTRAINT `FKdb9nyfdtytcn97nx5i6n3ka7i` FOREIGN KEY (`ma_loai_phong`) REFERENCES `loai_phong` (`ma_loai_phong`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table hotelbooking.hinh_anh: ~26 rows (approximately)
INSERT INTO `hinh_anh` (`ma_loai_phong`, `url`) VALUES
                                                    ('LP5', '/images/deluxe_2queen_1.jpg'),
                                                    ('LP5', '/images/deluxe_2queen_2.jpg'),
                                                    ('LP5', '/images/deluxe_2queen_3.jpg'),
                                                    ('LP5', '/images/deluxe_2queen_4.jpg'),
                                                    ('LP6', '/images/suite_king_1.jpg'),
                                                    ('LP6', '/images/suite_king_2.jpg'),
                                                    ('LP6', '/images/suite_king_3.jpg'),
                                                    ('LP6', '/images/suite_king_4.jpg'),
                                                    ('LP6', '/images/suite_king_5.jpg'),
                                                    ('LP7', '/images/family_2double_1.jpg'),
                                                    ('LP7', '/images/family_2double_2.jpg'),
                                                    ('LP7', '/images/family_2double_3.jpg'),
                                                    ('LP7', '/images/family_2double_4.jpg'),
                                                    ('LPUEGBP9MT63', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763134897/loai_phong/umgllnzfgcjkvcio9y2b.avif'),
                                                    ('LP3', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763206301/loai_phong/eagpgscbl1xfqse22hqu.avif'),
                                                    ('LP2', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763206011/loai_phong/mlv0d39jnl3kbhvkvsih.avif'),
                                                    ('LP4', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763207450/loai_phong/kr0wj0js544bytpcge00.avif'),
                                                    ('LPZ7XEZ49O8X', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763207497/loai_phong/mumkdenma1tmslzwrszz.avif'),
                                                    ('LPZ7XEZ49O8X', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763207499/loai_phong/cp3yzovm2sipfuu4tvbp.avif'),
                                                    ('LPZ9GSQNJ6WS', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763207516/loai_phong/epglqhxzumm8bmfcpqhe.avif'),
                                                    ('LP8', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763207615/loai_phong/hz0hseep4dmsjfq5mpkt.avif'),
                                                    ('LP2JSFX6M5CX', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763206058/loai_phong/ulj42tcwyhhkleet1epc.avif'),
                                                    ('LP2JSFX6M5CX', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763207919/loai_phong/vdepew9cr334dv69z6nc.avif'),
                                                    ('LPBY2N76H6W5', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763368949/loai_phong/gfhwc9folrdntf68cz4z.avif'),
                                                    ('LP1', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763205964/loai_phong/opdyvfwdwpfiuljyan6a.avif'),
                                                    ('LP1', 'https://res.cloudinary.com/dude7j76s/image/upload/v1763207872/loai_phong/bhwzng2fzitqy6zdaywh.avif');

-- Dumping structure for table hotelbooking.khach_hang
CREATE TABLE IF NOT EXISTS `khach_hang` (
                                            `ma_khach_hang` varchar(255) NOT NULL,
                                            `diem_tich_luy` int(11) DEFAULT NULL,
                                            `ho_ten_khach_hang` varchar(255) DEFAULT NULL,
                                            `so_dien_thoai` varchar(255) DEFAULT NULL,
                                            PRIMARY KEY (`ma_khach_hang`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table hotelbooking.khach_hang: ~1 rows (approximately)
INSERT INTO `khach_hang` (`ma_khach_hang`, `diem_tich_luy`, `ho_ten_khach_hang`, `so_dien_thoai`) VALUES
    ('KH1', 0, 'Nguyen Van A', '0901234567');

-- Dumping structure for table hotelbooking.loai_giuong
CREATE TABLE IF NOT EXISTS `loai_giuong` (
                                             `ma_giuong` varchar(255) NOT NULL,
                                             `mo_ta` varchar(255) DEFAULT NULL,
                                             `ten_giuong` varchar(255) NOT NULL,
                                             PRIMARY KEY (`ma_giuong`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table hotelbooking.loai_giuong: ~4 rows (approximately)
INSERT INTO `loai_giuong` (`ma_giuong`, `mo_ta`, `ten_giuong`) VALUES
                                                                   ('G1', 'Giuong don danh cho 1 khach', 'Single'),
                                                                   ('G2', 'Giuong doi danh cho 2 khach', 'Double'),
                                                                   ('G3', 'Giuong doi lon, thoai mai cho 2 khach', 'Queen'),
                                                                   ('G4', 'Giuong sieu lon, cao cap cho khach sang trong', 'King');

-- Dumping structure for table hotelbooking.loai_phong
CREATE TABLE IF NOT EXISTS `loai_phong` (
                                            `ma_loai_phong` varchar(255) NOT NULL,
                                            `dien_tich` double DEFAULT NULL,
                                            `gia` double DEFAULT NULL,
                                            `mo_ta` varchar(255) DEFAULT NULL,
                                            `so_khach` int(11) DEFAULT NULL,
                                            `ten_loai_phong` varchar(255) NOT NULL,
                                            PRIMARY KEY (`ma_loai_phong`),
                                            UNIQUE KEY `UK69ws9ijpn3ywvy883h3bbawj1` (`ten_loai_phong`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table hotelbooking.loai_phong: ~13 rows (approximately)
INSERT INTO `loai_phong` (`ma_loai_phong`, `dien_tich`, `gia`, `mo_ta`, `so_khach`, `ten_loai_phong`) VALUES
                                                                                                          ('LP1', 35, 500000, 'Phong tieu chuan voi 1 giuong don, dien tich 20m2, thiet ke toi gian nhung day du tien nghi, bao gom TV, minibar, dieu hoa, ban lam viec va phong tam hien dai. Phu hop cho 1 khach, mang den khong gian nghi ngoi thoai mai va tien loi.', 1, 'Standard Single'),
                                                                                                          ('LP2', 25, 600000, 'Phong tieu chuan voi 1 giuong doi, dien tich 20m2, trang bi day du tien nghi nhu TV, minibar, dieu hoa, ban lam viec va phong tam hien dai. Phu hop cho 2 khach, ly tuong cho cap doi hoac ban be muon nghi ngoi trong khong gian vua du thoai mai.', 2, 'Standard Double'),
                                                                                                          ('LP2JSFX6M5CX', 30, 500000, 'SDFASDFASDF', 2, 'Standard Double 3'),
                                                                                                          ('LP3', 30, 700000, 'Phong tieu chuan voi 2 giuong don, dien tich 20m2, duoc trang bi TV, minibar, dieu hoa, ban lam viec va phong tam hien dai. Phu hop cho 2 khach, mang lai su tien nghi va linh hoat cho nhung ai muon nghi ngoi rieng tu trong cung mot phong.', 2, 'Standard 2 Single'),
                                                                                                          ('LP4', 30, 900000, 'Phong cao cap Deluxe voi 1 giuong sieu lon King, dien tich 30m2, thiet ke tinh te va sang trong. Phong co cua so hoac ban cong, trang bi day du tien nghi nhu TV, minibar, dieu hoa, sofa, ban tra va phong tam co bon tam.', 2, 'Deluxe King'),
                                                                                                          ('LP5', 30, 1100000, 'Phong cao cap Deluxe voi 2 giuong doi lon Queen, dien tich 30m2, thiet ke rong rai, trang bi TV, minibar, dieu hoa, sofa, ban tra, phong tam sang trong voi bon tam va ban cong. Phu hop cho 2–4 khach, ly tuong cho gia dinh hoac nhom ban.', 4, 'Deluxe 2 Queen'),
                                                                                                          ('LP6', 60, 2200000, 'Phong Suite hang sang voi giuong King va phong khach rieng, dien tich 60m2, gom phong ngu va phong khach rieng biet. Trang bi day du tien nghi cao cap: TV, minibar, dieu hoa, sofa, ban lam viec, phong tam co bon tam va ban cong rong.', 3, 'Suite King'),
                                                                                                          ('LP7', 40, 1900000, 'Phong Family rong 40m2 voi 2 giuong doi, thiet ke tien loi cho gia dinh hoac nhom ban 4 khach. Co TV, minibar, dieu hoa, ban lam viec, ban an nho va bep tien dung.', 4, 'Family 2 Double'),
                                                                                                          ('LP8', 40, 2100000, 'Phong Family rong 40m2 voi 3 giuong doi, danh cho nhom 4–6 khach. Co day du tien nghi: TV, minibar, dieu hoa, ban lam viec, ban an/bep nho. Ly tuong cho gia dinh hoac nhom ban muon nghi duong cung nhau.', 6, 'Family 3 Double'),
                                                                                                          ('LPBY2N76H6W5', 26, 234234234, 'ádfsd', 2, 'Delux Double 22'),
                                                                                                          ('LPUEGBP9MT63', 30, 10000000, 'ádfdsafasdf', 2, 'Delux Double 2'),
                                                                                                          ('LPZ7XEZ49O8X', 33, 1000000, 'ádfsdfasdfasdff', 2, 'Standard 2 Single 22'),
                                                                                                          ('LPZ9GSQNJ6WS', 25, 500000, 'sdfasdfasdfasdf', 2, 'Standard Double 2');

-- Dumping structure for table hotelbooking.phong
CREATE TABLE IF NOT EXISTS `phong` (
                                       `ma_phong` varchar(255) NOT NULL,
                                       `trang_thai` enum('BAO_TRI','PHUC_VU','TRONG') DEFAULT NULL,
                                       `vi_tri` varchar(255) DEFAULT NULL,
                                       `ma_loai_phong` varchar(255) NOT NULL,
                                       PRIMARY KEY (`ma_phong`),
                                       KEY `FK378h0h60ooky42egxi2ckdqu` (`ma_loai_phong`),
                                       CONSTRAINT `FK378h0h60ooky42egxi2ckdqu` FOREIGN KEY (`ma_loai_phong`) REFERENCES `loai_phong` (`ma_loai_phong`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table hotelbooking.phong: ~10 rows (approximately)
INSERT INTO `phong` (`ma_phong`, `trang_thai`, `vi_tri`, `ma_loai_phong`) VALUES
                                                                              ('P101', 'TRONG', 'Tang 1', 'LP1'),
                                                                              ('P102', 'TRONG', 'Tang 1', 'LP1'),
                                                                              ('P103', 'TRONG', 'Tang 1', 'LP1'),
                                                                              ('P104', 'TRONG', 'Tang 1', 'LP1'),
                                                                              ('P105', 'TRONG', 'Tang 1', 'LP1'),
                                                                              ('P106', 'TRONG', 'Tang 1', 'LP1'),
                                                                              ('P107', 'TRONG', 'Tang 1', 'LP1'),
                                                                              ('P108', 'TRONG', 'Tang 1', 'LP1'),
                                                                              ('P109', 'TRONG', 'Tang 1', 'LP1'),
                                                                              ('P110', 'TRONG', 'Tang 1', 'LP1');

-- Dumping structure for table hotelbooking.tai_khoan
CREATE TABLE IF NOT EXISTS `tai_khoan` (
                                           `ma_tai_khoan` varchar(255) NOT NULL,
                                           `email` varchar(255) DEFAULT NULL,
                                           `is_active` bit(1) DEFAULT NULL,
                                           `mat_khau` varchar(255) DEFAULT NULL,
                                           `vai_tro` enum('ADMIN','MEMBER') DEFAULT NULL,
                                           `ma_khach_hang` varchar(255) DEFAULT NULL,
                                           PRIMARY KEY (`ma_tai_khoan`),
                                           UNIQUE KEY `UKd0golrlr34gkql6so1i4gbuw5` (`email`),
                                           UNIQUE KEY `UKpfxkkprixt2p7mhm82db4lyhu` (`ma_khach_hang`),
                                           CONSTRAINT `FK5i1pbvg3w3w28px50xa67aho3` FOREIGN KEY (`ma_khach_hang`) REFERENCES `khach_hang` (`ma_khach_hang`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table hotelbooking.tai_khoan: ~2 rows (approximately)
INSERT INTO `tai_khoan` (`ma_tai_khoan`, `email`, `is_active`, `mat_khau`, `vai_tro`, `ma_khach_hang`) VALUES
                                                                                                           ('TK1', 'admin@twan.com', b'1', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'ADMIN', NULL),
                                                                                                           ('TK2', 'vana@gmail.com', b'1', '$2a$10$MtfSOBYxBmw.w.eGwINNHuFkuWMk04uzRKxXu7TK/AzH4WZXENTZ6', 'MEMBER', 'KH1');

-- Dumping structure for table hotelbooking.tien_nghi
CREATE TABLE IF NOT EXISTS `tien_nghi` (
                                           `ma_tien_nghi` varchar(255) NOT NULL,
                                           `ten_tien_nghi` varchar(255) NOT NULL,
                                           PRIMARY KEY (`ma_tien_nghi`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table hotelbooking.tien_nghi: ~15 rows (approximately)
INSERT INTO `tien_nghi` (`ma_tien_nghi`, `ten_tien_nghi`) VALUES
                                                              ('TN1', 'Wifi mien phi'),
                                                              ('TN10', 'May say toc'),
                                                              ('TN11', 'Mini bar cao cap'),
                                                              ('TN12', 'Bon tam jacuzzi'),
                                                              ('TN13', 'Sofa thu gian'),
                                                              ('TN14', 'Ket an toan'),
                                                              ('TN15', 'Ban an / Bep nho'),
                                                              ('TN2', 'TV man hinh phang'),
                                                              ('TN3', 'Minibar'),
                                                              ('TN4', 'Dieu hoa'),
                                                              ('TN5', 'Bon tam'),
                                                              ('TN6', 'Ban cong'),
                                                              ('TN7', 'Ban lam viec'),
                                                              ('TN8', 'Dich vu phong 24/7'),
                                                              ('TN9', 'Tu quan ao lon');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
