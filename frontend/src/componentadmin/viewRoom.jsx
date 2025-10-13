import { useState } from "react";
import ItemRoom from "./ItemRoom.jsx";

export default function viewRoom({ rooms }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handlePayClick = (room) => {
    setSelectedRoom(room);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedRoom(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment submitted for ${selectedRoom.Name}`);
    handleCloseForm();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Room Bookings</h1>

      <div className="grid gap-2">
        {rooms.map((room, idx) => (
          <ItemRoom
            key={idx}
            Datebook={room.Datebook}
            Img={room.Img}
            Name={room.Name}
            NumberGuess={room.NumberGuess}
            PhoneNumber={room.PhoneNumber}
            CheckIn={room.CheckIn}
            CheckOut={room.CheckOut}
            Pay="Pay"
            onPayClick={() => handlePayClick(room)}
          />
        ))}
      </div>

      {showForm && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h2 className="text-lg font-bold mb-4">Payment Form</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Card Holder Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition"
              >
                Pay
              </button>
            </form>
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}