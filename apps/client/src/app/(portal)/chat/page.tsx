"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquareIcon, SendIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function MessageCard({ message, userId, isOwnMessage }) {
  return (
    <Card
      className={`${
        isOwnMessage ? "bg-teal-100" : "bg-white"
      } shadow-sm transition-shadow`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <UsersIcon className="h-6 w-6 text-teal-500" />
          <div>
            <p className="text-sm font-medium text-teal-700">
              {isOwnMessage ? "You" : userId}
            </p>
            <p className="text-gray-700">{message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ChatPage() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:3002", { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("user-joined", (data) => {
      setMessages((prev) => [...prev, { userId: "System", message: data.message }]);
    });

    newSocket.on("user-left", (data) => {
      setMessages((prev) => [...prev, { userId: "System", message: data.message }]);
    });

    newSocket.on("reply", (data) => {
      setMessages((prev) => [...prev, { userId: "Server", message: data }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && socket) {
      socket.emit("newMessage", { text: input });
      setMessages((prev) => [...prev, { userId: "You", message: input }]);
      setInput("");
    }
  };

  return (
    <div className="px-6 py-4 space-y-4 w-full">
      <h1 className="text-2xl font-bold">Chat Application</h1>

      <Tabs defaultValue="messages" className="w-full space-y-4">
        <div className="flex items-center justify-between gap-4 w-full">
          <TabsList className="w-fit">
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            >
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            >
              Active Users
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="messages">
          <div className="space-y-4">
            <div className="grid gap-4 overflow-y-auto max-h-96">
              {messages.map((msg, index) => (
                <MessageCard
                  key={index}
                  message={msg.message}
                  userId={msg.userId}
                  isOwnMessage={msg.userId === "You"}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-600"
              />
              <Button
                onClick={sendMessage}
                className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
              >
                <SendIcon className="h-4 w-4" /> Send
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <p className="text-gray-700">This feature is under development...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
