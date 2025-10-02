import roseHotel from "./assets/img/roseHotel.jpg"; // chỉnh lại đường dẫn nếu khác
import norHotel from "./assets/img/norHotel.jpg";
import logo from "./assets/img/logo.jpg";
export const rooms = [
  {
    id: 1,
    Img: roseHotel,
    NameRoom: "No.312",
    TypeRoom: "A/C King",
    MoneyRoom: "$29/day",
  },
  {
    id: 2,
    Img: roseHotel,
    NameRoom: "No.313",
    TypeRoom: "A/C Queen",
    MoneyRoom: "$32/day",
  },
  {
    id: 3,
    Img: roseHotel,
    NameRoom: "No.314",
    TypeRoom: "Deluxe",
    MoneyRoom: "$40/day",
  },
  {
    id: 4,
    Img: roseHotel,
    NameRoom: "No.315",
    TypeRoom: "Standard",
    MoneyRoom: "$25/day",
  },
  {
    id: 5,
    Img: roseHotel,
    NameRoom: "No.316",
    TypeRoom: "Suite",
    MoneyRoom: "$55/day",
  },
];
export const detailbookings = [
    {
    id: 1,
    Datebook: "14.02.2025",
    Img: norHotel,
    Name: "Nguyen Nhat Hao",
    NumberGuess: "1 adults x 2 Child",
    PhoneNumber: "090629323",
    CheckIn: "15.02.2025 11.00 am",
    CheckOut: "16.02.2025 12.00 pm",
    Pay: "Received"
  },
  {
    id: 2,
    Datebook: "18.02.2025",
    Img: logo,
    Name: "Tran Van B",
    NumberGuess: "2 adults",
    PhoneNumber: "0912345678",
    CheckIn: "18.02.2025 2.00 pm",
    CheckOut: "19.02.2025 10.00 am",
    Pay: "Pending"
  },
  {
    id: 3,
    Datebook: "20.02.2025",
    Img: roseHotel,
    Name: "Le Thi C",
    NumberGuess: "3 adults x 1 Child",
    PhoneNumber: "0987654321",
    CheckIn: "20.02.2025 9.00 am",
    CheckOut: "21.02.2025 1.00 pm",
    Pay: "Cancelled"
  }
]