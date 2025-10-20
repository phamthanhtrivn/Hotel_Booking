import { EllipsisVerticalIcon } from "lucide-react";
import React from "react";

const RoomStatus = ({ roomStatic }) => {
  return (
    <div className="bg-background p-6 rounded-xl shadow-sm">
      <h2 className="text-4xl font-semibold mb-4">Rooms</h2>
      <div className="flex flex-wrap gap-4">
        {roomStatic.map((room, index) => (
          <div
            key={index}
            className="bg-background/80 border border-foreground/40 p-4 rounded-xl flex-1"
          >
            <div className="flex justify-between items-start mb-2">
              {room.deals > 0 ? (
                <span className="text-xs font-semibold bg-chart-2/40 text-chart-2 px-2 py-1 rounded-md ">
                  {room.deals} Deals
                </span>
              ) : (
                <div />
              )}
              <button className="text-foreground/60 hover:text-foreground/70">
                <EllipsisVerticalIcon className="w-5 h-5"/>
              </button>
            </div>
            <h3 className="text-3xl font-semibold text-foreground/80">{room.tenLoaiPhong}</h3>
            <p>
              <span className="text-foreground/80 font-medium text-2xl">{room.occupied}</span>
              <span className="text-foreground/60 text-sm">/{room.total}</span>
            </p>
            <p className="text-2xl font-bold text-chart-2/80 mt-2">
              {room.gia.toLocaleString()} VNĐ<span className="text-sm font-normal text-foreground/60">/day</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomStatus;
