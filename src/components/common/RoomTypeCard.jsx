import {
  ArrowLeft,
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState } from "react";

const RoomTypeCard = ({ room }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? room.hinhAnh.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === room.hinhAnh.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="w-full bg-foreground text-background font-sans overflow-x-hidden">
      <div className="flex flex-col lg:flex-row w-full max-w-none mx-auto h-[500px] shadow-xl overflow-hidden">
        {/* Cột trái - thông tin phòng */}
        <div className="w-full lg:w-1/3 bg-foreground text-background p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-2">
              {room.tenLoaiPhong}
            </h2>
            <p className="text-background/60 text-xl uppercase">GIÁ</p>
            <p className="text-background text-3xl font-light mt-1">
              {room.gia} VNĐ
            </p>
          </div>

          <div className="space-y-2 text-base text-muted-foreground">
            <div className="flex">
              <span className="w-28 font-semibold text-background/60">
                Giường:
              </span>
              <span className="text-background">{room.loaiGiuong}</span>
            </div>
            <div className="flex">
              <span className="w-28 font-semibold text-background/60">
                Số người:
              </span>
              <span className="text-background">{room.soKhach}</span>
            </div>
            <div className="flex">
              <span className="w-28 font-semibold text-background/60">
                Diện tích:
              </span>
              <span className="text-background">{room.dienTich} m²</span>
            </div>
            <div className="flex">
              <span className="w-28 font-semibold text-background/60">
                Mô tả:
              </span>
              <span className="text-background">{room.moTa}</span>
            </div>
          </div>

          <button className="mt-6 border border-background text-background py-2.5 px-8 text-sm uppercase tracking-wide hover:bg-chart-2 hover:border-none hover:scale-90 transition-all duration-300 self-start cursor-pointer">
            View detail
          </button>
        </div>

        {/* Cột phải - hình ảnh phòng */}
        <div className="relative w-full lg:w-2/3 h-full">
          <div className="overflow-hidden h-full">
            <div
              className="flex transition-transform ease-in-out duration-700 h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {room.hinhAnh.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`room-${index}`}
                  className="w-full h-full object-cover flex-shrink-0"
                />
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-background/60 hover:bg-background text-foreground/70 rounded-full p-2.5 transition-all z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-background/60 hover:bg-background text-foreground/70 rounded-full p-2.5 transition-all z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoomTypeCard;
