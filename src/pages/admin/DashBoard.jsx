import {
  feedbackDummyData,
  floorStatusDummyData,
  occupancyStatistic,
  overviewDummyData,
  revenueDummyData,
  roomStaticDummyData,
} from "@/assets/assets";
import CustomerFeedback from "@/components/common/CustomerFeedback";
import FloorStatus from "@/components/common/FloorStatus";
import OccupancyStatistics from "@/components/common/OccupancyStatistics";
import Overview from "@/components/common/Overview";
import RevenueStatistics from "@/components/common/RevenueStatistics";
import RoomStatus from "@/components/common/RoomStatus";
import React from "react";

const DashBoard = () => {
  const overviewData = overviewDummyData;
  const roomStatic = roomStaticDummyData;
  const floorStatus = floorStatusDummyData;
  const occupancyData = occupancyStatistic;
  const feedbackData = feedbackDummyData;
  const revenueData = revenueDummyData
  return (
    <div className="flex flex-col p-5 space-y-6 bg-foreground/10">
      <Overview overviewData={overviewData} />
      <RoomStatus roomStatic={roomStatic} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="flex flex-col space-y-6 md:col-span-3">
           <FloorStatus floorStatus={floorStatus} />
          <OccupancyStatistics occupancyData={occupancyData} />
          <RevenueStatistics revenueData={revenueData}/>
        </div>
        <div className="md:col-span-2">
         <CustomerFeedback feedbackData={feedbackData} />
        </div>
      </div>
      
    </div>
  );
};

export default DashBoard;
