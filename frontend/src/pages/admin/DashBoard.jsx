import React, { useEffect, useState } from "react";
import CustomerFeedback from "@/components/common/CustomerFeedback";
import FloorStatus from "@/components/common/FloorStatus";
import OccupancyStatistics from "@/components/common/OccupancyStatistics";
import Overview from "@/components/common/Overview";
import RevenueStatistics from "@/components/common/RevenueStatistics";
import RoomStatus from "@/components/common/RoomStatus";
import { getDashboardData } from "@/services/dashboardService";

const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError("Không thể tải dữ liệu từ máy chủ");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-slate-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
        <span className="mt-4 text-lg font-medium">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Lỗi: {error}
      </div>
    );
  }

  const {
    overviewData,
    roomStaticData,
    floorStatus,
    occupancyStatistic,
    feedbackData,
    revenueData,
  } = dashboardData;

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Tổng quan
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Báo cáo hiệu suất kinh doanh khách sạn
            </p>
          </div>
        </div>

        <Overview overviewData={overviewData} />

        <RoomStatus roomStatic={roomStaticData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <FloorStatus floorStatus={floorStatus} />
            {occupancyStatistic && (
              <OccupancyStatistics occupancyData={occupancyStatistic} />
            )}
            {revenueData && <RevenueStatistics revenueData={revenueData} />}
          </div>

          <div className="lg:col-span-1 sticky top-6">
            <CustomerFeedback feedbackData={feedbackData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
