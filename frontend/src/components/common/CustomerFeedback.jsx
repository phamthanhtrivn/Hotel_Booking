import {
  BrushCleaningIcon,
  EllipsisVerticalIcon,
  HotelIcon,
  UserCogIcon,
} from "lucide-react";
import React from "react";

const CustomerFeedback = ({ feedbackData }) => {
    const sortedFeedback = [...feedbackData].sort(
        (a,b) => new Date(b.thoiGianDanhGia).getTime() - new Date(a.thoiGianDanhGia).getTime()
    )
  return (
    <div className="bg-background p-6 rounded-xl shadow-sm h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-4xl font-semibold">Customers feedback</h2>
        <button className="text-foreground/60 hover:text-foreground/80">
          <EllipsisVerticalIcon className="w-6 h-6" />
        </button>
      </div>
      {sortedFeedback.map((feedback, index) => {
        const avg =
          (feedback.diemSachSe +
            feedback.diemDichVu +
            feedback.diemCoSoVatChat) /
          3;
        const formattedDate = new Date(feedback.thoiGianDanhGia).toLocaleString(
          "vi-VN",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        );

        return (
          <div
            key={index}
            className="py-3 border-b border-foreground/40 last:border-b-0"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">{feedback.loaiPhong}</p>
              <p className="text-xs text-chart-3/40">{formattedDate}</p>
            </div>
            <p className="text-sm text-foreground/60">{feedback.binhLuan}</p>
            <div className="flex flex-col items-start gap-3 mt-2 text-sm text-foreground/80">
              <p className="flex items-center gap-2">
                <BrushCleaningIcon className="w-5 h-5" />
                <span>Sạch sẽ: {feedback.diemSachSe}/10</span>
              </p>
              <p className="flex items-center gap-2">
                <UserCogIcon className="w-5 h-5" />
                <span>Dịch vụ: {feedback.diemDichVu}/10</span>
              </p>
              <p className="flex items-center gap-2">
                <HotelIcon className="w-5 h-5" />
                <span>Cơ sở vật chất: {feedback.diemSachSe}/10</span>
              </p>
              <span className="font-semibold text-slate-700 ml-auto">
                ⭐ Trung bình: {avg.toFixed(1)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerFeedback;
