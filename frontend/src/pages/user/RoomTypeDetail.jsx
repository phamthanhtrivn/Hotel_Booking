import ImageSlider from "@/components/common/ImageSlide";
import { formatVND } from "@/helpers/currencyFormatter";
import { loaiGiuongService } from "@/services/loaiGiuongService";
import { loaiPhongService } from "@/services/loaiPhongService";
import { tienNghiService } from "@/services/tienNghiService";
import { LandPlotIcon } from "lucide-react";
import { IoIosResize, IoMdPeople, IoMdReturnLeft } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineSingleBed } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { BiSolidWalletAlt } from "react-icons/bi";
import { getStyledIcon, mainAmenityCodes } from "@/helpers/iconMapper";
import { danhGiaService } from "@/services/danhGiaService";
import { processReviews } from "@/helpers/reviewHelpers";
import TienNghiByCategory from "@/components/common/TienNghiByCategory";
import ReviewsList from "@/components/common/ReviewsList";
import { calculateNights } from "@/helpers/dateHelpers";
import { useSelector } from "react-redux";
import { FaChild } from "react-icons/fa6";

const OtherRoomsSlider = ({ otherRooms }) => {
  const navigate = useNavigate();
  const visibleCount = 3;
  const [startIndex, setStartIndex] = useState(0);

  const prev = () => setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  const next = () =>
    setStartIndex((prev) =>
      Math.min(prev + visibleCount, otherRooms.length - visibleCount)
    );
  const visibleRooms = otherRooms.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="w-full py-10 bg-background relative">
      <h2 className="text-4xl font-bold text-center mb-5">Other Rooms</h2>
      <p className="text-center text-lg text-gray-500 mb-5">
        Could also be interest for you
      </p>

      <div className="max-w-7xl mx-auto flex items-center relative">
        <button
          onClick={prev}
          disabled={startIndex === 0}
          className="absolute left-0 z-10 bg-gray-800 text-white p-3 rounded disabled:opacity-50"
        >
          &#8592;
        </button>

        <div className="flex overflow-hidden w-full">
          {visibleRooms.map((r, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/3 px-2 flex flex-col space-y-6"
            >
              <div
                onClick={() => navigate(`/room-types/${r.maLoaiPhong}`)}
                className="relative w-full group overflow-hidden cursor-pointer"
              >
                <img
                  src={r.hinhAnh[0]}
                  alt=""
                  className="w-full h-[30vh] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-foreground opacity-0 hover:opacity-40 transition-opacity duration-500 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="absolute w-[2px] h-0 bg-white transition-all duration-500 group-hover:h-12"></span>
                  <span className="absolute h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-12"></span>
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                <p className="text-2xl font-light tracking-widest">
                  {r.tenLoaiPhong}
                </p>
              </div>
              <div className="w-full flex flex-col">
                <div className="border border-t border-foreground/30"></div>
                <p className="text-sm font-light">
                  Great choice for a relaxing vacation for families with
                  children or a group of friends. Exercitation photo booth
                  stumptown tote bag Banksy, elit small...
                </p>
              </div>
              <div className="grid grid-cols-2 mb-10">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-sm font-light uppercase">Giá</p>
                  <p className="text-xl font-bold">{r.gia} VNĐ</p>
                </div>
                <div className="flex flex-col border-l border-foreground/30 items-center justify-center">
                  <a
                    href={`/room-types/${r.maLoaiPhong}`}
                    className="text-xl font-bold cursor-pointer underline underline-offset-4 hover:text-gray-600 transition"
                  >
                    View Detail
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={next}
          disabled={startIndex + visibleCount >= otherRooms.length}
          className="absolute right-0 z-10 bg-gray-800 text-white p-3 rounded disabled:opacity-50"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};
const RoomTypeDetail = () => {
  const { id } = useParams();
  const filters = useSelector((state) => state.roomSearch);
  const [room, setRoom] = useState({});
  const [bedTypes, setBedTypes] = useState([]);
  const { checkIn, checkOut } = filters;
  const [otherRooms, setOtherRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [reviewState, setReviewState] = useState({
    reviews: [],
    topReviews: [],
    rating: "",
    numOfReviews: 0,
    avgService: 0,
    avgClean: 0,
    avgFacilities: 0,
    avg: 0,
  });

  const navigate = useNavigate();

  const fetchLoaiGiuong = async () => {
    const result = await loaiGiuongService.findByLoaiPhong(id);
    setBedTypes(result.data);
  };

  const fetchReviews = async () => {
    const result = await danhGiaService.findByLoaiPhong(id);
    const processed = processReviews(result.data);
    setReviewState(processed);
  };

  const fetchAmenities = async () => {
    const result = await tienNghiService.findTienNghiByLoaiPhong(id);
    setAmenities(result.data);
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      setLoading(true);
      try {
        // Chạy tuần tự các API call
        const roomRes = await loaiPhongService.findById(id);
        setRoom(roomRes.data);

        const resAll = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/api/public/loaiphong`
        );

        if (!resAll.ok) throw new Error("Failed to fetch all rooms");
        const dataAll = await resAll.json();

        const others = dataAll
          .filter((r) => r.maLoaiPhong !== id)
          .map((r) => r);
        setOtherRooms(others);

        await fetchLoaiGiuong();
        await fetchAmenities();
        await fetchReviews();
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải dữ liệu phòng!");
        navigate("/room-types");
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData();
  }, [id, navigate]);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveTab(id);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleBookNow = () => {
    navigate(`/booking?room_type=${id}`);
  };
  if (loading) return <p className="text-center text-2xl mt-20">Loading...</p>;
  if (!room) return null;

  return (
    <div className="bg-background/90">
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <img
          src={room.hinhAnh[0]}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover brightness-[75%]"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-foreground opacity-30 z-10"></div>

        <div className="relative z-20 flex flex-col h-full text-muted">
          <div className="flex-grow w-[70vw] flex flex-col text-center justify-center gap-4">
            <h2 className="text-6xl font-thin tracking-wide">
              {room.tenLoaiPhong}
            </h2>
            <p className="text-lg font-[500px]">{room.moTa}</p>
          </div>

          <nav className="pb-40 flex items-center justify-center gap-10">
            {["detail", "amenities", "gallery", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleScroll(tab)}
                className={`uppercase tracking-widest font-medium text-sm transition-all ${
                  activeTab === tab
                    ? "text-[var(--color-accent)] pb-1 font-bold"
                    : "text-background hover:text-[var(--color-accent)]"
                }`}
              >
                {tab === "detail"
                  ? "chi tiết"
                  : tab === "amenities"
                  ? "tiện nghi"
                  : tab == "gallery"
                  ? "Hình ảnh"
                  : "Đánh giá"}
              </button>
            ))}
          </nav>
        </div>
      </section>
      <section id="detail" className="relative z-30 -mt-[140px]">
        <div className="bg-background max-w-[1350px] mx-auto px-8 py-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
            <div className="lg:col-span-1 px-5">
              <h2 className="tracking-widest uppercase mb-5">Đánh giá</h2>
              <div className="flex gap-3 items-center">
                <p className="font-bold text-2xl text-[var(--color-primary)]">
                  {reviewState.avg}
                </p>
                <p className="text-[var(--color-primary)] -ml-2">/10</p>
                <div>
                  <p className="font-[450]">{reviewState.rating}</p>
                  <p className="text-[var(--color-primary)] font-[600]">
                    {reviewState.numOfReviews} đánh giá
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-col gap-2">
                  <p className="font-[600]">Khách hàng nói gì?</p>
                  {reviewState.topReviews.map((r) => (
                    <div className="border rounded p-2" key={r.maDanhGia}>
                      <div className="flex justify-between">
                        <p className="font-[600] text-[14px]">
                          {r.hoTenKhachHang}
                        </p>
                        <p className="bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[12px] text-[var(--color-primary)] font-[600] p-1 rounded">
                          {r.diemTrungBinh} / 10
                        </p>
                      </div>
                      <p className="text-[14px] font-[500]">{r.binhLuan}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 md:border-l lg:border-l sm:border-0 border-foreground/30 px-5">
              <h2 className="tracking-widest uppercase mb-5">Tiện nghi</h2>
              <div className="flex flex-col gap-5">
                {amenities
                  .filter((a) => mainAmenityCodes.includes(a.maTienNghi))
                  .map((a) => (
                    <div
                      key={a.maTienNghi}
                      className="flex items-center space-x-2 gap-2"
                    >
                      {getStyledIcon(a.icon, {
                        size: "w-6 h-6",
                        color: "black",
                      })}
                      <span className="text-sm">{a.tenTienNghi}</span>
                    </div>
                  ))}
                <a
                  className="hover:underline hover:underline-1"
                  onClick={() => handleScroll("amenities")}
                >
                  Xem thêm
                </a>
              </div>
            </div>
            <div className="px-5 md:border-l lg:border-l sm:border-0 border-foreground/30 flex flex-col">
              <p className="tracking-widest uppercase mb-4">
                giá / {calculateNights(checkIn, checkOut)} đêm
              </p>
              <div className="flex flex-col gap-5">
                <p className="text-3xl text-center font-bold text-[var(--color-primary)]">
                  {formatVND(room.gia * calculateNights(checkIn, checkOut))}
                </p>
                <Button
                  onClick={handleBookNow}
                  className="bg-[var(--color-primary)] hover:cursor-pointer hover:bg-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] text-background w-full py-5 transition-colors duration-300 uppercase text-[18px] font-[600]"
                >
                  Đặt phòng
                </Button>
                <div className="grid grid-cols-2 gap-7">
                  <div className="flex items-center space-x-6">
                    <IoMdPeople size={35} className="stroke-1" />
                    <span className="text-[16px]">
                      Tối đa {room.soKhach} người lớn
                    </span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <FaChild size={35} />
                    <span className="text-[16px]">
                      Tối đa {room.soTreEm} trẻ em
                    </span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <IoIosResize size={35} />
                    <span className="text-[16px]">
                      Diện tích {room.dienTich} m²
                    </span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <MdOutlineSingleBed size={35} />
                    <span className="text-[16px]">
                      {bedTypes.map((b) => b.tenGiuong).join(", ")}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-6 border-t pt-3 border-foreground/30">
                  <div className="flex items-center space-x-6">
                    <IoMdReturnLeft size={30} />
                    <span className="text-[16px]">Chính sách hủy bỏ</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <BiSolidWalletAlt size={30} />
                    <span className="text-[16px]">Thanh toán trực tuyến</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="amenities"
        className="relative bg-[var(--color-background)] w-full overflow-hidden px-25 py-8"
      >
        <TienNghiByCategory tienNghiList={amenities} />
      </section>

      <section id="gallery" className="relative w-full overflow-hidden mt-2">
        <ImageSlider images={room?.hinhAnh || []} height="70vh" />
      </section>
      <section id="reviews" className="mx-20 px-5 py-8 shadow-2xl">
        <h2 className="text-xl uppercase">Đánh giá tổng thể</h2>
        <ReviewsList reviewsState={reviewState} />
      </section>
      <OtherRoomsSlider otherRooms={otherRooms} />
    </div>
  );
};

export default RoomTypeDetail;
