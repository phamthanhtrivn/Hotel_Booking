package iuh.fit.hotel_booking_backend.config;

import iuh.fit.hotel_booking_backend.service.LoaiPhongService;
import iuh.fit.hotel_booking_backend.service.TienNghiService;
import iuh.fit.hotel_booking_backend.tools.LoaiPhongTools;
import iuh.fit.hotel_booking_backend.tools.TienNghiTool;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ToolConfig {
    @Bean
    public LoaiPhongTools loaiPhongTools(LoaiPhongService loaiPhongService) {
        return new LoaiPhongTools(loaiPhongService);
    }

    @Bean
    public TienNghiTool tienNghiTools(TienNghiService tienNghiService) {
        return new TienNghiTool(tienNghiService);
    }
}
