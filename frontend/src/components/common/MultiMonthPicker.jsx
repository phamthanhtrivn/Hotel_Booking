import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function MultiMonthPicker({ selectedMonths, setSelectedMonths }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const exists = selectedMonths.some(m => m.month === month && m.year === year);

    if (exists) {
      setSelectedMonths(selectedMonths.filter(m => !(m.month === month && m.year === year)));
    } else {
      setSelectedMonths([...selectedMonths, { month, year }]);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border px-4 py-2 rounded-md bg-background text-foreground hover:bg-foreground/10 transition"
      >
        <CalendarIcon className="w-5 h-5" />
        {selectedMonths.length > 0
          ? selectedMonths.map(m => `${m.year}-${String(m.month).padStart(2, "0")}`).join(", ")
          : "Select months"}
      </button>

      {open && (
        <div className="absolute z-50 bg-background border rounded-lg p-2 mt-2 shadow-lg">
          <DayPicker
            mode="multiple"
            selected={selectedMonths.map(m => new Date(m.year, m.month - 1, 1))}
            onDayClick={handleSelect}
            showOutsideDays
            captionLayout="dropdown"
            fromYear={2020}
            toYear={2030}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setSelectedMonths([])}
              className="text-sm text-red-500 hover:underline"
            >
              Clear
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-blue-500 hover:underline"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
