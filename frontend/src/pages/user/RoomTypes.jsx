import { hotel, roomPackageDummyData } from "@/assets/assets";
import RoomTypeCard from "@/components/common/RoomTypeCard";
import SearchBar from "@/components/common/SearchBar";
import { Button } from "@/components/ui/button";
import { toLocalDate } from "@/helpers/dateHelpers";
import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const roomPackages = roomPackageDummyData;

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [filters, setFilters] = useState({
    checkIn: today,
    checkOut: tomorrow,
    guests: 2,
    roomType: "ALL",
    children: [8]
  });
  const navigate = useNavigate();
  const roomSectionRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const defaultFilters = {
          checkIn: today,
          checkOut: tomorrow,
          guests: 2,
          roomType: "ALL",
          children: [8]
        };
        setFilters(defaultFilters);

        await handleSearch(defaultFilters);
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải danh sách phòng từ server.");
      }
    };

    init();
  }, []);

  const handleSearch = async (currentFilters) => {
    try {
      const body = {
        checkIn: currentFilters.checkIn
          ? toLocalDate(new Date(currentFilters.checkIn))
          : null,

        checkOut: currentFilters.checkOut
          ? toLocalDate(new Date(currentFilters.checkOut))
          : null,

        soKhach: currentFilters.guests || null,
        tenLoaiPhong: currentFilters.roomType || null,
        minGia: null,
        maxGia: null,
        treEm: currentFilters.children,
        minDienTich: null,
        maxDienTich: null,
        maGiuong: null,
      };
      
      console.log(body)
      
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/api/loaiphong/search`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setRoomTypes(data);

      if (roomSectionRef.current) {
        roomSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Không thể tìm phòng. Vui lòng thử lại.");
    }
  };

  const onDetail = (id) => {
    navigate(`/room-types/${id}`, {state: {
      checkIn: filters.checkIn,
      checkOut: filters.checkOut
    }});
  };

  return (
    <div className="bg-background text-foreground font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      <section
        className="w-full mx-auto py-30 md:py-50 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hotel})` }}
      >
        {/* Overlay đen mờ để text dễ đọc */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Nội dung text - luôn nằm chính giữa */}
        <div className="relative z-10 px-6 sm:px-8 lg:mx-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight leading-tight text-white">
              Khách sạn Twan tại Hồ Tràm
            </h1>
            <p className="text-gray-300 mt-6 text-xl md:text-2xl leading-relaxed">
              Làm chậm nhịp sống hiện đại. Mở cánh cửa bước vào một kỳ quan của
              thế giới.
            </p>
          </div>
        </div>

        {/* SearchBar absolute - có thể tự do điều chỉnh vị trí */}
        <div className="absolute z-20 left-1/2 transform -translate-x-1/2 -bottom-10 w-full max-w-7xl lg:max-w-8xl px-6 sm:px-8">
          <SearchBar
            filters={filters}
            setFilters={setFilters}
            handleSearch={handleSearch}
          />
        </div>
      </section>
      <section className="max-w-4xl mx-auto sm:px-8 lg:mx-12 py-10 sm:py-15 md:py-20 text-left">
        <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-primary">
          Chọn phòng của bạn
        </h2>
      </section>

      <section
        ref={roomSectionRef}
        className="relative left-1/2 right-1/2 -mx-[50.51vw] w-screen overflow-hidden space-y-1"
      >
        {roomTypes && roomTypes.length > 0 ? (
          roomTypes.map((dto, index) => (
            <RoomTypeCard
              key={index}
              room={dto}
              onDetail={onDetail}
            />
          ))
        ) : (
          <div className="flex items-center justify-center p-10">
            <p className="text-2xl text-foreground/80">
              Hiện tại không có loại phòng phù hợp với bạn. Vui lòng chọn một
              loại phòng khác!!!
            </p>
          </div>
        )}
      </section>
      <section className="w-full flex items-center justify-between px-12 lg:px-24 py-16 md:py-24 text-left bg-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-primary">
            The Twan Spa
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Một dấu ấn đặc trưng trong trải nghiệm tại Twan Hotel, Twan Spa đưa
            tâm trí và cơ thể bạn bước vào những chiều không gian mới của sự
            bình yên và tái tạo năng lượng.
          </p>
        </div>

        <Button
          className="bg-chart-2/60 text-background font-medium uppercase py-3 px-10 text-sm tracking-wide rounded-md
               transition-all duration-300 ease-in-out
               hover:bg-chart-2 hover:scale-90 hover:shadow-md
               active:scale-95 cursor-pointer"
          onClick={() => navigate("/")}
        >
          View offers
        </Button>
      </section>

      <section className="relative left-1/2 right-1/2 -mx-[50.51vw] w-screen overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {roomPackages.map((pkg, index) => (
            <div
              key={index}
              className="relative group overflow-hidden h-[400px] md:h-[450px]"
            >
              {/* Ảnh nền */}
              <img
                src={pkg.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay tối */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500"></div>

              {/* Text nằm giữa ảnh */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                <h3 className="text-2xl md:text-3xl font-light leading-tight mb-3">
                  {pkg.title}
                </h3>
                <a
                  href="/"
                  className="text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:underline"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RoomTypes;
