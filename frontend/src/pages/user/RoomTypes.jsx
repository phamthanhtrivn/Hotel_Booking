import {
  hotel,
  roomPackageDummyData,

} from "@/assets/assets";
import RoomTypeCard from "@/components/common/RoomTypeCard";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const roomPackages = roomPackageDummyData;

const RoomTypes = () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomTypeOptions, setRoomTypeOptions] = useState([]);
  const [filters, setFilters] = useState({
    checkIn: "",
    checkOut: "",
    guests: 0,
    roomType: "",
  });
  const navigate = useNavigate();
  const roomSectionRef = useRef(null);

  const fetchRoomTypes = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/loaiphong`);
      if (!response.ok) throw new Error("Failed to fetch room types");
      const data = await response.json();
      setRoomTypes(data);
      const options = [
        ...new Set(data.map((dto) => dto.loaiPhong.tenLoaiPhong)),
      ];
      setRoomTypeOptions(options);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const body = {
        checkIn: filters.checkIn
          ? new Date(filters.checkIn).toISOString()
          : null,
        checkOut: filters.checkOut
          ? new Date(filters.checkOut).toISOString()
          : null,
        soKhach: filters.guests || null,
        tenLoaiPhong: filters.roomType || null,
        minGia: null,
        maxGia: null,
        minDienTich: null,
        maxDienTich: null,
        maGiuong: null,
      };

      const response = await fetch(
        "http://localhost:8080/api/loaiphong/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();

      setRoomTypes(data);

      setFilters({
        checkIn: "",
        checkOut: "",
        guests: 0,
        roomType: "",
      });
      if (roomSectionRef.current) {
        roomSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
      alert("Không thể tìm phòng. Vui lòng thử lại.");
    }
  };

  const onDetail = (id) => {
    navigate(`/room-types/${id}`);
  };
  return (
    <div className="bg-background text-foreground font-sans">
      <section className="w-full mx-auto py-16 md:py-24 text-left">
        <div className="px-6 sm:px-8 lg:mx-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-primary">
            Khách sạn Twan tại Hồ Tràm
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Làm chậm nhịp sống hiện đại. Mở cánh cửa bước vào một kỳ quan của
            thế giới.
          </p>
        </div>
        <div className="mt-10 bg-background shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-muted-foreground">
              Check-in
            </label>
            <input
              type="date"
              name="checkIn"
              onChange={handleChange}
              className="mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chart-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-muted-foreground">
              Check-out
            </label>
            <input
              type="date"
              name="checkOut"
              onChange={handleChange}
              className="mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chart-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-muted-foreground">
              Số khách
            </label>
            <input
              type="number"
              min="1"
              name="guests"
              onChange={handleChange}
              className="mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chart-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-muted-foreground">
              Loại phòng / giường
            </label>
            <select
              name="roomType"
              onChange={handleChange}
              className="mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chart-2"
            >
              <option value="">Chọn loại phòng</option>
              {roomTypeOptions.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="w-full md:w-auto h-[48px] p-5 flex items-center justify-center bg-chart-2 text-background text-sm rounded-2xl hover:bg-chart-2/90 transition"
          >
            Tìm phòng
          </button>
        </div>
      </section>
      <section className="relative left-1/2 right-1/2 -mx-[50.51vw] w-screen overflow-hidden">
        <img src={hotel} alt="" className="w-full h-screen object-cover" />
      </section>

      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:mx-12 py-16 md:py-24 text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-primary">
          Hoà hợp với thiên nhiên
        </h2>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          Bức ảnh phòng chụp phong cách “photo booth” mang hơi hướng nghệ thuật
          đường phố của Banksy, phong cách tinh tế, thủ công và độc đáo. Bia thủ
          công hảo hạng kết hợp với seitan (món chay từ gluten), ảnh phòng chụp
          và khoai kale chiên 8-bit tạo nên một trải nghiệm “chillwave” phóng
          khoáng, mang đậm tinh thần tự do và sáng tạo.
        </p>
      </section>

      <section
        ref={roomSectionRef}
        className="relative left-1/2 right-1/2 -mx-[50.51vw] w-screen overflow-hidden space-y-1"
      >
        {roomTypes && roomTypes.length > 0 ? (
          roomTypes.map((dto, index) => (
            <RoomTypeCard
              key={index}
              room={{ ...dto.loaiPhong, soPhongTrong: dto.soPhongTrong }}
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
