-- LOAI_GIUONG
INSERT INTO loai_giuong (ma_giuong, ten_giuong, mo_ta) VALUES
('G1','Single','Giường đơn dành cho 1 khách'),
('G2','Double','Giường đôi dành cho 2 khách'),
('G3','Queen','Giường đôi lớn, thoải mái cho 2 khách'),
('G4','King','Giường siêu lớn, cao cấp cho khách sang trọng');

ALTER TABLE loai_phong MODIFY COLUMN mo_ta TEXT;
-- LOAI_PHONG CỤ THỂ
INSERT INTO loai_phong (ma_loai_phong, ten_loai_phong, dien_tich, gia, so_khach, mo_ta) VALUES
('LP1','Standard Single',20,500000,1,'Phòng tiêu chuẩn với 1 giường đơn, diện tích 20m², thiết kế tối giản nhưng đầy đủ tiện nghi, bao gồm TV, minibar, điều hòa, bàn làm việc và phòng tắm hiện đại. Phòng phù hợp cho 1 khách, mang đến không gian nghỉ ngơi thoải mái và tiện lợi.'),
('LP2','Standard Double',20,600000,2,'Phòng tiêu chuẩn với 1 giường đôi, diện tích 20m², trang bị đầy đủ tiện nghi như TV, minibar, điều hòa, bàn làm việc và phòng tắm hiện đại. Phòng phù hợp cho 2 khách, lý tưởng cho cặp đôi hoặc bạn bè muốn nghỉ ngơi trong không gian vừa đủ thoải mái.'),
('LP3','Standard 2 Single',20,700000,2,'Phòng tiêu chuẩn với 2 giường đơn, diện tích 20m², được trang bị TV, minibar, điều hòa, bàn làm việc và phòng tắm hiện đại. Phòng phù hợp cho 2 khách, mang lại sự tiện nghi và linh hoạt cho những ai muốn nghỉ ngơi riêng tư trong cùng một phòng.'),
('LP4','Deluxe King',30,900000,2,'Phòng cao cấp Deluxe với 1 giường siêu lớn King, diện tích 30m², thiết kế tinh tế và sang trọng. Phòng có cửa sổ hoặc ban công nhìn ra view đẹp, trang bị đầy đủ tiện nghi như TV, minibar, điều hòa, sofa, bàn trà và phòng tắm có bồn tắm. Phù hợp cho 2 khách, mang đến trải nghiệm nghỉ dưỡng đẳng cấp và thư giãn tối đa.'),
('LP5','Deluxe 2 Queen',30,1100000,4,'Phòng cao cấp Deluxe với 2 giường đôi lớn Queen, diện tích 30m², được thiết kế rộng rãi, trang bị đầy đủ tiện nghi cao cấp: TV, minibar, điều hòa, sofa, bàn trà, phòng tắm sang trọng với bồn tắm và ban công. Phòng phù hợp cho 2–4 khách, lý tưởng cho gia đình hoặc nhóm bạn muốn nghỉ ngơi tiện nghi và sang trọng.'),
('LP6','Suite King',60,2200000,3,'Phòng Suite hạng sang với giường King và phòng khách riêng, diện tích 60m², được thiết kế thành hai không gian riêng biệt: phòng ngủ và phòng khách. Phòng được trang bị đầy đủ tiện nghi cao cấp bao gồm TV, minibar, điều hòa, sofa, bàn làm việc, phòng tắm sang trọng với bồn tắm và ban công rộng. Phòng phù hợp cho 2–3 khách, mang đến sự riêng tư, thoải mái và trải nghiệm nghỉ dưỡng đẳng cấp như một căn hộ thu nhỏ.'),
('LP7','Family 2 Double',40,1900000,4,'Phòng Family rộng 40m² với 2 giường đôi, thiết kế tiện lợi cho gia đình hoặc nhóm bạn gồm 4 khách. Phòng được trang bị TV, minibar, điều hòa, bàn làm việc, bàn ăn nhỏ và bếp tiện dụng, giúp khách dễ dàng sinh hoạt trong thời gian lưu trú. Đây là lựa chọn hoàn hảo cho những ai muốn nghỉ ngơi thoải mái và gắn kết cùng nhau.'),
('LP8','Family 3 Double',40,2100000,6,'Phòng Family rộng 40m² với 3 giường đôi, được thiết kế dành cho nhóm 4–6 khách. Phòng có đầy đủ tiện nghi bao gồm TV, minibar, điều hòa, bàn làm việc, bàn ăn/bếp nhỏ, đảm bảo sự tiện lợi và thoải mái. Lý tưởng cho gia đình hoặc nhóm bạn muốn nghỉ dưỡng cùng nhau, vừa tiết kiệm chi phí, vừa tận hưởng trải nghiệm trọn vẹn.');


