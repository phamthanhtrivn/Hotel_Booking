import React from "react";
import RatingBar from "./RatingBar";
import { timeAgo } from "@/helpers/dateHelpers";
import { calculateAverage } from "@/helpers/numberFormatter";
import AdminPagination from "./AdminPagination";
import { CiUser } from "react-icons/ci";

export default function ReviewsList({
  reviewsStats,
  reviews,
  totalPages,
  currentPage,
  onChange,
}) {
  return (
    <>
      {reviews.length > 0 ? (
        <div className="py-10 flex flex-col gap-10">
          <div className="grid grid-cols-2 items-center px-6">
            <div className="flex items-center gap-6">
              <div
                className="rounded-2xl p-1.5 bg-gradient-to-br from-[color-mix(in_srgb,var(--color-primary)_20%,white)]
                    via-[color-mix(in_srgb,var(--color-primary)_10%,white)]
                    to-[color-mix(in_srgb,var(--color-primary)_40%,white)]"
              >
                <p
                  className="text-5xl font-bold text-(--color-primary) border-4 rounded-2xl
         border-white w-28 h-28 flex items-center justify-center"
                >
                  {reviewsStats.avg.toFixed(1)}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-bold text-(--color-primary)">
                  {reviewsStats.rating}
                </h2>
                <p className="text-lg font-bold">
                  {reviewsStats.numOfReviews} đánh giá
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <RatingBar
                title={"Vệ sinh"}
                score={reviewsStats.avgClean.toFixed(1)}
              />
              <RatingBar
                title={"Dịch vụ"}
                score={reviewsStats.avgService.toFixed(1)}
              />
              <RatingBar
                title={"Cơ sở vật chất"}
                score={reviewsStats.avgFacilities.toFixed(1)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl uppercase">Đánh giá của khách hàng</h2>

              {/* Phân trang - sửa CSS tại đây */}
              <div>
                <AdminPagination
                  currentPage={currentPage}
                  onChange={onChange}
                  totalPages={totalPages}
                />
              </div>
            </div>

            {reviews.map((r) => (
              <div
                key={r.maDanhGia}
                className="grid grid-cols-3 border rounded-md p-4 shadow"
              >
                <div className="col-span-1 flex items-center gap-2">
                  <div className="w-14 h-14 flex items-center justify-center border rounded-full shadow-sm">
                    <CiUser size={30} />
                  </div>
                  <p className="font-medium text-[16px]">{r.hoTenKhachHang}</p>
                </div>
                <div className="col-span-2 flex flex-col gap-4">
                  <div className="flex gap-5 items-center">
                    <div className="flex items-center gap-1 bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[14px] text-(--color-primary)  py-1.5 px-4 rounded-full">
                      <p className="text-[15px] font-bold">
                        {calculateAverage([
                          r.diemSachSe,
                          r.diemDichVu,
                          r.DiemCoSoVatChat,
                        ]).toFixed(1)}
                      </p>
                      <p className="font-medium">/ 10</p>
                    </div>
                    <p className="font-bold text-[14px] text-(--muted-foreground)">
                      Đánh giá {timeAgo(r.thoiGianDanhGia)}
                    </p>
                  </div>
                  <p className="font-medium text-[15px]">{r.binhLuan}</p>
                </div>
              </div>
            ))}
            <div className="ml-auto">
              <AdminPagination
                currentPage={currentPage}
                onChange={onChange}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20">
          <p className="text-center font-medium text-2xl">
            Chưa có bất kỳ đánh giá nào
          </p>
        </div>
      )}
    </>
  );
}
