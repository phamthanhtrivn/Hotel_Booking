package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.DatPhongRequest;
import iuh.fit.hotel_booking_backend.dto.DonDatPhongSearchRequest;
import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.entity.KhachHang;
import iuh.fit.hotel_booking_backend.entity.Phong;
import iuh.fit.hotel_booking_backend.entity.TrangThaiDon;
import iuh.fit.hotel_booking_backend.helper.DonDatPhongSpecification;
import iuh.fit.hotel_booking_backend.repository.DonDatPhongRepository;
import iuh.fit.hotel_booking_backend.repository.KhachHangRepository;
import iuh.fit.hotel_booking_backend.repository.PhongRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class DonDatPhongService {
    private DonDatPhongRepository repo;

    private KhachHangService khachHangService;
    private PhongService phongService;
    private EmailService emailService;

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(5);

    public DonDatPhongService(
            DonDatPhongRepository repo,
            KhachHangService khachHangService,
            PhongService phongService,
            EmailService emailService) {
        this.repo = repo;
        this.khachHangService = khachHangService;
        this.phongService = phongService;
        this.emailService = emailService;
    }

    public List<DonDatPhong> getAll() {
        return repo.findAll();
    }

    public DonDatPhong getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public DonDatPhong save(DonDatPhong donDatPhong) {
        return repo.save(donDatPhong);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }

    public List<DonDatPhong> getByMaKhachHang(String maKhachHang) {
        return repo.findByKhachHang_MaKhachHang(maKhachHang);
    }

    public int countByKhachHangId(String maKhachHang) {
        return repo.countByKhachHangId(maKhachHang);
    }

    public List<DonDatPhong> search(DonDatPhongSearchRequest req) {
        return repo.findAll(DonDatPhongSpecification.build(req));
    }

    public DonDatPhong createBooking(DatPhongRequest req) throws Exception {
        DonDatPhong don = new DonDatPhong();
        don.setMaDatPhong(UUID.randomUUID().toString());

        KhachHang khachHang = khachHangService.getOrCreateCustomer(req);
        don.setHoTenKhachHang(req.hoTenKhachHang);
        don.setSoDienThoai(req.soDienThoai);
        don.setEmail(req.email);
        don.setKhachHang(khachHang);

        Phong phong = phongService.getAvailableRoomByRoomType(req.maLoaiPhong);
        if (phong == null) throw new Exception("Phòng không tồn tại");
        don.setPhong(phong);

        if (req.checkIn.isAfter(req.checkOut)) {
            throw new Exception("Ngày check-in/check-out không hợp lệ");
        }
        don.setCheckIn(req.checkIn);
        don.setCheckOut(req.checkOut);

        don.setTongTien(req.tongTien);
        don.setVAT(req.vat);
        don.setTongTienTT(req.tongTienThanhToan);
        don.setGhiChu(req.ghiChu);
        don.setTrangThai(TrangThaiDon.CHUA_THANH_TOAN);

        repo.save(don);
        emailService.sendBookingConfirmationWithPaymentInfo(don.getEmail(), don.getMaDatPhong(), req.tongTienThanhToan);
        return don;
    }

}
