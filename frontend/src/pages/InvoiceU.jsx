import { useEffect, useState } from "react";
import {
  ShoppingBagIcon,
  EyeIcon,
  SearchIcon,
  HotelIcon,
  UserIcon,
  CreditCardIcon,
  BedIcon,
  DeleteIcon,
  LoaderIcon,
  ScanLineIcon,
  VoteIcon,
  SquareXIcon,
  ReceiptIcon,
} from "lucide-react";
import api from "../api";
import ModelForm from "../components/Common/FormModel";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
// import { useSelector } from "react-redux";
export default function InvoiceU() {
  const [invoiceSelected, setInvoiceSelected] = useState({
    id: "",
    checkInDate: "",
    checkOutDate: "",
    createdAt: "",
    status: "",
    payment: "",
    totalAmount: "",
  });
  const [invoiceNoPage, setInvoiceNoPage] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceListSearch, setInvoiceListSearch] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [statusSelected, setStatusSelected] = useState(null);
  const [paymentFilter, setPaymentFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [openFormInvoice, setOpenFormInvoice] = useState(false);
  const [editInvoiceId, setEditInvoiceId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = parseInt(searchParams.get("page")) || 1;
  useEffect(() => {
    setSearchParams({ page: 1 });
  }, [statusFilter, paymentFilter, dateFrom, dateTo]);

  useEffect(() => {
    if (statusFilter || paymentFilter || dateFrom || dateTo) {
      fetchInvoiceFilter(currentPage);
    } else {
      fetchInvoice(currentPage);
    }
  }, [currentPage, statusFilter, paymentFilter, dateFrom, dateTo]);
  const fetchInvoiceNoPage = async () => {
    try {
      const resUser = await api.get("/users/myInfo");
      const userID = resUser.data.result.id;
      const resInvoices = await api.get(`/invoice/owner/noPage/${userID}`, {
        params: {
          status: statusFilter || null,
          payment: paymentFilter || null,
          checkInDate: dateFrom || null,
          checkOutDate: dateTo || null,
        },
      });
      const data = resInvoices.data.result;
      setInvoiceNoPage(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };
  const fetchInvoice = async (page) => {
    try {
      // Nếu là hotel owner
      const resUser = await api.get("/users/myInfo");
      const userID = resUser.data.result.id;
      const resInvoices = await api.get(
        `/invoice/owner/${userID}?pageNo=${page}&pageSize=6`
      );
      const data = resInvoices.data.result;
      fetchInvoiceNoPage();
      setInvoiceList(data.content);
      setInvoiceListSearch(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };
  const fetchInvoiceFilter = async (page = 1) => {
    try {
      setSearchParams({ page });
      const resUser = await api.get("/users/myInfo");
      const userID = resUser.data.result.id;
      const response = await api.get(`/invoice/owner/${userID}`, {
        params: {
          pageNo: page,
          pageSize: 6,
          status: statusFilter || null,
          payment: paymentFilter || null,
          checkInDate: dateFrom || null,
          checkOutDate: dateTo || null,
        },
      });

      const data = response.data.result;
      setInvoiceListSearch(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hóa đơn:", error);
    }
  };
  const getPaymentText = (payment) => {
    switch (payment) {
      case 1:
        return "Thanh toán trực tiếp";
      case 2:
        return "Chuyển khoản";
      case 3:
        return "Thẻ";
      default:
        return "";
    }
  };
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Chờ xác nhận";
      case 1:
        return "Đã xác nhận";
      case 2:
        return "Đã Thanh toán";
      case 3:
        return "Hoàn thành";
      case 4:
        return "Đã hủy";
      default:
        return "Không rõ";
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 0: // Chờ xác nhận
        return "bg-yellow-100 text-yellow-700";
      case 1: // Đã xác nhận
        return "bg-blue-100 text-blue-700";
      case 2: // Đã thanh toán
        return "bg-green-100 text-emarald-700";
      case 3: // Đã hoàn thành
        return "bg-green-100 text-green-400";
      case 4: // Đã hủy
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const handleCloseForm = () => {
    setOpenFormInvoice(false);
  };
  const handleGetInvoice = (invoiceId) => {
    const invoice = invoiceList.find((invoices) => invoices.id == invoiceId);

    setInvoiceSelected(invoice);
    setOpenFormInvoice(true);
  };
  const handleStatusChange = async (
    invoiceId,
    newStatus,
    page = currentPage
  ) => {
    try {
      const invoice = invoiceList.find((inv) => inv.id === invoiceId);
      await api.put(`/invoice/${invoiceId}`, {
        checkInDate: invoice.checkInDate,
        checkOutDate: invoice.checkOutDate,
        totalAmount: invoice.totalAmount,
        payment: invoice.payment,
        status: newStatus,
      });
      const resUser = await api.get("/users/myInfo");
      const userID = resUser.data.result.id;
      const resAllInvoices = await api.get(`/invoice/owner/noPage/${userID}`);
      const allData = resAllInvoices.data.result;
      setInvoiceNoPage(allData);
      const resInvoices = await api.get(
        `/invoice/owner/${userID}?pageNo=${page}&pageSize=6`
      );
      const data = resInvoices.data.result;
      setEditInvoiceId(data.content.status);
      setInvoiceListSearch(data.content);
      setInvoiceList(data.content); // ở đây ak
      setTotalPages(data.totalPages);
      toast.success("Cập nhật trạng thái đơn hàng thành công");
      setEditInvoiceId(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Lỗi không xác định"
      );
    }
  };
  const handleDelete = async (invoiceId) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) return;
    try {
      await api.delete(`/invoice/ac/${invoiceId}`);
      toast.success("Xóa hóa đơn thành công");
      fetchInvoice(1);
      fetchInvoiceFilter();
    } catch (err) {
      console.error(err);
    }
  };
  const StatusOptions = [
    { value: 0, label: "Chờ xác nhận" },
    { value: 1, label: "Đã xác nhận" },
    { value: 2, label: "Đã thanh toán" },
    { value: 3, label: "Hoàn thành" },
    { value: 4, label: "Đã hủy" },
  ];
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen w-full ml-[300px]">
        <div className="">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-4">
            <ShoppingBagIcon size={26} className="sm:size-[30px]" />
            <h1 className="text-xl sm:text-2xl font-bold">Quản lý đơn hàng</h1>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-5 mb-5">
            <div className="bg-white p-3 sm:p-4 rounded-lg text-center">
              <p className="text-sm sm:text-base">Tổng đơn hàng</p>
              <div className="flex justify-center items-center space-x-1">
                <ShoppingBagIcon className="text-blue-500 size-4 sm:size-5" />
                <p className="text-blue-500 font-semibold">
                  {invoiceNoPage.length}
                </p>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg text-center">
              <p className="text-sm sm:text-base">Chờ xác nhận</p>
              <p className="text-yellow-500 space-x-0.5">
                <LoaderIcon className="w-5 h-5 inline" />
                <span>
                  {invoiceNoPage.filter((inv) => inv.status === 0).length}
                </span>
              </p>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg text-center">
              <p className="text-sm sm:text-base">Đã xác nhận</p>
              <p className="text-blue-500 space-x-0.5">
                <ScanLineIcon className="w-5 h-5 inline" />
                <span>
                  {invoiceNoPage.filter((inv) => inv.status === 1).length}
                </span>
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <span>Đã thanh toán</span>
              <p className="text-emerald-700 space-x-0.5">
                <ReceiptIcon className="w-5 h-5 inline" />
                <span>
                  {invoiceNoPage.filter((inv) => inv.status === 2).length}
                </span>
              </p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg text-center">
              <p className="text-sm sm:text-base">Hoàn thành</p>
              <p className="text-green-500 space-x-0.5">
                <VoteIcon className="w-5 h-5 inline" />
                <span>
                  {invoiceNoPage.filter((inv) => inv.status === 3).length}
                </span>
              </p>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg text-center">
              <p className="text-sm sm:text-base">Đã hủy</p>
              <p className="text-red-600 space-x-0.5">
                <SquareXIcon className="w-5 h-5 inline" />
                <span>
                  {invoiceNoPage.filter((inv) => inv.status === 4).length}
                </span>
              </p>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg text-center">
              <p className="text-sm sm:text-base">Doanh thu</p>
              <p className="text-green-500 font-semibold ">
                {invoiceNoPage
                  .filter((inv) => inv.status === 3)
                  .reduce((sum, inv) => sum + inv.totalAmount, 0)}{" "}
                đ
              </p>
            </div>
          </div>

          {/* Bộ lọc */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
              {/* Trạng thái */}
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-sm font-medium mb-1">Trạng thái</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-400"
                >
                  <option value="">Tất cả</option>
                  <option value="0">Chờ xác nhận</option>
                  <option value="1">Đã xác nhận</option>
                  <option value="2">Đã thanh toán</option>
                  <option value="3">Hoàn thành</option>
                  <option value="4">Đã hủy</option>
                </select>
              </div>

              {/* Thanh toán */}
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-sm font-medium mb-1">
                  Phương thức thanh toán
                </label>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-400"
                >
                  <option value="">Tất cả</option>
                  <option value="1">Thanh toán trực tiếp</option>
                  <option value="2">Chuyển khoản</option>
                  <option value="3">Thẻ</option>
                </select>
              </div>

              {/* Ngày */}
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-sm font-medium mb-1">
                  Từ ngày - Đến ngày
                </label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-1 focus:ring-blue-400"
                  />
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bảng đơn hàng */}
          <div className="bg-white rounded-xl shadow-md overflow-x-auto mt-5">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-200 text-gray-800 text-left">
                <tr>
                  <th className="py-3 px-4">Tên khách hàng</th>
                  <th className="py-3 px-4">Tên khách sạn</th>
                  <th className="py-3 px-4">Check-in</th>
                  <th className="py-3 px-4">Check-out</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Total amount</th>
                  <th className="py-3 px-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {!invoiceListSearch ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  invoiceListSearch.map((invoice, id) => (
                    <tr
                      key={id}
                      className="border-b hover:bg-gray-50 transition duration-150"
                    >
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {invoice.user
                              ? `${invoice.user.firstName} ${invoice.user.lastName}`
                              : "No Name"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {invoice.room.hotel
                          ? invoice.room.hotel.hotelName
                          : "No Room Name"}
                      </td>
                      <td className="py-3 px-4">{invoice.checkInDate}</td>
                      <td className="py-3 px-4">{invoice.checkOutDate}</td>
                      <td className="py-3 px-4">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs font-semibold inline-table">
                          {getPaymentText(invoice.payment)}
                        </span>
                      </td>
                      <td className="py-3 px-4 ">
                        {editInvoiceId === invoice.id ? (
                          <select
                            value={statusSelected ?? invoice.status}
                            onChange={(e) =>
                              handleStatusChange(
                                invoice.id,
                                parseInt(e.target.value)
                              )
                            }
                            className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 "
                          >
                            {StatusOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span
                            onClick={() => {
                              setInvoiceSelected(invoice);
                              setEditInvoiceId(invoice.id);
                              setStatusSelected(invoice.status);
                            }}
                            className={`cursor-pointer inline-table px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(
                              invoice.status
                            )}`}
                          >
                            {getStatusText(invoice.status)}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        <span className="inline">{invoice.totalAmount} đ</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex gap-1">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md flex items-center justify-center space-x-1 text-xs"
                            onClick={() => handleGetInvoice(invoice.id)}
                          >
                            <EyeIcon size={14} />
                            <span>Xem</span>
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center justify-center space-x-1 text-xs"
                            onClick={() => handleDelete(invoice.id)}
                          >
                            <DeleteIcon size={14} />
                            <span>Xóa</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {invoiceListSearch.length > 0 && totalPages > 1 && (
            <div className="flex justify-center flex-wrap mt-4 space-x-1 sm:space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setSearchParams({ page: currentPage - 1 })}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Trước
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setSearchParams({ page: i + 1 })}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-blue-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setSearchParams({ page: currentPage + 1 })}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Sau
              </button>
            </div>
          )}
        </div>
      </div>

      {openFormInvoice && (
        <ModelForm
          title="Chi tiết đơn đặt phòng"
          width="w-auto"
          onClose={() => handleCloseForm()}
        >
          <div className="bg-white p-6 rounded-md shadow-md min-w-[900px] text-gray-800">
            {/* --- HEADER --- */}
            <div className="text-center mb-4 border-b pb-3">
              <div className="flex justify-center">
                <HotelIcon size={28} />
                <h1 className="text-2xl font-bold text-blue-600">
                  {invoiceSelected.room.hotel.hotelName}
                </h1>
              </div>
              <p className="text-sm font-semibold mt-3">HÓA ĐƠN THANH TOÁN</p>
            </div>

            {/* --- THÔNG TIN KHÁCH HÀNG & KHÁCH SẠN --- */}
            <div className="grid grid-cols-2 gap-6 mb-5">
              {/* Khách hàng */}
              <div>
                <h3 className="text-blue-600 font-semibold flex items-center space-x-1 mb-2">
                  <UserIcon />
                  <span>THÔNG TIN KHÁCH HÀNG</span>
                </h3>

                <div className="space-x-2">
                  <span className="font-medium">Họ tên:</span>
                  <span>
                    {invoiceSelected.user
                      ? `${invoiceSelected.user.firstName} ${invoiceSelected.user.lastName}`
                      : "No Name"}
                  </span>
                </div>
                <div className="space-x-2">
                  <span className="font-medium">Email:</span>
                  <span>{invoiceSelected.user.email}</span>
                </div>
                <div className="space-x-2">
                  <span className="font-medium">Số điện thoại:</span>
                  <span>{invoiceSelected.user.phone}</span>
                </div>
              </div>

              {/* Khách sạn */}
              <div>
                <h3 className="text-blue-600 font-semibold flex items-center space-x-1 mb-2">
                  <HotelIcon />
                  <span>THÔNG TIN KHÁCH SẠN</span>
                </h3>
                <div className="space-x-2">
                  <span className="font-medium">Tên khách sạn:</span>
                  <span>{invoiceSelected.room.hotel.hotelName}</span>
                </div>
                <div className="space-x-2">
                  <span className="font-medium">Địa chỉ:</span>
                  <span>{invoiceSelected.room.hotel.hotelAddress}</span>
                </div>
                <div className="space-x-2">
                  <span className="font-medium">SĐT:</span>
                  <span>{invoiceSelected.room.hotel.hotelPhone}</span>
                </div>
              </div>
            </div>

            {/* --- THÔNG TIN THANH TOÁN --- */}
            <div className="mb-5">
              <h3 className="text-blue-600 font-semibold flex items-center space-x-1 mb-2">
                <span>
                  <CreditCardIcon />
                </span>
                <span>THÔNG TIN THANH TOÁN</span>
              </h3>
              <div className="grid grid-cols-3 text-sm">
                <div className="space-x-1">
                  <span className="font-medium">Phương thức thanh toán:</span>
                  <span>{getPaymentText(invoiceSelected.payment)}</span>
                </div>
                <p className="ml-10 space-x-1">
                  <span>Trạng thái:</span>
                  <span
                    className={`font-medium ${getStatusColor(
                      invoiceSelected.status
                    )}`}
                  >
                    {getStatusText(invoiceSelected.status)}
                  </span>
                </p>
                <p className="space-x-1">
                  <span className="font-medium">Ngày thanh toán:</span>
                  <span>{invoiceSelected.checkInDate.slice(0, 10)}</span>
                </p>
              </div>
            </div>

            {/* --- CHI TIẾT PHÒNG NGHỈ --- */}
            <div className="mb-5">
              <h3 className="text-blue-600 font-semibold flex items-center space-x-1 mb-2">
                <span>
                  <BedIcon />
                </span>
                <span>CHI TIẾT PHÒNG NGHỈ</span>
              </h3>

              <div className="space-y-4 text-sm">
                <div className="border-l-4 border-blue-400 pl-3">
                  <p className="font-semibold text-blue-500">
                    {invoiceSelected.room.roomName}
                  </p>
                  <p className="space-x-1">
                    <span className="font-medium">sức chứa:</span>
                    <span>{invoiceSelected.room.roomCapacity}</span>
                  </p>
                  <p className="space-x-1">
                    <span className="font-medium">Giá/đêm:</span>
                    <span>{invoiceSelected.room.roomPrice}</span>
                  </p>
                  <p className="space-x-1">
                    <span className="font-medium">Nhận phòng:</span>
                    <span>{invoiceSelected.checkInDate}</span>
                  </p>
                  <p className="space-x-1">
                    <span className="font-medium">Trả phòng:</span>
                    <span>{invoiceSelected.checkOutDate}</span>
                  </p>
                  <p className="space-x-1">
                    <span className="font-medium">Số đêm:</span>{" "}
                    {(() => {
                      const checkIn = new Date(invoiceSelected.checkInDate);
                      const checkOut = new Date(invoiceSelected.checkOutDate);

                      const diffTime = checkOut - checkIn;
                      return diffTime / (1000 * 60 * 60 * 24);
                    })()}
                  </p>
                </div>
              </div>
            </div>

            {/* --- TỔNG CỘNG --- */}
            <div className="text-right border-t pt-3">
              <p className="text-lg font-bold space-x-1">
                <span>Tổng cộng:</span>
                <span className="text-blue-600">
                  {invoiceSelected.totalAmount}
                </span>
              </p>
              <p className="text-xs text-gray-500">Đã bao gồm thuế VAT</p>
            </div>

            {/* --- LỜI CẢM ƠN --- */}
            <div className="text-center text-sm text-gray-600 mt-5">
              Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!
            </div>
          </div>
        </ModelForm>
      )}
    </>
  );
}
