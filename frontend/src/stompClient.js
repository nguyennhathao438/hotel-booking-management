import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
  if (stompClient && stompClient.connected) return stompClient;

  const socket = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    console.log("WebSocket connected!");
    stompClient.subscribe("/user/queue/messages", (payload) => {
      const msg = JSON.parse(payload.body);
      onMessageReceived(msg);
    });
  });

  return stompClient;
};

export const sendMessage = (destination, message) => {
  if (stompClient && stompClient.connected) {
    stompClient.send(destination, {}, JSON.stringify(message));
  }
};
