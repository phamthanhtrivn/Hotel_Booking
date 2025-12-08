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
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import iuh.fit.hotel_booking_backend.util.IdUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public Page<DonDatPhong> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAll(pageable);
    }

    public DonDatPhong getById(String id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Đơn đặt phòng không tồn tại"));
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

    public Page<DonDatPhong> search(DonDatPhongSearchRequest req, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "checkIn"));
        Specification<DonDatPhong> spec = DonDatPhongSpecification.build(req);
        return repo.findAll(spec, pageable);
    }

    @Transactional
    public DonDatPhong createBooking(DatPhongRequest req) throws Exception {
        LocalDateTime checkInTime = req.checkIn.atTime(13, 0);
        LocalDateTime checkOutTime = req.checkOut.atTime(12, 30);
        Phong phong = phongService.getAvailableRoomByRoomType(
                req.maLoaiPhong, checkInTime, checkOutTime
        );
        DonDatPhong don = new DonDatPhong();
        don.setMaDatPhong(idUtil.generateUniqueCodeForDonDatPhong());

        KhachHang khachHang = khachHangService.getById(req.maKhachHang);
        don.setHoTenKhachHang(req.hoTenKhachHang);
        don.setSoDienThoai(req.soDienThoai);
        don.setEmail(req.email);
        don.setKhachHang(khachHang);
        don.setPhuThuTreEm(req.phuThuTreEm);

        don.setGiamGiaLanDau(req.giamGiaLanDau);
        don.setGiamGiaDiemTichLuy(req.giamGiaDiemTichLuy);

        don.setPhong(phong);

        if (req.checkIn.isAfter(req.checkOut)) {
            throw new Exception("Ngày check-in/check-out không hợp lệ");
        }
        don.setCheckIn(checkInTime);
        don.setCheckOut(checkOutTime);

        don.setTongTien(req.tongTien);
        don.setVAT(req.vat);
        don.setTongTienTT(req.tongTienThanhToan);
        don.setGhiChu(req.ghiChu);
        don.setTrangThai(
                req.trangThaiDon.equals("DA_THANH_TOAN")
                        ? TrangThaiDon.DA_THANH_TOAN
                        : TrangThaiDon.CHUA_THANH_TOAN
        );
        repo.save(don);

        if (req.trangThaiDon.equals("DA_THANH_TOAN")) {
            emailService.sendBookingPaidEmail(don.getEmail(), don.getMaDatPhong());
            updateDiemTichLuy(don.getMaDatPhong());
        } else {
            emailService.sendBookingConfirmationWithPaymentInfo(don.getEmail(), don.getMaDatPhong(), req.tongTienThanhToan);
        }

        return don;
    }

    public void updateStatusPaymentSuccess(String maDatPhong) {
        Optional<DonDatPhong> donOpt = repo.findById(maDatPhong);
        if (donOpt.isPresent()) {
            DonDatPhong don = donOpt.get();
            if (don.getTrangThai().name().equals("CHUA_THANH_TOAN")) {
                don.setTrangThai(TrangThaiDon.valueOf("DA_THANH_TOAN"));
                emailService.sendBookingPaidEmail(don.getEmail(), don.getMaDatPhong());
                repo.save(don);
            }
        }
    }

    public void updateDiemTichLuy(String maDatPhong) {
        Optional<DonDatPhong> donOpt = repo.findById(maDatPhong);
        if (donOpt.isPresent()) {
            DonDatPhong don = donOpt.get();
            KhachHang khachHang = don.getKhachHang();
            int diem = khachHang.getDiemTichLuy();
            int soDem = repo.getSoDem(maDatPhong);

            if (diem >= 10) {
                diem = (diem + soDem) % 10;
            } else {
                diem += soDem;
            }
            khachHang.setDiemTichLuy(diem);
            khachHangService.save(khachHang);
        }
    }

    public APIResponse<Integer> getTotalBookings(String maKhachHang) {
        APIResponse<Integer> response = new APIResponse<>();

        int total = repo.countDonDatPhongByKhachHang_MaKhachHangAndTrangThaiNot(maKhachHang, TrangThaiDon.DA_HUY);
        response.setSuccess(true);
        response.setMessage("Lấy tổng số đơn đặt phòng thành công!");
        response.setData(total);
        return response;
    }

    public void updateDTLChoDonHuy(String maDatPhong) {
        Optional<DonDatPhong> donOpt = repo.findById(maDatPhong);
        if (donOpt.isPresent()) {
            DonDatPhong don = donOpt.get();
            KhachHang khachHang = don.getKhachHang();

            int diem = khachHang.getDiemTichLuy();
            int soDem = repo.getSoDem(maDatPhong);

            boolean daSuDungDiem = don.getGiamGiaDiemTichLuy() > 0;

            if (daSuDungDiem) {
                diem = diem - soDem + 10;
            } else {
                diem = diem - soDem;
            }
            khachHang.setDiemTichLuy(diem);
            khachHangService.save(khachHang);
        }
    }

}
