package iuh.fit.hotel_booking_backend.controller.admin;

import iuh.fit.hotel_booking_backend.dto.DashboardDataDTO;
import iuh.fit.hotel_booking_backend.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {
    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardDataDTO> getDashboardStatistics() {
        DashboardDataDTO data = dashboardService.getDashboardData();
        return ResponseEntity.ok(data);
    }
}
