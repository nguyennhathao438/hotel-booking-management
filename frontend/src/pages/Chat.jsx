import {
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState, useRef } from "react";
import api from "../api";
import { useSelector } from "react-redux";
import defaultAvata from "../assets/img/defaultAvata.jpg";
import SockJS from "sockjs-client";
import { over } from "stompjs";

export default function Contact() {
  const myId = useSelector((state) => state.user.userId);
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const stompClientRef = useRef(null);
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = over(socket);
    stompClientRef.current = client;

    client.connect({}, () => {
      console.log("✅ WebSocket connected");
      client.subscribe("/topic/messages", (payload) => {
        const msg = JSON.parse(payload.body);
        if (
          msg.sender?.id === selectedUser?.id ||
          msg.receiver?.id === selectedUser?.id
        ) {
          setConversation((prev) => [...prev, msg]);
        }
      });
    });

    return () => {
      if (stompClientRef.current?.connected) {
        stompClientRef.current.disconnect(() => {
          console.log("✅ WebSocket disconnected");
        });
      }
    };
  }, []);
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
  useEffect(() => {
    const fetchUser = async () => {
      if (!myId) return;
      try {
        const response = await api.get(`/message/${myId}`);
        setListUser(response.data.result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [myId]);

  const getConversation = async (userId) => {
    try {
      const response = await api.get("/message/conversation", {
        params: {
          senderId: userId,
          receiverId: myId,
        },
      });
      setConversation(response.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };
  const sendMessage = async () => {
    if (!input.trim() || !selectedUser) return;

    const message = {
      senderId: myId,
      receiverId: selectedUser.id,
      content: input,
    };

    // Gửi qua REST API
    try {
      await api.post("/message", message);
      getConversation(selectedUser.id);
      setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };
  const handleSearch = async () => {
    try {
      const response = await api.get(`/message/${myId}`, {
        params: {
          key: search,
        },
      });
      setListUser(response.data.result);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="p-4 bg-gray-100 min-h-screen w-full ml-[70px] lg:ml-[300px]">
      {/* Ô tìm kiếm */}
      <div className="p-3 border-b mb-6 bg-gray-50 flex items-center gap-2 rounded-lg shadow-sm">
        <input
          type="text"
          value={search}
          placeholder="Tìm kiếm người dùng..."
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          onChange={(e) => setSearch(e.target.value)}
        />
        <MagnifyingGlassIcon
          className="w-5 h-5 text-gray-500 hover:text-blue-500 cursor-pointer"
          onClick={handleSearch}
        />
      </div>

      {/* Container chính */}
      <div className="flex md:flex-row w-full h-[calc(100vh-180px)] border bg-white rounded-lg overflow-hidden shadow-md">
        {/* Danh sách user */}
        <aside className=" md:block w-64 border-r overflow-y-auto h-full bg-gray-50">
          {listUser.map((user, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                user.id === selectedUser?.id ? "bg-emerald-100" : ""
              }`}
              onClick={() => {
                setSelectedUser(user);
                getConversation(user.id);
              }}
            >
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar ? user.avatar : defaultAvata}
                  alt={user.firstName}
                  className="w-10 h-10 rounded-full"
                />
                <p className="font-medium text-sm">
                  {user.lastName} {user.firstName}
                </p>
              </div>
            </div>
          ))}
        </aside>

        {/* Chat main */}
        {selectedUser ? (
          <main className="flex-1 flex flex-col h-full">
            {/* Header */}
            <header className="flex items-center justify-between border-b p-3 bg-gray-50">
              <div className="flex items-center gap-2">
                <button className="md:hidden p-2">
                  <Bars3Icon className="w-6 h-6 text-gray-700" />
                </button>
                <img
                  src={selectedUser.avatar ? selectedUser.avatar : defaultAvata}
                  alt="chat user"
                  className="w-10 h-10 rounded-full"
                />
                <p className="font-medium text-sm">
                  {selectedUser.lastName} {selectedUser.firstName}
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded">
                <EllipsisVerticalIcon className="w-6 h-6" />
              </button>
            </header>

            {/* Chat messages */}
            <div
              className="flex-1 p-4 overflow-y-auto bg-gray-50"
              ref={messageContainerRef}
            >
              {conversation.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-3 ${
                    msg.sender?.id === myId ? "text-right" : "text-left"
                  }`}
                >
                  <span className="text-xs text-gray-400 block mb-1">
                    {new Date(msg.createAt).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                  <p
                    className={`inline-block px-3 py-2 rounded-xl max-w-xs break-words ${
                      msg.sender?.id === myId
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.content}
                  </p>
                  <div ref={messagesEndRef} />
                </div>
              ))}
            </div>

            {/* Footer input */}
            <footer className="border-t p-3 bg-gray-50 flex items-center gap-2">
              <input
                type="text"
                value={input}
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                className="p-3 bg-emerald-500 hover:bg-emerald-600 rounded-full text-white flex items-center justify-center"
                onClick={() => sendMessage()}
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </footer>
          </main>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            Chọn người để chat
          </div>
        )}
      </div>
    </div>
  );
}