-- Mapping loại giường với loại phòng cụ thể
INSERT INTO chi_tiet_loai_giuong (ma_giuong, ma_loai_phong, so_giuong) VALUES
('G1','LP1',1),
('G2','LP2',1),
('G1','LP3',2),
('G4','LP4',1),
('G3','LP5',2),
('G4','LP6',1),
('G2','LP7',2),
('G2','LP8',3);

-- TIEN_NGHI
INSERT INTO tien_nghi (ma_tien_nghi, ten_tien_nghi) VALUES
('TN1','Wifi miễn phí'),
('TN2','TV màn hình phẳng'),
('TN3','Minibar'),
('TN4','Điều hòa'),
('TN5','Bồn tắm'),
('TN6','Ban công'),
('TN7','Bàn làm việc'),
('TN8','Dịch vụ phòng 24/7'),
('TN9','Tủ quần áo lớn'),
('TN10','Máy sấy tóc'),
('TN11','Mini bar cao cấp'),
('TN12','Bồn tắm jacuzzi'),
('TN13','Sofa thư giãn'),
('TN14','Két an toàn'),
('TN15','Bàn ăn / Bếp nhỏ');

-- Mapping tiện nghi với loại phòng cụ thể
INSERT INTO chi_tiet_tien_nghi (ma_loai_phong, ma_tien_nghi) VALUES
-- Standard
('LP1','TN1'),('LP1','TN2'),('LP1','TN3'),('LP1','TN4'),('LP1','TN10'),('LP1','TN9'),
('LP2','TN1'),('LP2','TN2'),('LP2','TN3'),('LP2','TN4'),('LP2','TN10'),('LP2','TN9'),
('LP3','TN1'),('LP3','TN2'),('LP3','TN3'),('LP3','TN4'),('LP3','TN10'),('LP3','TN9'),

-- Deluxe
('LP4','TN1'),('LP4','TN2'),('LP4','TN3'),('LP4','TN4'),('LP4','TN5'),('LP4','TN6'),('LP4','TN13'),('LP4','TN14'),
('LP5','TN1'),('LP5','TN2'),('LP5','TN3'),('LP5','TN4'),('LP5','TN5'),('LP5','TN6'),('LP5','TN13'),('LP5','TN14'),

-- Suite
('LP6','TN1'),('LP6','TN2'),('LP6','TN3'),('LP6','TN4'),('LP6','TN5'),('LP6','TN6'),('LP6','TN7'),('LP6','TN12'),('LP6','TN13'),('LP6','TN14'),('LP6','TN15'),

-- Family
('LP7','TN1'),('LP7','TN2'),('LP7','TN3'),('LP7','TN4'),('LP7','TN7'),('LP7','TN15'),
('LP8','TN1'),('LP8','TN2'),('LP8','TN3'),('LP8','TN4'),('LP8','TN7'),('LP8','TN15');

-- HINH ANH (mẫu)
INSERT INTO hinh_anh (ma_loai_phong, url) VALUES
('LP1','/images/standard_single_1.jpg'),
('LP1','/images/standard_single_2.jpg'),
('LP1','/images/standard_single_3.jpg'),
('LP1','/images/standard_single_4.jpg'),

