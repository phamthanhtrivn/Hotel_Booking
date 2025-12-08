package iuh.fit.hotel_booking_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "loai_phong")
public class LoaiPhong {
    @Id
    @Column(name = "ma_loai_phong")
    private String maLoaiPhong;

    @NotBlank(message = "Hãy nhập tên loại phòng")
    @Pattern(regexp = "^(Standard|Delux|Family|Suite)\\s+\\w+(?:\\s+\\w+)*$", message = "Phải bắt đầu là Standard, Delux, Family hoặc Suite và có 2 từ trở lên")
    @Column(name = "ten_loai_phong", nullable = false, unique = true)
    private String tenLoaiPhong;

    @NotNull(message = "Hãy nhập diện tích")
    @Min(value = 20, message = "Diên tích tối thiểu là 20 m²")
    @Column(name = "dien_tich")
    private double dienTich;

    @NotNull(message = "Hãy nhập số khách")
    @Min(value = 1, message = "Mỗi phòng phục vụ 1 - 6 khách")
    @Max(value = 6, message = "Mỗi phòng phục vụ 1 - 6 khách")
    @Column(name = "so_khach")
    private int soKhach;


    @Min(value = 0, message = "Số trẻ em phải lớn hơn 0")
    @Column(name = "so_tre_em")
    private int soTreEm;

    @NotNull(message = "Hãy nhập giá")
    @Min(value = 100000, message = "Giá tổi thiểu là 100000")
    @Column(name = "gia")
    private double gia;

    @ElementCollection
    @CollectionTable(
            name = "hinh_anh",
            joinColumns = @JoinColumn(name = "ma_loai_phong")
    )
    @Column(name = "url")
    private List<String> hinhAnh;

    @Column(name = "mo_ta", columnDefinition = "TEXT")
    private String moTa;

    @OneToMany(mappedBy = "loaiPhong", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ChiTietLoaiGiuong> chiTietLoaiGiuongList = new ArrayList<>();

    @OneToMany(mappedBy = "loaiPhong", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ChiTietTienNghi> chiTietTienNghiList = new ArrayList<>();

    @OneToMany(mappedBy = "loaiPhong", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Phong> phongList = new ArrayList<>();

    @Column(name = "tinh_trang")
    private boolean tinhTrang;
}
