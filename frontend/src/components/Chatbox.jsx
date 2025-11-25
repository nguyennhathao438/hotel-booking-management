import { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import api from "../api";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import defaultAvata from "../assets/img/defaultAvata.jpg";
import toast from "react-hot-toast";
export default function ChatBox({ onClose, hotelId }) {
  const myId = useSelector((state) => state.user.userId);
  const [customer, setCustomer] = useState();
  const [conversation, setConversation] = useState([]);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const stompClientRef = useRef(null);
  const [input, setInput] = useState("");
  //Bật web socket
  useEffect(() => {
    if (!customer) return;

    const socket = new SockJS(`http://localhost:8080/ws?userId=${myId}`);
    const client = over(socket);
    stompClientRef.current = client;

    client.connect({}, () => {
      console.log("WebSocket connected");

      client.subscribe(`/user/queue/messages`, (payload) => {
        const msg = JSON.parse(payload.body);
        if (msg.senderId === customer.id || msg.receiverId === customer.id) {
          setConversation((prev) => [...prev, msg]);
        }
      });
    });

    return () => {
      if (stompClientRef.current?.connected) {
        stompClientRef.current.disconnect(() =>
          console.log(" WebSocket disconnected")
        );
      }
    };
  }, [customer, myId]);
  //Ref
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []); // chạy 1 lần khi render lần đầu
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);
  //Lấy id chủ khách sạn
  useEffect(() => {
    const fetchCustomId = async () => {
      try {
        const response = await api.get(`/hotels/see/${hotelId}`);
        setCustomer(response.data.result.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomId();
  }, [hotelId]);
  //Lấy tin nhắn
  const fetchMess = async () => {
    try {
      const response = await api.get("/message/conversation", {
        params: {
          senderId: myId,
          receiverId: customer.id,
        },
      });
      setConversation(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (customer && myId) {
      fetchMess();
    }
  }, [customer, myId]);

  //Các hàm khác
  const sendMessage = async () => {
    if (!input.trim() || !customer) return;

    const message = {
      senderId: myId,
      receiverId: customer.id,
      content: input,
    };

    // Gửi qua REST API
    try {
      await api.post("/message", message);
      fetchMess();
      setInput("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Gửi tin nhắn thất bại, vui lòng thử lại!");
      }
    }
  };
  return (
    <div className="flex flex-col w-[360px] h-[500px] bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img
            src={customer?.avatar ? customer.avatar : defaultAvata}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">
              {customer?.lastName} {customer?.firstName}
            </p>
          </div>
        </div>
        <div className="text-gray-500 text-lg cursor-pointer" onClick={onClose}>
          ✕
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-2 bg-white"
        ref={messageContainerRef}
      >
        {conversation.map((msg, id) => (
          <div
            key={id}
            className={`flex ${
              msg.sender?.id === myId ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex flex-col items-start max-w-[75%]">
              <span className="text-[11px] text-gray-400 mb-1 self-end">
                {new Date(msg.createAt).toLocaleString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              <div
                className={`px-3 py-2 rounded-2xl text-sm break-words ${
                  msg.sender?.id === myId
                    ? "bg-indigo-600 text-white rounded-br-none self-end"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center p-2 border-t border-gray-200 bg-gray-50">
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-sm px-3 py-2"
          placeholder="Aa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          className="p-2 rounded-full hover:bg-gray-200 transition"
          onClick={() => sendMessage()}
        >
          <PaperAirplaneIcon className="w-5 h-5 text-indigo-600" />
        </button>
      </div>
    </div>
  );
}