('LP2','/images/standard_double_1.jpg'),
('LP2','/images/standard_double_2.jpg'),
('LP2','/images/standard_double_3.jpg'),
('LP2','/images/standard_double_4.jpg'),

('LP3','/images/standard_2single_1.jpg'),
('LP3','/images/standard_2single_2.jpg'),
('LP3','/images/standard_2single_3.jpg'),
('LP3','/images/standard_2single_4.jpg'),

('LP4','/images/deluxe_king_1.jpg'),
('LP4','/images/deluxe_king_2.jpg'),
('LP4','/images/deluxe_king_3.jpg'),
('LP4','/images/deluxe_king_4.jpg'),

('LP5','/images/deluxe_2queen_1.jpg'),
('LP5','/images/deluxe_2queen_2.jpg'),
('LP5','/images/deluxe_2queen_3.jpg'),
('LP5','/images/deluxe_2queen_4.jpg'),

('LP6','/images/suite_king_1.jpg'),
('LP6','/images/suite_king_2.jpg'),
('LP6','/images/suite_king_3.jpg'),
('LP6','/images/suite_king_4.jpg'),
('LP6','/images/suite_king_5.jpg'),

('LP7','/images/family_2double_1.jpg'),
('LP7','/images/family_2double_2.jpg'),
('LP7','/images/family_2double_3.jpg'),
('LP7','/images/family_2double_4.jpg'),

('LP8','/images/family_3double_1.jpg'),
('LP8','/images/family_3double_2.jpg'),
('LP8','/images/family_3double_3.jpg'),
('LP8','/images/family_3double_4.jpg'),
('LP8','/images/family_3double_5.jpg');

-- PHONG (10 phòng ví dụ)
INSERT INTO phong (ma_phong, ma_loai_phong, trang_thai, vi_tri) VALUES
('P101','LP1','TRONG','Tầng 1'),
('P102','LP1','TRONG','Tầng 1'),
('P103','LP1','TRONG','Tầng 1'),
('P104','LP1','TRONG','Tầng 1'),
('P105','LP1','TRONG','Tầng 1'),
('P106','LP1','TRONG','Tầng 1'),
('P107','LP1','TRONG','Tầng 1'),
('P108','LP1','TRONG','Tầng 1'),
('P109','LP1','TRONG','Tầng 1'),
('P110','LP1','TRONG','Tầng 1'),

('P111','LP2','TRONG','Tầng 1'),
('P112','LP2','TRONG','Tầng 1'),
('P113','LP2','TRONG','Tầng 1'),
('P114','LP2','TRONG','Tầng 1'),
('P115','LP2','TRONG','Tầng 1'),
('P116','LP2','TRONG','Tầng 1'),
('P117','LP2','TRONG','Tầng 1'),
('P118','LP2','TRONG','Tầng 1'),
('P119','LP2','TRONG','Tầng 1'),
('P120','LP2','TRONG','Tầng 1'),

('P121','LP3','TRONG','Tầng 1'),
('P122','LP3','TRONG','Tầng 1'),
('P123','LP3','TRONG','Tầng 1'),
('P124','LP3','TRONG','Tầng 1'),
('P125','LP3','TRONG','Tầng 1'),
('P126','LP3','TRONG','Tầng 1'),
('P127','LP3','TRONG','Tầng 1'),
('P128','LP3','TRONG','Tầng 1'),
('P129','LP3','TRONG','Tầng 1'),
('P130','LP3','TRONG','Tầng 1'),

