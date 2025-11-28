import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import AdminPagination from "@/components/common/AdminPagination";
import AdminTable from "@/components/common/AdminTable";
import { useEffect, useState } from "react";
import axios from "axios";
import ActionButtons from "@/components/common/ActionButtons";
import DetailDialog from "@/components/common/DetailDialog";

export default function BookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);

    const fetchAllBookings = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/api/dondatphong?page=${currentPage - 1}`
            );

            console.log("Fetched bookings:", res.data);

            setBookings(res.data.content);
            
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDetail = (item) => {
        console.log("Viewing details for booking:", item);
        setCurrentBooking(item);
        setIsOpenDetail(true);
    }

    useEffect(() => {
        fetchAllBookings();
    }, [currentPage]);


    const columns = [
        { key: "maDatPhong", label: "ID" },
        { key: "hoTenKhachHang", label: "Họ và tên" },
        { key: "soDienThoai", label: "Số điện thoại" },
        { key: "email", label: "Email" },
        { key: "tongTienTT", label: "Tổng tiền" },
        { key: "trangThai", label: "Trạng thái" },
    ]

    return (
        <div className="p-6 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Quản Lý Đơn Đặt Phòng
                    </CardTitle>
                </CardHeader>


                <CardContent>
                    <AdminTable
                        data={bookings}
                        columns={columns}
                        renderActions={(item) => (
                            <ActionButtons onView={() => handleDetail(item)} />
                        )}
                    />
                </CardContent>
            </Card>

            <DetailDialog
                open={isOpenDetail}
                onClose={() => setIsOpenDetail(false)}
                data={currentBooking}
                fields={[
                    ...columns,
                    { key: "checkIn", label: "Check In" },
                    { key: "checkOut", label: "Check Out" },
                    { key: "ghiChu", label: "Ghi Chú" },
                ]}
            />


            {/* PAGINATION */}
            <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={(p) => {setCurrentPage(p);}}
            />
        </div>
    );
}