package iuh.fit.hotel_booking_backend.service;

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

    private KhachHangRepository khachHangRepository;
    private PhongRepository phongRepository;
    private EmailService emailService;

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(5);

    public DonDatPhongService(
            DonDatPhongRepository repo,
            KhachHangRepository khachHangRepository,
            PhongRepository phongRepository,
            EmailService emailService) {
        this.repo = repo;
        this.khachHangRepository = khachHangRepository;
        this.phongRepository = phongRepository;
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

    public DonDatPhong createBooking(String maKhachHang,
                                     String hoTenKH,
                                     String soDienThoai,
                                     String email,
                                     String maPhong,
                                     LocalDateTime checkIn,
                                     LocalDateTime checkOut,
                                     double tongTien,
                                     int VAT,
                                     boolean isPaid,
                                     String ghiChu) throws Exception {

        DonDatPhong don = new DonDatPhong();
        don.setMaDatPhong(UUID.randomUUID().toString());

        KhachHang khachHang;
        if (maKhachHang != null) {
            Optional<KhachHang> khOpt = khachHangRepository.findById(maKhachHang);
            if (khOpt.isEmpty()) throw new Exception("Khách hàng không tồn tại");
            khachHang = khOpt.get();
        } else {
            khachHang = new KhachHang();
            khachHang.setMaKhachHang(UUID.randomUUID().toString());
            khachHang.setHoTenKH(hoTenKH);
            khachHang.setSoDienThoai(soDienThoai);
            khachHangRepository.save(khachHang);
        }

        don.setKhachHang(khachHang);
        don.setHoTenKhachHang(hoTenKH != null ? hoTenKH : khachHang.getHoTenKH());
        don.setSoDienThoai(soDienThoai != null ? soDienThoai : khachHang.getSoDienThoai());
        don.setEmail(email);

        Optional<Phong> phongOpt = phongRepository.findById(maPhong);
        if (phongOpt.isEmpty()) throw new Exception("Phòng không tồn tại");
        don.setPhong(phongOpt.get());

        if (checkIn.isAfter(checkOut) || checkIn.isBefore(LocalDateTime.now())) {
            throw new Exception("Ngày check-in/check-out không hợp lệ");
        }
        don.setCheckIn(checkIn);
        don.setCheckOut(checkOut);

        don.setTongTien(tongTien);
        don.setVAT(VAT);
        double tongTienTT = tongTien + tongTien * VAT / 100;
        don.setTongTienTT(tongTienTT);
        don.setGhiChu(ghiChu);

        if (isPaid) {
            don.setTrangThai(TrangThaiDon.DA_THANH_TOAN);
            repo.save(don);
            if (don.getEmail() != null) {
                emailService.sendBookingPaidEmail(don.getEmail(), don.getMaDatPhong());
            }
        } else {
            don.setTrangThai(TrangThaiDon.CHUA_THANH_TOAN);
            repo.save(don);
            if (don.getEmail() != null) {
                emailService.sendBookingConfirmationWithPaymentInfo(don.getEmail(), don.getMaDatPhong(), tongTienTT);
            }

            scheduler.schedule(() -> {
                try {
                    DonDatPhong d = repo.findById(don.getMaDatPhong()).orElse(null);
                    if (d != null && d.getTrangThai() == TrangThaiDon.CHUA_THANH_TOAN) {
                        d.setTrangThai(TrangThaiDon.DA_HUY);
                        repo.save(d);
                        if (d.getEmail() != null) {
                            emailService.sendBookingCanceledEmail(d.getEmail(), d.getMaDatPhong());
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }, 15, TimeUnit.MINUTES);
        }

        return don;
    }

}
