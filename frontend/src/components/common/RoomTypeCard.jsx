import React from "react";
import ImageSlider from "./ImageSlide";
import { formatVND } from "@/helpers/currencyFormatter";

const RoomTypeCard = ({ room, onDetail }) => {
  return (
    <section className="w-full bg-foreground text-background font-sans overflow-x-hidden">
      <div className=" flex flex-col lg:flex-row w-full max-w-none mx-auto h-[500px] shadow-xl overflow-hidden">
        {/* Cột trái - thông tin phòng */}
        <div className="relative w-full lg:w-1/3 bg-(--color-background) text-background p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
          <div className="absolute w-full top-0 left-0 bg-(--color-primary)">
            <p className="ml-5 text-xl ">
              {room.soPhongTrong == 0
                ? "Đã hết phòng"
                : room.soPhongTrong <= 3
                ? `Chỉ còn ${room.soPhongTrong} phòng`
                : ""}
            </p>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl tracking-tight mb-2">
              {room.tenLoaiPhong}
            </h2>
            <p className="text-background/60 text-xl uppercase">GIÁ</p>
            <p className="text-background text-3xl font-light mt-1">
              {formatVND(room.gia)}
            </p>
          </div>

          <div className="space-y-2 text-base text-muted-foreground">
            {room.loaiGiuong && (
              <div className="flex">
                <span className="w-28 font-semibold text-background/60">
                  Giường:
                </span>
                <span className="text-background">{room.loaiGiuong}</span>
              </div>
            )}
            {room.soKhach && (
              <div className="flex">
                <span className="w-28 font-semibold text-background/60">
                  Số người:
                </span>
                <span className="text-background">{room.soKhach}</span>
              </div>
            )}
            {room.dienTich && (
              <div className="flex">
                <span className="w-28 font-semibold text-background/60">
                  Diện tích:
                </span>
                <span className="text-background">{room.dienTich} m²</span>
              </div>
            )}
            {room.moTa && (
              <div className="flex">
                <span className="w-28 font-semibold text-background/60">
                  Mô tả:
                </span>
                <span className="text-background">
                  {room.moTa.length > 100
                    ? room.moTa.slice(0, 100) + "..."
                    : room.moTa}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => onDetail(room.maLoaiPhong)}
            className="mt-6 border border-background text-background py-2.5 px-8 text-sm uppercase tracking-wide hover:bg-chart-2 hover:border-none hover:scale-90 transition-all duration-300 self-start cursor-pointer"
          >
            View detail
          </button>
        </div>

        {/* Cột phải - hình ảnh phòng */}
        <div className="relative w-full lg:w-2/3 h-full">
          <ImageSlider
            images={room?.hinhAnh || []}
            visibleCount={1}
            height="70vh"
          />
        </div>
      </div>
    </section>
  );
};

export default RoomTypeCard;
