export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  
  // Đảm bảo check-out sau check-in
  if (end <= start) return 0;
  
  const timeDiff = end.getTime() - start.getTime();
  const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  return nights;
};

export const formatVietnameseDate = (date) => {
  if (!date) return '';
  
  const inputDate = new Date(date);
  
  // Kiểm tra date hợp lệ
  if (isNaN(inputDate.getTime())) {
    return 'Ngày không hợp lệ';
  }

  const day = inputDate.getDate();
  const month = inputDate.getMonth() + 1; // 0-11 → 1-12
  const dayOfWeek = inputDate.getDay(); // 0-6 (Chủ nhật = 0)

  // Map tháng sang tiếng Việt
  const monthNames = {
    1: 'Tháng 1', 2: 'Tháng 2', 3: 'Tháng 3', 4: 'Tháng 4',
    5: 'Tháng 5', 6: 'Tháng 6', 7: 'Tháng 7', 8: 'Tháng 8',
    9: 'Tháng 9', 10: 'Tháng 10', 11: 'Tháng 11', 12: 'Tháng 12'
  };

  // Map thứ trong tuần
  const dayNames = {
    0: 'Chủ nhật', 1: 'Thứ hai', 2: 'Thứ ba', 3: 'Thứ tư',
    4: 'Thứ năm', 5: 'Thứ sáu', 6: 'Thứ bảy'
  };

  return {day: day, month: monthNames[month],dayName: dayNames[dayOfWeek]};
};