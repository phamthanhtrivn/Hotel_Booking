import { roomsDummyData } from "@/assets/assets";
import ImageSlider from "@/components/common/ImageSlide";
import ImageSlide from "@/components/common/ImageSlide";
import {
  BedDoubleIcon,
  BedIcon,
  ChevronLeft,
  ChevronRight,
  ConciergeBellIcon,
  DoorOpenIcon,
  Grid2X2X,
  LandPlotIcon,
  UserRound,
  UserRoundIcon,
  UsersIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const amenities = [
  "40-inch Samsung® LED TV",
  "Electronic safe with charging facility",
  "iHome™ Bluetooth MP3 Player",
  "Iron and ironing board",
  "Mini bar",
  "Non-smoking",
  "USB charging station",
  <>
    Wired and wireless broadband
    <br />
    Internet access
  </>,
  "Work desk",
];

const services = [
  "Free-to-use smartphone (Free)",
  "Safe-deposit box (Free)",
  "Luggage storage (Free)",
  "Childcare ($60 / Once / Per Accommodation)",
  "Massage ($15 / Once / Per Guest)",
];

const ListItem = ({ item }) => {
  return (
    <li className="flex items-start text-gray-300 text-base font-light">
      <span className="text-gray-400 mr-5 mt-1 text-sm">&gt;</span>
      <span className="flex-1 leading-snug">{item}</span>
    </li>
  );
};
const RoomTypeDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [otherRooms, setOtherRooms] = useState([]);

  const [activeTab, setActiveTab] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    const foundRoom = roomsDummyData.find((r) => r.maLoaiPhong === id);
    const filOtherRooms = roomsDummyData.filter((r) => r.maLoaiPhong !== id);
    setOtherRooms(filOtherRooms);
    setRoom(foundRoom);
  }, [id]);

  if (!room) return <p>Loading...</p>;

  return (
    <div className="bg-background/90">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <img
          src={room.hinhAnh[0]}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-foreground opacity-30 z-10"></div>
        <div className="relative z-20 flex flex-col h-full text-muted">
          <div className="flex-grow flex flex-col text-center justify-center">
            <h2 className="text-8xl font-thin tracking-wide">
              {room.tenLoaiPhong}
            </h2>
            <p className="mt-4 text-xl font-light tracking-[0.3em]">
              {room.moTa}
            </p>
          </div>
          <nav className="pb-40 flex items-center justify-center gap-10">
            {["detail", "amenities", "gallery"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleScroll(tab)}
                className={`uppercase tracking-widest font-medium text-sm transition-all ${
                  activeTab === tab
                    ? "text-foreground/70 pb-1"
                    : "text-background hover:text-foreground/70"
                }`}
              >
                {tab === "detail"
                  ? "DETAIL"
                  : tab === "amenities"
                  ? "AMENITIES & SERVICES"
                  : "GALLERY"}
              </button>
            ))}
          </nav>
        </div>
      </section>
      <section id="detail" className="relative z-30 -mt-[18vh]">
        <div className="bg-background max-w-7xl mx-auto px-8 py-24 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-light text-foreground leading-relaxed">
                Great choice for a relaxing vacation for families with children
                or a group of friends.
              </h2>
              <div className="space-y-6 text-foreground/80 font-light leading-relaxed">
                <p>
                  Exercitation photo booth stumptown tote bag Banksy, elit small
                  batch freegan sed. Craft beer elit seitan exercitation, photo
                  booth et 8-bit kale chips proident chillwave deep v laborum.
                  Aliquip veniam delectus, Marfa eiusmod Pinterest in do umami
                  readymade swag. Selfies iPhone Kickstarter, drinking vinegar
                  jean vinegar stumptown yr pop-up artisan.
                </p>
                <p>
                  See-through delicate embroidered organza blue lining luxury
                  acetate-mix stretch pleat detailing. Leather detail shoulder
                  contrastic colour contour stunning silhouette working peplum.
                  Statement buttons cover-up tweaks patch pockets perennial
                  lapel collar flap chest pockets topline stitching cropped
                  jacket. Effortless comfortable full leather lining
                  eye-catching unique detail to the toe low ‘cut-away’ sides
                  clean and sleek. Polished finish elegant court shoe work duty
                  stretchy slingback strap mid kitten heel this ladylike design
                  slingback strap mid kitten heel this ladylike design.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer vel molestie nisl. Duis ac mi leo. Mauris at convallis
                  erat. Aliquam interdum semper luctus. Aenean ex tellus,
                  gravida ut rutrum dignissim, malesuada vitae nulla. Sed
                  viverra, nisl dapibus lobortis porttitor.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="top-24 sticky">
                <div className="pl-8 border-l border-foreground/30">
                  <p className="text-xl tracking-widest text-foreground uppercase">
                    giá
                  </p>
                  <p className="text-4xl text-center font-bold my-2 text-foreground">
                    {room.gia} VNĐ
                  </p>
                  <button className="bg-chart-2/60 text-background hover:bg-chart-2 w-full my-3 mt-4 transition-colors duration-300 uppercase p-4 text-xl">
                    book now
                  </button>
                  <div className="mt-12 space-y-6">
                    <div className="flex items-center space-x-6">
                      <BedDoubleIcon className="w-16 h-16" />
                      <span className="text-xl">{room.loaiGiuong}</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <UsersIcon className="w-16 h-16" />
                      <span className="text-xl">{room.soKhach} Người</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <Grid2X2X className="w-16 h-16" />
                      <span className="text-xl">{room.dienTich} m²</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <LandPlotIcon className="w-16 h-16" />
                      <span className="text-xl">View biển</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="amenities"
        className="relative bg-foreground w-full overflow-hidden p-15"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 text-background gap-5">
          <div>
            <div className="flex items-center mb-8">
              <DoorOpenIcon className="w-12 h-12" />
              <span>Amenities</span>
            </div>
          </div>
          <div>
            <ul className="space-y-5">
              {amenities.map((item, index) => (
                <ListItem key={index} item={item} />
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center mb-8">
              <ConciergeBellIcon className="w-12 h-12" />
              <span>Services</span>
            </div>
          </div>
          <div>
            <ul className="space-y-5">
              {services.map((item, index) => (
                <ListItem key={index} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section id="gallery" className="relative w-full overflow-hidden mt-2">
        <ImageSlider
          images={room?.hinhAnh || []}
          visibleCount={3}
          height="70vh"
        />
      </section>
      <section className="w-full flex flex-col items-center justify-center gap-5 p-20">
        <h2 className="text-6xl font-bold text-foreground">Other Rooms</h2>
        <p className="text-2xl font-light text-foreground/80">
          Could also be interest for you
        </p>
      </section>
      <section className="w-full">
        <div className="bg-background max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {otherRooms.map((r, index) => (
            <div key={index} className="flex flex-col space-y-6">
              <div
                onClick={() => navigate(`/room-types/${r.maLoaiPhong}`)}
                className="relative w-full group overflow-hidden"
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
      </section>
    </div>
  );
};

export default RoomTypeDetail;
