package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.DanhGiaRequest;
import iuh.fit.hotel_booking_backend.dto.DanhGiaRespone;
import iuh.fit.hotel_booking_backend.dto.DanhGiaTimKiemRequest;
import iuh.fit.hotel_booking_backend.entity.DanhGia;
import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.repository.DanhGiaRepository;
import iuh.fit.hotel_booking_backend.repository.DonDatPhongRepository;
import iuh.fit.hotel_booking_backend.repository.LoaiPhongRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DanhGiaService {
    private DanhGiaRepository repo;
    private DonDatPhongRepository donDatPhongRepo;
    private LoaiPhongRepository loaiPhongRepo;

    public DanhGiaService(DanhGiaRepository repo, DonDatPhongRepository donDatPhongRepo, LoaiPhongRepository loaiPhongRepo) {
        this.repo = repo;
        this.donDatPhongRepo = donDatPhongRepo;
        this.loaiPhongRepo = loaiPhongRepo;
    }

    public DanhGia getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public DanhGia save(DanhGiaRequest danhGiaRequest) {
        DanhGia newDanhGia = new DanhGia();
        DanhGia dg = repo.findTopByOrderByMaDanhGiaDesc();
        int cnt = 0;
        if(dg != null){
            cnt = Integer.parseInt(dg.getMaDanhGia().substring(dg.getMaDanhGia().length() - 3));
        }
        String maDG = "DG" + String.format("%04d", cnt + 1);

        newDanhGia.setMaDanhGia(maDG);
        newDanhGia.setThoiGianDanhGia(LocalDateTime.now());
        newDanhGia.setBinhLuan(danhGiaRequest.getBinhLuan());
        newDanhGia.setDiemCoSoVatChat(danhGiaRequest.getDiemCoSoVatChat());
        newDanhGia.setDiemDichVu(danhGiaRequest.getDiemDichVu());
        newDanhGia.setDiemSachSe(danhGiaRequest.getDiemSachSe());

        LoaiPhong loaiPhong = loaiPhongRepo.findById(danhGiaRequest.getMaLoaiPhong()).orElse(null);
        DonDatPhong donDatPhong = donDatPhongRepo.findById(danhGiaRequest.getMaDatPhong()).orElse(null);
        newDanhGia.setLoaiPhong(loaiPhong);

        if(donDatPhong != null){
            donDatPhong.setDanhGia(newDanhGia);
            donDatPhongRepo.save(donDatPhong);
        }

        return repo.save(newDanhGia);
    }

    public List<DanhGiaRespone> searchDanhGia(DanhGiaTimKiemRequest danhGiaTimKiemRequest){

        System.out.println("Searching with request: " + danhGiaTimKiemRequest.toString());

        int minDiem = 0, maxDiem = 0;
        if(danhGiaTimKiemRequest.getDanhGia() != null){
            if(danhGiaTimKiemRequest.getDanhGia().getLoai().equals("BAD")){
                minDiem = danhGiaTimKiemRequest.getDanhGia().getDiem();
            }
            else maxDiem = danhGiaTimKiemRequest.getDanhGia().getDiem();
        }

        return repo.searchDanhGia(
                danhGiaTimKiemRequest.getMaLoaiPhong(),
                minDiem,
                maxDiem,
                danhGiaTimKiemRequest.getThang(),
                danhGiaTimKiemRequest.getNam()
        );
    }


    public Page<DanhGiaRespone> getAllByDanhGia(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repo.getAllByDanhGia(pageable);
    }

    public List<Integer> findDistinctYears() {
        return repo.findDistinctYears();
    }

    public boolean updateById(String id) {
        DanhGia existingDanhGia = repo.findById(id).orElse(null);
        if (existingDanhGia != null) {
            existingDanhGia.setTinhTrang(!existingDanhGia.isTinhTrang());
            repo.save(existingDanhGia);
            return true;
        }
        return false;
    }
}
