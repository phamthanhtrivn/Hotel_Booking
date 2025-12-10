import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { FaBuildingUser, FaMinus, FaPlus, FaUserTie } from "react-icons/fa6";
import { MdOutlineChildCare } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function GuestPicker({ value, onChange, popoverClassName }) {
  const [guests, setGuests] = useState(
    value || { adults: 2, children: [8] } // children = array tuổi
  );

  const updateAdults = (delta) => {
    setGuests((prev) => {
      const updated = { ...prev, adults: Math.max(0, prev.adults + delta) };
      onChange && onChange(updated);
      return updated;
    });
  };

  const updateChildren = (delta) => {
    setGuests((prev) => {
      let newChildren = [...prev.children];

      if (delta > 0) {
        newChildren.push(8); 
      } else if (delta < 0 && newChildren.length > 0) {
        newChildren.pop();
      }

      const updated = { ...prev, children: newChildren };
      onChange && onChange(updated);
      return updated;
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full border rounded-md px-3.5 py-1 cursor-pointer flex items-center justify-between">
          <div>
            <label className="font-medium text-xs text-gray-500">
              Khách hàng
            </label>
            <p className="font-medium">
              {guests.adults} người lớn, {guests.children.length} trẻ em
            </p>
          </div>
          <FaBuildingUser size={23} />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className={`w-80 p-4 space-y-4 ${popoverClassName || ""}`}
      >
        {/* Adults */}
        <div className="flex justify-between items-center">
          <div className="gap-2 items-center flex">
            <FaUserTie />
            <span className="font-medium">Người lớn</span>
          </div>

          <Counter value={guests.adults} onChange={updateAdults} />
        </div>

        {/* Children */}
        <div className="flex justify-between items-center">
          <div className="gap-2 items-center flex">
            <MdOutlineChildCare />
            <span className="font-medium">Trẻ em</span>
          </div>
          <Counter value={guests.children.length} onChange={updateChildren} />
        </div>

        {/* Input tuổi từng trẻ */}
        {guests.children.length > 0 && (
          <div>
            <p className="text-[14.5px] font-medium">Điền tuổi trẻ em</p>
            <p className="text-[13px]">
              Cho biết tuổi của trẻ em đi cùng giúp tôi dễ tìm phòng phù hợp cho
              bạn
            </p>
            <div className="space-y-2 mt-2 grid grid-cols-3 gap-2">
              {guests.children.map((age, index) => {
                // Tạo mảng option từ "<1 tuổi", 1-8
                const ageOptions = [
                  ...Array.from({ length: 15 }, (_, i) => i),
                ];

                return (
                  <div key={index} className="flex flex-col gap-2">
                    <span className="w-20 text-[14px]">
                      Trẻ em {index + 1}:
                    </span>
                    <Select
                      value={age?.toString() || "8"}
                      onValueChange={(val) => {
                        const newAge = parseInt(val);
                        const newChildren = [...guests.children];
                        newChildren[index] = newAge;

                        const updated = { ...guests, children: newChildren };

                        setGuests(updated);
                        onChange && onChange(updated);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tuổi</SelectLabel>
                          {ageOptions.map((a) => (
                            <SelectItem key={a} value={a.toString()}>
                              {`${a} tuổi`}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

/* Counter component */
function Counter({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(-1)}
        disabled={value === 0}
        className="
          w-10 h-10 border rounded 
          hover:bg-gray-100 
          transition
          disabled:opacity-50 
          disabled:cursor-not-allowed
          disabled:hover:bg-transparent justify-center flex items-center"
      >
        <FaMinus
          size={13}
          className={`text-[var(${
            value == 0 ? "--color-muted" : "--color-primary"
          })]`}
        />
      </button>

      <span className="w-10 h-10 border rounded justify-center flex items-center font-medium">
        {value}
      </span>

      <button
        onClick={() => onChange(1)}
        className="
           w-10 h-10 border rounded justify-center flex items-center
          hover:bg-gray-100 
          hover:cursor-pointer
          transition
        "
      >
        <FaPlus size={13} className="text-(--color-primary)" />
      </button>
    </div>
  );
}
