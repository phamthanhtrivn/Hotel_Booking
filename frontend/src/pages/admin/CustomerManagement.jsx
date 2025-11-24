/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import AdminPagination from "@/components/common/AdminPagination";
import AdminTable from "@/components/common/AdminTable";
import DetailDialog from "@/components/common/DetailDialog";
import EditCreateDialog from "@/components/common/EditCreateDialog";
import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog";
import ActionButtons from "@/components/common/ActionButtons";
import { Search } from "lucide-react";

export default function CustomerManagement() {
    const baseURL = import.meta.env.VITE_BASE_API_URL + "/api/";
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { get, put, del } = useFetch(baseURL);
    const [openDelete, setOpenDelete] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [fliter, setFliter] = useState({
        keyword: '',
        trangThai: '',
        sortField: '',
    });


    const fetchCustomers = async () => {
        let params = `?page=${currentPage - 1}`;
        if( fliter.keyword !== ''){
            params += `&keyword=${fliter.keyword}`;
        }
        if(fliter.trangThai != '' && fliter.trangThai !== 'all'){
            params += `&trangThai=${fliter.trangThai}`;
        }
        if(fliter.sortField != ''){
            const [field, dir] = fliter.sortField.split('&');
            params += `&sortField=${field}&sortDir=${dir}`;
        }
        console.log("params", params);
        const data = await get("khachhang" + params);
        if (data?.content){
            setCustomers(data.content);
            setTotalPages(data.totalPages);
        } 
    };



    useEffect(() => {
        fetchCustomers();
    }, []);


    const columns = [
        { key: "maTaiKhoan", label: "ID" },
        {
            key: "hoTen",
            label: "Họ và tên",
            render: (item) => item?.khachHang?.hoTenKH ? item.khachHang.hoTenKH : ''
        },
        {
            key: "soDienThoai",
            label: "Số điện thoại",
            render: (item) => item?.khachHang?.soDienThoai ? item.khachHang.soDienThoai : ''
        },
        {
            key: "diemTichLuyKH",
            label: "Điểm tích lũy",
            render: (item) =>
                item?.khachHang?.diemTichLuy ?? 0
        },
        {
            key: "email",
            label: "Email",
        },
        {
            key: "trangThai",
            label: "Trạng thái",
            render: (item) => item.tinhTrang === true ? <span className="text-green-600 font-medium">Hoạt động</span> : <span className="text-red-600 font-medium">Khóa</span>
        }
    ]


    const handleDetail = (item) => {
        setCurrentCustomer(item);
        setOpenDetail(true);
    };
    const handleEdit = (item) => {
        setCurrentCustomer(item);
        setOpenEdit(true);
    };
    const handleDelete = (item) => {
        setCurrentCustomer(item);
        setOpenDelete(true);
    };


    const handleEditCustomer = async () => {
        try {
            if (!currentCustomer || !currentCustomer.khachHang) {
                toast.error("Không có dữ liệu để cập nhật!");
                return;
            }

            const updatedCustomer = {
                maKhachHang: currentCustomer.khachHang.maKhachHang,
                hoTenKH: currentCustomer.khachHang.hoTenKH,
                soDienThoai: currentCustomer.khachHang.soDienThoai,
            };

            const response = await put(
                `khachhang/${updatedCustomer.maKhachHang}/${currentCustomer.tinhTrang}`,
                updatedCustomer
            );

            if (!response) {
                toast.error("Cập nhật thất bại!");
                return;
            }

            setCustomers((prev) =>
                prev.map((c) =>
                    c.khachHang?.maKhachHang === updatedCustomer.maKhachHang
                        ? {
                            ...c,
                            khachHang: updatedCustomer,
                            tinhTrang: currentCustomer.tinhTrang
                        }
                        : c
                )
            );

            toast.success("Lưu thành công!");
            setCurrentCustomer(null);
            setOpenEdit(false);

        } catch (err) {
            console.error("Lỗi khi lưu:", err);
            toast.error("Lưu thất bại do lỗi hệ thống!");
        }
    };

    const handleConfirmDelete = () => {
        const deleteCustomer = async () => {
            try {
                const req = await del(`khachhang/${currentCustomer.khachHang.maKhachHang}`);
                if (!req) {
                    toast.error("Xóa thất bại! Do khách hàng đã có đơn hàng");
                    return;
                }
                toast.success("Xóa thành công!");
                setOpenDelete(false);
                setCurrentCustomer(null);
                setCustomers((prev) => prev.filter(c => c.khachHang.maKhachHang !== currentCustomer.khachHang.maKhachHang));
            }
            catch (err) {
                console.error("Lỗi khi xóa:", err);
                toast.error("Xóa thất bại do lỗi hệ thống!");
            }
        }
        deleteCustomer();
    }

    return (
        <div className="p-6 space-y-4">
            <Card className={"shadow-md rounded-2xl"}>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Quản lý khách hàng</CardTitle>
                </CardHeader>

                <CardContent>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <Input
                            value={fliter.keyword}
                            onChange={(e) => setFliter({ ...fliter, keyword: e.target.value })}
                            placeholder="Tìm kiếm khách hàng, email, số điện thoại..."
                        />
                        <Select value={fliter.trangThai} onValueChange={(value) => setFliter({ ...fliter, trangThai: value })}>
                            <SelectTrigger className="w-full cursor-pointer">
                                <SelectValue placeholder="Lọc theo trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                <SelectItem value="true">Hoạt động</SelectItem>
                                <SelectItem value="false">Khóa</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={fliter.sortField} onValueChange={(value) => setFliter({ ...fliter, sortField: value })}>
                            <SelectTrigger className="w-full cursor-pointer">
                                <SelectValue placeholder="Sắp xếp" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="khachHang.diemTichLuy&asc">Điểm tăng dần</SelectItem>
                                <SelectItem value="khachHang.diemTichLuy&desc">Điểm giảm dần</SelectItem>
                                <SelectItem value="khachHang.hoTenKH&asc">Tên tăng dần</SelectItem>
                                <SelectItem value="khachHang.hoTenKH&desc">Tên giảm dần</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end mt-6 mb-6">
                        <button
                            onClick={fetchCustomers}
                            className="flex items-center gap-2 bg-[var(--color-background)] text-[#fff] px-6 py-2 rounded-lg">
                            <Search size={20} /> Tìm kiếm
                        </button>
                    </div>


                    <AdminTable
                        columns={columns}
                        data={customers}
                        renderActions={(item) => (
                            <ActionButtons
                                onView={() => handleDetail(item)}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => handleDelete(item)}
                            />
                        )}
                    />

                    {/* PAGINATION */}
                    <AdminPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onChange={(p) => {setCurrentPage(p); fetchCustomers();}}
                    />

                </CardContent>
            </Card>
            <DetailDialog
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                data={currentCustomer}
                fields={[
                    ...columns,
                    {
                        key: "vaiTro",
                        label: "Vai trò",
                    }
                ]}
            />

            <EditCreateDialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                title={"Chỉnh sửa khách hàng"}
                onSubmit={handleEditCustomer}
            >
                <div className="space-y-3">
                    <div className="mb-2">
                        Họ tên <span className="text-red-600">*</span>
                    </div>
                    <Input
                        value={currentCustomer?.khachHang.hoTenKH}
                        onChange={(e) => setCurrentCustomer({ ...currentCustomer, khachHang: { ...currentCustomer.khachHang, hoTenKH: e.target.value } })}
                        required
                    />

                    <div className="mb-2">
                        Số điện thoại <span className="text-red-600">*</span>
                    </div>
                    <Input
                        value={currentCustomer?.khachHang.soDienThoai}
                        onChange={(e) => setCurrentCustomer({ ...currentCustomer, khachHang: { ...currentCustomer.khachHang, soDienThoai: e.target.value } })}
                        required
                    />

                    <div className="mb-2 flex  items-center  gap-2">
                        <span>Trạng thái hoạt động:</span>
                        <input
                            type="checkbox"
                            className="ml-2 scale-150"
                            checked={currentCustomer?.tinhTrang || false}
                            onChange={(e) => setCurrentCustomer({ ...currentCustomer, tinhTrang: e.target.checked })}
                        />

                    </div>


                </div>
            </EditCreateDialog>


            <ConfirmDeleteDialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
            />


        </div>
    )
}