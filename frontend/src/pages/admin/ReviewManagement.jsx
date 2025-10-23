import React, { useState } from "react";
import { roomsDummyData } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { Check, Trash2, ShieldAlert } from "lucide-react";


const dummyReviews = [
  {
    id: "REV001",
    userId: "CUST001",
    userName: "Nguyễn Văn A",
    roomTypeId: "LP001",
    rating: 5,
    comment: "Phòng rất đẹp và sạch sẽ. Dịch vụ tuyệt vời!",
    date: "2025-10-18",
    status: "Approved",
  },
  {
    id: "REV002",
    userId: "CUST002",
    userName: "Trần Thị B",
    roomTypeId: "LP003",
    rating: 4,
    comment: "Mọi thứ đều ổn, tuy nhiên đồ ăn sáng chưa đa dạng lắm.",
    date: "2025-10-17",
    status: "Pending",
  },
  {
    id: "REV003",
    userId: "CUST003",
    userName: "Lê Văn C",
    roomTypeId: "LP002",
    rating: 3,
    comment: "Wifi hơi yếu, cần cải thiện.",
    date: "2025-10-16",
    status: "Pending",
  },
  {
    id: "REV004",
    userId: "CUST004",
    userName: "Phạm Thị D",
    roomTypeId: "LP004",
    rating: 5,
    comment: "View biển từ phòng Ocean Suite thật sự ngoạn mục. Rất đáng tiền.",
    date: "2025-10-15",
    status: "Approved",
  },
];

const roomTypeMap = roomsDummyData.reduce((acc, rt) => {
  acc[rt.maLoaiPhong] = rt.tenLoaiPhong;
  return acc;
}, {});


const ReviewManagement = () => {
  const [reviews, setReviews] = useState(dummyReviews);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xoá đánh giá này?")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setReviews(
        reviews.map((review) => {
          if (review.id === id) {
            return {
              ...review,
              status: review.status === "Approved" ? "Pending" : "Approved",
            };
          }
          return review;
        })
    );
  };


  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper để hiển thị sao
  const renderRating = (rating) => {
    return (
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
              <svg
                  key={index}
                  className={`w-4 h-4 ${
                      index < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.172c.969 0 1.371 1.24.588 1.81l-3.376 2.45a1 1 0 00-.364 1.118l1.287 3.971c.3.921-.755 1.688-1.539 1.118l-3.375-2.45a1 1 0 00-1.176 0l-3.375 2.45c-.784.57-1.838-.197-1.539-1.118l1.287-3.971a1 1 0 00-.364-1.118L2.04 9.397c-.783-.57-.38-1.81.588-1.81h4.172a1 1 0 00.95-.69l1.286-3.97z" />
              </svg>
          ))}
        </div>
    );
  };

  return (
      <div className="p-8 bg-gray-100 min-h-screen text-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý đánh giá</h1>
        
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đánh giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bình luận
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review) => (
                <tr key={review.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {review.userName}
                    </div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {roomTypeMap[review.roomTypeId] || "Không rõ"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderRating(review.rating)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {review.comment}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          review.status
                      )}`}
                  >
                    {review.status}
                  </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleStatus(review.id)}
                    >
                      {review.status === "Pending" ? (
                          <Check className="h-4 w-4 text-green-600" />
                      ) : (
                          <ShieldAlert className="h-4 w-4 text-yellow-600" />
                      )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(review.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>

                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default ReviewManagement;