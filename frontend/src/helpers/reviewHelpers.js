// helpers/reviewHelpers.js
export const processReviews = (reviewsData) => {
  if (!reviewsData || reviewsData.length === 0) {
    return {
      reviews: [],
      topReviews: [],
      numOfReviews: 0,
      rating: "",
      avgService: 0,
      avgClean: 0,
      avgFacilities: 0,
      avg: 0
    };
  }

  // Tính điểm trung bình cho từng review
  const reviewsWithAvg = reviewsData.map(review => ({
    ...review,
    diemTrungBinh: ((review.diemDichVu + review.diemSachSe + review.diemCoSoVatChat) / 3).toFixed(1)
  }));

  // Lấy top 5 reviews có điểm trung bình cao nhất
  const topReviews = [...reviewsWithAvg]
    .sort((a, b) => b.diemTrungBinh - a.diemTrungBinh)
    .slice(0, 5);

  // Tổng từng loại điểm
  const totalService = reviewsData.reduce((sum, review) => sum + review.diemDichVu, 0);
  const totalClean = reviewsData.reduce((sum, review) => sum + review.diemSachSe, 0);
  const totalFacilities = reviewsData.reduce((sum, review) => sum + review.diemCoSoVatChat, 0);

  const avgService = parseFloat((totalService / reviewsData.length).toFixed(1));
  const avgClean = parseFloat((totalClean / reviewsData.length).toFixed(1));
  const avgFacilities = parseFloat((totalFacilities / reviewsData.length).toFixed(1));

  // Trung bình chung
  const avg = parseFloat(((avgService + avgClean + avgFacilities) / 3).toFixed(1));

  // Gán rating
  const rating = getRatingLabel(avg);

  return {
    reviews: reviewsWithAvg,
    topReviews,
    numOfReviews: reviewsData.length,
    avgService,
    avgClean,
    avgFacilities,
    avg,
    rating
  };
};

export const getRatingLabel = (avg) => {
  if (avg >= 8.5) return "Rất tốt";
  if (avg >= 7.5) return "Tốt";
  if (avg >= 5) return "Trung bình";
  if (avg >= 3) return "Kém";
  return "Rất kém";
};
