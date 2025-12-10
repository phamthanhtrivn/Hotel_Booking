package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.DashboardDataDTO;
import iuh.fit.hotel_booking_backend.dto.OverviewStatDTO;
import iuh.fit.hotel_booking_backend.dto.RoomStaticDTO;
import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.repository.DanhGiaRepository;
import iuh.fit.hotel_booking_backend.repository.DonDatPhongRepository;
import iuh.fit.hotel_booking_backend.repository.LoaiPhongRepository;
import iuh.fit.hotel_booking_backend.repository.PhongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {
    @Autowired
    private DonDatPhongRepository donDatPhongRepo;
    @Autowired
    private LoaiPhongRepository loaiPhongRepo;
    @Autowired
    private PhongRepository phongRepo;
    @Autowired
    private DanhGiaRepository danhGiaRepo;

    public DashboardDataDTO getDashboardData() {
        DashboardDataDTO data = new DashboardDataDTO();

        // Setup thời gian chung
        LocalDateTime now = LocalDateTime.now();
        LocalDate today = LocalDate.now();
        int currentYear = today.getYear();

        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);


        // 1. OVERVIEW DATA
        long checkInToday = donDatPhongRepo.countCheckInToday(startOfDay, endOfDay);
        long checkOutToday = donDatPhongRepo.countCheckOutToday(startOfDay, endOfDay);
        long totalInHotel = donDatPhongRepo.countTotalInHotel(now);
        long totalRooms = phongRepo.countTotalRooms();
        long availableRooms = totalRooms - totalInHotel;
        if (availableRooms < 0) availableRooms = 0;

        List<OverviewStatDTO> overview = new ArrayList<>();
        overview.add(new OverviewStatDTO("Today's Check-in", checkInToday));
        overview.add(new OverviewStatDTO("Today's Check-out", checkOutToday));
        overview.add(new OverviewStatDTO("Total In hotel", totalInHotel));
        overview.add(new OverviewStatDTO("Total Available room", availableRooms));
        overview.add(new OverviewStatDTO("Total Occupied room", totalInHotel));
        data.setOverviewData(overview);


        // 2. ROOM STATIC DATA
        List<LoaiPhong> listLoaiPhong = loaiPhongRepo.findAll();

        Map<String, Long> totalMap = convertToMap(loaiPhongRepo.countTotalByRoomType());
        Map<String, Long> occupiedMap = convertToMap(donDatPhongRepo.countOccupiedByRoomType(now));
        Map<String, Long> dealsMap = convertToMap(donDatPhongRepo.countDealsByRoomType());

        List<RoomStaticDTO> roomStats = new ArrayList<>();
        for (LoaiPhong lp : listLoaiPhong) {
            String id = lp.getMaLoaiPhong();
            roomStats.add(new RoomStaticDTO(
                    id,
                    lp.getTenLoaiPhong(),
                    lp.getGia(),
                    dealsMap.getOrDefault(id, 0L),
                    occupiedMap.getOrDefault(id, 0L),
                    totalMap.getOrDefault(id, 0L)
            ));
        }
        data.setRoomStaticData(roomStats);


        // 3. FLOOR STATUS (%)
        double floorStatus = totalRooms > 0 ? ((double)availableRooms / totalRooms) * 100 : 0;
        data.setFloorStatus((double) Math.round(floorStatus * 100) / 100);


        // 4. FEEDBACK (Lấy 5 cái mới nhất)
        data.setFeedbackData(danhGiaRepo.findRecentFeedbacks(PageRequest.of(0, 5)));


        // 5. REVENUE CHART (3 Năm gần nhất)
        Map<String, List<Map<String, Object>>> revenueMap = new HashMap<>();
        int[] years = {currentYear - 2, currentYear - 1, currentYear};
        String[] monthNames = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};

        for (int year : years) {
            List<Object[]> revenueRaw = donDatPhongRepo.getMonthlyRevenueByYear(year);
            Map<Integer, Double> revenueByMonthIndex = revenueRaw.stream()
                    .collect(Collectors.toMap(
                            obj -> (Integer)obj[0],
                            obj -> (Double)obj[1],
                            (v1, v2) -> v1
                    ));

            List<Map<String, Object>> yearData = new ArrayList<>();
            for (int i = 1; i <= 12; i++) {
                Map<String, Object> m = new HashMap<>();
                m.put("month", monthNames[i-1]);
                m.put("revenue", revenueByMonthIndex.getOrDefault(i, 0.0));
                yearData.add(m);
            }
            revenueMap.put(String.valueOf(year), yearData);
        }
        data.setRevenueData(revenueMap);


        // 6. OCCUPANCY
        Map<String, Object> occupancyStats = new HashMap<>();

        // A. Yearly Occupancy
        List<Map<String, Object>> yearlyList = new ArrayList<>();
        for (int year = currentYear - 2; year <= currentYear + 1; year++) {
            LocalDate startYear = LocalDate.of(year, 1, 1);
            LocalDate endYear = LocalDate.of(year, 12, 31);

            double rate = calculateOccupancyRate(startYear, endYear, totalRooms);
            Map<String, Object> map = new HashMap<>();
            map.put("year", String.valueOf(year));
            map.put("occupancy", Math.round(rate));
            yearlyList.add(map);
        }
        occupancyStats.put("yearly", yearlyList);

        // B. Monthly Occupancy
        Map<String, List<Map<String, Object>>> monthlyWrapper = new HashMap<>();
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        for (int year : years) {
            List<Map<String, Object>> monthlyList = new ArrayList<>();

            List<DonDatPhong> yearBookings = donDatPhongRepo.findBookingsInDateRange(
                    LocalDate.of(year, 1, 1).atStartOfDay(),
                    LocalDate.of(year, 12, 31).atTime(LocalTime.MAX)
            );


            for (int i = 1; i <= 12; i++) {
                LocalDate startMonth = LocalDate.of(year, i, 1);
                LocalDate endMonth = startMonth.withDayOfMonth(startMonth.lengthOfMonth());

                double rate = calculateOccupancyRateFromList(yearBookings, startMonth, endMonth, totalRooms);

                Map<String, Object> m = new HashMap<>();
                m.put("month", months[i - 1]);
                m.put("occupancy", Math.round(rate));
                monthlyList.add(m);
            }

            monthlyWrapper.put(String.valueOf(year), monthlyList);
        }

        occupancyStats.put("monthly", monthlyWrapper);

        // C. Weekly Occupancy
        Map<String, List<Map<String, Object>>> weeklyWrapper = new HashMap<>();


        weeklyWrapper.put(getKeyYearMonth(today), calculateWeeklyStats(today, totalRooms));
        weeklyWrapper.put(getKeyYearMonth(today.plusMonths(1)), calculateWeeklyStats(today.plusMonths(1), totalRooms));

        occupancyStats.put("weekly", weeklyWrapper);

        data.setOccupancyStatistic(occupancyStats);

        return data;
    }


    // HELPER METHODS
    private double calculateOccupancyRate(LocalDate startDate, LocalDate endDate, long totalRooms) {
        if (totalRooms == 0) return 0;

        List<DonDatPhong> bookings = donDatPhongRepo.findBookingsInDateRange(
                startDate.atStartOfDay(),
                endDate.atTime(LocalTime.MAX)
        );

        return calculateOccupancyRateFromList(bookings, startDate, endDate, totalRooms);
    }

    private double calculateOccupancyRateFromList(List<DonDatPhong> bookings, LocalDate startDate, LocalDate endDate, long totalRooms) {
        if (totalRooms == 0) return 0;

        // Tổng số đêm phòng khả dụng trong kỳ (Số phòng * Số ngày)
        long totalDaysInPeriod = ChronoUnit.DAYS.between(startDate, endDate) + 1;
        long totalAvailableRoomNights = totalRooms * totalDaysInPeriod;
        long totalSoldRoomNights = 0;

        for (DonDatPhong booking : bookings) {
            LocalDate checkIn = booking.getCheckIn().toLocalDate();
            LocalDate checkOut = booking.getCheckOut().toLocalDate();

            LocalDate intersectStart = checkIn.isAfter(startDate) ? checkIn : startDate;
            LocalDate intersectEnd = checkOut.isBefore(endDate) ? checkOut : endDate;

            if (!intersectStart.isAfter(intersectEnd)) {
                // Logic tính đêm:
                // EffectiveEnd là checkout thực tế hoặc ngày cuối cùng của kỳ + 1 (để trừ ra đêm cuối)
                LocalDate effectiveEnd = checkOut.isBefore(endDate.plusDays(1)) ? checkOut : endDate.plusDays(1);
                LocalDate effectiveStart = checkIn.isAfter(startDate) ? checkIn : startDate;

                long nights = ChronoUnit.DAYS.between(effectiveStart, effectiveEnd);
                if (nights > 0) {
                    totalSoldRoomNights += nights;
                }
            }
        }

        return ((double) totalSoldRoomNights / totalAvailableRoomNights) * 100;
    }

    private List<Map<String, Object>> calculateWeeklyStats(LocalDate date, long totalRooms) {
        List<Map<String, Object>> result = new ArrayList<>();
        LocalDate firstDayOfMonth = date.withDayOfMonth(1);
        LocalDate lastDayOfMonth = date.withDayOfMonth(date.lengthOfMonth());

        List<DonDatPhong> monthBookings = donDatPhongRepo.findBookingsInDateRange(
                firstDayOfMonth.atStartOfDay(), lastDayOfMonth.atTime(LocalTime.MAX)
        );

        int weekCount = 1;
        LocalDate current = firstDayOfMonth;
        while (!current.isAfter(lastDayOfMonth)) {
            LocalDate endOfWeek = current.plusDays(6);
            if (endOfWeek.isAfter(lastDayOfMonth)) {
                endOfWeek = lastDayOfMonth;
            }

            double rate = calculateOccupancyRateFromList(monthBookings, current, endOfWeek, totalRooms);

            Map<String, Object> weekMap = new HashMap<>();
            weekMap.put("week", "Week " + weekCount);
            weekMap.put("occupancy", Math.round(rate));
            result.add(weekMap);

            current = endOfWeek.plusDays(1);
            weekCount++;
        }
        return result;
    }

    private String getKeyYearMonth(LocalDate date) {
        return date.getYear() + "-" + (date.getMonthValue() < 10 ? "0" + date.getMonthValue() : date.getMonthValue());
    }

    private Map<String, Long> convertToMap(List<Object[]> queryResult) {
        return queryResult.stream()
                .collect(Collectors.toMap(
                        obj -> (String) obj[0],
                        obj -> ((Number) obj[1]).longValue()
                ));
    }
}