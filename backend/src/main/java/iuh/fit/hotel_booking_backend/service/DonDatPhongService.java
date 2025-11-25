package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
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
import iuh.fit.hotel_booking_backend.util.IdUtil;
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
    private IdUtil idUtil;

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(5);

    public DonDatPhongService(
            DonDatPhongRepository repo,
            KhachHangService khachHangService,
            PhongService phongService,
            EmailService emailService, IdUtil idUtil) {
        this.repo = repo;
        this.khachHangService = khachHangService;
        this.phongService = phongService;
        this.emailService = emailService;
        this.idUtil = idUtil;
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
        don.setMaDatPhong(idUtil.generateUniqueCodeForDonDatPhong());

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
        don.setCheckIn(req.checkIn.atTime(12, 30));
        don.setCheckOut(req.checkOut.atTime(13, 0));

        don.setTongTien(req.tongTien);
        don.setVAT(req.vat);
        don.setTongTienTT(req.tongTienThanhToan);
        don.setGhiChu(req.ghiChu);
        don.setTrangThai(TrangThaiDon.CHUA_THANH_TOAN);

        repo.save(don);
        emailService.sendBookingConfirmationWithPaymentInfo(don.getEmail(), don.getMaDatPhong(), req.tongTienThanhToan);
        return don;
    }

    public APIResponse<DonDatPhong> findById(String id) {
        APIResponse<DonDatPhong> response = new APIResponse<>();
        response.setSuccess(false);
        DonDatPhong donDatPhong = repo.findById(id).orElse(null);
        response.setData(donDatPhong);
        if (donDatPhong == null) {
            response.setMessage("Đơn đặt phòng không tồn tại");
            return response;
        } else {
            response.setSuccess(true);
            response.setMessage("Lấy đơn đặt phòng thành công");
            return response;
        }
    }

    public void updateStatusPaymentSuccess(String maDatPhong) {
        Optional<DonDatPhong> donOpt = repo.findById(maDatPhong);
        if (donOpt.isPresent()) {
            DonDatPhong don = donOpt.get();
            if (don.getTrangThai().name().equals("CHUA_THANH_TOAN")) {
                don.setTrangThai(TrangThaiDon.valueOf("DA_THANH_TOAN"));
                repo.save(don);
            }
        }
    }

}
