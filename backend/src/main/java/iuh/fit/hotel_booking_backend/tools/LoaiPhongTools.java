package iuh.fit.hotel_booking_backend.tools;

import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.dto.LoaiPhongSearchRequest;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.helper.DTOMapper;
import iuh.fit.hotel_booking_backend.service.LoaiPhongService;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class LoaiPhongTools {
    private final LoaiPhongService loaiPhongService;

    public LoaiPhongTools(LoaiPhongService loaiPhongService) {
        this.loaiPhongService = loaiPhongService;
    }

    @Tool(description = "Dùng để tìm loại phòng theo tên, khi khách hàng gợi ý một cái tên loại phòng nào đó, có thể là chưa hoàn chỉnh, có thể dùng tool này để tìm kiếm tương đối")
    public List<LoaiPhongDTO> findByTenLoaiPhong(String tenLoaiPhong) {
        return loaiPhongService.findByName(tenLoaiPhong).stream()
                .map(lp -> {
                    LoaiPhongDTO dto = DTOMapper.loaiPhongMapToDTO(lp);
                    dto.setHinhAnh(null);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Tool(description = "Có thể dùng để tư vấn đặt phòng hoặc tìm kiếm loại phòng nâng cao theo ngày nhận - trả, số khách, mức giá, diện tích, loại giường...")
    public List<LoaiPhongDTO> searchAdvanced(
            @ToolParam(description = "Ngày nhận phòng (có thể null) định dạng yyyy-MM-dd")
            String checkIn,

            @ToolParam(description = "Ngày trả phòng (có thể null) định dạng yyyy-MM-dd")
            String checkOut,

            @ToolParam(description = "Tên loại phòng cần tìm (Deluxe, Standard...). Có thể null")
            String tenLoaiPhong,

            @ToolParam(description = "Số khách người lớn")
            Integer soKhach,

            @ToolParam(description = "Danh sách tuổi trẻ em, mỗi phần tử là 1 trẻ. Ví dụ: [3,5] nghĩa là 2 trẻ 3 và 5 tuổi")
            List<Integer> treEm,

            @ToolParam(description = "Giá tối thiểu (có thể null)")
            Double minGia,

            @ToolParam(description = "Giá tối đa (có thể null)")
            Double maxGia,

            @ToolParam(description = "Diện tích tối thiểu (có thể null)")
            Double minDienTich,

            @ToolParam(description = "Diện tích tối đa (có thể null)")
            Double maxDienTich,

            @ToolParam(description = "Mã giường (KING, QUEEN, SINGLE, DOUBLE...). Có thể null")
            String maGiuong) {

        // Convert String to LocalDate
        LocalDate checkInDate = checkIn != null ? LocalDate.parse(checkIn) : null;
        LocalDate checkOutDate = checkOut != null ? LocalDate.parse(checkOut) : null;

        // Convert List to Array
        Integer[] treEmArray = treEm != null ? treEm.toArray(new Integer[0]) : null;

        LocalDateTime checkInDateTime = checkInDate != null ? checkInDate.atTime(13, 0) : null;
        LocalDateTime checkOutDateTime = checkOutDate != null ? checkOutDate.atTime(12, 30) : null;

        return loaiPhongService.searchAdvancedDTO(
                        checkInDateTime,
                        checkOutDateTime,
                        tenLoaiPhong,
                        soKhach,
                        treEmArray,
                        minGia,
                        maxGia,
                        minDienTich,
                        maxDienTich,
                        maGiuong
                ).stream()
                .map(dto -> {
                    dto.setHinhAnh(null);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Tool(description = "Trả về toàn bộ danh sách loại phòng của khách sạn. Dùng khi người dùng hỏi về: danh sách phòng, loại phòng, số lượng loại phòng, hoặc thông tin các loại phòng.")
    public List<LoaiPhongDTO> getAllLoaiPhong() {
        return loaiPhongService.getAll().stream()
                .map(lp -> {
                    LoaiPhongDTO dto = DTOMapper.loaiPhongMapToDTO(lp);
                    dto.setHinhAnh(null);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
