SELECT * FROM chi_tiet_loai_giuong;

select * from don_dat_phong;

select * from loai_phong;

SELECT *
FROM phong p
WHERE p.ma_loai_phong = 'LP8'
  AND p.tinh_trang = 1
  AND p.ma_phong NOT IN (
    SELECT d.ma_phong
    FROM don_dat_phong d
    WHERE d.trang_thai IN ('CHUA_THANH_TOAN','DA_THANH_TOAN')
      AND d.check_in <= '2025-11-27 12:30:00.000000'
      AND d.check_out >= '2025-11-27 13:00:00.000000'
);

SELECT COUNT(p.ma_phong)
FROM phong p
WHERE p.ma_loai_phong = 'LP8'
  AND p.ma_phong NOT IN (
    SELECT d.ma_phong
    FROM don_dat_phong d
    WHERE d.trang_thai IN ('CHUA_THANH_TOAN','DA_THANH_TOAN')
      AND d.check_in < '2025-11-27 12:30:00.000000'
      AND d.check_out > '2025-11-27 13:00:00.000000''2025-11-27 13:00:00.000000'
);