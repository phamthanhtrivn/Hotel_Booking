import { useEffect, useRef, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import GuestPicker from "./GuestPicker";
import {
  RoomSelectTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/store/roomSearchSlice";

export default function SearchBar({ handleSearch }) {
  const filters = useSelector((state) => state.roomSearch);
  const dispatch = useDispatch();

  const [range, setRange] = useState({
    startDate: new Date(filters.checkIn),
    endDate: new Date(filters.checkOut),
    key: "selection",
  });

  const [guestData, setGuestData] = useState({
    adults: filters.guests ?? 2,
    children: filters.children ?? [],
  });

  const [selectedRoomType, setSelectedRoomType] = useState(filters.roomType);

  const [openCalendar, setOpenCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setOpenCalendar(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const applySearch = () => {
    const payload = {
      checkIn: range.startDate.toISOString(),
      checkOut: range.endDate.toISOString(),
      guests: guestData.adults,
      children: guestData.children,
      roomType: selectedRoomType,
    };

    dispatch(setFilters(payload));
    handleSearch(payload);
  };

  return (
    <div className="relative bg-white p-2 w-full border rounded-md flex flex-col md:flex-row gap-2 items-center">
      {/* Date picker */}
      <div className="relative w-full">
        <div
          onClick={() => setOpenCalendar(!openCalendar)}
          className="border rounded-md px-3.5 py-1 cursor-pointer flex items-center justify-between"
        >
          <div>
            <label className="font-medium text-xs text-gray-500">
              Check-in / Check-out
            </label>
            <p className="font-medium">
              {range.startDate.toLocaleDateString("vi-VN")} –{" "}
              {range.endDate.toLocaleDateString("vi-VN")}
            </p>
          </div>
          <FaRegCalendarAlt size={23} />
        </div>

        {openCalendar && (
          <div
            ref={calendarRef}
            className="absolute z-50 mt-2 shadow-lg rounded overflow-hidden"
          >
            <DateRange
              ranges={[range]}
              onChange={(item) => setRange(item.selection)}
              months={2}
              editableDateInputs={true}
              direction="horizontal"
              rangeColors={["var(--color-primary)"]}
              minDate={new Date()}
            />
          </div>
        )}
      </div>

      {/* GuestPicker */}
      <div className="relative w-full">
        <GuestPicker
          value={guestData}
          onChange={(val) => setGuestData(val)}
          popoverClassName="ml-2"
        />
      </div>

      {/* Room type */}
      <div className="relative w-full">
        <Select
          value={selectedRoomType}
          onValueChange={(val) => setSelectedRoomType(val)}
        >
          <RoomSelectTrigger className="h-[59px] cursor-pointer">
            <div className="w-full flex flex-col items-start">
              <label className="font-medium text-xs text-gray-500">
                Loại phòng
              </label>
              <p className="font-medium">
                {selectedRoomType !== "ALL"
                  ? selectedRoomType
                  : "Tất cả loại phòng"}
              </p>
            </div>
          </RoomSelectTrigger>

          <SelectContent>
            <SelectGroup>
              {["ALL", "Standard", "Delux", "Suite", "Family"].map((room) => (
                <SelectItem key={room} value={room}>
                  {room === "ALL" ? "Tất cả loại phòng" : room}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Search button */}
      <Button
        className="h-[59px] font-semibold hover:font-bold
        hover:bg-(--color-accent) bg-(--color-primary)
        sm:w-full md:w-[200px] hover:cursor-pointer"
        onClick={applySearch}
      >
        Tìm phòng
      </Button>
    </div>
  );
}
