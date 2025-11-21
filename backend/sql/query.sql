select * from loai_phong;

select * from chi_tiet_loai_giuong;

select * from tai_khoan;


select * from khach_hang;

select * from phong;
select * from don_dat_phong;

DESCRIBE don_dat_phong;

ALTER TABLE don_dat_phong
    MODIFY trang_thai ENUM('CHUA_THANH_TOAN','DA_THANH_TOAN','DA_HUY');

select * from phong where ma_loai_phong = 'LP1' and trang_thai = 'TRONG' and tinh_trang=true limit 1;

select * from loai_giuong;

update tai_khoan set tinh_trang = 1;

update loai_giuong set tinh_trang = 1;

update phong set tinh_trang = 1;

update loai_phong set tinh_trang = 1;

select * from don_dat_phong where ma_dat_phong='a74f01b6-716d-41cf-a0ff-218a5e91875b';

DESCRIBE don_dat_phong;

select * from chi_tiet_loai_giuong where ma_loai_phong='LP2';

ALTER DATABASE hotelbooking
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE khach_hang
    MODIFY ho_ten_khach_hang VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE don_dat_phong MODIFY ho_ten_khach_hang  VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE don_dat_phong MODIFY ghi_chu  VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE phong CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;