# ('P121','LP3','TRONG','Tầng 1'),
# ('P122','LP3','TRONG','Tầng 1'),
# ('P123','LP3','TRONG','Tầng 1'),
# ('P124','LP3','TRONG','Tầng 1'),
# ('P125','LP3','TRONG','Tầng 1'),
# ('P126','LP3','TRONG','Tầng 1'),
# ('P127','LP3','TRONG','Tầng 1'),
# ('P128','LP3','TRONG','Tầng 1'),
# ('P129','LP3','TRONG','Tầng 1'),
# ('P130','LP3','TRONG','Tầng 1'),

('P201','LP4','TRONG','Tầng 2'),
('P202','LP4','TRONG','Tầng 2'),
('P203','LP4','TRONG','Tầng 2'),
('P204','LP4','TRONG','Tầng 2'),
('P205','LP4','TRONG','Tầng 2'),
('P206','LP4','TRONG','Tầng 2'),
('P207','LP4','TRONG','Tầng 2'),
('P208','LP4','TRONG','Tầng 2'),
('P209','LP4','TRONG','Tầng 2'),
('P210','LP4','TRONG','Tầng 2'),

('P211','LP5','TRONG','Tầng 2'),
('P212','LP5','TRONG','Tầng 2'),
('P213','LP5','TRONG','Tầng 2'),
('P214','LP5','TRONG','Tầng 2'),
('P215','LP5','TRONG','Tầng 2'),
('P216','LP5','TRONG','Tầng 2'),
('P217','LP5','TRONG','Tầng 2'),
('P218','LP5','TRONG','Tầng 2'),
('P219','LP5','TRONG','Tầng 2'),
('P220','LP5','TRONG','Tầng 2'),

('P301','LP6','TRONG','Tầng 3'),
('P302','LP6','TRONG','Tầng 3'),
('P303','LP6','TRONG','Tầng 3'),
('P304','LP6','TRONG','Tầng 3'),
('P305','LP6','TRONG','Tầng 3'),
('P306','LP6','TRONG','Tầng 3'),
('P307','LP6','TRONG','Tầng 3'),
('P308','LP6','TRONG','Tầng 3'),
('P309','LP6','TRONG','Tầng 3'),
('P310','LP6','TRONG','Tầng 3'),

('P401','LP7','TRONG','Tầng 4'),
('P402','LP7','TRONG','Tầng 4'),
('P403','LP7','TRONG','Tầng 4'),
('P404','LP7','TRONG','Tầng 4'),
('P405','LP7','TRONG','Tầng 4'),
('P406','LP7','TRONG','Tầng 4'),
('P407','LP7','TRONG','Tầng 4'),
('P408','LP7','TRONG','Tầng 4'),
('P409','LP7','TRONG','Tầng 4'),
('P410','LP7','TRONG','Tầng 4'),

('P411','LP8','TRONG','Tầng 4'),
('P412','LP8','TRONG','Tầng 4'),
('P413','LP8','TRONG','Tầng 4'),
('P414','LP8','TRONG','Tầng 4'),
('P415','LP8','TRONG','Tầng 4'),
('P416','LP8','TRONG','Tầng 4'),
('P417','LP8','TRONG','Tầng 4'),
('P418','LP8','TRONG','Tầng 4'),
('P419','LP8','TRONG','Tầng 4'),
('P420','LP8','TRONG','Tầng 4');

-- KHACH_HANG
INSERT INTO khach_hang (ma_khach_hang, ho_ten_khach_hang, so_dien_thoai, diem_tich_luy) VALUES
('KH1','Nguyễn Văn A','0901234567',0);

-- TAI_KHOAN
INSERT INTO tai_khoan (ma_tai_khoan, email, mat_khau, vai_tro, is_active, ma_khach_hang) VALUES
('TK1','admin@twan.com','$2b$12$gVEMON8fOApW73iTp4lf3.3ivcOk2.5Tp7IbE3Udc0VpF8l7SIRFy','ADMIN',1,NULL),
('TK2','vana@gmail.com','$2b$12$gVEMON8fOApW73iTp4lf3.3ivcOk2.5Tp7IbE3Udc0VpF8l7SIRFy','MEMBER',1,'KH1');
