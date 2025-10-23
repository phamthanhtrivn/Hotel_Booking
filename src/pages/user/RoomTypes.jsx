import { hotel, roomPackageDummyData, roomsDummyData, roomTypeOptionDummyData } from "@/assets/assets";
import RoomTypeCard from "@/components/common/RoomTypeCard";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomTypes = () => {
  const rooms = roomsDummyData;
  const roomTypeOptions = roomTypeOptionDummyData
  const roomPackages = roomPackageDummyData;

  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [filters, setFilters] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
    roomType: "Twin Bed",
  });
  const navigate = useNavigate();
  const roomSectionRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const result = rooms.filter((room) => {
      const guestMatch = room.soKhach === Number(filters.guests);

      const roomTypeLower = filters.roomType.toLowerCase();
      const typeMatch =
        room.tenLoaiPhong.toLowerCase().includes(roomTypeLower) ||
        room.loaiGiuong.toLowerCase().includes(roomTypeLower);

      return guestMatch && typeMatch;
    });

    setFilteredRooms(result);

    if (roomSectionRef.current) {
      roomSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onDetail = (id) => {
    navigate(`/room-types/${id}`);
  };
  return (
    <div className="font-sans bg-background text-foreground">
      <section className="w-full py-16 mx-auto text-left md:py-24">
        <div className="px-6 sm:px-8 lg:mx-12">
          <h1 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl text-primary">
            Khách sạn Twan tại Hồ Tràm
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Làm chậm nhịp sống hiện đại. Mở cánh cửa bước vào một kỳ quan của
            thế giới.
          </p>
        </div>
        <div className="flex flex-col gap-4 p-6 mt-10 shadow-lg bg-background rounded-xl md:flex-row md:items-center">
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-muted-foreground">
              Check-in
            </label>
            <input
              type="date"
              name="checkIn"
              onChange={handleChange}
              className="px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-chart-2"
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
              className="px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-chart-2"
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
              defaultValue={2}
              onChange={handleChange}
              className="px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-chart-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-muted-foreground">
              Loại phòng / giường
            </label>
            <select
              name="roomType"
              onChange={handleChange}
              className="px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-chart-2"
            >
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
        <img src={hotel} alt="" className="object-cover w-full h-screen" />
      </section>

      <section className="max-w-4xl px-6 py-16 mx-auto text-left sm:px-8 lg:mx-12 md:py-24">
        <h2 className="text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl text-primary">
          Hoà hợp với thiên nhiên
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
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
        {filteredRooms && filteredRooms.length > 0 ? filteredRooms.map((room, index) => (
          <RoomTypeCard key={index} room={room} onDetail={onDetail} />
        )) : (<div className="flex items-center justify-center p-10">
          <p className="text-2xl text-foreground/80">Hiện tại không có loại phòng phù hợp với bạn. Vui lòng chọn một loại phòng khác!!!</p>
        </div>)}
      </section>
      <section className="flex items-center justify-between w-full px-12 py-16 text-left bg-white lg:px-24 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl text-primary">
            The Twan Spa
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Một dấu ấn đặc trưng trong trải nghiệm tại Twan Hotel, Twan Spa đưa
            tâm trí và cơ thể bạn bước vào những chiều không gian mới của sự
            bình yên và tái tạo năng lượng.
          </p>
        </div>

        <Button
          className="px-10 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-300 ease-in-out rounded-md cursor-pointer bg-chart-2/60 text-background hover:bg-chart-2 hover:scale-90 hover:shadow-md active:scale-95"
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
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay tối */}
              <div className="absolute inset-0 transition-colors duration-500 bg-black/40 group-hover:bg-black/50"></div>

              {/* Text nằm giữa ảnh */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                <h3 className="mb-3 text-2xl font-light leading-tight md:text-3xl">
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
