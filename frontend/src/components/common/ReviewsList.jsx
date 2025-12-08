import React from "react";
import RatingBar from "./RatingBar";
import { timeAgo } from "@/helpers/dateHelpers";

export default function ReviewsList({ reviewsState }) {
  return (
    <div className="py-10 flex flex-col gap-10">
      <div className="grid grid-cols-2 items-center px-6">
        <div className="flex items-center gap-6">
          <div
            className="rounded-2xl p-1.5 bg-gradient-to-br from-[color-mix(in_srgb,var(--color-primary)_20%,white)]
                    via-[color-mix(in_srgb,var(--color-primary)_10%,white)]
                    to-[color-mix(in_srgb,var(--color-primary)_40%,white)]"
          >
            <p
              className="text-5xl font-bold text-[var(--color-primary)] border-4 rounded-2xl
         border-white w-28 h-28 flex items-center justify-center"
            >
              {reviewsState.avg}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-bold text-[var(--color-primary)]">
              {reviewsState.rating}
            </h2>
            <p className="text-lg font-bold">
              {reviewsState.numOfReviews} đánh giá
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <RatingBar title={"Vệ sinh"} score={reviewsState.avgClean} />
          <RatingBar title={"Dịch vụ"} score={reviewsState.avgService} />
          <RatingBar
            title={"Cơ sở vật chất"}
            score={reviewsState.avgFacilities}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl uppercase  mb-4">Đánh giá của khách hàng</h2>
        {reviewsState.reviews.map((r) => (
          <div
            key={r.maDanhGia}
            className="grid grid-cols-3 border-1 rounded-md p-4"
          >
            <div className="col-span-1 flex items-center gap-2">
              <div className="w-14 h-14 bg-[var(--chart-3)] rounded-full"></div>
              <p className="font-[500] text-[17px]">{r.hoTenKhachHang}</p>
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <div className="flex gap-5 items-center">
                <p className="bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[12px] text-[var(--color-primary)] font-[600] py-1.5 px-4 rounded-full">
                  {r.diemTrungBinh} / 10
                </p>
                <p className="font-bold text-[15px] text-[var(--muted-foreground)]">
                  Đánh giá {timeAgo(r.thoiGianDanhGia)}
                </p>
              </div>
              <p className="font-[500] text-[15px]">{r.binhLuan}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
