import ImageSlider from "@/components/common/ImageSlide";
import { formatVND } from "@/helpers/currencyFormatter";
import { loaiGiuongService } from "@/services/loaiGiuongService";
import { loaiPhongService } from "@/services/loaiPhongService";
import { tienNghiService } from "@/services/tienNghiService";
import { IoIosResize, IoMdPeople, IoMdReturnLeft } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineSingleBed } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { BiSolidWalletAlt } from "react-icons/bi";
import { getStyledIcon, mainAmenityCodes } from "@/helpers/iconMapper";
import { danhGiaService } from "@/services/danhGiaService";
import TienNghiByCategory from "@/components/common/TienNghiByCategory";
import ReviewsList from "@/components/common/ReviewsList";
import { calculateNights, toLocalDate } from "@/helpers/dateHelpers";
import { useSelector } from "react-redux";
import { FaChild } from "react-icons/fa6";
import { calculateAverage } from "@/helpers/numberFormatter";
import InformationDialog from "@/components/common/InformationDialog";
import axios from "axios";

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
  const showButtons = otherRooms.length > visibleCount;

  return (
    <section className="w-full py-10 bg-background relative">
      <h2 className="text-4xl font-bold text-center mb-5">Other Rooms</h2>
      <p className="text-center text-lg text-gray-500 mb-5">
        Could also be interest for you
      </p>

      <div className="max-w-7xl mx-auto flex items-center relative">
        {/* PREV BUTTON */}
        {showButtons && (
          <button
            onClick={prev}
            disabled={startIndex === 0}
            className="absolute left-0 z-10 bg-gray-800 text-white p-3 rounded disabled:opacity-50"
          >
            &#8592;
          </button>
        )}

        <div className="flex overflow-hidden w-full">
          {visibleRooms.map((r, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/3 px-2 flex flex-col space-y-6 h-[430px]"
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
              </div>

              <div className="flex w-full items-center justify-center">
                <p className="text-2xl font-light tracking-widest">
                  {r.tenLoaiPhong}
                </p>
              </div>

              <div className="w-full flex flex-col">
                <div className="border border-t border-foreground/30"></div>
                <p className="text-sm font-light line-clamp-3">{r.moTa}</p>
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

        {/* NEXT BUTTON */}
        {showButtons && (
          <button
            onClick={next}
            disabled={startIndex + visibleCount >= otherRooms.length}
            className="absolute right-0 z-10 bg-gray-800 text-white p-3 rounded disabled:opacity-50"
          >
            &#8594;
          </button>
        )}
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
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [totalReviewPages, setTotalReviewPages] = useState(0);
  const [chinhSachHuyDialog, setOpenQuyDinh] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({
    topReviews: [],
    rating: "",
    numOfReviews: 0,
    avgService: 0,
    avgClean: 0,
    avgFacilities: 0,
    avg: 0,
  });

  const navigate = useNavigate();

  const handleSearch = async (currentFilters) => {
    try {
      const body = {
        checkIn: toLocalDate(new Date(currentFilters.checkIn)),
        checkOut: toLocalDate(new Date(currentFilters.checkOut)),

        soKhach: currentFilters.guests || null,
        tenLoaiPhong: currentFilters.roomType || null,
        treEm: currentFilters.children,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/public/loaiphong/search`,
        body
      );

      console.log(response);
      setOtherRooms(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tìm phòng. Vui lòng thử lại.");
    }
  };

  const fetchLoaiGiuong = async () => {
    const result = await loaiGiuongService.findByLoaiPhong(id);
    setBedTypes(result.data);
  };

  const fetchReviews = async () => {
    const res1 = await danhGiaService.findByLoaiPhong(
      id,
      currentReviewPage - 1,
      8
    );
    const res2 = await danhGiaService.getReviewStats(id);

    setReviewStats(res2);
    setTotalReviewPages(res1.data.totalPages);
    setReviews(res1.data.content);
  };

  const fetchAmenities = async () => {
    const result = await tienNghiService.findTienNghiByLoaiPhong(id);
    setAmenities(result.data);
  };

  useEffect(() => {
    fetchReviews();
    handleSearch(filters);
  }, [currentReviewPage]);

  useEffect(() => {
    const fetchRoomData = async () => {
      setLoading(true);
      try {
        // Chạy tuần tự các API call
        const roomRes = await loaiPhongService.findById(id);
        setRoom(roomRes.data);

        await fetchLoaiGiuong();
        await fetchAmenities();
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
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-foreground opacity-30 z-10"></div>

        <div className="relative z-20 flex flex-col h-full text-muted">
          <div className="grow w-[70vw] flex flex-col text-center justify-center gap-4">
            <h2 className="text-6xl font-thin tracking-wide">
              {room.tenLoaiPhong}
            </h2>
            <p className="text-lg">{room.moTa}</p>
          </div>

          <nav className="pb-40 flex items-center justify-center gap-10">
            {["detail", "amenities", "gallery", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleScroll(tab)}
                className={`uppercase tracking-widest font-medium text-sm transition-all hover:cursor-pointer ${
                  activeTab === tab
                    ? "text-(--color-accent) pb-1 font-bold"
                    : "text-background hover:text-(--color-accent)"
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
            <div className="lg:col-span-1 px-5 max-h-[360px] overflow-hidden flex flex-col">
              <h2 className="tracking-widest uppercase mb-5">Đánh giá</h2>

              <div className="flex gap-3 items-center">
                <p className="font-bold text-2xl text-(--color-primary)">
                  {reviewStats.avg.toFixed(1)}
                </p>
                <p className="text-(--color-primary) -ml-2">/10</p>
                <div className="w-full">
                  <p className="font-[450]">{reviewStats.rating}</p>
                  <div className="flex justify-between w-full">
                    <p
                      className="text-(--color-primary) font-semibold hover:underline hover:cursor-pointer hover:underline-1"
                      onClick={() => handleScroll("reviews")}
                    >
                      {reviewStats.numOfReviews} đánh giá {">"}
                    </p>
                    <a
                      className="hover:underline hover:cursor-pointer hover:underline-1 text-sm"
                      onClick={() => handleScroll("reviews")}
                    >
                      Xem thêm
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 flex-1 overflow-y-auto pr-1">
                <p className="font-semibold">Khách hàng nói gì?</p>

                <div className="flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar">
                  {reviewStats.topReviews.map((r) => (
                    <div className="border rounded p-2" key={r.maDanhGia}>
                      <div className="flex justify-between">
                        <p className="font-semibold text-[14px]">
                          {r.hoTenKhachHang}
                        </p>
                        <p className="bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[12px] text-(--color-primary) font-semibold p-1 rounded">
                          {calculateAverage([
                            r.diemSachSe,
                            r.diemDichVu,
                            r.DiemCoSoVatChat,
                          ]).toFixed(1)}{" "}
                          / 10
                        </p>
                      </div>
                      <p className="text-[14px] font-medium">{r.binhLuan}</p>
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
                        size: "w-5 h-5",
                        color: "black",
                      })}
                      <span className="text-sm">{a.tenTienNghi}</span>
                    </div>
                  ))}
                <a
                  className="hover:underline hover:cursor-pointer hover:underline-1 text-sm"
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
                <p className="text-3xl text-center font-bold text-(--color-primary)">
                  {formatVND(room.gia * calculateNights(checkIn, checkOut))}
                </p>
                <Button
                  onClick={handleBookNow}
                  className="bg-(--color-primary) hover:cursor-pointer hover:bg-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] text-background w-full py-5 transition-colors duration-300 uppercase text-[18px] font-semibold"
                >
                  Đặt phòng
                </Button>
                <div className="grid grid-cols-2 gap-7">
                  <div className="flex items-center space-x-6">
                    <IoMdPeople size={25} className="stroke-1" />
                    <span className="text-[15px]">
                      Tối đa {room.soKhach} người lớn
                    </span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <FaChild size={25} />
                    <span className="text-[15px]">
                      Tối đa {room.soTreEm} trẻ em
                    </span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <IoIosResize size={25} />
                    <span className="text-[15px]">
                      Diện tích {room.dienTich} m²
                    </span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <MdOutlineSingleBed size={25} />
                    <span className="text-[15px]">
                      {bedTypes.map((b) => b.tenGiuong).join(", ")}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-6 border-t pt-3 border-foreground/30">
                  <div className="flex items-center space-x-6">
                    <IoMdReturnLeft size={25} />
                    <span
                      onClick={() => setOpenQuyDinh(true)}
                      className="text-[15px] hover:underline hover:cursor-pointer hover:underline-1"
                    >
                      Chính sách hủy phòng
                    </span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <BiSolidWalletAlt size={25} />
                    <span className="text-[15px]">Thanh toán trực tuyến</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="amenities"
        className="relative bg-(--color-background) w-full overflow-hidden px-25 py-8"
      >
        <TienNghiByCategory tienNghiList={amenities} />
      </section>

      <section id="gallery" className="relative w-full overflow-hidden mt-2">
        <ImageSlider images={room?.hinhAnh || []} height="70vh" />
      </section>
      <section id="reviews" className="mx-20 px-5 py-8 shadow-2xl">
        <h2 className="text-xl uppercase">Đánh giá tổng thể</h2>
        <ReviewsList
          onChange={setCurrentReviewPage}
          reviews={reviews}
          reviewsStats={reviewStats}
          totalPages={totalReviewPages}
          currentPage={currentReviewPage}
        />
      </section>
      <OtherRoomsSlider otherRooms={otherRooms} />
      <InformationDialog
        title={"Chính sách hủy phòng"}
        children={
          <div className="flex flex-col gap-2">
            <p>
              Thời gian hủy phải trước thời gian checkin tối thiểu 24h, sau thời
              gian đó mọi yêu cầu không được giải quyết.
            </p>
            <p>
              Khách hàng không đến vì một lý do nào đó phải chịu mất tiền cọc.
            </p>
          </div>
        }
        open={chinhSachHuyDialog}
        onClose={() => setOpenQuyDinh(false)}
      />
    </div>
  );
};

export default RoomTypeDetail;
