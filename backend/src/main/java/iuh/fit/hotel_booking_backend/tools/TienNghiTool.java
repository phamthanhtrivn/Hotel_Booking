package iuh.fit.hotel_booking_backend.tools;

import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.entity.TienNghi;
import iuh.fit.hotel_booking_backend.helper.DTOMapper;
import iuh.fit.hotel_booking_backend.service.LoaiPhongService;
import iuh.fit.hotel_booking_backend.service.TienNghiService;
import org.springframework.ai.tool.annotation.Tool;

import java.util.List;
import java.util.stream.Collectors;

public class TienNghiTool {
    private final TienNghiService tienNghiService;

    public TienNghiTool(TienNghiService tienNghiService) {
        this.tienNghiService = tienNghiService;
    }

    @Tool(description = "Tất cả loại tiện nghi tại khách sạn hoặc có bao nhiêu tiện nghi")
    public List<TienNghi> getAllTienNghi() {
        return tienNghiService.findAll();
    }
}
