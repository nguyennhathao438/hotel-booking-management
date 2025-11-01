import { ShoppingBagIcon,EyeIcon,SearchIcon,HotelIcon,UserIcon,CreditCardIcon,BedIcon} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api";
import ModelForm from "../components/Common/FormModel";
import { useSearchParams } from "react-router-dom";

export default function Invoice(){
    const[invoiceSelected,setInvoiceSelected] = useState({
        id: "",
        checkInDate: "",
        checkOutDate: "",
        createdAt: "",
        status: "",
        payment: "",
        totalAmount: "",
    });
    const[invoiceNoPage,setInvoiceNoPage] = useState([]);
    const[invoiceList,setInvoiceList] = useState([]);
    const[invoiceListSearch,setInvoiceListSearch] = useState([]);
    const[statusFilter,setStatusFilter] = useState("");
    const[paymentFilter,setPaymentFilter] = useState("");
    const[dateFrom,setDateFrom] = useState("");
    const[dateTo,setDateTo] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(0);
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const[openFormInvoice,setOpenFormInvoice] = useState(false);

    const fetchInvoiceNoPage = async() => {
        try {
                const response = await api.get("/invoice/all");
                const data = response.data.result;
                setInvoiceNoPage(data);
            } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
            }
    }
    const fetchInvoice = async (page = 1) => {
            try {
                setSearchParams({ page });
                const response = await api.get(`/invoice/all-get-page?pageNo=${page}&pageSize=7`);
                const data = response.data.result;
                setInvoiceList(data.content);
                setInvoiceListSearch(data.content);
                setTotalPages(data.totalPages);

            } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
            }
        }
    const fetchInvoiceFilter = async (page = 1) => {
    try {
    setSearchParams({ page });

    const response = await api.get(`/invoice/filter`, {
      params: {
        pageNo: page,
        pageSize: 7,
        status: statusFilter || null,
        payment: paymentFilter || null,
        dateFrom: dateFrom || null,
        dateTo: dateTo || null,
      },
    });

    const data = response.data.result;
    setInvoiceList(data.content);
    setInvoiceListSearch(data.content);
    setTotalPages(data.totalPages);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách hóa đơn:", error);
  }
};

    useEffect(() => {
    if (statusFilter || paymentFilter || dateFrom || dateTo) {
        fetchInvoiceFilter(currentPage);
    } else {
        fetchInvoice(currentPage);
    }
    fetchInvoiceNoPage();
}, [currentPage, statusFilter, paymentFilter, dateFrom, dateTo]);
    useEffect(() => {
        setSearchParams({page:1});   
    }, [statusFilter, paymentFilter, dateFrom, dateTo]);

    const getPaymentText = (payment) => {
        switch(payment) {
            case 1: return "Thanh toán trực tiếp";
            case 2: return "Chuyển khoản";
            case 3: return "Thẻ";
            default: return "";
        }
    };
    const getStatusText = (status) => {
            switch (status) {
                case 0: return "Chờ xác nhận";
                case 1: return "Đã xác nhận";
                case 2: return "Hoàn thành";
                case 3: return "Đã hủy";
                default: return "Không rõ";
            }
    };
    const getStatusColor = (status) => {
    switch (status) {
        case 0: // Chờ xác nhận
        return "bg-yellow-100 text-yellow-700";
        case 1: // Đã xác nhận
        return "bg-blue-100 text-blue-700";
        case 2: // Hoàn thành
        return "bg-green-100 text-green-700";
        case 3: // Đã hủy
        return "bg-red-100 text-red-700";
        default:
        return "bg-gray-100 text-gray-700";
            }
    };

    const handleCloseForm = () => {
        setOpenFormInvoice(false);
    }
    const handleGetInvoice = (invoiceId) => {

    const invoice = invoiceList.find((invoices) => invoices.id == invoiceId);

    setInvoiceSelected(invoice);
    setOpenFormInvoice(true);
    };

    return(
    <>
    <div className="p-6 bg-gray-100 min-h-screen w-full ml-[300px]">
            <div className="flex">
                <ShoppingBagIcon size={30}/>
                <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>
            </div>
            <div className="flex justify-between mb-5">
                <div className="bg-white p-4 rounded-lg pl-9 pr-9">
                    <p>Tổng đơn hàng</p>
                    <div className="flex justify-center items-center space-x-1">
                    <ShoppingBagIcon className="text-blue-500"/>
                    <p className="text-blue-500">{invoiceNoPage.length}</p>
                    </div>
                </div>      
                <div className="bg-white p-4 rounded-lg pl-9 pr-9 text-center">
                    <p>Chờ xác nhận</p>
                    <p className="text-yellow-500">{invoiceNoPage.filter(inv => inv.status === 0).length}</p>
                </div>      
                <div className="bg-white p-4 rounded-lg pl-9 pr-9 text-center">
                    <p>Đã xác nhận</p>
                    <p className="text-blue-500">{invoiceNoPage.filter(inv => inv.status === 1).length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg pl-9 pr-9 text-center">
                    <p>Hoàn Thành</p>
                    <p className="text-green-500">{invoiceNoPage.filter(inv => inv.status === 2).length}</p>
                </div>      
                <div className="bg-white p-4 rounded-lg pl-9 pr-9 text-center">
                    <p>Đã hủy</p>
                    <p className="text-red-600">{invoiceNoPage.filter(inv => inv.status === 3).length}</p>
                </div>      
                <div className="bg-white p-4 rounded-lg pl-9 pr-9 text-center">
                    <p>Doanh thu</p>
                    <p className="text-green-500">{invoiceNoPage.filter(inv => inv.status === 2).reduce((sum,inv) => sum + inv.totalAmount,0)} đ</p>
                </div>
            </div>    

        <div className="flex bg-white justify-center items-center gap-5 p-3">
      {/* Filter Status */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Trạng thái</label>
                <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-400"
                >
                <option value="">Tất cả</option>
                <option value="0">Chờ xác nhận</option>
                <option value="1">Đã xác nhận</option>
                <option value="2">Hoàn thành</option>
                <option value="3">Đã hủy</option>
                </select>
            </div>

            {/* Filter Payment */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Phương thức thanh toán</label>
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

            {/* Filter Date */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Từ ngày - Đến ngày</label>
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
            {/* Bảng đơn hàng */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mt-5">
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
                        <div>Không có dữ liệu</div>
                    ) : invoiceListSearch.map((invoice,id) => (
                        <tr key={id} className="border-b hover:bg-gray-50 transition duration-150">
                        <td className="py-3 px-4">
                        <div className="flex flex-col">
                            <span className="font-medium">
                            {invoice.user ? `${invoice.user.firstName} ${invoice.user.lastName}` : "No Name"}
                            </span>
                        </div>
                        </td>
                        <td className="py-3 px-4">
                            {invoice.room.hotel ? invoice.room.hotel.hotelName : "No Room Name"}
                        </td>
                        <td className="py-3 px-4">{invoice.checkInDate}</td>
                        <td className="py-3 px-4">{invoice.checkOutDate}</td>
                        <td className="py-3 px-4">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs font-semibold">
                            {getPaymentText(invoice.payment)}
                        </span>
                        </td>
                        <td className="py-3 px-4">
                        <span  className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                            {getStatusText(invoice.status)}
                        </span>
                        </td>
                        <td className="py-3 px-4 font-semibold">
                        {invoice.totalAmount} ₫
                        </td>
                        <td className="py-3 px-4 text-center">
                        <div className="flex justify-center gap-2">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md flex items-center space-x-1 text-xs" onClick={() => handleGetInvoice(invoice.id)}>
                            <EyeIcon size={14} />
                            <span>Xem chi tiết</span>
                            </button>                            
                        </div>
                        </td>
                    </tr>
                    ))
                    }
                </tbody>
                </table>
                <div className="flex justify-center mt-4 space-x-2">
                    <button
                    disabled={currentPage === 1}
                    onClick={() => (statusFilter || paymentFilter || dateFrom || dateTo) ? fetchInvoiceFilter(currentPage - 1) : fetchInvoice(currentPage - 1)}
                    className={`px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}> 
                    Trước 
                    </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                    key={i}
                    onClick={() =>
                        (statusFilter || paymentFilter || dateFrom || dateTo) ? fetchInvoiceFilter(i + 1) : fetchInvoice(i + 1)}
                    className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-blue-100"}`}>
                    {i + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                    (statusFilter || paymentFilter || dateFrom || dateTo) ? fetchInvoiceFilter(currentPage + 1): fetchInvoice(currentPage + 1)}
                    className={`px-3 py-1 rounded-md ${ currentPage === totalPages ? "bg-gray-200 text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
                    Sau
                </button>
                </div>
            </div>
    </div>
    {openFormInvoice && <ModelForm title="Chi tiết đơn đặt phòng" width="w-auto" onClose={() => handleCloseForm()}>        
        <div className="bg-white p-6 rounded-md shadow-md min-w-[900px] text-gray-800">
      {/* --- HEADER --- */}
      <div className="text-center mb-4 border-b pb-3">
        <div className="flex justify-center">
        <HotelIcon size={28}/>
        <h1 className="text-2xl font-bold text-blue-600">{invoiceSelected.room.hotel.hotelName}</h1>
        </div>
        <p className="text-sm font-semibold mt-3">HÓA ĐƠN THANH TOÁN</p>
        <p className="text-xs text-gray-500">
           68d6545b369aa3917ebd6ca3
        </p>
      </div>

      {/* --- THÔNG TIN KHÁCH HÀNG & KHÁCH SẠN --- */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        {/* Khách hàng */}
        <div>
          <h3 className="text-blue-600 font-semibold flex items-center space-x-1 mb-2">
            <UserIcon/>
            <span>THÔNG TIN KHÁCH HÀNG</span>
          </h3>
          <p><span className="font-medium">Họ tên:</span>{invoiceSelected.user ? `${invoiceSelected.user.firstName} ${invoiceSelected.user.lastName}` : "No Name"}</p>
          <p><span className="font-medium">Email:</span>{invoiceSelected.user.email}</p>
          <p><span className="font-medium">Số điện thoại:</span>{invoiceSelected.user.phone}</p>
        </div>

        {/* Khách sạn */}
        <div>
          <h3 className="text-blue-600 font-semibold flex items-center space-x-1 mb-2">
            <HotelIcon/>
            <span>THÔNG TIN KHÁCH SẠN</span>
          </h3>
          <p><span className="font-medium">Tên khách sạn:</span>{invoiceSelected.room.hotel.hotelName}</p>
          <p><span className="font-medium">Địa chỉ:</span>{invoiceSelected.room.hotel.hotelAddress}</p>
          <p><span className="font-medium">SĐT:</span>{invoiceSelected.room.hotel.hotelPhone}</p>
        </div>
      </div>

      {/* --- THÔNG TIN THANH TOÁN --- */}
      <div className="mb-5">
        <h3 className="text-blue-600 font-semibold flex items-center space-x-1 mb-2">
          <span><CreditCardIcon/></span>
          <span>THÔNG TIN THANH TOÁN</span>
        </h3>
        <div className="grid grid-cols-3 text-sm">
          <p><span className="font-medium">Phương thức thanh toán:</span>{getPaymentText(invoiceSelected.payment)}</p>
          <p className="ml-10">
          <span>Trạng thái:</span>
          <span className={`font-medium ${getStatusColor(invoiceSelected.status)}`}>{getStatusText(invoiceSelected.status)}</span>
          </p>
          <p><span className="font-medium">Ngày thanh toán:</span>{invoiceSelected.createdAt}</p>
        </div>
      </div>

      {/* --- CHI TIẾT PHÒNG NGHỈ --- */}
      <div className="mb-5">
        <h3 className="text-blue-600 font-semibold flex items-center space-x-1 mb-2">
          <span><BedIcon/></span>
          <span>CHI TIẾT PHÒNG NGHỈ</span>
        </h3>

        <div className="space-y-4 text-sm">
            <div className="border-l-4 border-blue-400 pl-3">
              <p className="font-semibold text-blue-500">
                {invoiceSelected.room.roomName}
              </p>
              <p><span className="font-medium">sức chứa:</span>{invoiceSelected.room.roomCapacity}</p>
              <p><span className="font-medium">Giá/đêm:</span>{invoiceSelected.room.roomPrice}</p>
              <p><span className="font-medium">Nhận phòng:</span>{invoiceSelected.checkInDate}</p>
              <p><span className="font-medium">Trả phòng:</span>{invoiceSelected.checkOutDate}</p>
              <p>
                <span className="font-medium">Số đêm:</span>{" "}
                {(() => {
                    const checkIn = new Date(invoiceSelected.checkInDate);
                    const checkOut = new Date(invoiceSelected.checkOutDate);

                    const diffTime = checkOut - checkIn;
                    return diffTime/(1000 * 60 * 60 * 24); 
                }) ()}
              </p>
              <p className="font-medium mt-1">
                Thành tiền
                <span className="text-blue-600 font-semibold">
                 {(() => {
                    const checkIn = new Date(invoiceSelected.checkInDate);
                    const checkOut = new Date(invoiceSelected.checkOutDate);

                    const diffTime = checkOut - checkIn;
                    const Nights = diffTime/(1000 * 60 * 60 * 24);

                    return (
                        invoiceSelected.room?.roomPrice * Nights
                    ).toLocaleString() + "đ";
                    
                 }) ()}
                </span>
              </p>
            </div>         
        </div>
      </div>

      {/* --- TỔNG CỘNG --- */}
      <div className="text-right border-t pt-3">
        <p className="text-lg font-bold">
          Tổng cộng:
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
    </ModelForm>}
</>
    );
};